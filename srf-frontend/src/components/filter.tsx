import { useState } from "react"
import { ModalPortal } from "./modalPortal";
import blueFilterIcon from "../assets/blueFilter.svg";
import grayFilterIcon from "../assets/grayFilter.svg";
import type { FilterFieldProps } from "./content";

export type FilterValue =
    | { type: 'text'; term: string }
    | { type: 'date'; from: string; to: string }
    | { type: 'boolean'; value: string }
    | { type: 'enum'; value: string; label: string };

export interface ActiveFilter {
    field: string;
    label: string;
    value: FilterValue;
}

function formatFilterValue(filter: ActiveFilter): string {
    switch (filter.value.type) {
        case 'text': return `"${filter.value.term}"`;
        case 'date': {
            const from = filter.value.from || '...';
            const to = filter.value.to || '...';
            return `${from} → ${to}`;
        }
        case 'boolean': return filter.value.value === 'true' ? 'Sim' : 'Não';
        case 'enum': return filter.value.label;
        default: return '';
    }
}

interface FilterBarProps<T> {
    fields: FilterFieldProps<T>[],
    onFilter: (filters: ActiveFilter[]) => void,
    initialFilters?: ActiveFilter[],
}

export function FilterBar<T>({ fields, onFilter, initialFilters }: FilterBarProps<T>) {
    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>(initialFilters || []);
    const [pendingFilters, setPendingFilters] = useState<ActiveFilter[]>(initialFilters || []);

    const usedFields = pendingFilters.map(f => f.field);
    const availableFields = fields.filter(f => !usedFields.includes(String(f.key)));

    const [selectedField, setSelectedField] = useState<string>(
        availableFields.length > 0 ? String(availableFields[0].key) : ''
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const currentField = fields.find(f => String(f.key) === selectedField);
    const currentType = currentField?.type ?? 'text';

    const hasFilter = activeFilters.length > 0;

    function resetInputs() {
        setSearchTerm('');
        setDateFrom('');
        setDateTo('');
        setSelectedOption('');
    }

    function handleFieldChange(newField: string) {
        setSelectedField(newField);
        resetInputs();
    }

    function hasValue(): boolean {
        switch (currentType) {
            case 'text': return searchTerm !== '';
            case 'date': return dateFrom !== '' || dateTo !== '';
            case 'boolean': return selectedOption !== '';
            case 'enum': return selectedOption !== '';
            default: return false;
        }
    }

    function buildFilterValue(): FilterValue {
        switch (currentType) {
            case 'text': return { type: 'text', term: searchTerm };
            case 'date': return { type: 'date', from: dateFrom, to: dateTo };
            case 'boolean': return { type: 'boolean', value: selectedOption };
            case 'enum': {
                const enumField = currentField as Extract<FilterFieldProps<T>, { type: 'enum' }>;
                const optLabel = enumField.options.find(o => String(o.value) === selectedOption)?.label || selectedOption;
                return { type: 'enum', value: selectedOption, label: optLabel };
            }
            default: return { type: 'text', term: searchTerm };
        }
    }

    function handleAddFilter(e: React.FormEvent) {
        e.preventDefault();
        if (!hasValue() || !currentField) return;

        const newFilter: ActiveFilter = {
            field: selectedField,
            label: currentField.label,
            value: buildFilterValue(),
        };

        const updated = [...pendingFilters, newFilter];
        setPendingFilters(updated);
        resetInputs();

        const newAvailable = fields.filter(f => !updated.map(af => af.field).includes(String(f.key)));
        setSelectedField(newAvailable.length > 0 ? String(newAvailable[0].key) : '');
    }

    function handleRemoveFilter(field: string) {
        const updated = pendingFilters.filter(f => f.field !== field);
        setPendingFilters(updated);

        if (selectedField === '' || !fields.some(f => String(f.key) === selectedField && !updated.map(af => af.field).includes(String(f.key)))) {
            const newAvailable = fields.filter(f => !updated.map(af => af.field).includes(String(f.key)));
            if (newAvailable.length > 0) {
                setSelectedField(String(newAvailable[0].key));
                resetInputs();
            }
        }
    }

    function handleApplyFilters() {
        setActiveFilters(pendingFilters);
        onFilter(pendingFilters);
        setIsOpen(false);
    }

    function handleClose() {
        setPendingFilters(activeFilters);
        resetInputs();
        const usedByActive = activeFilters.map(f => f.field);
        const newAvailable = fields.filter(f => !usedByActive.includes(String(f.key)));
        setSelectedField(newAvailable.length > 0 ? String(newAvailable[0].key) : '');
        setIsOpen(false);
    }

    function renderInput() {
        switch (currentType) {
            case 'text':
                return (
                    <input
                        type='text'
                        placeholder='Termo para o filtro...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 h-10 bg-white border border-border p-2 rounded"
                    />
                );
            case 'date':
                return (
                    <div className="flex-1 h-10 flex items-center gap-2">
                        <label className="text-sm text-text-main font-bold whitespace-nowrap">De</label>
                        <input
                            type='date'
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="flex-1 bg-white border border-border p-2 rounded"
                        />
                        <label className="text-sm text-text-main font-bold whitespace-nowrap">Até</label>
                        <input
                            type='date'
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="flex-1 bg-white border border-border p-2 rounded"
                        />
                    </div>
                );
            case 'boolean': {
                const boolField = currentField as Extract<FilterFieldProps<T>, { type: 'boolean' }>;
                return (
                    <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="flex-1 h-10 bg-white border border-border p-2 rounded"
                    >
                        <option value="">Selecione...</option>
                        <option value="true">{boolField.trueLabel}</option>
                        <option value="false">{boolField.falseLabel}</option>
                    </select>
                );
            }
            case 'enum': {
                const enumField = currentField as Extract<FilterFieldProps<T>, { type: 'enum' }>;
                return (
                    <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="flex-1 h-10 bg-white border border-border p-2 rounded"
                    >
                        <option value="">Selecione...</option>
                        {enumField.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                );
            }
            default:
                return null;
        }
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)}
                className={`flex items-center justify-center bg-form-bg w-10 pt-0.5 rounded-t-xl cursor-pointer ${isOpen || hasFilter ? "h-8" : "h-6"} hover:h-8`}
                title="Filtrar"
            >
                <img src={hasFilter ? blueFilterIcon : grayFilterIcon} alt="Filtrar" className="w-5 h-5" />
            </button>
            {isOpen && (
                <ModalPortal>
                    <div
                        onMouseDown={handleClose}
                        className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 p-4">
                        <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-14 pb-6 gap-4 w-200 max-h-[90vh]">
                            <button
                                onClick={handleClose}
                                className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3"
                                title="Fechar"
                            >
                                ✕
                            </button>
                            <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                                Filtros
                            </h2>

                            {pendingFilters.length > 0 && (
                                <div className="flex flex-wrap gap-2 w-full">
                                    {pendingFilters.map(filter => (
                                        <span
                                            key={filter.field}
                                            className="flex items-center gap-1.5 bg-blue-100 text-standard-blue text-sm font-semibold px-3 py-1.5 rounded-full"
                                        >
                                            {filter.label}: {formatFilterValue(filter)}
                                            <button
                                                onClick={() => handleRemoveFilter(filter.field)}
                                                className="text-standard-blue hover:text-red-500 font-bold cursor-pointer ml-1 text-base leading-none"
                                                title="Remover filtro"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            {availableFields.length > 0 && (
                                <form onSubmit={handleAddFilter} className="flex w-full gap-4">
                                    <div className="w-3/12">
                                        <select
                                            value={selectedField}
                                            onChange={(e) => handleFieldChange(e.target.value)}
                                            className="bg-white border border-border p-2 rounded w-full"
                                        >
                                            {availableFields.map((field) => (
                                                <option key={String(field.key)} value={String(field.key)}>
                                                    {field.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {renderInput()}

                                    <button
                                        type="submit"
                                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded whitespace-nowrap"
                                    >
                                        Adicionar
                                    </button>
                                </form>
                            )}

                            <button
                                onClick={handleApplyFilters}
                                className="w-full bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded"
                            >
                                Filtrar
                            </button>
                        </div>
                    </div>
                </ModalPortal>
            )}
        </>
    )
}