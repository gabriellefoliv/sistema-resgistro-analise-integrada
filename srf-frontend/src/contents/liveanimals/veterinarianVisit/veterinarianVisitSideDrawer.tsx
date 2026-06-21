import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type VeterinarianVisitData, getVeterinarianVisits } from "../../../services/liveanimals/veterinarianVisitService";
import { SideDrawer } from "../../../components/sideDrawer";

interface VeterinarianVisitSideDrawerFilters {
    liveAnimalId?: number;
    veterinarianVisitId?: number;
}

interface VeterinarianVisitSideDrawerProps {
    filters: VeterinarianVisitSideDrawerFilters;
    onClose: () => void;
}

export function VeterinarianVisitSideDrawer({ filters, onClose }: VeterinarianVisitSideDrawerProps) {
    const [visits, setVisits] = useState<VeterinarianVisitData[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getVeterinarianVisits()
            .then(all => {
                const filtered = all
                    .map(v => ({
                        ...v,
                        dateFormatted: v.date
                            ? new Date(v.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : '',
                    }))
                    .filter(v => {
                        if (filters.liveAnimalId && v.liveAnimalId !== filters.liveAnimalId) return false;
                        if (filters.veterinarianVisitId && v.id !== filters.veterinarianVisitId) return false;
                        return true;
                    });
                setVisits(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.liveAnimalId, filters.veterinarianVisitId]);

    const pageFilters: any[] = [];
    const first = visits[0];
    if (first) {
        pageFilters.push({ field: 'liveAnimalName', value: { type: 'text' as const, term: first.liveAnimalName } });
    }
    const pageUrl = `/animaisvivos/veterinario/visitaveterinaria?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Visitas Veterinárias"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de visitas veterinárias"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando visitas veterinárias...
                </div>
            )}

            {!loading && visits.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhuma visita veterinária encontrada.
                </div>
            )}

            {!loading && visits.length > 0 && (
                <div className="flex flex-col gap-3">
                    {visits.map(visit => {
                        const isExpanded = expandedId === visit.id;
                        return (
                            <div
                                key={visit.id}
                                className="border border-border rounded bg-white"
                            >
                                {/* Cabeçalho do Registro */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : visit.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{visit.veterinarianName}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {visit.dateFormatted} · {visit.liveAnimalName}
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
                                            Detalhes da Visita
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Data da Realização" value={visit.dateFormatted || ''} />
                                            <Field label="Animal" value={visit.liveAnimalName} />
                                            <Field label="Veterinário" value={visit.veterinarianName} />
                                            <Field label="Observações" value={visit.note || 'Nenhuma observação informada'} fullWidth />
                                        </div>

                                        {visit.animalPicture && (
                                            <div className="mt-2">
                                                <Field label="Foto do Animal" value={visit.animalPicture} fullWidth />
                                            </div>
                                        )}

                                        {visit.bodyMeasurements?.length > 0 && (
                                            <div className="mt-3">
                                                <h4 className="font-bold text-text-main text-xs uppercase mb-2 border-b border-gray-600 pb-1">
                                                    Medidas Corporais
                                                </h4>
                                                <div className="gap-2 w-full text-sm grid grid-cols-2">
                                                    {visit.bodyMeasurements.map(bm => (
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
