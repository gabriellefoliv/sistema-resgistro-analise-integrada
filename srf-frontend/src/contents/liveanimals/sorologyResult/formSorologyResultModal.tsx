import React, { useState, useEffect, useMemo } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllSorologyResultOutput,
    type GetFormOptionsSorologyResultOutput,
} from "srf-shared-types";
import {
    getSorologyResultFormOptions,
    createSorologyResult,
    updateSorologyResult
} from "../../../services/liveanimals/sorologyResultService";

interface SorologyResultFormModalProps {
    sorologyResult?: GetAllSorologyResultOutput;
    close: () => void;
    refresh: () => void;
}

export function SorologyResultFormModal({ sorologyResult, close, refresh }: SorologyResultFormModalProps) {
    const isEditing = !!sorologyResult;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsSorologyResultOutput | null>(null);

    // Campos de seleção da visita
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedAnimalId, setSelectedAnimalId] = useState<number | ''>('');
    const [selectedVeterinarianId, setSelectedVeterinarianId] = useState<number | ''>('');

    // Campos da sorologia
    const [sorologyTestId, setSorologyTestId] = useState<number | ''>(sorologyResult?.sorologyTestId ?? '');
    const [sorologyAgentId, setSorologyAgentId] = useState<number | ''>(sorologyResult?.sorologyAgentId ?? '');
    const [cuttingPointSymbol, setCuttingPointSymbol] = useState<string>(sorologyResult?.cuttingPointSymbol ?? '');
    const [cuttingPointValue, setCuttingPointValue] = useState<string>(sorologyResult?.cuttingPointValue ?? '');
    const [resultTypeId, setResultTypeId] = useState<number | ''>(sorologyResult?.resultTypeId ?? '');
    const [result, setResult] = useState<number | ''>(sorologyResult?.result ?? '');
    const [interpretationId, setInterpretationId] = useState<number | ''>(sorologyResult?.interpretationId ?? '');

    // Para o modo "≥" com dois campos int separados
    const [ratioLeft, setRatioLeft] = useState<string>('');
    const [ratioRight, setRatioRight] = useState<string>('');

    // Inicializa ratioLeft/ratioRight ao editar com símbolo "≥"
    useEffect(() => {
        if (sorologyResult?.cuttingPointSymbol === '≥' && sorologyResult?.cuttingPointValue) {
            const parts = sorologyResult.cuttingPointValue.split(':');
            if (parts.length === 2) {
                setRatioLeft(parts[0]);
                setRatioRight(parts[1]);
            }
        }
    }, []);

    // Limpa o valor quando troca de símbolo
    function handleSymbolChange(newSymbol: string) {
        setCuttingPointSymbol(newSymbol);
        setCuttingPointValue('');
        setRatioLeft('');
        setRatioRight('');
    }

    // Atualiza cuttingPointValue quando ratioLeft ou ratioRight mudam
    useEffect(() => {
        if (cuttingPointSymbol === '≥' && ratioLeft && ratioRight) {
            setCuttingPointValue(`${ratioLeft}:${ratioRight}`);
        }
    }, [ratioLeft, ratioRight, cuttingPointSymbol]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getSorologyResultFormOptions();
                setOptions(opts);
                if (sorologyResult) {
                    const matchingVisit = opts.veterinarianVisits.find(v => v.id === sorologyResult.veterinarianVisitId);
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
        visits.forEach(v => { if (!map.has(v.liveAnimal.id)) map.set(v.liveAnimal.id, v.liveAnimal.name); });
        return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
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
        if (!cuttingPointSymbol) {
            setError('Selecione o símbolo do ponto de corte.');
            return;
        }
        if (!cuttingPointValue) {
            setError('Preencha o valor do ponto de corte.');
            return;
        }
        if (cuttingPointSymbol === '≥') {
            const parts = cuttingPointValue.split(':');
            if (parts.length !== 2 || !Number.isInteger(Number(parts[0])) || !Number.isInteger(Number(parts[1]))) {
                setError('Para o símbolo ≥, o valor deve estar no formato inteiro:inteiro (ex: 64:128).');
                return;
            }
        }
        if (cuttingPointSymbol === 'PC =' && isNaN(Number(cuttingPointValue))) {
            setError('Para o símbolo PC =, o valor deve ser um número.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = {
                veterinarianVisitId: Number(veterinarianVisitId),
                sorologyTestId: Number(sorologyTestId),
                sorologyAgentId: Number(sorologyAgentId),
                cuttingPointSymbol: cuttingPointSymbol,
                cuttingPointValue: cuttingPointValue,
                resultTypeId: Number(resultTypeId),
                result: Number(result),
                interpretationId: Number(interpretationId)
            };
            if (isEditing && sorologyResult) {
                await updateSorologyResult(sorologyResult.id, data);
            } else {
                await createSorologyResult(data);
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
            <div onClick={close} className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 overflow-y-auto p-4">
                <div onClick={(e) => e.stopPropagation()} className="modal relative flex flex-col overflow-y-auto bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 gap-5 w-260 max-h-[90vh]">
                    <button onClick={() => close()} className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3" title="Fechar">✕</button>
                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        {isEditing ? 'Editando Sorologia' : 'Nova Sorologia'}
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
                                    <label className="text-sm font-bold mb-1 text-left">Animal</label>
                                    <select value={selectedAnimalId} onChange={(e) => handleAnimalChange(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white" required>
                                        <option value="">Selecione...</option>
                                        {filteredAnimals.map(a => (<option key={a.id} value={a.id}>{a.name}</option>))}
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

                        {/* Campos da Sorologia */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Teste</label>
                                <select value={sorologyTestId} onChange={(e) => setSorologyTestId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.sorologyTests.map(t => (<option key={t.id} value={t.id}>{t.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Agente</label>
                                <select value={sorologyAgentId} onChange={(e) => setSorologyAgentId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.sorologyAgents.map(a => (<option key={a.id} value={a.id}>{a.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Interpretação</label>
                                <select value={interpretationId} onChange={(e) => setInterpretationId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.interpretations.map(i => (<option key={i.id} value={i.id}>{i.name}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-bold mb-1 text-left">Ponto de Corte</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col">
                                        <select value={cuttingPointSymbol} onChange={(e) => handleSymbolChange(e.target.value)} className="border border-border rounded p-2 bg-white h-10" required>
                                            <option value="">Selecione...</option>
                                            <option value="PC =">PC =</option>
                                            <option value="≥">≥</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col col-span-2">
                                        {cuttingPointSymbol === '≥' ? (
                                            <div className="flex items-center gap-1 h-10">
                                                <input
                                                    type="number"
                                                    step="1"
                                                    value={ratioLeft}
                                                    onChange={(e) => setRatioLeft(e.target.value)}
                                                    className="border border-border rounded p-2 bg-white h-10 w-full"
                                                    placeholder="Ex: 1"
                                                    required
                                                />
                                                <span className="text-lg font-bold text-text-main">:</span>
                                                <input
                                                    type="number"
                                                    step="1"
                                                    value={ratioRight}
                                                    onChange={(e) => setRatioRight(e.target.value)}
                                                    className="border border-border rounded p-2 bg-white h-10 w-full"
                                                    placeholder="Ex: 50"
                                                    required
                                                />
                                            </div>
                                        ) : (
                                            <input
                                                type="number"
                                                step="any"
                                                value={cuttingPointValue}
                                                onChange={(e) => setCuttingPointValue(e.target.value)}
                                                className="border border-border rounded p-2 bg-white h-10"
                                                placeholder={cuttingPointSymbol ? "Ex: 0.5" : "Selecione o símbolo primeiro"}
                                                disabled={!cuttingPointSymbol}
                                                required
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Tipo do Resultado</label>
                                <select value={resultTypeId} onChange={(e) => setResultTypeId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.resultTypes.map(rt => (<option key={rt.id} value={rt.id}>{rt.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Resultado</label>
                                <input type="number" step="any" value={result} onChange={(e) => setResult(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
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
