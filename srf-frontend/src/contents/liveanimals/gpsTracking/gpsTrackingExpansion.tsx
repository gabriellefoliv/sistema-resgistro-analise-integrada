import { useState } from "react";
import { type GetAllGpsTrackingOutput } from "srf-shared-types";
import { GpsTrackingFormModal } from "./formGpsTrackingModal";
import { DeleteGpsTrackingModal } from "./deleteGpsTrackingModal";
import { LiveAnimalSideDrawer } from "../liveAnimal/liveAnimalSideDrawer";

export function GpsTrackingExpansion({ item, close, refresh }: { item: GetAllGpsTrackingOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLiveAnimalDrawer, setShowLiveAnimalDrawer] = useState(false);
    return (
        <>
            {showFormModal && (
                <GpsTrackingFormModal gpsTracking={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <DeleteGpsTrackingModal gpsTracking={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
            )}
            {showLiveAnimalDrawer && (
                <LiveAnimalSideDrawer
                    filters={{ liveAnimalId: item.liveAnimalId }}
                    onClose={() => setShowLiveAnimalDrawer(false)}
                />
            )}
            {/* Cabeçalho */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes do Registro</h3>
                    <div className="flex gap-2 text-xs font-bold uppercase">
                        {item.canEdit && (<button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">Editar</button>)}
                        {item.canEdit && (<button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">Excluir</button>)}
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="gap-2 w-full text-sm flex">
                    <div className="flex flex-col w-5/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={item.liveAnimalCode} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Última Atualização</label>
                        <input type="text" disabled value={item.lastUpdateDateFormatted || '-'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div> */}
                    <div className="flex flex-col w-6/12">
                        <label className="ml-1 font-bold">Dispositivo de Rastreamento</label>
                        <input type="text" disabled value={item.trackingDeviceBrandSerialNumber} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
                <div className="gap-2 w-full text-sm grid grid-cols-2">
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Data de Instalação</label>
                        <input type="text" disabled value={item.startDateFormatted || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Data de Retirada</label>
                        <input type="text" disabled value={item.endDateFormatted || '-'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
                <div className="gap-2 w-full text-sm grid grid-cols-1">
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Observações</label>
                        <input type="text" disabled value={item.note || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* Resultado da Movimentação */}
            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Resultado da Movimentação</h3>
            </div>
            <div className="gap-2 w-full text-sm grid grid-cols-4 mb-2">
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Número de Dias Monitorados</label>
                    <input type="text" disabled value={item.monitoredDays} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Número de Pontos de Localização</label>
                    <input type="text" disabled value={item.locationPoints} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Área de Vida</label>
                    <input type="text" disabled value={item.livingArea} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Método Utilizado</label>
                    <input type="text" disabled value={item.monitoringMethodDescription} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>

            {/* Planilhas */}
            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Planilhas</h3>
            </div>
            <div className="gap-2 w-full text-sm grid grid-cols-2 mb-2">
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Planilha Bruta</label>
                    <div className="mb-2 border border-border rounded px-2 py-1 text-text-input">
                        {item.rawSpreadsheetLink ? (
                            <a href={item.rawSpreadsheetLink} target="_blank" rel="noopener noreferrer" className="text-standard-blue underline text-sm flex items-center gap-1">
                                {item.rawSpreadsheetLink}
                            </a>
                        ) : (
                            <span className="text-text-input text-sm">Nenhum link de planilha bruta informado</span>
                        )}
                    </div>
                    {/* <label className="ml-1 text-xs text-text-input">
                        Última atualização em: {item.rawSpreadsheetUpdateDateFormatted || '-'}
                    </label> */}
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Planilha Editada</label>
                    <div className="mb-2 border border-border rounded px-2 py-1 text-text-input">
                        {item.editedSpreadsheetLink ? (
                            <a href={item.editedSpreadsheetLink} target="_blank" rel="noopener noreferrer" className="text-standard-blue underline text-sm flex items-center gap-1">
                                {item.editedSpreadsheetLink}
                            </a>
                        ) : (
                            <span className="text-text-input text-sm">Nenhum link de planilha editada informado</span>
                        )}
                    </div>
                    {/* <label className="ml-1 text-xs text-text-input">
                        Última atualização em: {item.editedSpreadsheetUpdateDateFormatted || '-'}
                    </label> */}
                </div>
            </div>

            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Registros Associados</h3>
            </div>
            <div className="gap-2 w-full text-sm flex flex-wrap mb-2">
                <button
                    onClick={() => setShowLiveAnimalDrawer(true)}
                    className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                >
                    Animal
                </button>
            </div>
        </>
    )
}
