import { useState, useEffect, useMemo } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllCastrationOutput,
    type GetFormOptionsCastrationOutput
} from "srf-shared-types";
import {
    getCastrationFormOptions,
    createCastration,
    updateCastration
} from "../../../services/liveanimals/castrationService";

interface CastrationFormModalProps {
    castration?: GetAllCastrationOutput;
    close: () => void;
    refresh: () => void;
}

export function CastrationFormModal({ castration, close, refresh }: CastrationFormModalProps) {
    const isEditing = !!castration;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsCastrationOutput | null>(null);

    // Campo principal: Animal (obrigatório)
    const [selectedAnimalId, setSelectedAnimalId] = useState<number | ''>(castration?.liveAnimalId || '');

    // Campos de seleção da visita associada (opcional)
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedVeterinarianId, setSelectedVeterinarianId] = useState<number | ''>('');

    // Campos do formulário
    const [castrationDate, setCastrationDate] = useState(castration?.date ? new Date(castration.date).toISOString().slice(0, 10) : '');
    const [note, setNote] = useState(castration?.note || '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getCastrationFormOptions();
                setOptions(opts);

                // Pré-preencher seletores no modo edição
                if (castration) {
                    setSelectedAnimalId(castration.liveAnimalId);

                    if (castration.veterinarianVisitId) {
                        const matchingVisit = opts.veterinarianVisits.find(v => v.id === castration.veterinarianVisitId);
                        if (matchingVisit) {
                            setSelectedDate(matchingVisit.date);
                            setCastrationDate(new Date(matchingVisit.date).toISOString().slice(0, 10));
                            setSelectedVeterinarianId(matchingVisit.veterinarian.id);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadOptions();
    }, []);

    // Visitas filtradas pelo animal selecionado
    const visitsForAnimal = useMemo(() => {
        if (!options || !selectedAnimalId) return [];
        return options.veterinarianVisits.filter(v => v.liveAnimal.id === selectedAnimalId);
    }, [options, selectedAnimalId]);

    // Datas disponíveis - filtradas pelo animal e veterinário se selecionados
    const filteredDates = useMemo(() => {
        let visits = visitsForAnimal;
        if (selectedVeterinarianId) visits = visits.filter(v => v.veterinarian.id === selectedVeterinarianId);

        const dateSet = new Map<string, string>();
        visits.forEach(v => {
            const dateKey = v.date;
            if (!dateSet.has(dateKey)) {
                dateSet.set(dateKey, new Date(dateKey).toLocaleDateString('pt-BR'));
            }
        });
        return Array.from(dateSet.entries()).map(([iso, formatted]) => ({ iso: iso, formatted: formatted }));
    }, [visitsForAnimal, selectedVeterinarianId]);

    // Veterinários disponíveis - filtrados pelo animal e data se selecionados
    const filteredVeterinarians = useMemo(() => {
        let visits = visitsForAnimal;
        if (selectedDate) visits = visits.filter(v => v.date === selectedDate);

        const vetMap = new Map<number, string>();
        visits.forEach(v => {
            if (!vetMap.has(v.veterinarian.id)) {
                vetMap.set(v.veterinarian.id, v.veterinarian.name);
            }
        });
        return Array.from(vetMap.entries()).map(([id, name]) => ({ id: id, name: name }));
    }, [visitsForAnimal, selectedDate]);

    // Verifica se algum campo de visita foi selecionado
    const hasVisitSelected = !!(selectedDate || selectedVeterinarianId);

    // Obter o id da visita veterinária
    const veterinarianVisitId = useMemo(() => {
        if (!options || !selectedDate || !selectedAnimalId || !selectedVeterinarianId) return null;
        const visit = options.veterinarianVisits.find(
            v => v.date === selectedDate && v.liveAnimal.id === selectedAnimalId && v.veterinarian.id === selectedVeterinarianId
        );
        return visit?.id ?? null;
    }, [options, selectedDate, selectedAnimalId, selectedVeterinarianId]);

    // Data da visita selecionada formatada para YYYY-MM-DD
    const visitDateFormatted = useMemo(() => {
        if (!selectedDate) return '';
        return new Date(selectedDate).toISOString().slice(0, 10);
    }, [selectedDate]);

    function handleAnimalChange(value: number | '') {
        setSelectedAnimalId(value);
        setSelectedDate('');
        setSelectedVeterinarianId('');
    }

    function handleDateChange(value: string) {
        setSelectedDate(value);
        setCastrationDate(new Date(value).toISOString().slice(0, 10));
        if (value) {
            const matchingVisits = visitsForAnimal.filter(v => v.date === value);
            if (selectedVeterinarianId && !matchingVisits.some(v => v.veterinarian.id === selectedVeterinarianId)) setSelectedVeterinarianId('');
        }
    }

    function handleVeterinarianChange(value: number | '') {
        setSelectedVeterinarianId(value);
        if (value) {
            const matchingVisits = visitsForAnimal.filter(v => v.veterinarian.id === value);
            if (selectedDate && !matchingVisits.some(v => v.date === selectedDate)) setSelectedDate('');
        }
    }

    function handleClearVisit() {
        setSelectedDate('');
        setSelectedVeterinarianId('');
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (hasVisitSelected && !veterinarianVisitId) {
            setError('Selecione uma data e um veterinário para determinar a visita ou deixe em branco os campos de visita associada');
            setLoading(false);
            return;
        }

        // Quando há visita associada, a data da castração é a data da visita
        const finalDate = veterinarianVisitId ? visitDateFormatted : castrationDate;

        if (!finalDate) {
            setError('Informe a data da castração.');
            setLoading(false);
            return;
        }

        try {
            const data = {
                liveAnimalId: Number(selectedAnimalId),
                date: finalDate,
                veterinarianVisitId: Number(veterinarianVisitId) || undefined,
                note: note || undefined
            };
            if (isEditing && castration) {
                await updateCastration(castration!.id, data);
            } else {
                await createCastration(data);
            }
            refresh();
            close();
        } catch (error: any) {
            setError(error.response?.data?.error || "Erro ao salvar castração.");
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
                        {isEditing ? 'Editando Castração' : 'Nova Castração'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Animal */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Animal</label>
                                <select
                                    value={selectedAnimalId}
                                    onChange={(e) => handleAnimalChange(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.liveAnimals.map(a => (
                                        <option key={a.id} value={a.id}>{a.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Seleção da Visita Associada (opcional) */}
                        <fieldset className={`col-span-2 border border-border rounded p-4 ${!selectedAnimalId ? 'bg-gray-100' : 'bg-white'}`}>
                            <legend className="text-sm font-bold text-standard-blue px-2 flex items-center gap-2">
                                Visita Associada (Opcional)
                                {hasVisitSelected && (
                                    <button
                                        type="button"
                                        onClick={handleClearVisit}
                                        className="text-standard-red hover:text-red-700 font-bold text-sm cursor-pointer leading-none"
                                        title="Limpar seleção de visita"
                                    >
                                        ✕
                                    </button>
                                )}
                            </legend>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Data da Visita */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Data da Visita</label>
                                    <select
                                        value={selectedDate}
                                        onChange={(e) => handleDateChange(e.target.value)}
                                        className={`border border-border rounded p-2 ${!selectedAnimalId ? 'bg-gray-100' : 'bg-white'}`}
                                        required={!!selectedVeterinarianId}
                                        disabled={!selectedAnimalId}
                                    >
                                        <option value="">Selecione...</option>
                                        {filteredDates.map(d => (
                                            <option key={d.iso} value={d.iso}>{d.formatted}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Veterinário */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold mb-1 text-left">Veterinário</label>
                                    <select
                                        value={selectedVeterinarianId}
                                        onChange={(e) => handleVeterinarianChange(e.target.value ? Number(e.target.value) : '')}
                                        className={`border border-border rounded p-2 ${!selectedAnimalId ? 'bg-gray-100' : 'bg-white'}`}
                                        required={!!selectedDate}
                                        disabled={!selectedAnimalId}
                                    >
                                        <option value="">Selecione...</option>
                                        {filteredVeterinarians.map(v => (
                                            <option key={v.id} value={v.id}>{v.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        {/* Data da Castração */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Data da Castração</label>
                                <input
                                    type="date"
                                    value={castrationDate}
                                    onChange={(e) => setCastrationDate(e.target.value)}
                                    className={`border border-border rounded p-2 ${hasVisitSelected ? 'bg-gray-100' : 'bg-white'
                                        }`}
                                    required={!hasVisitSelected}
                                    disabled={hasVisitSelected}
                                />
                            </div>
                        </div>
                        {/* Observações */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1 text-left">Observações</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="border border-border rounded p-2 bg-white resize-none"
                                rows={3}
                                placeholder="Observações sobre a castração (opcional)"
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
            </div >
        </ModalPortal >
    )
}
