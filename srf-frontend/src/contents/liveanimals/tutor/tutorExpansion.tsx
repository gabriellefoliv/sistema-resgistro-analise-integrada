import { useState } from "react";
import { type GetAllTutorOutput } from "srf-shared-types";
import { TutorFormModal } from "./formTutorModal";
import { TutorDeleteModal } from "./deleteTutorModal";
// Import possible related drawers later if needed

export function TutorExpansion({ item, close, refresh }: { item: GetAllTutorOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            {/* Modais */}
            {showFormModal && (
                <TutorFormModal tutor={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <TutorDeleteModal tutor={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
            )}

            {/* Cabeçalho */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes do Tutor</h3>
                    <div className="flex gap-2 text-xs font-bold uppercase">
                        {item.canEdit && (<button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">Editar</button>)}
                        {item.canEdit && (<button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">Excluir</button>)}
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="flex gap-2 w-full text-sm">
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Nome</label>
                        <input type="text" disabled value={item.name || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* Corpo */}
            <div className="gap-2 w-full text-sm grid grid-cols-2 mb-2 mt-2">
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Data de Nascimento</label>
                    <input type="text" disabled value={item.birthDateFormatted} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Gênero</label>
                    <input type="text" disabled value={item.genderName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>
        </>
    )
}
