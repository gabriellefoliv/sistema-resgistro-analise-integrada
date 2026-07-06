import React, { useState, useEffect, useMemo } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllExamResultOutput,
    type GetFormOptionsExamResultOutput,
} from "srf-shared-types";
import {
    getExamResultFormOptions,
    createExamResult,
    updateExamResult
} from "../../../services/liveanimals/examResultService";
import grayQuestionMark from '../../../assets/grayQuestionMark.svg';

interface ExamResultFormModalProps {
    examResult?: GetAllExamResultOutput;
    close: () => void;
    refresh: () => void;
}

export function ExamResultFormModal({ examResult, close, refresh }: ExamResultFormModalProps) {
    const isEditing = !!examResult;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsExamResultOutput | null>(null);

    // Campos de seleção da visita
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedAnimalId, setSelectedAnimalId] = useState<number | ''>('');
    const [selectedVeterinarianId, setSelectedVeterinarianId] = useState<number | ''>('');

    // Interpretação
    const [interpretationId, setInterpretationId] = useState<number | ''>(examResult?.interpretationId ?? '');
    const [note, setNote] = useState<string>(examResult?.note ?? '');

    // Hemograma
    const [erythrocytes, setErythrocytes] = useState<number | ''>(examResult?.erythrocytes ?? '');
    const [hemoglobin, setHemoglobin] = useState<number | ''>(examResult?.hemoglobin ?? '');
    const [hematocrit, setHematocrit] = useState<number | ''>(examResult?.hematocrit ?? '');
    const [vcm, setVcm] = useState<number | ''>(examResult?.vcm ?? '');
    const [hcm, setHcm] = useState<number | ''>(examResult?.hcm ?? '');
    const [chcm, setChcm] = useState<number | ''>(examResult?.chcm ?? '');
    const [platelets, setPlatelets] = useState<number | ''>(examResult?.platelets ?? '');
    const [whiteBloodCells, setWhiteBloodCells] = useState<number | ''>(examResult?.whiteBloodCells ?? '');
    const [bandCells, setBandCells] = useState<number | ''>(examResult?.bandCells ?? '');
    const [segmentedCells, setSegmentedCells] = useState<number | ''>(examResult?.segmentedCells ?? '');
    const [segmentedCellsPercentage, setSegmentedCellsPercentage] = useState<number | ''>(examResult?.segmentedCellsPercentage ?? '');
    const [lymphocytes, setLymphocytes] = useState<number | ''>(examResult?.lymphocytes ?? '');
    const [lymphocytesPercentage, setLymphocytesPercentage] = useState<number | ''>(examResult?.lymphocytesPercentage ?? '');
    const [monocytes, setMonocytes] = useState<number | ''>(examResult?.monocytes ?? '');
    const [monocytesPercentage, setMonocytesPercentage] = useState<number | ''>(examResult?.monocytesPercentage ?? '');
    const [eosinophils, setEosinophils] = useState<number | ''>(examResult?.eosinophils ?? '');
    const [eosinophilsPercentage, setEosinophilsPercentage] = useState<number | ''>(examResult?.eosinophilsPercentage ?? '');
    const [basophils, setBasophils] = useState<number | ''>(examResult?.basophils ?? '');
    const [basophilsPercentage, setBasophilsPercentage] = useState<number | ''>(examResult?.basophilsPercentage ?? '');

    // Bioquímico
    const [alt, setAlt] = useState<number | ''>(examResult?.alt ?? '');
    const [creatinine, setCreatinine] = useState<number | ''>(examResult?.creatinine ?? '');
    const [alkalinePhosphatase, setAlkalinePhosphatase] = useState<number | ''>(examResult?.alkalinePhosphatase ?? '');
    const [totalProtein, setTotalProtein] = useState<number | ''>(examResult?.totalProtein ?? '');
    const [urea, setUrea] = useState<number | ''>(examResult?.urea ?? '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getExamResultFormOptions();
                setOptions(opts);
                if (examResult) {
                    const matchingVisit = opts.veterinarianVisits.find(v => v.id === examResult.veterinarianVisitId);
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
        setLoading(true);
        setError(null);
        try {
            const data = {
                veterinarianVisitId: Number(veterinarianVisitId),
                interpretationId: Number(interpretationId),
                erythrocytes: Number(erythrocytes), hemoglobin: Number(hemoglobin),
                hematocrit: Number(hematocrit), vcm: Number(vcm), hcm: Number(hcm),
                chcm: Number(chcm), platelets: Number(platelets),
                whiteBloodCells: Number(whiteBloodCells), bandCells: Number(bandCells),
                segmentedCells: Number(segmentedCells), segmentedCellsPercentage: Number(segmentedCellsPercentage),
                lymphocytes: Number(lymphocytes), lymphocytesPercentage: Number(lymphocytesPercentage),
                monocytes: Number(monocytes), monocytesPercentage: Number(monocytesPercentage),
                eosinophils: Number(eosinophils), eosinophilsPercentage: Number(eosinophilsPercentage),
                basophils: Number(basophils), basophilsPercentage: Number(basophilsPercentage),
                alt: Number(alt), creatinine: Number(creatinine),
                alkalinePhosphatase: Number(alkalinePhosphatase),
                totalProtein: Number(totalProtein), urea: Number(urea),
                note: note || undefined
            };
            if (isEditing && examResult) {
                await updateExamResult(examResult.id, data);
            } else {
                await createExamResult(data);
            }
            refresh();
            close();
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao salvar.');
        } finally {
            setLoading(false);
        }
    }

    function numInput(label: string, value: number | '', setter: (v: number | '') => void, labelTip?: string) {
        return (
            <div className="flex flex-col">
                <label className="text-sm font-bold mb-1 text-left flex items-center">{label}
                    {labelTip && (
                        <img src={grayQuestionMark}
                            title={labelTip}
                            alt={`Sobre o campo ${label}`}
                            className="inline-block size-4 ml-1"
                        />
                    )}
                </label>
                <input type="number" step="any" value={value} onChange={(e) => setter(e.target.value ? Number(e.target.value) : '')}
                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
            </div>
        );
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
                        {isEditing ? 'Editando Hemograma/Bioquímico' : 'Novo Hemograma/Bioquímico'}
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

                        {/* Interpretação e Observação */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1 text-left">Interpretação</label>
                            <select value={interpretationId} onChange={(e) => setInterpretationId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                <option value="">Selecione...</option>
                                {options.interpretations.map(i => (<option key={i.id} value={i.id}>{i.name}</option>))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Observações (Opcional)</label>
                                <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="border border-border rounded p-2 bg-white h-10" placeholder="Digite observações..." />
                        </div>

                        {/* Hemograma */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Hemograma</legend>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                {numInput('Eritrócitos', erythrocytes, setErythrocytes)}
                                {numInput('Hemoglobina', hemoglobin, setHemoglobin)}
                                {numInput('Hematócrito', hematocrit, setHematocrit)}
                                {numInput('VCM', vcm, setVcm, "VCM...")}
                                {numInput('HCM', hcm, setHcm, "HCM...")}
                                {numInput('CHCM', chcm, setChcm, "CHCM...")}
                                {numInput('Plaquetas', platelets, setPlatelets)}
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                {numInput('Leucócitos', whiteBloodCells, setWhiteBloodCells)}
                                {numInput('Bastonetes', bandCells, setBandCells)}
                                {numInput('Segmentados', segmentedCells, setSegmentedCells)}
                                {numInput('Segmentados (%)', segmentedCellsPercentage, setSegmentedCellsPercentage)}
                                {numInput('Linfócitos', lymphocytes, setLymphocytes)}
                                {numInput('Linfócitos (%)', lymphocytesPercentage, setLymphocytesPercentage)}
                                {numInput('Monócitos', monocytes, setMonocytes)}
                                {numInput('Monócitos (%)', monocytesPercentage, setMonocytesPercentage)}
                                {numInput('Eosinófilos', eosinophils, setEosinophils)}
                                {numInput('Eosinófilos (%)', eosinophilsPercentage, setEosinophilsPercentage)}
                                {numInput('Basófilos', basophils, setBasophils)}
                                {numInput('Basófilos (%)', basophilsPercentage, setBasophilsPercentage)}
                            </div>
                        </fieldset>
                        {/* Bioquímico */}
                        <fieldset className="border border-border rounded p-4">
                            <legend className="text-sm font-bold text-standard-blue px-2">Bioquímico</legend>
                            <div className="grid grid-cols-4 gap-4">
                                {numInput('ALT', alt, setAlt)}
                                {numInput('Creatinina', creatinine, setCreatinine)}
                                {numInput('Fosfatase Alcalina', alkalinePhosphatase, setAlkalinePhosphatase)}
                                {numInput('Proteína Total', totalProtein, setTotalProtein)}
                                {numInput('Ureia', urea, setUrea)}
                            </div>
                        </fieldset>

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
