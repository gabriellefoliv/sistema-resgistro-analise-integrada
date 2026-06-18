import { useState } from "react";
import { type GetAllDeadAnimalOutput } from "srf-shared-types";
import { DeadAnimalFormModal } from "./formDeadAnimalModal";
import { DeleteDeadAnimalModal } from "./deleteDeadAnimalModal";
import { NecropsySideDrawer } from "../../deadanimals/necropsy/necropsySideDrawer";

export function DeadAnimalExpansion({ item, close, refresh }: { item: GetAllDeadAnimalOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showNecropsyDrawer, setShowNecropsyDrawer] = useState(false);

    return (
        <>
            {/* Modais */}
            {showFormModal && (
                <DeadAnimalFormModal deadAnimal={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <DeleteDeadAnimalModal deadAnimal={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
            )}

            {/* Side Drawers */}
            {showNecropsyDrawer && (
                <NecropsySideDrawer
                    filters={{ deadAnimalId: item.id }}
                    onClose={() => setShowNecropsyDrawer(false)}
                />
            )}

            {/* Cabeçalho */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes do Animal</h3>
                    <div className="flex gap-2 text-xs font-bold uppercase">
                        {item.canEdit && (<button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">Editar</button>)}
                        {item.canEdit && (<button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">Excluir</button>)}
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="flex gap-2 w-full text-sm">
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Código</label>
                        <input type="text" disabled value={item.code || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Origem</label>
                        <input type="text" disabled value={item.deadAnimalOriginName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Status</label>
                        <input type="text" disabled value={item.deadAnimalStatusName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Data da Coleta</label>
                        <input type="text" disabled value={item.collectionDateFormatted || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* Corpo */}
            <div className="gap-2 w-full text-sm grid grid-cols-2 mb-2">
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Grupo Animal</label>
                    <input type="text" disabled value={item.deadAnimalGroupName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Espécie</label>
                    <input type="text" disabled value={item.specieName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Responsável pela Coleta</label>
                    <input type="text" disabled value={item.collectionResponsibleName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Latitude</label>
                    <input type="text" disabled value={item.collectionLatitude} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Longitude</label>
                    <input type="text" disabled value={item.collectionLongitude} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full col-span-2">
                    <label className="ml-1 font-bold">Imagem</label>
                    <div className="mb-2 border border-border rounded px-2 py-1 text-text-input">
                        {item.imageLink ? (
                            <a href={item.imageLink} target="_blank" rel="noopener noreferrer" className="text-standard-blue underline text-sm flex items-center gap-1">
                                {item.imageLink}
                            </a>
                        ) : (
                            <span className="text-text-input text-sm">Nenhum link para imagem informado</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full col-span-2">
                    <label className="ml-1 font-bold">Observações</label>
                    <input type="text" disabled value={item.note || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>

            {/* Registros Associados */}
            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Registros Associados</h3>
            </div>
            <div className="gap-2 w-full text-sm flex flex-wrap mb-1">
                {item.hasNecropsy && (
                    <button
                        onClick={() => setShowNecropsyDrawer(true)}
                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                        title="Necrópsia (em breve)"
                    >
                        Necrópsia
                    </button>
                )}
                {!item.hasNecropsy && (
                    <span className="text-text-input text-sm py-2">Nenhum registro associado encontrado.</span>
                )}
            </div>
        </>
    )
}
