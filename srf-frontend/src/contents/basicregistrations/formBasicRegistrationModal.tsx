import React, { useState, useEffect } from "react";
import { ModalPortal } from "../../components/modalPortal";
import {
    type GetAllBasicRegistrationsOutput,
    type GetFormOptionsBasicRegistrationOutput
} from "srf-shared-types";

interface BasicRegistrationFormModalProps {
    record?: GetAllBasicRegistrationsOutput;
    close: () => void;
    refresh: () => void;
    getFormOptions: () => Promise<GetFormOptionsBasicRegistrationOutput>;
    create: (data: any) => Promise<any>;
    update: (recordId: number, data: any) => Promise<any>;
    entityLabel: string;
}

export function BasicRegistrationFormModal({ record, close, refresh, getFormOptions, create, update, entityLabel }: BasicRegistrationFormModalProps) {
    const isEditing = !!record;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [options, setOptions] = useState<GetFormOptionsBasicRegistrationOutput | null>(null);

    const [type, setType] = useState<string>(record?.type ?? '');
    const [value, setValue] = useState<string>(record?.value ?? '');
    const [secundaryValue, setSecundaryValue] = useState<string>(record?.secundaryValue ?? '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getFormOptions();
                setOptions(opts);
            } catch (error) {
                console.error(error);
            }
        }
        loadOptions();
    }, []);

    // Determina se o tipo selecionado possui valor secundário
    const selectedTypeConfig = options?.types.find(t => t.name === type);
    const showSecondaryValue = selectedTypeConfig?.hasSecondaryValue ?? false;
    const secondaryValueLabel = selectedTypeConfig?.secondaryValueLabel ?? 'Valor Secundário';
    const valueLabel = selectedTypeConfig?.valueFieldLabel ?? 'Valor';

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = {
                type,
                value,
                secundaryValue: showSecondaryValue ? (secundaryValue || undefined) : undefined,
            };
            if (isEditing && record) {
                await update(record.id, data);
            } else {
                await create(data);
            }
            refresh();
            close();
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao salvar.');
        } finally {
            setLoading(false);
        }
    }

    // Limpa o valor secundário quando muda de tipo para um que não tem secondary value
    function handleTypeChange(newType: string) {
        setType(newType);
        const newConfig = options?.types.find(t => t.name === newType);
        if (!newConfig?.hasSecondaryValue) {
            setSecundaryValue('');
        }
    }

    if (!options) {
        return (
            <ModalPortal>
                <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100">
                    <div className="bg-white rounded-2xl shadow-xl p-10">Carregando opções...</div>
                </div>
            </ModalPortal>
        );
    }

    return (
        <ModalPortal>
            <div onMouseDown={close} className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 overflow-y-auto p-4">
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col overflow-y-auto bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 gap-5 w-260 max-h-[90vh]">
                    <button onClick={() => close()} className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3" title="Fechar">✕</button>
                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        {isEditing ? `Editando ${entityLabel}` : `Novo ${entityLabel}`}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col col-span-2">
                                <label className="text-sm font-bold mb-1 text-left">Tipo</label>
                                <select
                                    value={type}
                                    onChange={(e) => handleTypeChange(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10"
                                    required
                                    disabled={isEditing}
                                >
                                    <option value="">Selecione...</option>
                                    {options.types.map(t => (
                                        <option key={t.id} value={t.name}>{t.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col col-span-2">
                                <label className="text-sm font-bold mb-1 text-left">{valueLabel}</label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10"
                                    placeholder={`Digite ${valueLabel.toLowerCase()}...`}
                                    required
                                />
                            </div>
                            {showSecondaryValue && (
                                <div className="flex flex-col col-span-2">
                                    <label className="text-sm font-bold mb-1 text-left">{secondaryValueLabel}</label>
                                    <input
                                        type="text"
                                        value={secundaryValue}
                                        onChange={(e) => setSecundaryValue(e.target.value)}
                                        className="border border-border rounded p-2 bg-white h-10"
                                        placeholder={`Digite ${secondaryValueLabel.toLowerCase()}...`}
                                    />
                                </div>
                            )}
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-center items-center gap-5 mt-2">
                            <button type="submit" className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer" disabled={loading}>
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button type="button" onClick={() => close()} className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalPortal>
    );
}
