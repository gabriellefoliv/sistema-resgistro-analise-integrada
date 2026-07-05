import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllNecropsyOutput } from "srf-shared-types";
import { getNecropsies } from "../../../services/deadanimals/necropsyService";
import { SideDrawer } from "../../../components/sideDrawer";

interface NecropsySideDrawerFilters {
    deadAnimalId?: number;
    necropsyId?: number;
}

interface NecropsySideDrawerProps {
    filters: NecropsySideDrawerFilters;
    onClose: () => void;
}

export function NecropsySideDrawer({ filters, onClose }: NecropsySideDrawerProps) {
    const [necropsies, setNecropsies] = useState<GetAllNecropsyOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getNecropsies()
            .then(all => {
                const filtered = all
                    .map(n => ({
                        ...n,
                        performedDateFormatted: n.performedDate
                            ? new Date(n.performedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : '',
                    }))
                    .filter(n => {
                        if (filters.deadAnimalId && n.deadAnimalId !== filters.deadAnimalId) return false;
                        if (filters.necropsyId && n.id !== filters.necropsyId) return false;
                        return true;
                    });
                setNecropsies(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.deadAnimalId, filters.necropsyId]);

    const pageFilters: any[] = [];
    const first = necropsies[0];
    if (first) {
        pageFilters.push({ field: 'deadAnimalCode', value: { type: 'text' as const, term: first.deadAnimalCode } });
    }
    const pageUrl = `/animaismortos/necropsia/necropsia?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Necrópsias"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de necrópsias"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando necrópsias...
                </div>
            )}

            {!loading && necropsies.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhuma necrópsia encontrada.
                </div>
            )}

            {!loading && necropsies.length > 0 && (
                <div className="flex flex-col gap-3">
                    {necropsies.map(necropsy => {
                        const isExpanded = expandedId === necropsy.id;
                        return (
                            <div
                                key={necropsy.id}
                                className="border border-border rounded bg-white"
                            >
                                {/* Cabeçalho do Registro */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : necropsy.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{necropsy.deadAnimalCode}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {necropsy.performedDateFormatted} · {necropsy.identifiedGenderName}
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
                                            Detalhes da Necrópsia
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Código do Animal" value={necropsy.deadAnimalCode} />
                                            <Field label="Data da Realização" value={necropsy.performedDateFormatted || ''} />
                                            <Field label="Gênero Identificado" value={necropsy.identifiedGenderName} />
                                            <Field label="Estado do Corpo" value={necropsy.bodyConditionName} />
                                            <Field label="Estado Clínico" value={necropsy.clinicalConditionName} />
                                            <Field label="Condição Reprodutiva" value={necropsy.reproductiveConditionName} />
                                            <Field label="Peso (kg)" value={String(necropsy.weight)} />
                                            <Field label="Idade" value={necropsy.ageName} />
                                            <Field label="Tutor" value={necropsy.tutorName || 'Nenhum tutor associado'} />
                                            <Field label="Observações" value={necropsy.note || 'Nenhuma observação informada'} fullWidth />
                                        </div>

                                        {necropsy.bodyMeasurements?.length > 0 && (
                                            <div className="mt-3">
                                                <h4 className="font-bold text-text-main text-xs uppercase mb-2 border-b border-gray-600 pb-1">
                                                    Medidas Corporais
                                                </h4>
                                                <div className="gap-2 w-full text-sm grid grid-cols-2">
                                                    {necropsy.bodyMeasurements.map((bm: GetAllNecropsyOutput['bodyMeasurements'][0]) => (
                                                        <Field
                                                            key={bm.bodyMeasurementTypeId + bm.value}
                                                            label={`${bm.bodyMeasurementTypeDescription} (${bm.bodyMeasurementTypeUnit})`}
                                                            value={String(bm.value)}
                                                        />
                                                    ))}
                                                </div>
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
