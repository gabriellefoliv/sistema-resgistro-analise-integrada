import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllNecropsySampleOutput } from "srf-shared-types";
import { getNecropsySamples } from "../../../services/deadanimals/necropsySampleService";
import { SideDrawer } from "../../../components/sideDrawer";

interface SamplesSideDrawerFilters {
    necropsyId?: number;
    deadAnimalId?: number;
}

interface NecropsySampleSideDrawerProps {
    filters: SamplesSideDrawerFilters;
    onClose: () => void;
}

export function NecropsySampleSideDrawer({ filters, onClose }: NecropsySampleSideDrawerProps) {
    const [samples, setSamples] = useState<GetAllNecropsySampleOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getNecropsySamples()
            .then(all => {
                const filtered = all
                    .map(s => ({
                        ...s,
                        necropsyDateFormatted: s.necropsyDate
                            ? new Date(s.necropsyDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : '',
                        sendSamples: s.sendSamples?.map(ss => ({
                            ...ss,
                            sendDateFormatted: ss.sendDate
                                ? new Date(ss.sendDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                                : '',
                        })),
                    }))
                    .filter(s => {
                        if (filters.necropsyId && s.necropsyId !== filters.necropsyId) return false;
                        if (filters.deadAnimalId && s.deadAnimalId !== filters.deadAnimalId) return false;
                        return true;
                    });
                setSamples(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.necropsyId, filters.deadAnimalId]);

    const pageFilters: any[] = [];
    const first = samples[0];
    if (first) {
        if (first.necropsyDate) {
            const date = first.necropsyDate.split('T')[0];
            pageFilters.push({ field: 'necropsyDate', value: { type: 'date' as const, from: date, to: date } });
        }
        pageFilters.push({ field: 'deadAnimalCode', value: { type: 'text' as const, term: first.deadAnimalCode } });
    }
    const pageUrl = `/animaismortos/necropsias/amostras-am?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Amostras"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de amostras"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando amostras...
                </div>
            )}

            {!loading && samples.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhuma amostra encontrada.
                </div>
            )}

            {!loading && samples.length > 0 && (
                <div className="flex flex-col gap-3">
                    {samples.map(sample => {
                        const isExpanded = expandedId === sample.id;
                        return (
                            <div
                                key={sample.id}
                                className="border border-border rounded bg-white"
                            >
                                {/* Cabeçalho do Registro */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : sample.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{sample.sampleTypeDescription}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {sample.statusName} · Qtd: {sample.quantity}
                                        </span>
                                    </div>
                                    <span className="text-standard-blue text-xs font-bold uppercase">
                                        {isExpanded ? 'Recolher' : 'Expandir'}
                                    </span>
                                </button>

                                {/* Detalhes Expandidos */}
                                {isExpanded && (

                                    <div className="px-4 pb-4 border-t border-border bg-form-bg">
                                        <h4 className="font-bold text-text-main text-xs uppercase my-2 border-b border-gray-600 pb-1">
                                            Detalhes da Amostras
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Data da Visita" value={sample.necropsyDateFormatted || ''} />
                                            <Field label="Código do Animal" value={sample.deadAnimalCode} />
                                            <Field label="Tipo da Amostra" value={sample.sampleTypeDescription} />
                                            <Field label="Status" value={sample.statusName} />
                                            <Field label="Armazenamento" value={sample.storageName} />
                                            <Field label="Quantidade Total" value={String(sample.quantity)} />
                                            <Field label="Link da Imagem" value={sample.imageLink || 'Nenhum link informado'} />
                                        </div>
                                        {sample.note && (
                                            <div className="mt-2">
                                                <Field label="Observações" value={sample.note} fullWidth />
                                            </div>
                                        )}

                                        {/* Amostras Enviadas */}
                                        {sample.sendSamples && sample.sendSamples.length > 0 && (
                                            <div className="mt-3">
                                                <h4 className="font-bold text-text-main text-xs uppercase mb-2 border-b border-gray-600 pb-1">
                                                    Amostras Enviadas
                                                </h4>
                                                {sample.sendSamples.map(ss => (
                                                    <div key={ss.id} className="gap-2 w-full text-sm grid grid-cols-2 mb-2 border border-border rounded p-2">
                                                        <Field label="Local" value={ss.storageName} />
                                                        <Field label="Status" value={ss.statusName} />
                                                        <Field label="Data de Envio" value={ss.sendDateFormatted || ''} />
                                                        <Field label="Quantidade" value={String(ss.quantity)} />
                                                        {ss.note && <Field label="Observações" value={ss.note} fullWidth />}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </SideDrawer>
    );
}

function Field({ label, value, fullWidth }: { label: string; value: string; fullWidth?: boolean }) {
    return (
        <div className={`flex flex-col ${fullWidth ? 'col-span-2' : ''}`}>
            <label className="ml-1 font-bold text-xs text-text-main">{label}</label>
            <input
                type="text"
                disabled
                value={value}
                className="border border-border rounded px-2 py-1 text-text-input text-sm"
            />
        </div>
    );
}
