import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllGpsTrackingOutput } from "srf-shared-types";
import { getGpsTrackings } from "../../../services/liveanimals/gpsTrackingService";
import { SideDrawer } from "../../../components/sideDrawer";

interface GpsTrackingSideDrawerFilters {
    liveAnimalId?: number;
}

interface GpsTrackingSideDrawerProps {
    filters: GpsTrackingSideDrawerFilters;
    onClose: () => void;
}

export function GpsTrackingSideDrawer({ filters, onClose }: GpsTrackingSideDrawerProps) {
    const [trackings, setTrackings] = useState<GetAllGpsTrackingOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getGpsTrackings()
            .then(all => {
                const filtered = all
                    .map(t => ({
                        ...t,
                        startDateFormatted: t.startDate
                            ? new Date(t.startDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : '',
                        endDateFormatted: t.endDate
                            ? new Date(t.endDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : '-',
                    }))
                    .filter(t => {
                        if (filters.liveAnimalId && t.liveAnimalId !== filters.liveAnimalId) return false;
                        return true;
                    });
                setTrackings(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.liveAnimalId]);

    const pageFilters: any[] = [];
    const first = trackings[0];
    if (first) {
        pageFilters.push({ field: 'liveAnimalName', value: { type: 'text' as const, term: first.liveAnimalName } });
    }
    const pageUrl = `/animaisvivos/rastreiodegps/rastreiogps?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Rastreio de GPS"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de rastreio de GPS"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando rastreio de GPS...
                </div>
            )}

            {!loading && trackings.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhum registro de GPS encontrado.
                </div>
            )}

            {!loading && trackings.length > 0 && (
                <div className="flex flex-col gap-3">
                    {trackings.map(tracking => {
                        const isExpanded = expandedId === tracking.id;
                        return (
                            <div
                                key={tracking.id}
                                className="border border-border rounded bg-white"
                            >
                                {/* Cabeçalho do Registro */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : tracking.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{tracking.trackingDeviceBrandSerialNumber}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {tracking.startDateFormatted} · {tracking.liveAnimalName}
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
                                            Detalhes do Rastreio
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Animal" value={tracking.liveAnimalName} />
                                            <Field label="Dispositivo" value={tracking.trackingDeviceBrandSerialNumber} />
                                            <Field label="Data de Instalação" value={tracking.startDateFormatted || ''} />
                                            <Field label="Data de Retirada" value={tracking.endDateFormatted || '-'} />
                                            <Field label="Dias Monitorados" value={String(tracking.monitoredDays)} />
                                            <Field label="Pontos de Localização" value={String(tracking.locationPoints)} />
                                            <Field label="Área de Vida" value={String(tracking.livingArea)} />
                                            <Field label="Método" value={tracking.monitoringMethodDescription} />
                                            <Field label="Observações" value={tracking.note || '-'} fullWidth />
                                        </div>
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
