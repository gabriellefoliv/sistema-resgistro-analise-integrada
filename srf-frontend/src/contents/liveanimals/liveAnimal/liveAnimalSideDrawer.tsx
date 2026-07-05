import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllLiveAnimalOutput } from "srf-shared-types";
import { getLiveAnimals } from "../../../services/liveanimals/liveAnimalService";
import { SideDrawer } from "../../../components/sideDrawer";

interface LiveAnimalSideDrawerFilters {
    liveAnimalId?: number;
    tutorId?: number;
}

interface LiveAnimalSideDrawerProps {
    filters: LiveAnimalSideDrawerFilters;
    onClose: () => void;
}

export function LiveAnimalSideDrawer({ filters, onClose }: LiveAnimalSideDrawerProps) {
    const [animals, setAnimals] = useState<GetAllLiveAnimalOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getLiveAnimals()
            .then(all => {
                const filtered = all
                    .map(a => ({
                        ...a,
                        birthDateFormatted: a.birthDate
                            ? new Date(a.birthDate).toLocaleDateString('pt-BR')
                            : '',
                    }))
                    .filter(a => {
                        if (filters.liveAnimalId && a.id !== filters.liveAnimalId) return false;
                        if (filters.tutorId && a.tutorId !== filters.tutorId) return false;
                        return true;
                    });
                setAnimals(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.liveAnimalId, filters.tutorId]);

    const pageFilters: any[] = [];
    if (filters.liveAnimalId) {
        const firstAnimal = animals[0];
        if (firstAnimal) {
            pageFilters.push({ field: 'liveAnimalName', value: { type: 'text' as const, term: firstAnimal.name } });
            pageFilters.push({ field: 'tutorName', value: { type: 'text' as const, term: firstAnimal.tutorName } });
        }
    }
    const pageUrl = `/animaisvivos/animais/animal-av?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Animal"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de animais"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando animal...
                </div>
            )}

            {!loading && animals.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhum animal encontrado.
                </div>
            )}

            {!loading && animals.length > 0 && (
                <div className="flex flex-col gap-3">
                    {animals.map(animal => {
                        const isExpanded = expandedId === animal.id;
                        return (
                            <div
                                key={animal.id}
                                className="border border-border rounded bg-white"
                            >
                                {/* Cabeçalho do Registro */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : animal.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{animal.name}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {animal.specieName} · {animal.active ? 'Ativo' : 'Inativo'}
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
                                            Detalhes do Animal
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Nome" value={animal.name} />
                                            <Field label="Tutor" value={animal.tutorName} />
                                            <Field label="Espécie" value={animal.specieName} />
                                            <Field label="Gênero" value={animal.genderName} />
                                            <Field label="Data de Nascimento" value={animal.birthDateFormatted || ''} />
                                            <Field label="Ativo?" value={animal.active ? 'Sim' : 'Não'} />
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
