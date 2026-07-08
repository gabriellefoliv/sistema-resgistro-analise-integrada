import React, { useState, useEffect, useMemo } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllEggCystAnalysisOutput,
    type GetFormOptionsEggCystAnalysisOutput,
} from "srf-shared-types";
import {
    getEggCystAnalysisFormOptions,
    createEggCystAnalysis,
    updateEggCystAnalysis
} from "../../../services/liveanimals/eggCystAnalysisService";

interface EggCystAnalysisFormModalProps {
    eggCystAnalysis?: GetAllEggCystAnalysisOutput;
    close: () => void;
    refresh: () => void;
}

export function EggCystAnalysisFormModal({ eggCystAnalysis, close, refresh }: EggCystAnalysisFormModalProps) {
    const isEditing = !!eggCystAnalysis;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsEggCystAnalysisOutput | null>(null);

    // Campos de seleção da análise de fezes (via visita)
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedAnimalId, setSelectedAnimalId] = useState<number | ''>('');
    const [selectedVeterinarianId, setSelectedVeterinarianId] = useState<number | ''>('');

    // Campos da análise
    const [eggCystSpecieId, setEggCystSpecieId] = useState<number | ''>(eggCystAnalysis?.eggCystSpecieId ?? '');
    const [quantity, setQuantity] = useState<number | ''>(eggCystAnalysis?.quantity ?? '');
    const [note, setNote] = useState<string>(eggCystAnalysis?.note ?? '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getEggCystAnalysisFormOptions();
                setOptions(opts);
                if (eggCystAnalysis) {
                    const matchingStool = opts.stoolAnalyses.find(s => s.id === eggCystAnalysis.stoolAnalysisId);
                    if (matchingStool) {
                        setSelectedDate(matchingStool.veterinarianVisit.date);
                        setSelectedAnimalId(matchingStool.veterinarianVisit.liveAnimal.id);
                        setSelectedVeterinarianId(matchingStool.veterinarianVisit.veterinarian.id);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadOptions();
    }, []);

    const filteredDates = useMemo(() => {
        if (!options) return [];
        let stools = options.stoolAnalyses;
        if (selectedAnimalId) stools = stools.filter(s => s.veterinarianVisit.liveAnimal.id === selectedAnimalId);
        if (selectedVeterinarianId) stools = stools.filter(s => s.veterinarianVisit.veterinarian.id === selectedVeterinarianId);
        const dateSet = new Map<string, string>();
        stools.forEach(s => {
            if (!dateSet.has(s.veterinarianVisit.date)) dateSet.set(s.veterinarianVisit.date, new Date(s.veterinarianVisit.date).toLocaleDateString('pt-BR'));
        });
        return Array.from(dateSet.entries()).map(([iso, formatted]) => ({ iso, formatted }));
    }, [options, selectedAnimalId, selectedVeterinarianId]);

    const filteredAnimals = useMemo(() => {
        if (!options) return [];
        let stools = options.stoolAnalyses;
        if (selectedDate) stools = stools.filter(s => s.veterinarianVisit.date === selectedDate);
        if (selectedVeterinarianId) stools = stools.filter(s => s.veterinarianVisit.veterinarian.id === selectedVeterinarianId);
        const map = new Map<number, string>();
        stools.forEach(s => { if (!map.has(s.veterinarianVisit.liveAnimal.id)) map.set(s.veterinarianVisit.liveAnimal.id, s.veterinarianVisit.liveAnimal.code); });
        return Array.from(map.entries()).map(([id, code]) => ({ id, code }));
    }, [options, selectedDate, selectedVeterinarianId]);

    const filteredVeterinarians = useMemo(() => {
        if (!options) return [];
        let stools = options.stoolAnalyses;
        if (selectedDate) stools = stools.filter(s => s.veterinarianVisit.date === selectedDate);
        if (selectedAnimalId) stools = stools.filter(s => s.veterinarianVisit.liveAnimal.id === selectedAnimalId);
        const map = new Map<number, string>();
        stools.forEach(s => { if (!map.has(s.veterinarianVisit.veterinarian.id)) map.set(s.veterinarianVisit.veterinarian.id, s.veterinarianVisit.veterinarian.name); });
        return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
    }, [options, selectedDate, selectedAnimalId]);

    const stoolAnalysisId = useMemo(() => {
        if (!options || !selectedDate || !selectedAnimalId || !selectedVeterinarianId) return null;
        const stool = options.stoolAnalyses.find(
            s => s.veterinarianVisit.date === selectedDate && s.veterinarianVisit.liveAnimal.id === selectedAnimalId && s.veterinarianVisit.veterinarian.id === selectedVeterinarianId
        );
        return stool?.id ?? null;
    }, [options, selectedDate, selectedAnimalId, selectedVeterinarianId]);

    function handleDateChange(value: string) {
        setSelectedDate(value);
        if (value) {
            const mv = options?.stoolAnalyses.filter(s => s.veterinarianVisit.date === value) || [];
            if (selectedAnimalId && !mv.some(s => s.veterinarianVisit.liveAnimal.id === selectedAnimalId)) setSelectedAnimalId('');
            if (selectedVeterinarianId && !mv.some(s => s.veterinarianVisit.veterinarian.id === selectedVeterinarianId)) setSelectedVeterinarianId('');
        }
    }

    function handleAnimalChange(value: number | '') {
        setSelectedAnimalId(value);
        if (value) {
            const mv = options?.stoolAnalyses.filter(s => s.veterinarianVisit.liveAnimal.id === value) || [];
            if (selectedDate && !mv.some(s => s.veterinarianVisit.date === selectedDate)) setSelectedDate('');
            if (selectedVeterinarianId && !mv.some(s => s.veterinarianVisit.veterinarian.id === selectedVeterinarianId)) setSelectedVeterinarianId('');
        }
    }

    function handleVeterinarianChange(value: number | '') {
        setSelectedVeterinarianId(value);
        if (value) {
            const mv = options?.stoolAnalyses.filter(s => s.veterinarianVisit.veterinarian.id === value) || [];
            if (selectedDate && !mv.some(s => s.veterinarianVisit.date === selectedDate)) setSelectedDate('');
            if (selectedAnimalId && !mv.some(s => s.veterinarianVisit.liveAnimal.id === selectedAnimalId)) setSelectedAnimalId('');
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!stoolAnalysisId) {
            setError('Selecione uma data, um animal e um veterinário para determinar a análise de fezes.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = {
                stoolAnalysisId: Number(stoolAnalysisId),
                eggCystSpecieId: Number(eggCystSpecieId),
                quantity: Number(quantity),
                note: note || null
            };
            if (isEditing && eggCystAnalysis) {
                await updateEggCystAnalysis(eggCystAnalysis.id, data);
            } else {
                await createEggCystAnalysis(data);
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
                        {isEditing ? 'Editando Análise de Ovos/Cistos' : 'Nova Análise de Ovos/Cistos'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Análise de Fezes Associada */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Análise de Fezes Associada</legend>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Data da Visita</label>
                                    <select value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} className="border border-border rounded p-2 bg-white" required>
                                        <option value="">Selecione...</option>
                                        {filteredDates.map(d => (<option key={d.iso} value={d.iso}>{d.formatted}</option>))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Código do Animal</label>
                                    <select value={selectedAnimalId} onChange={(e) => handleAnimalChange(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white" required>
                                        <option value="">Selecione...</option>
                                        {filteredAnimals.map(a => (<option key={a.id} value={a.id}>{a.code}</option>))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Veterinário</label>
                                    <select value={selectedVeterinarianId} onChange={(e) => handleVeterinarianChange(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white" required>
                                        <option value="">Selecione...</option>
                                        {filteredVeterinarians.map(v => (<option key={v.id} value={v.id}>{v.name}</option>))}
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        {/* Campos da análise */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Espécie</label>
                                <select value={eggCystSpecieId} onChange={(e) => setEggCystSpecieId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.eggCystSpecies.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Qtde de ovos/cistos</label>
                                <input type="number" step="1" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                            </div>
                            <div className="flex flex-col col-span-3">
                                <label className="text-sm font-bold mb-1 text-left">Observações (Opcional)</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="border border-border rounded p-2 bg-white resize-none"
                                    rows={3}
                                    placeholder="Digite as observações..."
                                />
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
