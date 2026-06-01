import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllVaccineOutput } from "srf-shared-types";
import { getVaccines } from "../../../services/liveanimals/vaccineService";
import { SideDrawer } from "../../../components/sideDrawer";

interface VaccineSideDrawerFilters {
    veterinarianVisitId?: number;
    liveAnimalId?: number;
}

interface VaccineSideDrawerProps {
    filters: VaccineSideDrawerFilters;
    onClose: () => void;
}

export function VaccineSideDrawer({ filters, onClose }: VaccineSideDrawerProps) {
    const [vaccines, setVaccines] = useState<GetAllVaccineOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getVaccines()
            .then(all => {
                const filtered = all
                    .map(v => ({
                        ...v,
                        applicationDateFormatted: v.applicationDate
                            ? new Date(v.applicationDate).toLocaleDateString('pt-BR')
                            : '',
                        veterinarianVisitDateFormatted: v.veterinarianVisitDate
                            ? new Date(v.veterinarianVisitDate).toLocaleDateString('pt-BR')
                            : '',
                    }))
                    .filter(v => {
                        if (filters.veterinarianVisitId && v.veterinarianVisitId !== filters.veterinarianVisitId) return false;
                        if (filters.liveAnimalId && v.liveAnimalId !== filters.liveAnimalId) return false;
                        return true;
                    });
                setVaccines(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.veterinarianVisitId, filters.liveAnimalId]);

    const pageFilters: any[] = [];
    if (filters.liveAnimalId) {
        const firstVaccine = vaccines[0];
        if (firstVaccine) pageFilters.push({ field: 'liveAnimalName', value: { type: 'text' as const, term: firstVaccine.liveAnimalName } });
    }
    if (filters.veterinarianVisitId) {
        const firstVaccine = vaccines[0];
        if (firstVaccine?.veterinarianVisitDate) {
            const date = firstVaccine.veterinarianVisitDate.split('T')[0];
            pageFilters.push({ field: 'applicationDate', value: { type: 'date' as const, from: date, to: date } });
            pageFilters.push({ field: 'liveAnimalName', value: { type: 'text' as const, term: firstVaccine.liveAnimalName } });
        }
    }
    const pageUrl = `/animaisvivos/veterinario/vacinas-av?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Vacinas"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de vacinas"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando vacinas...
                </div>
            )}

            {!loading && vaccines.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhuma vacina encontrada.
                </div>
            )}

            {!loading && vaccines.length > 0 && (
                <div className="flex flex-col gap-3">
                    {vaccines.map(vaccine => {
                        const isExpanded = expandedId === vaccine.id;
                        return (
                            <div
                                key={vaccine.id}
                                className="border border-border rounded bg-white"
                            >
                                {/* Cabeçalho do Registro */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : vaccine.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{vaccine.vaccineName}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {vaccine.vaccineTypeName} · {vaccine.applicationDateFormatted}
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
                                            Detalhes da Vacina
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Animal" value={vaccine.liveAnimalName} />
                                            <Field label="Vacina" value={vaccine.vaccineName} />
                                            <Field label="Tipo de Aplicação" value={vaccine.vaccineTypeName} />
                                            <Field label="Data da Aplicação" value={vaccine.applicationDateFormatted || ''} />
                                        </div>

                                        {vaccine.veterinarianVisitId && (
                                            <div className="mt-3">
                                                <h4 className="font-bold text-text-main text-xs uppercase mb-2 border-b border-gray-600 pb-1">
                                                    Visita Veterinária Associada
                                                </h4>
                                                <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                                    <Field label="Data da Visita (Data da Aplicação)" value={vaccine.veterinarianVisitDateFormatted!} />
                                                    <Field label="Veterinário" value={vaccine.veterinarianName!} />
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
