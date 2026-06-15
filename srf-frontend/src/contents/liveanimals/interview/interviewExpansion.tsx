import { useState } from "react";
import { type GetAllInterviewOutput } from "srf-shared-types";
import { InterviewFormModal } from "./formInterviewModal";
import { DeleteInterviewModal } from "./deleteInterviewModal";

export function InterviewExpansion({ item, close, refresh }: { item: GetAllInterviewOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            {showFormModal && (
                <InterviewFormModal
                    interview={item}
                    close={() => setShowFormModal(false)}
                    refresh={refresh}
                />
            )}
            {showDeleteModal && (
                <DeleteInterviewModal
                    interview={item}
                    close={() => setShowDeleteModal(false)}
                    refresh={refresh}
                />
            )}

            {/* Cabeçalho */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes da Entrevista</h3>
                    <div className="flex gap-2 text-xs font-bold uppercase">
                        {item.canEdit && (
                            <button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">
                                Editar
                            </button>
                        )}
                        {item.canEdit && (
                            <button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">
                                Excluir
                            </button>
                        )}
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="flex gap-2 w-full text-sm">
                    <div className="flex flex-col w-5/12">
                        <label className="ml-1 font-bold">Tutor</label>
                        <input type="text" disabled value={item.tutorName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-6/12">
                        <label className="ml-1 font-bold">Data da Realização</label>
                        <input type="text" disabled value={item.dateFormatted || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* Respostas sobre o tutor */}
            {(item.tutorAnswers?.length ?? 0) > 0 && (
                <>
                    <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                        <h3 className="font-bold text-text-main uppercase">Respostas sobre o Tutor</h3>
                    </div>
                    <div className="gap-2 w-full text-sm grid grid-cols-2 mb-2">
                        {item.tutorAnswers.map(a => (
                            <div key={a.questionId} className="flex flex-col w-full">
                                <label className="ml-1 font-bold">{a.questionText}</label>
                                <input type="text" disabled value={a.answerText || 'Sem resposta'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Respostas sobre os animais */}
            {(item.animalInterviews.length ?? 0) > 0 && (
                <>
                    {item.animalInterviews.map(ai => (
                        <div key={ai.id} className="flex flex-col w-full">
                            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                                <h3 className="font-bold text-text-main uppercase">Respostas sobre {ai.liveAnimalName}</h3>
                            </div>
                            <div className="gap-2 w-full text-sm grid grid-cols-2 mb-2">
                                {ai.answers.map(a => (
                                    <div key={a.questionId} className="flex flex-col w-full">
                                        <label className="ml-1 font-bold">{a.questionText}</label>
                                        <input type="text" disabled value={a.answerText || 'Sem resposta'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
