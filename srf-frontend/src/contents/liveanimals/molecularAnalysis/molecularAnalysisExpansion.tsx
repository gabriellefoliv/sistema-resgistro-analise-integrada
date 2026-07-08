import { useState } from "react";
import { type GetAllMolecularAnalysisOutput } from "srf-shared-types";
import { MolecularAnalysisFormModal } from "./formMolecularAnalysisModal";
import { DeleteMolecularAnalysisModal } from "./deleteMolecularAnalysisModal";
import { VeterinarianVisitSideDrawer } from "../veterinarianVisit/veterinarianVisitSideDrawer";

export function MolecularAnalysisExpansion({ item, close, refresh }: { item: GetAllMolecularAnalysisOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVeterinarianVisitDrawer, setShowVeterinarianVisitDrawer] = useState(false);
    return (
        <>
            {showFormModal && (
                <MolecularAnalysisFormModal molecularAnalysis={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <DeleteMolecularAnalysisModal molecularAnalysis={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
            )}
            {showVeterinarianVisitDrawer && (
                <VeterinarianVisitSideDrawer
                    filters={{ veterinarianVisitId: item.veterinarianVisitId }}
                    onClose={() => setShowVeterinarianVisitDrawer(false)}
                />
            )}
            {/* CABEÇALHO */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes da Análise Molecular</h3>
                    <div className="flex gap-2 text-xs font-bold uppercase">
                        {item.canEdit && (<button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">Editar</button>)}
                        {item.canEdit && (<button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">Excluir</button>)}
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="flex gap-2 w-full text-sm">
                    <div className="flex flex-col w-2/12">
                        <label className="ml-1 font-bold">Data da Visita</label>
                        <input type="text" disabled value={item.veterinarianVisitDateFormatted || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={item.liveAnimalCode} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Veterinário</label>
                        <input type="text" disabled value={item.veterinarianName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Espécie</label>
                        <input type="text" disabled value={item.eggCystSpecieName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* CORPO DA EXPANSÃO */}
            <div className="gap-2 w-full text-sm grid grid-cols-3 mb-2">
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
                    onClick={() => setShowVeterinarianVisitDrawer(true)}
                    className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                >
                    Visita Veterinária
                </button>
            </div>
        </>
    )
}
