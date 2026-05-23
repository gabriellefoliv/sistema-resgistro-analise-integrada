import { useState } from "react";
import { type AnimalInterviewOutput } from "srf-shared-types";
import { SideDrawer } from "../../../components/sideDrawer";

interface AnimalInterviewSideDrawerProps {
    animalInterviews: AnimalInterviewOutput[];
    tutorName: string;
    onClose: () => void;
}

export function AnimalInterviewSideDrawer({ animalInterviews, tutorName, onClose }: AnimalInterviewSideDrawerProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <SideDrawer
            title={`Entrevistas de Animais — ${tutorName}`}
            onClose={onClose}
        >
            {animalInterviews.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhuma entrevista de animal encontrada.
                </div>
            )}

            {animalInterviews.length > 0 && (
                <div className="flex flex-col gap-3">
                    {animalInterviews.map(ai => {
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
                                            {ai.answers.length} {ai.answers.length === 1 ? 'resposta' : 'respostas'}
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
                                            Respostas sobre o Animal
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
