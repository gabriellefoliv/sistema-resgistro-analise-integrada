import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllAnimalInterviewOutput } from "srf-shared-types";
import { getAnimalInterviews } from "../../../services/liveanimals/animalInterviewService";
import { SideDrawer } from "../../../components/sideDrawer";

interface AnimalInterviewSideDrawerFilters {
    liveAnimalId?: number;
}

interface AnimalInterviewSideDrawerProps {
    filters: AnimalInterviewSideDrawerFilters;
    onClose: () => void;
}

export function AnimalInterviewSideDrawer({ filters, onClose }: AnimalInterviewSideDrawerProps) {
    const [interviews, setInterviews] = useState<GetAllAnimalInterviewOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getAnimalInterviews()
            .then(all => {
                const filtered = all.filter(ai => {
                    if (filters.liveAnimalId && ai.liveAnimalId !== filters.liveAnimalId) return false;
                    return true;
                });
                setInterviews(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.liveAnimalId]);

    const pageFilters: any[] = [];
    const first = interviews[0];
    if (first) {
        pageFilters.push({ field: 'liveAnimalName', value: { type: 'text' as const, term: first.liveAnimalName } });
    }
    const pageUrl = `/animaisvivos/entrevistas/entrevistaanimal?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Entrevistas do Animal"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de entrevistas"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando entrevistas...
                </div>
            )}

            {!loading && interviews.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhuma entrevista encontrada para este animal.
                </div>
            )}

            {!loading && interviews.length > 0 && (
                <div className="flex flex-col gap-3">
                    {interviews.map(ai => {
                        const isExpanded = expandedId === ai.id;
                        return (
                            <div
                                key={ai.id}
                                className="border border-border rounded bg-white"
                            >
                                {/* Cabeçalho do Registro */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : ai.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{ai.liveAnimalName}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {ai.tutorName ? `Tutor: ${ai.tutorName}` : 'Sem tutor associado'} · {ai.answers.length} {ai.answers.length === 1 ? 'resposta' : 'respostas'}
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
                                            Respostas da Entrevista
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            {ai.answers.map(a => (
                                                <Field key={a.questionId} label={a.questionText} value={a.answerText || 'Sem resposta'} />
                                            ))}
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
