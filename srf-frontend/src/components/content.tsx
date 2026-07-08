import { useEffect, useState, useMemo, useRef } from "react";
import React, { type ReactNode } from "react";
import { FilterBar, type FilterValue, type ActiveFilter } from "./filter";

export interface ColumnProps<T> {
    key: keyof T | string,
    label: string,
    width?: string,
}

interface FilterFieldBase<T> {
    key: keyof T | string;
    label: string;
}

export interface TextFilterField<T> extends FilterFieldBase<T> {
    type: 'text';
}

export interface DateFilterField<T> extends FilterFieldBase<T> {
    type: 'date';
}

export interface BooleanFilterField<T> extends FilterFieldBase<T> {
    type: 'boolean';
    trueLabel: string;
    falseLabel: string;
}

export interface EnumFilterField<T> extends FilterFieldBase<T> {
    type: 'enum';
    options: { value: string; label: string }[];
}

export type FilterFieldProps<T> =
    | TextFilterField<T>
    | DateFilterField<T>
    | BooleanFilterField<T>
    | EnumFilterField<T>;

export interface ContentProps<T> {
    id: string,
    label: string,
    columns: ColumnProps<T>[],
    firstColumnDetail?: (item: T) => ReactNode,
    data: T[],
    filterFields?: FilterFieldProps<T>[],
    rowIdField: keyof T,
    renderActions: (item: T, isExpanded: boolean, toggleRow: (id: string) => void, refresh: () => void) => ReactNode,
    renderExpansion?: (item: T, close: () => void, refresh: () => void) => ReactNode,
    toolBar?: (refresh: () => void) => ReactNode,
}

export interface PageProps {
    title: string,
    activeFormId: string,
    formChange: (formId: string) => void,
    contents: ContentProps<any>[],
    onRefresh?: () => void,
    hasAccess?: boolean,
    canCreate?: boolean,
    initialFilter?: { field: string; type?: string; term?: string; value?: FilterValue }[],
}

