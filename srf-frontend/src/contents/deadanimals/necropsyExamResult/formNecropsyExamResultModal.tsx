import React, { useState, useEffect } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllNecropsyExamResultOutput,
    type GetFormOptionsCPCRResultOutput,
    type GetFormOptionsQPCRResultOutput
} from "srf-shared-types";
import {
    getCPCRFormOptions,
    getQPCRFormOptions,
    createCPCRResult,
    createQPCRResult,
    updateCPCRResult,
    updateQPCRResult
} from "../../../services/deadanimals/necropsyExamResultService";

interface NecropsyExamResultFormModalProps {
    necropsyExamResult?: GetAllNecropsyExamResultOutput;
    close: () => void;
    refresh: () => void;
}

export function NecropsyExamResultFormModal({ necropsyExamResult, close, refresh }: NecropsyExamResultFormModalProps) {
    const isEditing = !!necropsyExamResult;

    const [type, setType] = useState<string | null>(isEditing ? necropsyExamResult?.type?.toLowerCase() ?? null : null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cpcrOptions, setCpcrOptions] = useState<GetFormOptionsCPCRResultOutput | null>(null);
    const [qpcrOptions, setQpcrOptions] = useState<GetFormOptionsQPCRResultOutput | null>(null);

    // Campos do form
    const [selectedNecropsyId, setSelectedNecropsyId] = useState<number | ''>(necropsyExamResult?.result.necropsyId ?? '');
    const [sampleTypeId, setSampleTypeId] = useState<number | ''>(necropsyExamResult?.result.sampleTypeId ?? '');
    const [performedDate, setPerformedDate] = useState<string>(necropsyExamResult?.result.performedDate ? new Date(necropsyExamResult.result.performedDate).toISOString().slice(0, 10) : '');
    const [targetGeneId, setTargetGeneId] = useState<number | ''>(necropsyExamResult?.result.targetGeneId ?? '');
    const [suspiciousAgentId, setSuspiciousAgentId] = useState<number | ''>(necropsyExamResult?.result.suspiciousAgentId ?? '');
    const [control, setControl] = useState<string>(necropsyExamResult?.result.control ?? '');

    // Campos apenas CPCR
    const [extractionTypeId, setExtractionTypeId] = useState<number | ''>();
    const [primer, setPrimer] = useState<string>();
    const [pb, setPB] = useState<number | ''>();
    const [cpcrMethodId, setCPCRMethodId] = useState<number | ''>();
    const [cpcrStatusId, setCPCRStatusId] = useState<number | ''>();

    // Campos apenas QPCR
    const [meanCt, setMeanCt] = useState<number>();
    const [estimatedCopies, setEstimatedCopies] = useState<number>();
    const [qpcrStatusId, setQPCRStatusId] = useState<number | ''>();

    useEffect(() => {
        async function loadOptions() {

            try {
                const cpcrOptions = await getCPCRFormOptions();
                const qpcrOptions = await getQPCRFormOptions();
                setCpcrOptions(cpcrOptions);
                setQpcrOptions(qpcrOptions);

                if (isEditing) {
                    const normalizedType = necropsyExamResult.type?.toLowerCase();
                    setType(normalizedType ?? null);
                    if (normalizedType === 'cpcr') {
                        setExtractionTypeId((necropsyExamResult.result as { extractionTypeId?: number }).extractionTypeId);
                        setPrimer((necropsyExamResult.result as { primer?: string }).primer);
                        setPB((necropsyExamResult.result as { pb?: number }).pb);
                        setCPCRMethodId((necropsyExamResult.result as { cpcrMethodId?: number }).cpcrMethodId);
                        setCPCRStatusId((necropsyExamResult.result as { cpcrStatusId?: number }).cpcrStatusId);
                    } else if (normalizedType === 'qpcr') {
                        setMeanCt((necropsyExamResult.result as { meanCt?: number }).meanCt);
                        setEstimatedCopies((necropsyExamResult.result as { estimatedCopies?: number }).estimatedCopies);
                        setQPCRStatusId((necropsyExamResult.result as { qpcrStatusId?: number }).qpcrStatusId);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        loadOptions();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedNecropsyId) {
            setError('Selecione uma necropsia.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const normalizedType = type?.toLowerCase();
            if (normalizedType === 'cpcr') {
                const data = {
                    necropsyId: Number(selectedNecropsyId),
                    sampleTypeId: Number(sampleTypeId),
                    performedDate: performedDate,
                    extractionTypeId: Number(extractionTypeId),
                    targetGeneId: Number(targetGeneId),
                    primer: primer!,
                    pb: Number(pb),
                    suspiciousAgentId: Number(suspiciousAgentId),
                    cpcrMethodId: Number(cpcrMethodId),
                    cpcrStatusId: Number(cpcrStatusId),
                    control: control
                };
                if (isEditing) {
                    await updateCPCRResult(necropsyExamResult.result.id, data);
                } else {
                    await createCPCRResult(data);
                }
            } else if (normalizedType === 'qpcr') {
                const data = {
                    necropsyId: Number(selectedNecropsyId),
                    sampleTypeId: Number(sampleTypeId),
                    performedDate: performedDate,
                    targetGeneId: Number(targetGeneId),
                    suspiciousAgentId: Number(suspiciousAgentId),
                    meanCt: Number(meanCt),
                    estimatedCopies: Number(estimatedCopies),
                    qpcrStatusId: Number(qpcrStatusId),
                    control: control
                };
                if (isEditing) {
                    await updateQPCRResult(necropsyExamResult.result.id, data);
                } else {
                    await createQPCRResult(data);
                }
            }
            refresh();
            close();
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao salvar.');
        } finally {
            setLoading(false);
        }
    }

    if (!cpcrOptions || !qpcrOptions) {
        return (
            <ModalPortal>
                <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100">
                    <div className="bg-white rounded-2xl shadow-xl p-10">Carregando opções...</div>
                </div>
            </ModalPortal>
        );
    }

    return (
        <ModalPortal>
            <div onMouseDown={close} className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 overflow-y-auto p-4">
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col overflow-y-auto bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 gap-5 w-260 max-h-[90vh]">
                    <button onClick={() => close()} className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3" title="Fechar">✕</button>
                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        {isEditing ? `Editando Resultado ${type ? type.toUpperCase() : 'de Exame'}` : `Novo Resultado ${type ? type.toUpperCase() : 'de Exame'}`}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Tipo de Exame */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Tipo de Exame</legend>
                            <div className="flex flex-col">
                                <select value={type ?? ''} onChange={(e) => setType(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    <option value="cpcr">CPCR</option>
                                    <option value="qpcr">QPCR</option>
                                </select>
                            </div>
                        </fieldset>

                        {/* Formulário CPCR */}
                        {type === 'cpcr' && (
                            <>
                                {/* Seleção da Necrópsia Associada */}
                                <fieldset className="border border-border rounded p-4">
                                    <legend className="text-sm font-bold text-standard-blue px-2">Necrópsia Associada</legend>
                                    <div className="flex flex-col">
                                        <label className="text-sm font-bold mb-1 text-left">Data e Animal</label>
                                        <select
                                            value={selectedNecropsyId}
                                            onChange={(e) => setSelectedNecropsyId(e.target.value ? Number(e.target.value) : '')}
                                            className="border border-border rounded p-2 bg-white"
                                            required
                                        >
                                            <option value="">Selecione...</option>
                                            {cpcrOptions.necropsies.map(n => {
                                                const d = new Date(n.performedDate);
                                                const dateStr = isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                                                return (
                                                    <option key={n.id} value={n.id}>{dateStr} - {n.deadAnimal.code}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </fieldset>

                                {/* Dados do Exame CPCR */}
                                <fieldset className="border border-border rounded p-4">
                                    <legend className="text-sm font-bold text-standard-blue px-2">Dados</legend>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Data de Realização</label>
                                            <input type="date" value={performedDate} onChange={(e) => setPerformedDate(e.target.value)}
                                                className="border border-border rounded p-2 bg-white h-10" required />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Tipo de Amostra</label>
                                            <select value={sampleTypeId} onChange={(e) => setSampleTypeId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {cpcrOptions.sampleTypes.map(st => (<option key={st.id} value={st.id}>{st.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Tipo de Extração</label>
                                            <select value={extractionTypeId} onChange={(e) => setExtractionTypeId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {cpcrOptions.extractionTypes.map(et => (<option key={et.id} value={et.id}>{et.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Gene Alvo</label>
                                            <select value={targetGeneId} onChange={(e) => setTargetGeneId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {cpcrOptions.targetGenes.map(tg => (<option key={tg.id} value={tg.id}>{tg.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Primer</label>
                                            <input type="text" value={primer || ''} onChange={(e) => setPrimer(e.target.value)}
                                                className="border border-border rounded p-2 bg-white h-10" placeholder="Digite o primer..." required />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">PB</label>
                                            <input type="number" step="1" min={0} value={pb ?? ''} onChange={(e) => setPB(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Agente Suspeito</label>
                                            <select value={suspiciousAgentId} onChange={(e) => setSuspiciousAgentId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {cpcrOptions.suspiciousAgents.map(sa => (<option key={sa.id} value={sa.id}>{sa.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Método CPCR</label>
                                            <select value={cpcrMethodId} onChange={(e) => setCPCRMethodId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {cpcrOptions.cpcrMethods.map(cm => (<option key={cm.id} value={cm.id}>{cm.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Status CPCR</label>
                                            <select value={cpcrStatusId} onChange={(e) => setCPCRStatusId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {cpcrOptions.cpcrStatuses.map(cs => (<option key={cs.id} value={cs.id}>{cs.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col col-span-3">
                                            <label className="text-sm font-bold mb-1 text-left">Controle</label>
                                            <input type="text" value={control} onChange={(e) => setControl(e.target.value)}
                                                className="border border-border rounded p-2 bg-white h-10" placeholder="Digite o controle..." required />
                                        </div>
                                    </div>
                                </fieldset>
                            </>
                        )}

                        {/* Formulário QPCR */}
                        {type === 'qpcr' && (
                            <>
                                {/* Seleção da Necrópsia Associada */}
                                <fieldset className="border border-border rounded p-4">
                                    <legend className="text-sm font-bold text-standard-blue px-2">Necrópsia Associada</legend>
                                    <div className="flex flex-col">
                                        <label className="text-sm font-bold mb-1 text-left">Data e Animal</label>
                                        <select
                                            value={selectedNecropsyId}
                                            onChange={(e) => setSelectedNecropsyId(e.target.value ? Number(e.target.value) : '')}
                                            className="border border-border rounded p-2 bg-white"
                                            required
                                        >
                                            <option value="">Selecione...</option>
                                            {qpcrOptions.necropsies.map(n => {
                                                const d = new Date(n.performedDate);
                                                const dateStr = isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                                                return (
                                                    <option key={n.id} value={n.id}>{dateStr} - {n.deadAnimal.code}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </fieldset>

                                {/* Dados do Exame QPCR */}
                                <fieldset className="border border-border rounded p-4">
                                    <legend className="text-sm font-bold text-standard-blue px-2">Dados</legend>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Data de Realização</label>
                                            <input type="date" value={performedDate} onChange={(e) => setPerformedDate(e.target.value)}
                                                className="border border-border rounded p-2 bg-white h-10" required />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Tipo de Amostra</label>
                                            <select value={sampleTypeId} onChange={(e) => setSampleTypeId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {qpcrOptions.sampleTypes.map(st => (<option key={st.id} value={st.id}>{st.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Gene Alvo</label>
                                            <select value={targetGeneId} onChange={(e) => setTargetGeneId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {qpcrOptions.targetGenes.map(tg => (<option key={tg.id} value={tg.id}>{tg.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Agente Suspeito</label>
                                            <select value={suspiciousAgentId} onChange={(e) => setSuspiciousAgentId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {qpcrOptions.suspiciousAgents.map(sa => (<option key={sa.id} value={sa.id}>{sa.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">CT Médio</label>
                                            <input type="number" step="any" value={meanCt ?? ''} onChange={(e) => setMeanCt(e.target.value ? Number(e.target.value) : undefined)}
                                                className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Cópias Estimadas</label>
                                            <input type="number" step="any" value={estimatedCopies ?? ''} onChange={(e) => setEstimatedCopies(e.target.value ? Number(e.target.value) : undefined)}
                                                className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold mb-1 text-left">Status QPCR</label>
                                            <select value={qpcrStatusId} onChange={(e) => setQPCRStatusId(e.target.value ? Number(e.target.value) : '')}
                                                className="border border-border rounded p-2 bg-white h-10" required>
                                                <option value="">Selecione...</option>
                                                {qpcrOptions.qpcrStatuses.map(qs => (<option key={qs.id} value={qs.id}>{qs.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col col-span-3">
                                            <label className="text-sm font-bold mb-1 text-left">Controle</label>
                                            <input type="text" value={control} onChange={(e) => setControl(e.target.value)}
                                                className="border border-border rounded p-2 bg-white h-10" placeholder="Digite o controle..." required />
                                        </div>
                                    </div>
                                </fieldset>
                            </>
                        )}

                        {/* Botões de Ação */}
                        {type && (
                            <>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <div className="flex justify-center items-center gap-5 mt-2">
                                    <button type="submit" className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer" disabled={loading}>
                                        {loading ? 'Salvando...' : 'Salvar'}
                                    </button>
                                    <button type="button" onClick={() => close()} className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer">
                                        Cancelar
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </ModalPortal>
    );
}



