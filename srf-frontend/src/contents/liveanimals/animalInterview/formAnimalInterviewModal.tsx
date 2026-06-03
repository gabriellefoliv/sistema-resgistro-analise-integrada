import React, { useState, useEffect } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllAnimalInterviewOutput,
    type GetFormOptionsAnimalInterviewOutput,
} from "srf-shared-types";
import {
    getAnimalInterviewFormOptions,
    createAnimalInterview,
    updateAnimalInterview
} from "../../../services/liveanimals/animalInterviewService";

interface AnimalInterviewFormModalProps {
    animalInterview?: GetAllAnimalInterviewOutput;
    close: () => void;
    refresh: () => void;
}

interface AnswerState {
    questionId: number;
    text: string;
    answerOptionId: number | null;
}

export function AnimalInterviewFormModal({ animalInterview, close, refresh }: AnimalInterviewFormModalProps) {
    const isEditing = !!animalInterview;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsAnimalInterviewOutput | null>(null);

    const [selectedAnimalId, setSelectedAnimalId] = useState<number | ''>(animalInterview?.liveAnimalId ?? '');
    const [selectedTutorInterviewId, setSelectedTutorInterviewId] = useState<number | ''>(animalInterview?.tutorInterviewId ?? '');
    const [answers, setAnswers] = useState<AnswerState[]>([]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getAnimalInterviewFormOptions();
                setOptions(opts);

                // Inicializa as respostas com base nas perguntas
                if (animalInterview) {
                    // Modo edição: preencher com respostas existentes
                    const initialAnswers = opts.animalQuestions.map(q => {
                        const existingAnswer = animalInterview.answers.find(a => a.questionId === q.id);
                        if (existingAnswer && q.options.length > 0) {
                            const matchingOption = q.options.find(o => o.text === existingAnswer.answerText);
                            return {
                                questionId: q.id,
                                text: '',
                                answerOptionId: matchingOption?.id ?? null,
                            };
                        }
                        return {
                            questionId: q.id,
                            text: existingAnswer?.answerText ?? '',
                            answerOptionId: null,
                        };
                    });
                    setAnswers(initialAnswers);
                } else {
                    // Modo criação: inicializa vazio
                    const initialAnswers = opts.animalQuestions.map(q => ({
                        questionId: q.id,
                        text: '',
                        answerOptionId: null,
                    }));
                    setAnswers(initialAnswers);
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadOptions();
    }, []);

    function updateAnswer(questionId: number, field: 'text' | 'answerOptionId', value: string | number | null) {
        setAnswers(prev => prev.map(a => {
            if (a.questionId !== questionId) return a;
            if (field === 'text') {
                return { ...a, text: value as string, answerOptionId: null };
            }
            return { ...a, answerOptionId: value as number | null, text: '' };
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedAnimalId) {
            setError('Selecione um animal.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = {
                liveAnimalId: Number(selectedAnimalId),
                tutorInterviewId: selectedTutorInterviewId ? Number(selectedTutorInterviewId) : null,
                answers: answers.map(a => ({
                    questionId: a.questionId,
                    text: a.answerOptionId ? null : (a.text || null),
                    answerOptionId: a.answerOptionId || null,
                })),
            };
            if (isEditing && animalInterview) {
                await updateAnimalInterview(animalInterview.id, data);
            } else {
                await createAnimalInterview(data);
            }
            refresh();
            close();
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao salvar.');
        } finally {
            setLoading(false);
        }
    }

    if (!options) {
        return (
            <ModalPortal>
                <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100">
                    <div className="bg-white rounded-2xl shadow-xl p-10">Carregando opções...</div>
                </div>
            </ModalPortal>
        );
    }

    return (
        <ModalPortal>
            <div onMouseDown={close} className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 overflow-y-auto p-4">
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col overflow-y-auto bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 gap-5 w-260 max-h-[90vh]">
                    <button onClick={() => close()} className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3" title="Fechar">✕</button>
                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        {isEditing ? 'Editando Entrevista do Animal' : 'Nova Entrevista do Animal'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Dados da Entrevista */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Dados da Entrevista</legend>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Animal</label>
                                    <select
                                        value={selectedAnimalId}
                                        onChange={(e) => setSelectedAnimalId(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 bg-white h-10"
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {options.liveAnimals.map(a => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Entrevista do Tutor (opcional)</label>
                                    <select
                                        value={selectedTutorInterviewId}
                                        onChange={(e) => setSelectedTutorInterviewId(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 bg-white h-10"
                                    >
                                        <option value="">Nenhuma</option>
                                        {options.tutorInterviews.map(t => (
                                            <option key={t.id} value={t.id}>{t.tutorName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        {/* Perguntas */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Respostas sobre o Animal</legend>
                            <div className="grid grid-cols-2 gap-4">
                                {options.animalQuestions.map(question => {
                                    const answer = answers.find(a => a.questionId === question.id);
                                    const hasOptions = question.options.length > 0;

                                    return (
                                        <div key={question.id} className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">{question.text}</label>
                                            {hasOptions ? (
                                                <select
                                                    value={answer?.answerOptionId ?? ''}
                                                    onChange={(e) => updateAnswer(question.id, 'answerOptionId', e.target.value ? Number(e.target.value) : null)}
                                                    className="border border-border rounded p-2 bg-white h-10"
                                                >
                                                    <option value="">Selecione...</option>
                                                    {question.options.map(opt => (
                                                        <option key={opt.id} value={opt.id}>{opt.text}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={answer?.text ?? ''}
                                                    onChange={(e) => updateAnswer(question.id, 'text', e.target.value)}
                                                    className="border border-border rounded p-2 bg-white h-10"
                                                    placeholder="Digite a resposta..."
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </fieldset>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-center items-center gap-5 mt-2">
                            <button type="submit" className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer" disabled={loading}>
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button type="button" onClick={() => close()} className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalPortal>
    )
}
