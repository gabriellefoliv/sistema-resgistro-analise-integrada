import React, { useState, useEffect } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllHelminthAnalysisOutput,
    type GetFormOptionsHelminthAnalysisOutput
} from "srf-shared-types";
import {
    getHelminthAnalysisFormOptions,
    createHelminthAnalysis,
    updateHelminthAnalysis
} from "../../../services/deadanimals/helminthAnalysisService";

interface FormHelminthAnalysisModalProps {
    helminthAnalysis?: GetAllHelminthAnalysisOutput;
    close: () => void;
    refresh: () => void;
}

export function FormHelminthAnalysisModal({ helminthAnalysis, close, refresh }: FormHelminthAnalysisModalProps) {
    const isEditing = !!helminthAnalysis;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsHelminthAnalysisOutput | null>(null);

    // Campos da análise
    const [necropsyId, setNecropsyId] = useState<number | ''>(helminthAnalysis?.necropsyId ?? '');
    const [specieId, setSpecieId] = useState<number | ''>(helminthAnalysis?.helminthSpecieId ?? '');
    const [location, setLocation] = useState<string>(helminthAnalysis?.location ?? '');
    const [maleQuantity, setMaleQuantity] = useState<number | ''>(helminthAnalysis?.maleQuantity ?? '');
    const [femaleQuantity, setFemaleQuantity] = useState<number | ''>(helminthAnalysis?.femaleQuantity ?? '');
    const [totalQuantity, setTotalQuantity] = useState<number | ''>(helminthAnalysis?.totalQuantity ?? '');
    const [note, setNote] = useState<string>(helminthAnalysis?.note ?? '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getHelminthAnalysisFormOptions();
                setOptions(opts);
            } catch (error) {
                console.error(error);
            }
        }
        loadOptions();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!necropsyId) {
            setError('Selecione uma necropsia.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = {
                necropsyId: Number(necropsyId),
                helminthSpecieId: Number(specieId),
                location: location,
                maleQuantity: Number(maleQuantity),
                femaleQuantity: Number(femaleQuantity),
                totalQuantity: Number(totalQuantity),
                note: note || undefined
            };
            if (isEditing && helminthAnalysis) {
                await updateHelminthAnalysis(helminthAnalysis.id, data);
            } else {
                await createHelminthAnalysis(data);
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
                        {isEditing ? 'Editando Análise de Helmintos' : 'Nova Análise de Helmintos'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Seleção da Necrópsia Associada */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Necrópsia Associada</legend>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Data e Animal</label>
                                <select
                                    value={necropsyId}
                                    onChange={(e) => setNecropsyId(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.necropsies.map(n => {
                                        const d = new Date(n.performedDate);
                                        const dateStr = isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                                        return (
                                            <option key={n.id} value={n.id}>{dateStr} - {n.deadAnimal.code}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </fieldset>

                        {/* Campos da Análise */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="flex flex-col col-span-4">
                                <label className="text-sm font-bold mb-1 text-left">Localização</label>
                                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="Digite a localização..." required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Espécie do Helminto</label>
                                <select value={specieId} onChange={(e) => setSpecieId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.helminthSpecies.map(hs => (<option key={hs.id} value={hs.id}>{hs.name}</option>))}
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
                                <label className="text-sm font-bold mb-1 text-left">Qtde Total</label>
                                <input type="number" step="1" min="0" value={totalQuantity} onChange={(e) => setTotalQuantity(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                            </div>
                            <div className="flex flex-col col-span-4">
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