import { useState } from "react";
import { type GetAllNecropsyExamResultOutput } from "srf-shared-types";
import { NecropsyExamResultFormModal } from "./formNecropsyExamResultModal";
import { DeleteNecropsyExamResultModal } from "./deleteNecropsyExamResultModal";
import { DeadAnimalSideDrawer } from "../deadAnimal/deadAnimalSideDrawer";
import { NecropsySideDrawer } from "../necropsy/necropsySideDrawer";

export function NecropsyExamResultExpansion({ item, close, refresh }: { item: GetAllNecropsyExamResultOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeadAnimalDrawer, setShowDeadAnimalDrawer] = useState(false);
    const [showNecropsyDrawer, setShowNecropsyDrawer] = useState(false);

    const isCPCR = item.type === 'cpcr' || item.type === 'CPCR';
    const result = item.result;

    const performedDateFormatted = result.performedDate
        ? new Date(result.performedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        : '';

    const necropsyDateFormatted = result.necropsyDate
        ? new Date(result.necropsyDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        : '';

    return (
        <>
            {showFormModal && (
                <NecropsyExamResultFormModal necropsyExamResult={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <DeleteNecropsyExamResultModal necropsyExamResult={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
            )}
            {showDeadAnimalDrawer && (
                <DeadAnimalSideDrawer
                    filters={{ deadAnimalId: result.deadAnimalId }}
                    onClose={() => setShowDeadAnimalDrawer(false)}
                />
            )}
            {showNecropsyDrawer && (
                <NecropsySideDrawer
                    filters={{ necropsyId: result.necropsyId }}
                    onClose={() => setShowNecropsyDrawer(false)}
                />
            )}
            {/* Cabeçalho */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">
                        Detalhes do Resultado {isCPCR ? 'CPCR' : 'QPCR'}
                    </h3>
                    <div className="flex gap-2 text-xs font-bold uppercase">
                        {result.canEdit && (<button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">Editar</button>)}
                        {result.canEdit && (<button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">Excluir</button>)}
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="flex gap-2 w-full text-sm">
                    <div className="flex flex-col w-2/12">
                        <label className="ml-1 font-bold">Data de Realização</label>
                        <input type="text" disabled value={performedDateFormatted} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-2/12">
                        <label className="ml-1 font-bold">Data da Necropsia</label>
                        <input type="text" disabled value={necropsyDateFormatted} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-2/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={result.deadAnimalCode} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-2/12">
                        <label className="ml-1 font-bold">Tipo do Resultado</label>
                        <input type="text" disabled value={isCPCR ? 'CPCR' : 'QPCR'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Tipo de Amostra</label>
                        <input type="text" disabled value={result.sampleTypeName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* Corpo Geral */}
            <div className="gap-2 w-full text-sm grid grid-cols-2 mb-2">
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Gene Alvo</label>
                    <input type="text" disabled value={result.targetGeneName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Agente Suspeito</label>
                    <input type="text" disabled value={result.suspiciousAgentName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
            </div>

            {/* Campos Específicos CPCR */}
            {isCPCR && (
                <div className="gap-2 w-full text-sm grid grid-cols-3 mb-2">
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Tipo de Extração</label>
                        <input type="text" disabled value={(result as any).extractionTypeName || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Primer</label>
                        <input type="text" disabled value={(result as any).primer || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">PB</label>
                        <input type="text" disabled value={String((result as any).pb ?? '')} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Método CPCR</label>
                        <input type="text" disabled value={(result as any).cpcrMethodName || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Status CPCR</label>
                        <input type="text" disabled value={(result as any).cpcrStatusName || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Controle</label>
                        <input type="text" disabled value={result.control} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            )}

            {/* Campos Específicos QPCR */}
            {!isCPCR && (
                <div className="gap-2 w-full text-sm grid grid-cols-3 mb-2">
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">CT Médio</label>
                        <input type="text" disabled value={String((result as any).meanCt ?? '')} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Cópias Estimadas</label>
                        <input type="text" disabled value={String((result as any).estimatedCopies ?? '')} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Status QPCR</label>
                        <input type="text" disabled value={(result as any).qpcrStatusName || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ml-1 font-bold">Controle</label>
                        <input type="text" disabled value={result.control} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            )}

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
