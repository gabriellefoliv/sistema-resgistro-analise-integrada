import { useState } from "react";
import { type GetAllNecropsyOutput } from "srf-shared-types";
import { NecropsyFormModal } from "./formNecropsyModal";
import { DeleteNecropsyModal } from "./deleteNecropsyModal";
import { DeadAnimalSideDrawer } from "../deadAnimal/deadAnimalSideDrawer";
import { NecropsySampleSideDrawer } from "../necropsySample/sampleSideDrawer";
// import { HelminthAnalysisSideDrawer } from "../helminthAnalysis/helminthAnalysisSideDrawer";
// import { EctoparasiteAnalysisNecropsySideDrawer } from "../ectoparasiteAnalysisNecropsy/ectoparasiteAnalysisNecropsySideDrawer";
// import { QpcrResultSideDrawer } from "../qpcrResult/qpcrResultSideDrawer";
// import { CpcrResultSideDrawer } from "../cpcrResult/cpcrResultSideDrawer";

export function NecropsyExpansion({ item, close, refresh }: { item: GetAllNecropsyOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showDeadAnimalDrawer, setShowDeadAnimalDrawer] = useState(false);
    const [showNecropsySampleDrawer, setShowNecropsySampleDrawer] = useState(false);
    // const [showHelminthDrawer, setShowHelminthDrawer] = useState(false);
    // const [showEctoparasiteDrawer, setShowEctoparasiteDrawer] = useState(false);
    // const [showQpcrDrawer, setShowQpcrDrawer] = useState(false);
    // const [showCpcrDrawer, setShowCpcrDrawer] = useState(false);

    const performedDateFormatted = item.performedDate
        ? new Date(item.performedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        : '';

    return (
        <>
            {/* Modais */}
            {showFormModal && (
                <NecropsyFormModal necropsy={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <DeleteNecropsyModal necropsy={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
            )}

            {/* Side Drawers */}
            {showDeadAnimalDrawer && (
                <DeadAnimalSideDrawer
                    filters={{ deadAnimalId: item.deadAnimalId }}
                    onClose={() => setShowDeadAnimalDrawer(false)}
                />
            )}
            {showNecropsySampleDrawer && (
                <NecropsySampleSideDrawer
                    filters={{ necropsyId: item.id }}
                    onClose={() => setShowNecropsySampleDrawer(false)}
                />
            )}
            {/* {showHelminthDrawer && (
                <HelminthAnalysisSideDrawer
                    filters={{ necropsyId: item.id }}
                    onClose={() => setShowHelminthDrawer(false)}
                />
            )} */}
            {/* {showEctoparasiteDrawer && (
                <EctoparasiteAnalysisNecropsySideDrawer
                    filters={{ necropsyId: item.id }}
                    onClose={() => setShowEctoparasiteDrawer(false)}
                />
            )} */}
            {/* {showQpcrDrawer && (
                <QpcrResultSideDrawer
                    filters={{ necropsyId: item.id }}
                    onClose={() => setShowQpcrDrawer(false)}
                />
            )} */}
            {/* {showCpcrDrawer && (
                <CpcrResultSideDrawer
                    filters={{ necropsyId: item.id }}
                    onClose={() => setShowCpcrDrawer(false)}
                />
            )} */}

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
                    <div className="flex flex-col w-4/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={item.deadAnimalCode || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Data da Realização</label>
                        <input type="text" disabled value={performedDateFormatted} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-4/12">
                        <label className="ml-1 font-bold">Gênero Identificado</label>
                        <input type="text" disabled value={item.identifiedGenderName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>

                </div>
            </div>
            <hr className="border-gray-200" />

            {/* Corpo */}
            <div className="gap-2 w-full text-sm grid grid-cols-3 mb-2">
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Estado do Corpo</label>
                    <input type="text" disabled value={item.bodyConditionName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Estado Clínico</label>
                    <input type="text" disabled value={item.clinicalConditionName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Condição Reprodutiva</label>
                    <input type="text" disabled value={item.reproductiveConditionName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Peso (kg)</label>
                    <input type="text" disabled value={item.weight} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Idade</label>
                    <input type="text" disabled value={item.ageName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Tutor</label>
                    <input type="text" disabled value={item.tutorName || 'Nenhum tutor associado'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>

                <div className="flex flex-col w-full col-span-3">
                    <label className="ml-1 font-bold">Observações</label>
                    <input type="text" disabled value={item.note || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>

            {/* Medidas Corporais */}
            {item.bodyMeasurements?.length > 0 && (
                <>
                    <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                        <h3 className="font-bold text-text-main uppercase">Medidas Corporais</h3>
                    </div>
                    <div className="gap-2 w-full text-sm grid grid-cols-3 mb-1">
                        {item.bodyMeasurements.map(bm => (
                            <div key={bm.bodyMeasurementTypeId + bm.value} className="flex flex-col w-full">
                                <label className="ml-1 font-bold">{bm.bodyMeasurementTypeDescription} ({bm.bodyMeasurementTypeUnit})</label>
                                <input type="text" disabled value={bm.value} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Registros Associados */}
            <>
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Registros Associados</h3>
                </div>
                <div className="gap-2 w-full text-sm flex flex-wrap mb-1">
                    <button
                        onClick={() => setShowDeadAnimalDrawer(true)}
                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                        title="Animal Morto"
                    >
                        Animal Morto
                    </button>
                    {item.hasSample && (
                        <button
                            onClick={() => setShowNecropsySampleDrawer(true)}
                            className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            title="Amostras"
                        >
                            Amostras
                        </button>
                    )}
                    {item.hasHelminthAnalysis && (
                        <button
                            // onClick={() => setShowHelminthDrawer(true)}
                            onClick={() => { }}
                            className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            title="Análise de Helmintos"
                        >
                            Análise de Helmintos
                        </button>
                    )}
                    {item.hasEctoparasiteAnalysis && (
                        <button
                            // onClick={() => setShowEctoparasiteDrawer(true)}
                            onClick={() => { }}
                            className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            title="Análise de Ectoparasitos"
                        >
                            Análise de Ectoparasitos
                        </button>
                    )}
                    {item.hasQpcrResult && (
                        <button
                            // onClick={() => setShowQpcrDrawer(true)}
                            onClick={() => { }}
                            className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            title="Resultado QPCR"
                        >
                            Resultado QPCR
                        </button>
                    )}
                    {item.hasCpcrResult && (
                        <button
                            // onClick={() => setShowCpcrDrawer(true)}
                            onClick={() => { }}
                            className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            title="Resultado CPCR"
                        >
                            Resultado CPCR
                        </button>
                    )}
                </div>
            </>
        </>
    )
}
