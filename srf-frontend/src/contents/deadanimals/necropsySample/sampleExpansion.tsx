import { useState } from "react";
import { type GetAllNecropsySampleOutput } from "srf-shared-types";
import { NecropsySampleFormModal } from "./formSampleModal";
import { DeleteSampleModal } from "./deleteSampleModal";
import { NecropsySideDrawer } from "../necropsy/necropsySideDrawer";

export function SampleExpansion({ item, close, refresh }: { item: GetAllNecropsySampleOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showNecropsyDrawer, setShowNecropsyDrawer] = useState(false);

    return (
        <>
            {showFormModal && (
                <NecropsySampleFormModal
                    sample={item}
                    close={() => setShowFormModal(false)}
                    refresh={refresh}
                />
            )}
            {showDeleteModal && (
                <DeleteSampleModal
                    sample={item}
                    close={() => setShowDeleteModal(false)}
                    refresh={refresh}
                />
            )}
            {showNecropsyDrawer && (
                <NecropsySideDrawer
                    filters={{ deadAnimalId: item.deadAnimalId }}
                    onClose={() => setShowNecropsyDrawer(false)}
                />
            )}
            {/* Cabeçalho de Expansão */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes da Amostra</h3>
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
                    {/* Data da Necrópsia */}
                    <div className="flex flex-col w-2/12">
                        <label htmlFor="date" className="ml-1 font-bold">Data da Necrópsia</label>
                        <input type="text" disabled value={item.necropsyDateFormatted || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Código do Animal */}
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={item.deadAnimalCode} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Tipo da Amostra */}
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Tipo da Amostra</label>
                        <input type="text" disabled value={item.sampleTypeDescription} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Status */}
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Status</label>
                        <input type="text" disabled value={item.statusName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* Corpo da Expansão */}
            <div className="gap-2 w-full text-sm grid grid-cols-3 mb-1">
                {/* Armazenamento */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Armazenamento</label>
                    <input type="text" disabled value={item.storageName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Quantidade Total */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Quantidade Total</label>
                    <input type="text" disabled value={item.quantity} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                {/* Link da Imagem */}
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Link da Imagem</label>
                    <div className="mb-2 border border-border rounded px-2 py-1 text-text-input h-[30px] flex items-center">
                        {item.imageLink ? (
                            <a href={item.imageLink} target="_blank" rel="noopener noreferrer" className="text-standard-blue underline text-sm flex items-center gap-1" title={item.imageLink}>
                                {item.imageLink}
                            </a>
                        ) : (
                            <span className="text-text-input text-sm">Nenhum link informado</span>
                        )}
                    </div>
                </div>
                {/* Observações */}
                <div className="flex flex-col w-full col-span-3">
                    <label htmlFor="email" className="ml-1 font-bold">Observações</label>
                    <input type="text" disabled value={item.note || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>

            {/* Amostras Enviadas */}
            {item.sendSamples && item.sendSamples.length > 0 && (
                <>
                    <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                        <h3 className="font-bold text-text-main uppercase">Amostras Enviadas</h3>
                    </div>
                    {item.sendSamples.map(ss => (
                        <div key={ss.id} className="gap-2 w-full text-sm grid grid-cols-4 mb-3 border border-border rounded p-2">
                            {/* Local de Armazenamento */}
                            <div className="flex flex-col w-full">
                                <label className="ml-1 font-bold">Local</label>
                                <input type="text" disabled value={ss.storageName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                            </div>
                            {/* Status */}
                            <div className="flex flex-col w-full">
                                <label className="ml-1 font-bold">Status</label>
                                <input type="text" disabled value={ss.statusName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                            </div>
                            {/* Data de Envio */}
                            <div className="flex flex-col w-full">
                                <label className="ml-1 font-bold">Data de Envio</label>
                                <input type="text" disabled value={ss.sendDateFormatted} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                            </div>
                            {/* Quantidade */}
                            <div className="flex flex-col w-full">
                                <label className="ml-1 font-bold">Quantidade</label>
                                <input type="text" disabled value={ss.quantity} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                            </div>
                            {/* Observações */}
                            {ss.note && (
                                <div className="flex flex-col w-full col-span-4">
                                    <label className="ml-1 font-bold">Observações</label>
                                    <input type="text" disabled value={ss.note} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
            {/* Registros Associados */}
            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Registros Associados</h3>
            </div>
            <div className="gap-2 w-full text-sm flex flex-wrap mb-2">
                <button
                    onClick={() => setShowNecropsyDrawer(true)}
                    className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                >
                    Necrópsia
                </button>
            </div>

        </>
    );
}
