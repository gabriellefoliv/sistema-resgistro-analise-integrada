import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllCastrationOutput } from "srf-shared-types";
import { getCastrations } from "../../../services/liveanimals/castrationService";
import { SideDrawer } from "../../../components/sideDrawer";

interface CastrationSideDrawerFilters {
    veterinarianVisitId?: number;
    liveAnimalId?: number;
}

interface CastrationSideDrawerProps {
    filters: CastrationSideDrawerFilters;
    onClose: () => void;
}

export function CastrationSideDrawer({ filters, onClose }: CastrationSideDrawerProps) {
    const [castrations, setCastrations] = useState<GetAllCastrationOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getCastrations()
            .then(all => {
                const filtered = all
                    .map(c => ({
                        ...c,
                        dateFormatted: c.date
                            ? new Date(c.date).toLocaleDateString('pt-BR')
                            : '',
                        veterinarianVisitDateFormatted: c.veterinarianVisitDate
                            ? new Date(c.veterinarianVisitDate).toLocaleDateString('pt-BR')
                            : '',
                    }))
                    .filter(c => {
                        if (filters.veterinarianVisitId && c.veterinarianVisitId !== filters.veterinarianVisitId) return false;
                        if (filters.liveAnimalId && c.liveAnimalId !== filters.liveAnimalId) return false;
                        return true;
                    });
                setCastrations(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.veterinarianVisitId, filters.liveAnimalId]);

    const pageFilters: any[] = [];
    if (filters.liveAnimalId) {
        const firstCastration = castrations[0];
        if (firstCastration) pageFilters.push({ field: 'liveAnimalName', value: { type: 'text' as const, term: firstCastration.liveAnimalName } });
    }
    if (filters.veterinarianVisitId) {
        const firstCastration = castrations[0];
        if (firstCastration?.veterinarianVisitDate) {
            const date = firstCastration.veterinarianVisitDate.split('T')[0];
            pageFilters.push({ field: 'date', value: { type: 'date' as const, from: date, to: date } });
            pageFilters.push({ field: 'liveAnimalName', value: { type: 'text' as const, term: firstCastration.liveAnimalName } });
        }
    }
    const pageUrl = `/animaisvivos/animais/castracao?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Castrações"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de castrações"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando castrações...
                </div>
            )}

            {!loading && castrations.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhuma castração encontrada.
                </div>
            )}

            {!loading && castrations.length > 0 && (
                <div className="flex flex-col gap-3">
                    {castrations.map(castration => {
                        const isExpanded = expandedId === castration.id;
                        return (
                            <div
                                key={castration.id}
                                className="border border-border rounded bg-white"
                            >
                                {/* Cabeçalho do Registro */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : castration.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{castration.liveAnimalName}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {castration.dateFormatted}
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
                                            Detalhes da Castração
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Animal" value={castration.liveAnimalName} />
                                            <Field label="Data" value={castration.dateFormatted || ''} />
                                            <Field label="Observações" value={castration.note || 'Nenhuma observação informada'} fullWidth />
                                        </div>

                                        {castration.veterinarianVisitId && (
                                            <div className="mt-3">
                                                <h4 className="font-bold text-text-main text-xs uppercase mb-2 border-b border-gray-600 pb-1">
                                                    Visita Veterinária Associada
                                                </h4>
                                                <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                                    <Field label="Data da Visita" value={castration.veterinarianVisitDateFormatted!} />
                                                    <Field label="Veterinário" value={castration.veterinarianName!} />
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
