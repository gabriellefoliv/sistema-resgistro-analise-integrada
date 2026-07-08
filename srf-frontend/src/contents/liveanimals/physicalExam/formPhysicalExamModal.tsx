import React, { useState, useEffect, useMemo } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllPhysicalExamOutput,
    type GetFormOptionsPhysicalExamOutput,
} from "srf-shared-types";
import {
    getPhysicalExamFormOptions,
    createPhysicalExam,
    updatePhysicalExam
} from "../../../services/liveanimals/physicalExamService";
import grayQuestionMark from '../../../assets/grayQuestionMark.svg';

interface PhysicalExamFormModalProps {
    exam?: GetAllPhysicalExamOutput;
    close: () => void;
    refresh: () => void;
}

export function PhysicalExamFormModal({ exam, close, refresh }: PhysicalExamFormModalProps) {
    const isEditing = !!exam;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsPhysicalExamOutput | null>(null);

    // Campos de seleção da visita (dependentes entre si)
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedAnimalId, setSelectedAnimalId] = useState<number | ''>('');
    const [selectedVeterinarianId, setSelectedVeterinarianId] = useState<number | ''>('');

    // Campos do formulário
    const [generalConditionId, setGeneralConditionId] = useState<number | ''>(exam?.generalConditionId || '');
    const [fr, setFr] = useState<number | string>(exam?.fr || '');
    const [fc, setFc] = useState<number | ''>(exam?.fc || '');
    const [tempRectal, setTempRectal] = useState<number | ''>(exam?.tempRectal || '');
    const [mucousId, setMucousId] = useState<number | ''>(exam?.mucousId || '');
    const [tpc, setTpc] = useState<number | ''>(exam?.tpc || '');
    const [hydrationId, setHydrationId] = useState<number | ''>(exam?.hydrationId || '');
    const [weight, setWeight] = useState<number | ''>(exam?.weight || '');
    const [score, setScore] = useState<number | ''>(exam?.score || '');
    const [bloodCollectionNote, setBloodCollectionNote] = useState<string | ''>(exam?.bloodCollectionNote || '');
    const [physicalExamNote, setPhysicalExamNote] = useState<string | ''>(exam?.physicalExamNote || '');
    const [generalNote, setGeneralNote] = useState<string | ''>(exam?.generalNote || '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getPhysicalExamFormOptions();
                setOptions(opts);

                // Pré-preencher seletores no modo edição
                if (exam) {
                    const matchingVisit = opts.veterinarianVisits.find(v => v.id === exam.veterinarianVisitId);
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

    // Datas disponíveis - filtradas pelo animal e veterinário se selecionados
    const filteredDates = useMemo(() => {
        if (!options) return [];
        let visits = options.veterinarianVisits;
        if (selectedAnimalId) visits = visits.filter(v => v.liveAnimal.id === selectedAnimalId);
        if (selectedVeterinarianId) visits = visits.filter(v => v.veterinarian.id === selectedVeterinarianId);

        const dateSet = new Map<string, string>();
        visits.forEach(v => {
            const dateKey = v.date;
            if (!dateSet.has(dateKey)) {
                dateSet.set(dateKey, new Date(dateKey).toLocaleDateString('pt-BR'));
            }
        });
        return Array.from(dateSet.entries()).map(([iso, formatted]) => ({ iso: iso, formatted: formatted }));
    }, [options, selectedAnimalId, selectedVeterinarianId]);

    // Animais disponíveis - filtrados pela data e veterinário se selecionados
    const filteredAnimals = useMemo(() => {
        if (!options) return [];
        let visits = options.veterinarianVisits;
        if (selectedDate) visits = visits.filter(v => v.date === selectedDate);
        if (selectedVeterinarianId) visits = visits.filter(v => v.veterinarian.id === selectedVeterinarianId);

        // Animais únicos
        const animalMap = new Map<number, string>();
        visits.forEach(v => {
            if (!animalMap.has(v.liveAnimal.id)) {
                animalMap.set(v.liveAnimal.id, v.liveAnimal.code);
            }
        });
        return Array.from(animalMap.entries()).map(([id, code]) => ({ id: id, code: code }));
    }, [options, selectedDate, selectedVeterinarianId]);

    // Veterinários disponíveis - filtrados pela data e animal se selecionados
    const filteredVeterinarians = useMemo(() => {
        if (!options) return [];
        let visits = options.veterinarianVisits;
        if (selectedDate) visits = visits.filter(v => v.date === selectedDate);
        if (selectedAnimalId) visits = visits.filter(v => v.liveAnimal.id === selectedAnimalId);

        // Veterinários únicos
        const vetMap = new Map<number, string>();
        visits.forEach(v => {
            if (!vetMap.has(v.veterinarian.id)) {
                vetMap.set(v.veterinarian.id, v.veterinarian.name);
            }
        });
        return Array.from(vetMap.entries()).map(([id, name]) => ({ id: id, name: name }));
    }, [options, selectedDate, selectedAnimalId]);

    // Obter o id da visita veterinária
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
            const matchingVisits = options?.veterinarianVisits.filter(v => v.date === value) || [];
            if (selectedAnimalId && !matchingVisits.some(v => v.liveAnimal.id === selectedAnimalId)) setSelectedAnimalId('');
            if (selectedVeterinarianId && !matchingVisits.some(v => v.veterinarian.id === selectedVeterinarianId)) setSelectedVeterinarianId('');
        }
    }

    function handleAnimalChange(value: number | '') {
        setSelectedAnimalId(value);
        if (value) {
            const matchingVisits = options?.veterinarianVisits.filter(v => v.liveAnimal.id === value) || [];
            if (selectedDate && !matchingVisits.some(v => v.date === selectedDate)) setSelectedDate('');
            if (selectedVeterinarianId && !matchingVisits.some(v => v.veterinarian.id === selectedVeterinarianId)) setSelectedVeterinarianId('');
        }
    }

    function handleVeterinarianChange(value: number | '') {
        setSelectedVeterinarianId(value);
        if (value) {
            const matchingVisits = options?.veterinarianVisits.filter(v => v.veterinarian.id === value) || [];
            if (selectedDate && !matchingVisits.some(v => v.date === selectedDate)) setSelectedDate('');
            if (selectedAnimalId && !matchingVisits.some(v => v.liveAnimal.id === selectedAnimalId)) setSelectedAnimalId('');
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
                generalConditionId: Number(generalConditionId),
                fr: String(fr),
                fc: Number(fc),
                tempRectal: Number(tempRectal),
                mucousId: Number(mucousId),
                tpc: Number(tpc),
                hydrationId: Number(hydrationId),
                weight: Number(weight),
                score: Number(score),
                bloodCollectionNote: bloodCollectionNote || undefined,
                physicalExamNote: physicalExamNote || undefined,
                generalNote: generalNote || undefined
            };

            if (isEditing && exam) {
                await updatePhysicalExam(exam.id, data);
            } else {
                await createPhysicalExam(data);
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
            <div
                onMouseDown={close}
                className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 overflow-y-auto p-4">
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col overflow-y-auto bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 gap-5 w-220 max-h-[90vh]">
                    <button
                        onClick={() => close()}
                        className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3"
                        title="Fechar"
                    >
                        ✕
                    </button>

                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        {isEditing ? 'Editando Exame Físico' : 'Novo Exame Físico'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Seleção da Visita Associada */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Visita Associada</legend>
                            <div className="grid grid-cols-3 gap-4">
                                {/* Data da Visita */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Data da Visita</label>
                                    <select
                                        value={selectedDate}
                                        onChange={(e) => handleDateChange(e.target.value)}
                                        className="border border-border rounded p-2 bg-white"
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {filteredDates.map(d => (
                                            <option key={d.iso} value={d.iso}>{d.formatted}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Animal */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Código do Animal</label>
                                    <select
                                        value={selectedAnimalId}
                                        onChange={(e) => handleAnimalChange(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 bg-white"
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {filteredAnimals.map(a => (
                                            <option key={a.id} value={a.id}>{a.code}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Veterinário */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Veterinário</label>
                                    <select
                                        value={selectedVeterinarianId}
                                        onChange={(e) => handleVeterinarianChange(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 bg-white"
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {filteredVeterinarians.map(v => (
                                            <option key={v.id} value={v.id}>{v.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        {/* Campos do Exame Físico */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Estado Geral */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Estado Geral</label>
                                <select
                                    value={generalConditionId}
                                    onChange={(e) => setGeneralConditionId(Number(e.target.value))}
                                    className="border border-border rounded p-2 bg-white h-10"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.generalConditions.map(gc => (
                                        <option key={gc.id} value={gc.id}>{gc.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* FR */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left flex items-center">Frequência Respiratória (mpm)
                                    <img src={grayQuestionMark}
                                        title="Frequência respiratória medida em movimentos respiratórios por minuto"
                                        alt="Sobre o campo Frequência Respiratória"
                                        className="inline-block size-4 ml-1"
                                    />
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={fr}
                                        onChange={(e) => setFr(e.target.value)}
                                        className="border border-border rounded p-2 bg-white w-full h-10"
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Ofegante">Ofegante</option>
                                        <option value="Valor">Valor</option>
                                    </select>
                                    {fr === 'Valor' && (
                                        <input
                                            type="number"
                                            min={1}
                                            value={fr}
                                            onChange={(e) => setFr(e.target.value ? Number(e.target.value) : '')}
                                            className="border border-border rounded p-2 bg-white h-10"
                                            placeholder="0"
                                            required
                                        />
                                    )}
                                </div>
                            </div>

                            {/* FC */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left flex items-center">Frequência Cardíaca (bpm)
                                    <img src={grayQuestionMark}
                                        title="Frequência cardíaca medida em batimentos por minuto"
                                        alt="Sobre o campo Frequência Cardíaca"
                                        className="inline-block size-4 ml-1"
                                    />
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={fc}
                                    onChange={(e) => setFc(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10"
                                    placeholder="0"
                                    required
                                />
                            </div>

                            {/* Temperatura Retal */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left flex items-center">Temperatura Retal (°C)
                                    <img src={grayQuestionMark}
                                        title="Temperatura retal medida em graus Celsius"
                                        alt="Sobre o campo Temperatura Retal"
                                        className="inline-block size-4 ml-1"
                                    />
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={tempRectal}
                                    onChange={(e) => setTempRectal(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2"
                                    placeholder="0"
                                    required
                                />
                            </div>

                            {/* Mucosa */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left flex items-center">Mucosa
                                    <img src={grayQuestionMark}
                                        title="Descrição das mucosas do animal"
                                        alt="Sobre o campo Mucosa"
                                        className="inline-block size-4 ml-1"
                                    />
                                </label>
                                <select
                                    value={mucousId}
                                    onChange={(e) => setMucousId(Number(e.target.value))}
                                    className="border border-border rounded p-2 bg-white h-10"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.mucous.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* TPC */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left flex items-center">Tempo de Preenchimento Capilar
                                    <img src={grayQuestionMark}
                                        title="Tempo de preenchimento capilar do animal"
                                        alt="Sobre o campo Tempo de Preenchimento Capilar"
                                        className="inline-block size-4 ml-1"
                                    />
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={tpc}
                                    onChange={(e) => setTpc(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 h-10"
                                    placeholder="0"
                                    required
                                />
                            </div>

                            {/* Hidratação */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left flex items-center">Hidratação
                                    <img src={grayQuestionMark}
                                        title="Estado de hidratação do animal"
                                        alt="Sobre o campo Hidratação"
                                        className="inline-block size-4 ml-1"
                                    />
                                </label>
                                <select
                                    value={hydrationId}
                                    onChange={(e) => setHydrationId(Number(e.target.value))}
                                    className="border border-border rounded p-2 bg-white h-10"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.hydrations.map(h => (
                                        <option key={h.id} value={h.id}>{h.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {/* Peso */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left flex items-center">Peso (kg)
                                        <img src={grayQuestionMark}
                                            title="Peso do animal em quilogramas"
                                            alt="Sobre o campo Peso"
                                            className="inline-block size-4 ml-1"
                                        />
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 h-10"
                                        placeholder="0"
                                        required
                                    />
                                </div>

                                {/* Score */}
                                <div className="flex flex-col w-full">
                                    <label className="text-sm font-bold mb-1 text-left flex items-center">Score
                                        <img src={grayQuestionMark}
                                            title="Escala de 1 a 9 para avaliação da condição corporal do animal"
                                            alt="Sobre o campo Score"
                                            className="inline-block size-4 ml-1"
                                        />
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={9}
                                        value={score}
                                        onChange={(e) => setScore(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 h-10"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Observações da Coleta de Sangue */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1 text-left">Observações da Coleta de Sangue (Opcional)</label>
                            <textarea
                                value={bloodCollectionNote}
                                onChange={(e) => setBloodCollectionNote(e.target.value)}
                                className="border border-border rounded p-2 resize-none"
                                placeholder="Digite observações sobre a coleta de sangue..."
                            />
                        </div>

                        {/* Observações do Exame Físico */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1 text-left">Observações do Exame Físico (Opcional)</label>
                            <textarea
                                value={physicalExamNote}
                                onChange={(e) => setPhysicalExamNote(e.target.value)}
                                className="border border-border rounded p-2 resize-none"
                                placeholder="Digite observações sobre o exame físico..."
                            />
                        </div>

                        {/* Observações Gerais */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1 text-left">Observações Gerais (Opcional)</label>
                            <textarea
                                value={generalNote}
                                onChange={(e) => setGeneralNote(e.target.value)}
                                className="border border-border rounded p-2 resize-none"
                                placeholder="Digite observações gerais..."
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-center items-center gap-5 mt-2">
                            <button
                                type="submit"
                                className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button
                                type="button"
                                onClick={() => close()}
                                className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalPortal>
    )
}