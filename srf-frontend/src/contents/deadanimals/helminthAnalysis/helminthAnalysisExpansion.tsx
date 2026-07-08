import { useState } from "react";
import { type GetAllHelminthAnalysisOutput } from "srf-shared-types";
import { FormHelminthAnalysisModal } from "./formHelminthAnalysisModal";
import { DeleteHelminthAnalysisModal } from "./deleteHelminthAnalysisModal";
import { DeadAnimalSideDrawer } from "../deadAnimal/deadAnimalSideDrawer";
import { NecropsySideDrawer } from "../necropsy/necropsySideDrawer";

export function HelminthAnalysisExpansion({ item, close, refresh }: { item: GetAllHelminthAnalysisOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeadAnimalDrawer, setShowDeadAnimalDrawer] = useState(false);
    const [showNecropsyDrawer, setShowNecropsyDrawer] = useState(false);
    return (
        <>
            {showFormModal && (
                <FormHelminthAnalysisModal helminthAnalysis={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <DeleteHelminthAnalysisModal helminthAnalysis={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
            )}
            {showDeadAnimalDrawer && (
                <DeadAnimalSideDrawer
                    filters={{ deadAnimalId: item.deadAnimalId }}
                    onClose={() => setShowDeadAnimalDrawer(false)}
                />
            )}
            {showNecropsyDrawer && (
                <NecropsySideDrawer
                    filters={{ necropsyId: item.necropsyId }}
                    onClose={() => setShowNecropsyDrawer(false)}
                />
            )}
            {/* CABEÇALHO */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes da Análise de Helmintos</h3>
                    <div className="flex gap-2 text-xs font-bold uppercase">
                        {item.canEdit && (<button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">Editar</button>)}
                        {item.canEdit && (<button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">Excluir</button>)}
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="flex gap-2 w-full text-sm">
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Data da Necropsia</label>
                        <input type="text" disabled value={item.necropsyDateFormatted || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={item.deadAnimalCode} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-5/12">
                        <label className="ml-1 font-bold">Espécie do Helminto</label>
                        <input type="text" disabled value={item.helminthSpecieName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* CORPO DA EXPANSÃO */}
            <div className="gap-2 w-full text-sm grid grid-cols-3 mb-2">
                <div className="flex flex-col w-full col-span-3">
                    <label className="ml-1 font-bold">Localização</label>
                    <input type="text" disabled value={item.locationName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Qtde de Machos</label>
                    <input type="text" disabled value={String(item.maleQuantity)} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Qtde de Fêmeas</label>
                    <input type="text" disabled value={String(item.femaleQuantity)} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Qtde Total</label>
                    <input type="text" disabled value={String(item.totalQuantity)} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full col-span-3">
                    <label className="ml-1 font-bold">Observações</label>
                    <input type="text" disabled value={item.note || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>

            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Registros Associados</h3>
            </div>
            <div className="gap-2 w-full text-sm flex flex-wrap mb-2">
                <button
                    onClick={() => setShowDeadAnimalDrawer(true)}
                    className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                >
                    Animal Morto
                </button>
                <button
                    onClick={() => setShowNecropsyDrawer(true)}
                    className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                >
                    Necropsia
                </button>
            </div>
        </>
    )
}
