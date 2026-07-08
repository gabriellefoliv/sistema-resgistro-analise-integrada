import { useState } from "react";
import { type GetAllStoolAnalysisOutput } from "srf-shared-types";
import { StoolAnalysisFormModal } from "./formStoolAnalysisModal";
import { DeleteStoolAnalysisModal } from "./deleteStoolAnalysisModal";
import { EggCystAnalysisSideDrawer } from "../eggCystAnalysis/eggCystAnalysisSideDrawer";
import { MolecularAnalysisSideDrawer } from "../molecularAnalysis/molecularAnalysisSideDrawer";

export function StoolAnalysisExpansion({ item, close, refresh }: { item: GetAllStoolAnalysisOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEggCystDrawer, setShowEggCystDrawer] = useState(false);
    const [showMolecularDrawer, setShowMolecularDrawer] = useState(false);

    return (
        <>
            {showFormModal && (
                <StoolAnalysisFormModal stoolAnalysis={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <DeleteStoolAnalysisModal stoolAnalysis={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
            )}
            {showEggCystDrawer && (
                <EggCystAnalysisSideDrawer
                    filters={{ stoolAnalysisId: item.id }}
                    onClose={() => setShowEggCystDrawer(false)}
                />
            )}
            {showMolecularDrawer && (
                <MolecularAnalysisSideDrawer
                    filters={{ stoolAnalysisId: item.id }}
                    onClose={() => setShowMolecularDrawer(false)}
                />
            )}
            {/* CABEÇALHO */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes da Análise de Fezes</h3>
                    <div className="flex gap-2 text-xs font-bold uppercase">
                        {item.canEdit && (<button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">Editar</button>)}
                        {item.canEdit && (<button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">Excluir</button>)}
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="flex gap-2 w-full text-sm">
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Data da Visita</label>
                        <input type="text" disabled value={item.veterinarianVisitDateFormatted || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-4/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={item.liveAnimalCode} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-4/12">
                        <label className="ml-1 font-bold">Veterinário</label>
                        <input type="text" disabled value={item.veterinarianName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* CORPO DA EXPANSÃO */}
            <div className="gap-2 w-full text-sm grid grid-cols-3 mb-2">
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Peso (Kg)</label>
                    <input type="text" disabled value={String(item.weight)} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Tecnologia de Processamento</label>
                    <input type="text" disabled value={item.processingTechnologyName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full col-span-3">
                    <label className="ml-1 font-bold">Observações</label>
                    <input type="text" disabled value={item.note || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>

            {/* REGISTROS ASSOCIADOS */}
            {(item.hasEggCystAnalysis || item.hasMolecularAnalysis) && (
                <>
                    <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                        <h3 className="font-bold text-text-main uppercase">Registros Associados</h3>
                    </div>
                    <div className="gap-2 w-full text-sm flex flex-wrap mb-1">
                        {item.hasEggCystAnalysis && (
                            <button
                                onClick={() => setShowEggCystDrawer(true)}
                                className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            >
                                Ovos/Cistos
                            </button>
                        )}
                        {item.hasMolecularAnalysis && (
                            <button
                                onClick={() => setShowMolecularDrawer(true)}
                                className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            >
                                Molecular
                            </button>
                        )}
                    </div>
                </>
            )}
        </>
    )
}
