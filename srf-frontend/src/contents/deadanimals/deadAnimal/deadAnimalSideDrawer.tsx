import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllDeadAnimalOutput } from "srf-shared-types";
import { getDeadAnimals } from "../../../services/deadanimals/deadAnimalService";
import { SideDrawer } from "../../../components/sideDrawer";

interface DeadAnimalSideDrawerFilters {
    deadAnimalId?: number;
}

interface DeadAnimalSideDrawerProps {
    filters: DeadAnimalSideDrawerFilters;
    onClose: () => void;
}

export function DeadAnimalSideDrawer({ filters, onClose }: DeadAnimalSideDrawerProps) {
    const [animals, setAnimals] = useState<GetAllDeadAnimalOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getDeadAnimals()
            .then(all => {
                const filtered = all
                    .map(a => ({
                        ...a,
                        collectionDateFormatted: a.collectionDate
                            ? new Date(a.collectionDate).toLocaleDateString('pt-BR')
                            : '',
                    }))
                    .filter(a => {
                        if (filters.deadAnimalId && a.id !== filters.deadAnimalId) return false;
                        return true;
                    });
                setAnimals(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.deadAnimalId]);

    const pageFilters: any[] = [];
    if (filters.deadAnimalId) {
        const firstAnimal = animals[0];
        if (firstAnimal) {
            pageFilters.push({ field: 'code', value: { type: 'text' as const, term: firstAnimal.code } });
        }
    }
    const pageUrl = `/animaismortos/animais/animal-am?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Animal Morto"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de animais mortos"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando animal morto...
                </div>
            )}

            {!loading && animals.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhum animal morto encontrado.
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
                                        <span className="text-sm font-bold text-text-main">{animal.code}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {animal.deadAnimalOriginName} · {animal.deadAnimalStatusName}
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
                                            Detalhes do Animal Morto
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Código" value={animal.code} />
                                            <Field label="Origem" value={animal.deadAnimalOriginName} />
                                            <Field label="Status" value={animal.deadAnimalStatusName} />
                                            <Field label="Data da Coleta" value={animal.collectionDateFormatted || ''} />
                                            <Field label="Grupo Animal" value={animal.deadAnimalGroupName} />
                                            <Field label="Espécie" value={animal.specieName} />
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
