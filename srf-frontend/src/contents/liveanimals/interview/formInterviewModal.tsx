import React, { useState, useEffect } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllInterviewOutput,
    type GetFormOptionsInterviewOutput,
} from "srf-shared-types";
import {
    getInterviewFormOptions,
    createInterview,
    updateInterview
} from "../../../services/liveanimals/interviewService";

interface InterviewFormModalProps {
    interview?: GetAllInterviewOutput;
    close: () => void;
    refresh: () => void;
}

interface AnswerState {
    questionId: number;
    text: string;
    answerOptionId: number | null;
}

interface AnimalInterviewState {
    liveAnimalId: number;
    answers: AnswerState[];
}

export function InterviewFormModal({ interview, close, refresh }: InterviewFormModalProps) {
    const isEditing = !!interview;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsInterviewOutput | null>(null);

    const [selectedTutorId, setSelectedTutorId] = useState<number | ''>(interview?.tutorId ?? '');
    const [selectedDate, setSelectedDate] = useState<string>(
        interview?.date ? interview.date.split('T')[0] : ''
    );
    const [answers, setAnswers] = useState<AnswerState[]>([]);
    const [animalInterviews, setAnimalInterviews] = useState<AnimalInterviewState[]>([]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getInterviewFormOptions();
                setOptions(opts);

                // Inicializa as respostas do tutor
                if (interview) {
                    // Modo edição: preencher com respostas existentes
                    const initialAnswers = opts.tutorQuestions.map(q => {
                        const existingAnswer = interview.tutorAnswers.find(a => a.questionId === q.id);
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

                    // Inicializa as entrevistas dos animais existentes
                    const initialAnimalInterviews = interview.animalInterviews.map(ai => ({
                        liveAnimalId: ai.liveAnimalId,
                        answers: opts.animalQuestions.map(q => {
                            const existingAnswer = ai.answers.find(a => a.questionId === q.id);
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
                        }),
                    }));
                    setAnimalInterviews(initialAnimalInterviews);
                } else {
                    // Modo criação: inicializa vazio
                    const initialAnswers = opts.tutorQuestions.map(q => ({
                        questionId: q.id,
                        text: '',
                        answerOptionId: q.options.length > 0 ? null : null,
                    }));
                    setAnswers(initialAnswers);
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadOptions();
    }, []);

    function updateTutorAnswer(questionId: number, field: 'text' | 'answerOptionId', value: string | number | null) {
        setAnswers(prev => prev.map(a => {
            if (a.questionId !== questionId) return a;
            if (field === 'text') {
                return { ...a, text: value as string, answerOptionId: null };
            }
            return { ...a, answerOptionId: value as number | null, text: '' };
        }));
    }

    function updateAnimalAnswer(animalIndex: number, questionId: number, field: 'text' | 'answerOptionId', value: string | number | null) {
        setAnimalInterviews(prev => prev.map((ai, idx) => {
            if (idx !== animalIndex) return ai;
            return {
                ...ai,
                answers: ai.answers.map(a => {
                    if (a.questionId !== questionId) return a;
                    if (field === 'text') {
                        return { ...a, text: value as string, answerOptionId: null };
                    }
                    return { ...a, answerOptionId: value as number | null, text: '' };
                }),
            };
        }));
    }


    function getAnimalName(animalId: number): string {
        return options?.liveAnimals.find(a => a.id === animalId)?.name ?? `Animal #${animalId}`;
    }

    // Animais disponíveis para adicionar (modo edição: todos; modo criação: só do tutor)
    function getAvailableAnimals() {
        if (!options) return [];
        const usedIds = new Set(animalInterviews.map(ai => ai.liveAnimalId));
        if (isEditing) {
            // Na edição, pode adicionar qualquer animal
            return options.liveAnimals.filter(a => !usedIds.has(a.id));
        } else {
            // Na criação, apenas animais do tutor selecionado
            return options.liveAnimals.filter(a => a.tutorId === selectedTutorId && !usedIds.has(a.id));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedTutorId) {
            setError('Selecione um tutor.');
            return;
        }
        if (!selectedDate) {
            setError('Informe a data da realização.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = {
                tutorId: Number(selectedTutorId),
                date: selectedDate,
                answers: answers.map(a => ({
                    questionId: a.questionId,
                    text: a.answerOptionId ? null : (a.text || null),
                    answerOptionId: a.answerOptionId || null,
                })),
                animalInterviews: animalInterviews.map(ai => ({
                    liveAnimalId: ai.liveAnimalId,
                    answers: ai.answers.map(a => ({
                        questionId: a.questionId,
                        text: a.answerOptionId ? null : (a.text || null),
                        answerOptionId: a.answerOptionId || null,
                    })),
                })),
            };
            if (isEditing && interview) {
                await updateInterview(interview.id, data);
            } else {
                await createInterview(data);
            }
            refresh();
            close();
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao salvar.');
        } finally {
            setLoading(false);
        }
    }

    // Ao mudar o tutor no modo criação, auto-popular com os animais do tutor
    function handleTutorChange(newTutorId: number | '') {
        setSelectedTutorId(newTutorId);

        if (!isEditing && options && newTutorId) {
            const tutorAnimals = options.liveAnimals.filter(a => a.tutorId === newTutorId);
            const newAnimalInterviews = tutorAnimals.map(animal => ({
                liveAnimalId: animal.id,
                answers: options.animalQuestions.map(q => ({
                    questionId: q.id,
                    text: '',
                    answerOptionId: null,
                })),
            }));
            setAnimalInterviews(newAnimalInterviews);
        } else if (!isEditing) {
            setAnimalInterviews([]);
        }
    }

    function handleClearTutorAnswers() {
        setAnswers(prev => prev.map(a => ({
            ...a,
            text: '',
            answerOptionId: null,
        })));
    }


    function handleAddAnimal(animalId: number) {
        if (!options) return;
        // Não adicionar se já existe
        if (animalInterviews.some(ai => ai.liveAnimalId === animalId)) return;

        const newAnimalInterview: AnimalInterviewState = {
            liveAnimalId: animalId,
            answers: options.animalQuestions.map(q => ({
                questionId: q.id,
                text: '',
                answerOptionId: null,
            })),
        };
        setAnimalInterviews(prev => [...prev, newAnimalInterview]);
    }

    function handleRemoveAnimal(animalIndex: number) {
        setAnimalInterviews(prev => prev.filter((_, idx) => idx !== animalIndex));
    }

    function handleClearAnimalAnswers(animalIndex: number) {
        setAnimalInterviews(prev => prev.map((ai, idx) => {
            if (idx !== animalIndex) return ai;
            return {
                ...ai,
                answers: ai.answers.map(a => ({
                    ...a,
                    text: '',
                    answerOptionId: null,
                })),
            };
        }));
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

    const availableAnimals = getAvailableAnimals();

    return (
        <ModalPortal>
            <div onMouseDown={close} className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 overflow-y-auto p-4">
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col overflow-y-auto bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 gap-5 w-260 max-h-[90vh]">
                    <button onClick={() => close()} className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3" title="Fechar">✕</button>
                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        {isEditing ? 'Editando Entrevista' : 'Nova Entrevista'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Dados da Entrevista */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Dados da Entrevista</legend>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Tutor</label>
                                    <select
                                        value={selectedTutorId}
                                        onChange={(e) => handleTutorChange(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 bg-white h-10"
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {options.tutors.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Data da Realização</label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="border border-border rounded p-2 bg-white h-10"
                                        required
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* Perguntas do Tutor */}
                        <fieldset className="relative border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Respostas sobre o Tutor</legend>
                            <div className="absolute top-[-24px] right-2 bg-white px-2 rounded">
                                <button
                                    type="button"
                                    onClick={() => handleClearTutorAnswers()}
                                    className="text-standard-blue font-bold text-xs cursor-pointer"
                                    title="Limpar respostas do tutor"
                                >
                                    ⭯ Limpar
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {options.tutorQuestions.map(question => {
                                    const answer = answers.find(a => a.questionId === question.id);
                                    const hasOptions = question.options.length > 0;

                                    return (
                                        <div key={question.id} className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">{question.text}</label>
                                            {hasOptions ? (
                                                <select
                                                    value={answer?.answerOptionId ?? ''}
                                                    onChange={(e) => updateTutorAnswer(question.id, 'answerOptionId', e.target.value ? Number(e.target.value) : null)}
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
                                                    onChange={(e) => updateTutorAnswer(question.id, 'text', e.target.value)}
                                                    className="border border-border rounded p-2 bg-white h-10"
                                                    placeholder="Digite a resposta..."
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </fieldset>

                        {/* Entrevistas dos Animais */}
                        {selectedTutorId && (
                            <>
                                {animalInterviews.map((ai, animalIndex) => (
                                    <fieldset key={ai.liveAnimalId} className="border border-border rounded p-4 relative">
                                        <legend className="text-sm font-bold text-standard-blue px-2 flex items-center gap-2">
                                            Respostas sobre {getAnimalName(ai.liveAnimalId)}
                                        </legend>
                                        <div className="absolute top-[-24px] right-2 bg-white px-2 rounded">
                                            <button
                                                type="button"
                                                onClick={() => handleClearAnimalAnswers(animalIndex)}
                                                className="text-standard-blue font-bold text-xs cursor-pointer"
                                                title="Limpar respostas do animal"
                                            >
                                                ⭯ Limpar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveAnimal(animalIndex)}
                                                className="text-standard-red font-bold text-xs cursor-pointer ml-2"
                                                title="Remover animal"
                                            >
                                                ✕ Remover
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {options.animalQuestions.map(question => {
                                                const answer = ai.answers.find(a => a.questionId === question.id);
                                                const hasOptions = question.options.length > 0;

                                                return (
                                                    <div key={question.id} className="flex flex-col">
                                                        <label className="text-sm font-bold mb-1 text-left">{question.text}</label>
                                                        {hasOptions ? (
                                                            <select
                                                                value={answer?.answerOptionId ?? ''}
                                                                onChange={(e) => updateAnimalAnswer(animalIndex, question.id, 'answerOptionId', e.target.value ? Number(e.target.value) : null)}
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
                                                                onChange={(e) => updateAnimalAnswer(animalIndex, question.id, 'text', e.target.value)}
                                                                className="border border-border rounded p-2 bg-white h-10"
                                                                placeholder="Digite a resposta..."
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </fieldset>
                                ))}

                                {/* Adicionar Animal */}
                                {availableAnimals.length > 0 && (
                                    <div className="flex items-center gap-3 border border-dashed border-border rounded p-3">
                                        <label className="text-sm font-bold text-text-main whitespace-nowrap">Adicionar Animal:</label>
                                        <select
                                            value=""
                                            onChange={(e) => {
                                                if (e.target.value) handleAddAnimal(Number(e.target.value));
                                            }}
                                            className="border border-border rounded p-2 bg-white h-10 flex-1"
                                        >
                                            <option value="">Selecione um animal para adicionar...</option>
                                            {availableAnimals.map(a => (
                                                <option key={a.id} value={a.id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {animalInterviews.length === 0 && availableAnimals.length === 0 && (
                                    <p className="text-sm text-text-light-gray italic text-center">
                                        {isEditing
                                            ? 'Nenhum animal disponível para adicionar.'
                                            : 'Este tutor não possui animais associados.'}
                                    </p>
                                )}
                            </>
                        )}

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
