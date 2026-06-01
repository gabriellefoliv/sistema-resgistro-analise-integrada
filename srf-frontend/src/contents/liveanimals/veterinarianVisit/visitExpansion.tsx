import { useState } from "react";
import { type VeterinarianVisitData } from "../../../services/liveanimals/veterinarianVisitService";
import { VeterinarianVisitFormModal } from "./formVisitModal";
import { DeleteVisitModal } from "./deleteVisitModal";
import { SamplesSideDrawer } from "../veterinarianSample/samplesSideDrawer";
import { PhysicalExamSideDrawer } from "../physicalExam/physicalExamSideDrawer";
import { VaccineSideDrawer } from "../vaccine/vaccineSideDrawer";
import { ExamResultSideDrawer } from "../examResult/examResultSideDrawer";
import { SorologyResultSideDrawer } from "../sorologyResult/sorologyResultSideDrawer";
import { EctoparasiteAnalysisSideDrawer } from "../ectoparasiteAnalysis/ectoparasiteAnalysisSideDrawer";
import { StoolAnalysisSideDrawer } from "../stoolAnalysis/stoolAnalysisSideDrawer";

export function VisitExpansion({ item, close, refresh }: { item: VeterinarianVisitData; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSamplesDrawer, setShowSamplesDrawer] = useState(false);
    const [showPhysicalExamDrawer, setShowPhysicalExamDrawer] = useState(false);
    const [showVaccineDrawer, setShowVaccineDrawer] = useState(false);
    const [showExamResultDrawer, setShowExamResultDrawer] = useState(false);
    const [showSorologyResultDrawer, setShowSorologyResultDrawer] = useState(false);
    const [showEctoparasiteAnalysisDrawer, setShowEctoparasiteAnalysisDrawer] = useState(false);
    const [showStoolAnalysisDrawer, setShowStoolAnalysisDrawer] = useState(false);

    return (
        <>
            {showFormModal && (
                <VeterinarianVisitFormModal
                    visit={item}
                    close={() => setShowFormModal(false)}
                    refresh={refresh}
                />
            )}
            {showDeleteModal && (
                <DeleteVisitModal
                    visit={item}
                    close={() => setShowDeleteModal(false)}
                    refresh={refresh}
                />
            )}
            {showSamplesDrawer && (
                <SamplesSideDrawer
                    filters={{ veterinarianVisitId: item.id }}
                    onClose={() => setShowSamplesDrawer(false)}
                />
            )}
            {showPhysicalExamDrawer && (
                <PhysicalExamSideDrawer
                    filters={{ veterinarianVisitId: item.id }}
                    onClose={() => setShowPhysicalExamDrawer(false)}
                />
            )}
            {showVaccineDrawer && (
                <VaccineSideDrawer
                    filters={{ veterinarianVisitId: item.id }}
                    onClose={() => setShowVaccineDrawer(false)}
                />
            )}
            {showExamResultDrawer && (
                <ExamResultSideDrawer
                    filters={{ veterinarianVisitId: item.id }}
                    onClose={() => setShowExamResultDrawer(false)}
                />
            )}
            {showSorologyResultDrawer && (
                <SorologyResultSideDrawer
                    filters={{ veterinarianVisitId: item.id }}
                    onClose={() => setShowSorologyResultDrawer(false)}
                />
            )}
            {showEctoparasiteAnalysisDrawer && (
                <EctoparasiteAnalysisSideDrawer
                    filters={{ veterinarianVisitId: item.id }}
                    onClose={() => setShowEctoparasiteAnalysisDrawer(false)}
                />
            )}
            {showStoolAnalysisDrawer && (
                <StoolAnalysisSideDrawer
                    filters={{ veterinarianVisitId: item.id }}
                    onClose={() => setShowStoolAnalysisDrawer(false)}
                />
            )}
            {/* CABEÇALHO */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes da Visita</h3>
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
                    <div className="flex flex-col w-2/12">
                        <label htmlFor="name" className="ml-1 font-bold">Data da Realização</label>
                        <input type="text" disabled value={item.dateFormatted} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-4/12">
                        <label htmlFor="email" className="ml-1 font-bold">Animal</label>
                        <input type="text" disabled value={item.liveAnimalName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-5/12">
                        <label htmlFor="date" className="ml-1 font-bold">Veterinário</label>
                        <input type="text" disabled value={item.veterinarianName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
                <hr className="border-gray-200" />

            </div>
            {/* CORPO DA EXPANSÃO */}
            <div className="gap-2 w-full text-sm grid grid-cols-3 mb-1">
                <div className="flex flex-col w-full col-span-3">
                    <label htmlFor="email" className="ml-1 font-bold">Foto do Animal</label>
                    <div className="mb-2 border border-border rounded px-2 py-1 text-text-input">
                        {item.animalPicture ? (
                            <a href={item.animalPicture} target="_blank" rel="noopener noreferrer" className="text-standard-blue underline text-sm flex items-center gap-1">
                                {item.animalPicture}
                            </a>
                        ) : (
                            <span className="text-text-input text-sm">Nenhuma link de foto informado</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full col-span-3">
                    <label htmlFor="email" className="ml-1 font-bold">Observações</label>
                    <input type="text" disabled value={item.note || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>

            {item.bodyMeasurements?.length > 0 && (
                <>
                    <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                        <h3 className="font-bold text-text-main uppercase">Medidas Corporais</h3>
                    </div>
                    <div className="gap-2 w-full text-sm grid grid-cols-3 mb-1">
                        {item.bodyMeasurements.map(bm => (
                            <div key={bm.bodyMeasurementTypeId + bm.value} className="flex flex-col w-full">
                                <label htmlFor="email" className="ml-1 font-bold">{bm.bodyMeasurementTypeDescription} ({bm.bodyMeasurementTypeUnit})</label>
                                <input type="text" disabled value={bm.value} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* REGISTROS ASSOCIADOS */}
            {(item.hasSample || item.hasPhysicalExam || item.hasVaccine || item.hasExamResult || item.hasSorologyAnalysis || item.hasEctoparasiteAnalysis || item.hasStoolAnalysis) && (
                <>
                    <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                        <h3 className="font-bold text-text-main uppercase">Registros Associados</h3>
                    </div>
                    <div className="gap-2 w-full text-sm flex flex-wrap mb-1">
                        {item.hasSample && (
                            <button
                                onClick={() => setShowSamplesDrawer(true)}
                                className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            >
                                Amostras
                            </button>
                        )}
                        {item.hasPhysicalExam && (
                            <button
                                onClick={() => setShowPhysicalExamDrawer(true)}
                                className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            >
                                Exame Físico
                            </button>
                        )}
                        {item.hasVaccine && (
                            <button
                                onClick={() => setShowVaccineDrawer(true)}
                                className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            >
                                Vacinas
                            </button>
                        )}
                        {item.hasExamResult && (
                            <button
                                onClick={() => setShowExamResultDrawer(true)}
                                className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            >
                                Hemograma/Bioquímico
                            </button>
                        )}
                        {item.hasSorologyAnalysis && (
                            <button
                                onClick={() => setShowSorologyResultDrawer(true)}
                                className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            >
                                Sorologia
                            </button>
                        )}
                        {item.hasEctoparasiteAnalysis && (
                            <button
                                onClick={() => setShowEctoparasiteAnalysisDrawer(true)}
                                className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            >
                                Ectoparasitos
                            </button>
                        )}
                        {item.hasStoolAnalysis && (
                            <button
                                onClick={() => setShowStoolAnalysisDrawer(true)}
                                className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                            >
                                Fezes
                            </button>
                        )}
                    </div>
                </>
            )}
        </>
    );
}