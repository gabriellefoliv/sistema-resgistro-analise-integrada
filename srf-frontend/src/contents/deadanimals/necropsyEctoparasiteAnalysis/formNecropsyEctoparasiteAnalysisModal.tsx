import React, { useState, useEffect, useMemo } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllNecropsyEctoparasiteAnalysisOutput,
    type GetFormOptionsNecropsyEctoparasiteAnalysisOutput,
} from "srf-shared-types";
import {
    getNecropsyEctoparasiteAnalysisFormOptions,
    createNecropsyEctoparasiteAnalysis,
    updateNecropsyEctoparasiteAnalysis
} from "../../../services/deadanimals/necropsyEctoparasiteAnalysisService";

interface NecropsyEctoparasiteAnalysisFormModalProps {
    necropsyEctoparasiteAnalysis?: GetAllNecropsyEctoparasiteAnalysisOutput;
    close: () => void;
    refresh: () => void;
}

export function NecropsyEctoparasiteAnalysisFormModal({ necropsyEctoparasiteAnalysis, close, refresh }: NecropsyEctoparasiteAnalysisFormModalProps) {
    const isEditing = !!necropsyEctoparasiteAnalysis;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsNecropsyEctoparasiteAnalysisOutput | null>(null);


    // Campos do ectoparasito
    const [selectedNecropsyId, setSelectedNecropsyId] = useState<number | ''>('');
    const [ectoparasiteGenusId, setEctoparasiteGenusId] = useState<number | ''>(necropsyEctoparasiteAnalysis?.ectoparasiteGenusId ?? '');
    const [ectoparasiteSpecieId, setEctoparasiteSpecieId] = useState<number | ''>(necropsyEctoparasiteAnalysis?.ectoparasiteSpecieId ?? '');
    const [ectoparasiteSubSpecieId, setEctoparasiteSubSpecieId] = useState<number | ''>(necropsyEctoparasiteAnalysis?.ectoparasiteSubSpecieId ?? '');
    const [maleQuantity, setMaleQuantity] = useState<number | ''>(necropsyEctoparasiteAnalysis?.maleQuantity ?? '');
    const [femaleQuantity, setFemaleQuantity] = useState<number | ''>(necropsyEctoparasiteAnalysis?.femaleQuantity ?? '');
    const [nymphQuantity, setNymphQuantity] = useState<number | ''>(necropsyEctoparasiteAnalysis?.nymphQuantity ?? '');
    const [larvaeQuantity, setLarvaeQuantity] = useState<number | ''>(necropsyEctoparasiteAnalysis?.larvaeQuantity ?? '');
    const [eggQuantity, setEggQuantity] = useState<number | ''>(necropsyEctoparasiteAnalysis?.eggQuantity ?? '');
    const [note, setNote] = useState<string>(necropsyEctoparasiteAnalysis?.note ?? '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getNecropsyEctoparasiteAnalysisFormOptions();
                setOptions(opts);
            } catch (error) {
                console.error(error);
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
            const data = {
                necropsyId: Number(selectedNecropsyId),
                ectoparasiteGenusId: Number(ectoparasiteGenusId),
                ectoparasiteSpecieId: Number(ectoparasiteSpecieId),
                ectoparasiteSubSpecieId: Number(ectoparasiteSubSpecieId),
                maleQuantity: Number(maleQuantity),
                femaleQuantity: Number(femaleQuantity),
                nymphQuantity: Number(nymphQuantity),
                larvaeQuantity: Number(larvaeQuantity),
                eggQuantity: Number(eggQuantity),
                note: note || undefined
            };
            if (isEditing && necropsyEctoparasiteAnalysis) {
                await updateNecropsyEctoparasiteAnalysis(necropsyEctoparasiteAnalysis.id, data);
            } else {
                await createNecropsyEctoparasiteAnalysis(data);
            }
            refresh();
            close();
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao salvar.');
        } finally {
            setLoading(false);
        }
    }

    if (!options) {
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
                        {isEditing ? 'Editando Ectoparasitos' : 'Nova Análise de Ectoparasitos'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
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
                                    {options.necropsies.map(n => {
                                        const d = new Date(n.date);
                                        const dateStr = isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                                        return (
                                            <option key={n.id} value={n.id}>{dateStr} - {n.deadAnimal.code}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </fieldset>

                        {/* Campos do Ectoparasito */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Gênero</label>
                                <select value={ectoparasiteGenusId} onChange={(e) => setEctoparasiteGenusId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.genuses.map(g => (<option key={g.id} value={g.id}>{g.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Espécie</label>
                                <select value={ectoparasiteSpecieId} onChange={(e) => setEctoparasiteSpecieId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.species.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Subespécie</label>
                                <select value={ectoparasiteSubSpecieId} onChange={(e) => setEctoparasiteSubSpecieId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.species.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Qtde de Machos</label>
                                <input type="number" step="1" min="0" value={maleQuantity} onChange={(e) => setMaleQuantity(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Qtde de Fêmeas</label>
                                <input type="number" step="1" min="0" value={femaleQuantity} onChange={(e) => setFemaleQuantity(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Qtde de Ninfas</label>
                                <input type="number" step="1" min="0" value={nymphQuantity} onChange={(e) => setNymphQuantity(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Qtde de Larvas</label>
                                <input type="number" step="1" min="0" value={larvaeQuantity} onChange={(e) => setLarvaeQuantity(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Qtde de Ovos</label>
                                <input type="number" step="1" min="0" value={eggQuantity} onChange={(e) => setEggQuantity(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                            </div>
                            <div className="flex flex-col col-span-3">
                                <label className="text-sm font-bold mb-1 text-left">Observações (Opcional)</label>
                                <input type="text" value={note} onChange={(e) => setNote(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="Digite observações..." />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-center items-center gap-5 mt-2">
                            <button type="submit" className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer" disabled={loading}>
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button type="button" onClick={() => close()} className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalPortal>
    )
}
