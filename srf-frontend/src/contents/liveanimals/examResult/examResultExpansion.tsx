import { useState } from "react";
import { type GetAllExamResultOutput } from "srf-shared-types";
import { ExamResultFormModal } from "./formExamResultModal";
import { DeleteExamResultModal } from "./deleteExamResultModal";
import { VeterinarianVisitSideDrawer } from "../veterinarianVisit/veterinarianVisitSideDrawer";
import grayQuestionMark from '../../../assets/grayQuestionMark.svg';

export function ExamResultExpansion({ item, close, refresh }: { item: GetAllExamResultOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVeterinarianVisitDrawer, setShowVeterinarianVisitDrawer] = useState(false);
    return (
        <>
            {showFormModal && (
                <ExamResultFormModal examResult={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <DeleteExamResultModal examResult={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
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
                    <h3 className="font-bold text-text-main uppercase">Detalhes do Hemograma/Bioquímico</h3>
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
                        <label className="ml-1 font-bold">Animal</label>
                        <input type="text" disabled value={item.liveAnimalName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-4/12">
                        <label className="ml-1 font-bold">Veterinário</label>
                        <input type="text" disabled value={item.veterinarianName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* CORPO DA EXPANSÃO */}
            {/* Hemograma */}
            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Hemograma</h3>
            </div>
            <div className="gap-2 w-full text-sm grid grid-cols-4 mb-2">
                <div key={"Eritrócitos"} className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Eritrócitos</label>
                    <input type="text" disabled value={item.erythrocytes} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="Hemoglobina" className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Hemoglobina</label>
                    <input type="text" disabled value={item.hemoglobin} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="Hematócrito" className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Hematócrito</label>
                    <input type="text" disabled value={item.hematocrit} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="VCM" className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">VCM
                        <img src={grayQuestionMark}
                            title="VCM..."
                            alt="Sobre o campo VCM"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.vcm} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="HCM" className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">HCM
                        <img src={grayQuestionMark}
                            title="HCM..."
                            alt="Sobre o campo HCM"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.hcm} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="CHCM" className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">CHCM
                        <img src={grayQuestionMark}
                            title="CHCM..."
                            alt="Sobre o campo CHCM"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.chcm} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="Plaquetas" className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Plaquetas</label>
                    <input type="text" disabled value={item.platelets} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>
            <div className="gap-2 w-full text-sm grid grid-cols-4">
                {[
                    ['Leucócitos', item.whiteBloodCells], ['Bastonetes', item.bandCells],
                    ['Segmentados', item.segmentedCells], ['Segmentados (%)', item.segmentedCellsPercentage],
                    ['Linfócitos', item.lymphocytes], ['Linfócitos (%)', item.lymphocytesPercentage],
                    ['Monócitos', item.monocytes], ['Monócitos (%)', item.monocytesPercentage],
                    ['Eosinófilos', item.eosinophils], ['Eosinófilos (%)', item.eosinophilsPercentage],
                    ['Basófilos', item.basophils], ['Basófilos (%)', item.basophilsPercentage]
                ].map(([label, value]) => (
                    <div key={String(label)} className="flex flex-col w-full">
                        <label className="ml-1 font-bold">{label}</label>
                        <input type="text" disabled value={String(value)} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                ))}
            </div>

            {/* Bioquímico */}
            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Bioquímico</h3>
            </div>
            <div className="gap-2 w-full text-sm grid grid-cols-4">
                <div key="ALT" className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">ALT
                        <img src={grayQuestionMark}
                            title="ALT..."
                            alt="Sobre o campo ALT"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.alt} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="Creatinina" className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Creatinina</label>
                    <input type="text" disabled value={item.creatinine} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="Fosfatase Alcalina" className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Fosfatase Alcalina</label>
                    <input type="text" disabled value={item.alkalinePhosphatase} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="Proteína Total" className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Proteína Total</label>
                    <input type="text" disabled value={item.totalProtein} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div key="Ureia" className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Ureia</label>
                    <input type="text" disabled value={item.urea} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>
        </>
    )
}