export function Content({
    title,
    activeFormId,
    formChange,
    contents,
    onRefresh,
    hasAccess,
    canCreate,
    initialFilter
}: PageProps) {
    const activeContent = contents.find(content => content.id === activeFormId);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [filteredData, setFilteredData] = useState(activeContent?.data);
    const [sortConfig, setSortConfig] = useState<{ key: string | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
    const initialFilters: ActiveFilter[] | undefined = initialFilter && initialFilter.length > 0
        ? initialFilter.map(filter => ({
            field: filter.field,
            label: activeContent?.filterFields?.find(f => String(f.key) === filter.field)?.label
                || activeContent?.columns?.find(c => String(c.key) === filter.field)?.label
                || filter.field,
            value: filter.value ? filter.value : { type: 'text' as const, term: filter.term || '' },
        }))
        : undefined;

    const currentFiltersRef = useRef<ActiveFilter[]>(initialFilters || []);
    const prevFormIdRef = useRef(activeFormId);

    useEffect(() => {
        const tabChanged = prevFormIdRef.current !== activeFormId;
        prevFormIdRef.current = activeFormId;

        if (tabChanged) {
            setExpandedId(null);
            setSortConfig({ key: null, direction: 'asc' });
            if (initialFilters) {
                currentFiltersRef.current = initialFilters;
            } else {
                currentFiltersRef.current = [];
            }
        }

        if (!activeContent?.data) return;

        const filtersToApply = currentFiltersRef.current.length > 0
            ? currentFiltersRef.current
            : tabChanged ? undefined : initialFilters;

        if (filtersToApply && filtersToApply.length > 0) {
            setFilteredData(applyFilters(activeContent.data, filtersToApply));
        } else {
            setFilteredData(activeContent.data);
        }
    }, [activeFormId, activeContent?.data])

    const sortedData = useMemo(() => {
        if (!filteredData) return [];
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = String(a[sortConfig.key!]).toLowerCase();
            const bValue = String(b[sortConfig.key!]).toLowerCase();

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    function toggleRow(id: string) {
        setExpandedId(prev => (prev === id ? null : id));
    }

    function applySingleFilter(data: any[], field: string, filterValue: FilterValue): any[] {
        if (filterValue.type === 'text') {
            const searchTerm = filterValue.term.toLocaleLowerCase();
            return data.filter(item =>
                String(item[field]).toLowerCase().includes(searchTerm)
            );
        } else if (filterValue.type === 'date') {
            const from = filterValue.from ? new Date(filterValue.from + 'T00:00:00') : null;
            const to = filterValue.to ? new Date(filterValue.to + 'T23:59:59') : null;
            return data.filter(item => {
                const raw = item[field];
                if (!raw) return false;
                const itemDate = new Date(raw);
                if (from && itemDate < from) return false;
                if (to && itemDate > to) return false;
                return true;
            });
        } else if (filterValue.type === 'boolean') {
            const target = filterValue.value;
            return data.filter(item =>
                String(item[field]).toLowerCase() === target
            );
        } else if (filterValue.type === 'enum') {
            const target = filterValue.value;
            return data.filter(item =>
                String(item[field]).toLowerCase() === target.toLowerCase()
            );
        }
        return data;
    }

    function applyFilters(data: any[], filters: ActiveFilter[]): any[] {
        return filters.reduce((result, filter) => applySingleFilter(result, filter.field, filter.value), data);
    }

    function handleFilter(filters: ActiveFilter[]) {
        currentFiltersRef.current = filters;
        if (!activeContent?.data) return;

        if (filters.length === 0) {
            setFilteredData(activeContent.data);
        } else {
            setFilteredData(applyFilters(activeContent.data, filters));
        }
    }

    function handleSort(key: string | any) {
        setSortConfig(prev => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    }

    return (
        <section className="ml-sidebar-size p-8 min-h-screen min-w-[600px] text-text-main">

            {/* Cabeçalho */}
            <h1 className="text-standard-red font-bold text-xl mb-1 uppercase">{title}</h1>

            <div className="mx-auto bg-white rounded shadow-sm border border-border">
                {/* Tabs */}
                <div className="px-6 pt-4 border-b border-border mb-3">
                    <div className="flex gap-2">
                        {contents.map((content) => (
                            <button
                                key={content.id}
                                onClick={() => formChange(content.id)}
                                className={`pb-3 px-6 text-sm font-bold transition-all relative cursor-pointer ${activeFormId === content.id ? 'text-standard-red border-b-2 border-standard-red' : 'text-text-main hover:text-standard-red'}`}
                            >
                                {content.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ToolBar */}
                {activeContent && hasAccess !== false && <>
                    <div className="flex justify-end items-end mx-6 gap-1 h-8">
                        {canCreate !== false && activeContent?.toolBar && activeContent?.toolBar(onRefresh || (() => { }))}
                        <FilterBar
                            key={activeContent?.id}
                            fields={activeContent?.filterFields || (activeContent?.columns || []).map(c => ({ ...c, type: 'text' as const }))}
                            onFilter={handleFilter}
                            initialFilters={initialFilters}
                        />
                    </div>

                    {/* Tabela */}
                    <div className="px-6 pb-6">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-form-bg border-b border-border">
                                    {activeContent?.columns.map(col => (
                                        <th
                                            key={String(col.key)}
                                            className={`px-4 py-3 text-left text-sm font-bold text-text-main ${col.width ?? ''} cursor-pointer hover:bg-black/5 select-none`}
                                            onClick={() => handleSort(col.key)}
                                        >
                                            <div className="flex items-center gap-1">
                                                {col.label}
                                                {sortConfig.key === col.key && (
                                                    <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="px-4 py-3 text-sm font-bold text-text-main text-right pr-6">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData && sortedData.length > 0 && sortedData.map((item) => {
                                    const id = item[activeContent?.rowIdField!] as unknown as string;
                                    const isExpanded = expandedId === id;

                                    if (!isExpanded) {
                                        return (
                                            <React.Fragment key={id}>

                                                <tr
                                                    className={`border-b border-border ${activeContent?.renderExpansion ? 'cursor-pointer hover:bg-hover-bg transition-colors' : ''}`}
                                                    onClick={activeContent?.renderExpansion ? () => toggleRow(id) : undefined}
                                                >
                                                    {activeContent?.columns.map(col => (
                                                        <td key={String(col.key)} className="px-4 py-4 text-sm text-text-main">
                                                            <div className="flex items-center gap-2">
                                                                {String(item[col.key])}
                                                                {activeContent?.firstColumnDetail && col === activeContent?.columns[0] && activeContent?.firstColumnDetail!(item)}
                                                            </div>
                                                        </td>
                                                    ))}
                                                    <td className="px-4 py-4 text-right">
                                                        <div className="inline-block" onClick={(e) => e.stopPropagation()}>
                                                            {activeContent?.renderActions!(item, isExpanded, () => toggleRow(id), onRefresh || (() => { }))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    } else {
                                        {/* Expansão */ }
                                        return (
                                            <React.Fragment key={id}>

                                                {activeContent?.renderExpansion && (
                                                    <tr>
                                                        <td colSpan={activeContent.columns.length + 1}>
                                                            <div className="expand-record bg-form-bg border border-border rounded my-2 px-4 py-2">
                                                                {activeContent?.renderExpansion!(item, () => setExpandedId(null), onRefresh || (() => { }))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                            </React.Fragment>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                        {sortedData?.length === 0 && (
                            <div className="px-4 py-4 text-center text-sm text-text-main">
                                Nenhum dado encontrado.
                            </div>
                        )}
                    </div>
                </>}
                {hasAccess === false && (
                    <div className="p-16 text-center">
                        <h2 className="text-xl font-bold text-standard-red mb-2">Acesso Negado</h2>
                        <p className="text-text-main">Você não tem permissão para visualizar o conteúdo deste formulário.</p>
                    </div>
                )}
            </div>
        </section>
    );
}