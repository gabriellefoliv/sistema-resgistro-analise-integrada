import { useState } from "react";
import { type GetAllAnimalInterviewOutput } from "srf-shared-types";
import { AnimalInterviewFormModal } from "./formAnimalInterviewModal";
import { DeleteAnimalInterviewModal } from "./deleteAnimalInterviewModal";

export function AnimalInterviewExpansion({ item, close, refresh }: { item: GetAllAnimalInterviewOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            {showFormModal && (
                <AnimalInterviewFormModal
                    animalInterview={item}
                    close={() => setShowFormModal(false)}
                    refresh={refresh}
                />
            )}
            {showDeleteModal && (
                <DeleteAnimalInterviewModal
                    animalInterview={item}
                    close={() => setShowDeleteModal(false)}
                    refresh={refresh}
                />
            )}

            {/* Cabeçalho */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes da Entrevista do Animal</h3>
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
                        <label className="ml-1 font-bold">Animal</label>
                        <input type="text" disabled value={item.liveAnimalName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-6/12">
                        <label className="ml-1 font-bold">Tutor</label>
                        <input type="text" disabled value={item.tutorName || 'Sem tutor vinculado'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* Respostas sobre o Animal */}
            {(item.answers?.length ?? 0) > 0 && (
                <>
                    <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                        <h3 className="font-bold text-text-main uppercase">Respostas sobre o Animal</h3>
                    </div>
                    <div className="gap-2 w-full text-sm grid grid-cols-2 mb-2">
                        {item.answers.map(a => (
                            <div key={a.questionId} className="flex flex-col w-full">
                                <label className="ml-1 font-bold">{a.questionText}</label>
                                <input type="text" disabled value={a.answerText || 'Sem resposta'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
