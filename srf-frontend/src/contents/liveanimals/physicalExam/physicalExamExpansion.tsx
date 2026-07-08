import { useState } from "react";
import { type GetAllPhysicalExamOutput } from "srf-shared-types";
import { PhysicalExamFormModal } from "./formPhysicalExamModal";
import { DeletePhysicalExamModal } from "./deletePhysicalExamModal";
import { VeterinarianVisitSideDrawer } from "../veterinarianVisit/veterinarianVisitSideDrawer";
import grayQuestionMark from '../../../assets/grayQuestionMark.svg';

export function PhysicalExamExpansion({ item, close, refresh }: { item: GetAllPhysicalExamOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVeterinarianVisitDrawer, setShowVeterinarianVisitDrawer] = useState(false);
    return (
        <>
            {showFormModal && (
                <PhysicalExamFormModal
                    exam={item}
                    close={() => setShowFormModal(false)}
                    refresh={refresh}
                />
            )}
            {showDeleteModal && (
                <DeletePhysicalExamModal
                    exam={item}
                    close={() => setShowDeleteModal(false)}
                    refresh={refresh}
                />
            )}
            {showVeterinarianVisitDrawer && (
                <VeterinarianVisitSideDrawer
                    filters={{ veterinarianVisitId: item.veterinarianVisitId }}
                    onClose={() => setShowVeterinarianVisitDrawer(false)}
                />
            )}
            {/* ==== Cabeçalho de Expansão ==== */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes do Exame Físico</h3>
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
                    {/* Data da Visita */}
                    <div className="flex flex-col w-2/12">
                        <label htmlFor="date" className="ml-1 font-bold">Data da Visita</label>
                        <input type="text" disabled value={item.veterinarianVisitDateFormatted || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Animal */}
                    <div className="flex flex-col w-2/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={item.liveAnimalCode} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Veterinário */}
                    <div className="flex flex-col w-2/12">
                        <label className="ml-1 font-bold">Veterinário</label>
                        <input type="text" disabled value={item.veterinarianName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Estado Geral */}
                    <div className="flex flex-col w-5/12">
                        <label className="ml-1 font-bold">Condição Geral</label>
                        <input type="text" disabled value={item.generalConditionName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* ==== Corpo da Expansão ==== */}
            <div className="gap-2 w-full text-sm grid grid-cols-3 mb-1">
                {/* FR */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">Frequência Respiratória (mpm)
                        <img src={grayQuestionMark}
                            title="Frequência respiratória do animal em movimentos por minuto"
                            alt="Sobre o campo Frequência Respiratória"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.fr} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* FC */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">Frequência Cardíaca (bpm)
                        <img src={grayQuestionMark}
                            title="Frequência cardíaca do animal em batimentos por minuto"
                            alt="Sobre o campo Frequência Cardíaca"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.fc} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Temperatura Retal */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">Temperatura Retal (°C)
                        <img src={grayQuestionMark}
                            title="Temperatura retal do animal em graus Celsius"
                            alt="Sobre o campo Temperatura Retal"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.tempRectal} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Mucosa */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">Mucosa
                        <img src={grayQuestionMark}
                            title="Coloração das mucosas do animal"
                            alt="Sobre o campo Mucosa"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.mucousName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* TPC */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">Tempo de Preenchimento Capilar
                        <img src={grayQuestionMark}
                            title="Tempo de preenchimento capilar do animal em segundos"
                            alt="Sobre o campo Tempo de Preenchimento Capilar"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.tpc} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Hidratação */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">Hidratação
                        <img src={grayQuestionMark}
                            title="Estado de hidratação do animal"
                            alt="Sobre o campo Hidratação"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.hydrationName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Peso */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">Peso (kg)
                        <img src={grayQuestionMark}
                            title="Peso do animal em quilogramas"
                            alt="Sobre o campo Peso"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.weight} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Score */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold flex items-center">Score
                        <img src={grayQuestionMark}
                            title="Escala de 1 a 9 para avaliação da condição corporal do animal"
                            alt="Sobre o campo Score"
                            className="inline-block size-4 ml-1"
                        />
                    </label>
                    <input type="text" disabled value={item.score} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Observações da Coleta de Sangue */}
                <div className="flex flex-col w-full col-span-3">
                    <label htmlFor="email" className="ml-1 font-bold">Observações da Coleta de Sangue</label>
                    <input type="text" disabled value={item.bloodCollectionNote || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Observações do Exame Físico */}
                <div className="flex flex-col w-full col-span-3">
                    <label htmlFor="email" className="ml-1 font-bold">Observações do Exame Físico</label>
                    <input type="text" disabled value={item.physicalExamNote || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Observações Gerais */}
                <div className="flex flex-col w-full col-span-3">
                    <label htmlFor="email" className="ml-1 font-bold">Observações Gerais</label>
                    <input type="text" disabled value={item.generalNote || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>

        </>
    )
}