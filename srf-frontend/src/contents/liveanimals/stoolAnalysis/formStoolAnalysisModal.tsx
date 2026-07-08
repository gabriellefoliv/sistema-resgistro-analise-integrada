import React, { useState, useEffect, useMemo } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllStoolAnalysisOutput,
    type GetFormOptionsStoolAnalysisOutput,
} from "srf-shared-types";
import {
    getStoolAnalysisFormOptions,
    createStoolAnalysis,
    updateStoolAnalysis
} from "../../../services/liveanimals/stoolAnalysisService";

interface StoolAnalysisFormModalProps {
    stoolAnalysis?: GetAllStoolAnalysisOutput;
    close: () => void;
    refresh: () => void;
}

export function StoolAnalysisFormModal({ stoolAnalysis, close, refresh }: StoolAnalysisFormModalProps) {
    const isEditing = !!stoolAnalysis;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsStoolAnalysisOutput | null>(null);

    // Campos de seleção da visita
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedAnimalId, setSelectedAnimalId] = useState<number | ''>('');
    const [selectedVeterinarianId, setSelectedVeterinarianId] = useState<number | ''>('');

    // Campos da análise
    const [weight, setWeight] = useState<number | ''>(stoolAnalysis?.weight ?? '');
    const [processingTechnologyId, setProcessingTechnologyId] = useState<number | ''>(stoolAnalysis?.processingTechnologyId ?? '');
    const [note, setNote] = useState<string>(stoolAnalysis?.note ?? '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getStoolAnalysisFormOptions();
                setOptions(opts);
                if (stoolAnalysis) {
                    const matchingVisit = opts.veterinarianVisits.find(v => v.id === stoolAnalysis.veterinarianVisitId);
                    if (matchingVisit) {
                        setSelectedDate(matchingVisit.date);
                        setSelectedAnimalId(matchingVisit.liveAnimal.id);
                        setSelectedVeterinarianId(matchingVisit.veterinarian.id);
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
        let visits = options.veterinarianVisits;
        if (selectedAnimalId) visits = visits.filter(v => v.liveAnimal.id === selectedAnimalId);
        if (selectedVeterinarianId) visits = visits.filter(v => v.veterinarian.id === selectedVeterinarianId);
        const dateSet = new Map<string, string>();
        visits.forEach(v => {
            if (!dateSet.has(v.date)) dateSet.set(v.date, new Date(v.date).toLocaleDateString('pt-BR'));
        });
        return Array.from(dateSet.entries()).map(([iso, formatted]) => ({ iso, formatted }));
    }, [options, selectedAnimalId, selectedVeterinarianId]);

    const filteredAnimals = useMemo(() => {
        if (!options) return [];
        let visits = options.veterinarianVisits;
        if (selectedDate) visits = visits.filter(v => v.date === selectedDate);
        if (selectedVeterinarianId) visits = visits.filter(v => v.veterinarian.id === selectedVeterinarianId);
        const map = new Map<number, string>();
        visits.forEach(v => { if (!map.has(v.liveAnimal.id)) map.set(v.liveAnimal.id, v.liveAnimal.code); });
        return Array.from(map.entries()).map(([id, code]) => ({ id, code }));
    }, [options, selectedDate, selectedVeterinarianId]);

    const filteredVeterinarians = useMemo(() => {
        if (!options) return [];
        let visits = options.veterinarianVisits;
        if (selectedDate) visits = visits.filter(v => v.date === selectedDate);
        if (selectedAnimalId) visits = visits.filter(v => v.liveAnimal.id === selectedAnimalId);
        const map = new Map<number, string>();
        visits.forEach(v => { if (!map.has(v.veterinarian.id)) map.set(v.veterinarian.id, v.veterinarian.name); });
        return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
    }, [options, selectedDate, selectedAnimalId]);

    const veterinarianVisitId = useMemo(() => {
        if (!options || !selectedDate || !selectedAnimalId || !selectedVeterinarianId) return null;
        const visit = options.veterinarianVisits.find(
            v => v.date === selectedDate && v.liveAnimal.id === selectedAnimalId && v.veterinarian.id === selectedVeterinarianId
        );
        return visit?.id ?? null;
    }, [options, selectedDate, selectedAnimalId, selectedVeterinarianId]);

    function handleDateChange(value: string) {
        setSelectedDate(value);
        if (value) {
            const mv = options?.veterinarianVisits.filter(v => v.date === value) || [];
            if (selectedAnimalId && !mv.some(v => v.liveAnimal.id === selectedAnimalId)) setSelectedAnimalId('');
            if (selectedVeterinarianId && !mv.some(v => v.veterinarian.id === selectedVeterinarianId)) setSelectedVeterinarianId('');
        }
    }

    function handleAnimalChange(value: number | '') {
        setSelectedAnimalId(value);
        if (value) {
            const mv = options?.veterinarianVisits.filter(v => v.liveAnimal.id === value) || [];
            if (selectedDate && !mv.some(v => v.date === selectedDate)) setSelectedDate('');
            if (selectedVeterinarianId && !mv.some(v => v.veterinarian.id === selectedVeterinarianId)) setSelectedVeterinarianId('');
        }
    }

    function handleVeterinarianChange(value: number | '') {
        setSelectedVeterinarianId(value);
        if (value) {
            const mv = options?.veterinarianVisits.filter(v => v.veterinarian.id === value) || [];
            if (selectedDate && !mv.some(v => v.date === selectedDate)) setSelectedDate('');
            if (selectedAnimalId && !mv.some(v => v.liveAnimal.id === selectedAnimalId)) setSelectedAnimalId('');
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!veterinarianVisitId) {
            setError('Selecione uma data, um animal e um veterinário para determinar a visita.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = {
                veterinarianVisitId: Number(veterinarianVisitId),
                weight: Number(weight),
                processingTechnologyId: Number(processingTechnologyId),
                note: note || null
            };
            if (isEditing && stoolAnalysis) {
                await updateStoolAnalysis(stoolAnalysis.id, data);
            } else {
                await createStoolAnalysis(data);
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
                        {isEditing ? 'Editando Análise de Fezes' : 'Nova Análise de Fezes'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Visita Associada */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Visita Associada</legend>
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
                                <label className="text-sm font-bold mb-1 text-left">Peso (Kg)</label>
                                <input type="number" step="0.01" min="0" value={weight} onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0.00" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Tecnologia de Processamento</label>
                                <select value={processingTechnologyId} onChange={(e) => setProcessingTechnologyId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.processingTechnologies.map(pt => (<option key={pt.id} value={pt.id}>{pt.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
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
