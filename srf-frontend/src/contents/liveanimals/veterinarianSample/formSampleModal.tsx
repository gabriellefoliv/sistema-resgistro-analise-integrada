import { useState, useEffect, useMemo } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllVeterinarianSampleOutput,
    type GetFormOptionsVeterinarianSampleOutput,
    type SendVeterinarianSample,
} from "srf-shared-types";
import {
    getVeterinarianSampleFormOptions,
    createVeterinarianSample,
    updateVeterinarianSample
} from "../../../services/liveanimals/veterinarianSampleService";

interface VeterinarianSampleFormModalProps {
    sample?: GetAllVeterinarianSampleOutput;
    close: () => void;
    refresh: () => void;
}

export function VeterinarianSampleFormModal({ sample, close, refresh }: VeterinarianSampleFormModalProps) {
    const isEditing = !!sample;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsVeterinarianSampleOutput | null>(null);

    // Campos de seleção da visita (dependentes entre si)
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedAnimalId, setSelectedAnimalId] = useState<number | ''>('');
    const [selectedVeterinarianId, setSelectedVeterinarianId] = useState<number | ''>('');

    // Campos do formulário
    const [sampleTypeId, setSampleTypeId] = useState<number | ''>(sample?.sampleTypeId || '');
    const [statusId, setStatusId] = useState<number | ''>(sample?.statusId || '');
    const [storageId, setStorageId] = useState<number | ''>(sample?.storageId || '');
    const [quantity, setQuantity] = useState<number | ''>(sample?.quantity || '');
    const [imageLink, setImageLink] = useState(sample?.imageLink || '');
    const [note, setNote] = useState(sample?.note || '');
    const [sendSamples, setSendSamples] = useState<SendVeterinarianSample[]>(
        sample?.sendSamples?.map(s => ({
            id: s.id,
            storageId: s.storageId,
            statusId: s.statusId,
            sendDate: s.sendDate ? new Date(s.sendDate).toISOString().slice(0, 10) : '',
            quantity: s.quantity,
            note: s.note || ''
        })) || []
    );

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getVeterinarianSampleFormOptions();
                setOptions(opts);

                // Pré-preencher seletores no modo edição
                if (sample) {
                    const matchingVisit = opts.veterinarianVisits.find(v => v.id === sample.veterinarianVisitId);
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
                animalMap.set(v.liveAnimal.id, v.liveAnimal.name);
            }
        });
        return Array.from(animalMap.entries()).map(([id, name]) => ({ id: id, name: name }));
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

    function addSendSample() {
        setSendSamples([...sendSamples, { id: 0, storageId: 0, statusId: 0, sendDate: '', quantity: 0, note: '' }]);
    }

    function removeSendSample(index: number) {
        setSendSamples(sendSamples.filter((element, i) => i !== index));
    }

    function updateSendSample(index: number, field: string, value: any) {
        const updated = [...sendSamples];
        (updated[index] as any)[field] = ['storageId', 'statusId', 'quantity'].includes(field) ? Number(value) : value;
        setSendSamples(updated);
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
                sampleTypeId: Number(sampleTypeId),
                storageId: Number(storageId),
                statusId: Number(statusId),
                quantity: Number(quantity),
                imageLink: imageLink || undefined,
                note: note || undefined,
                sendSamples: sendSamples.length > 0 ? sendSamples.map(s => ({
                    id: s.id,
                    storageId: s.storageId,
                    statusId: s.statusId,
                    sendDate: s.sendDate,
                    quantity: s.quantity,
                    note: s.note || undefined,
                })) : undefined,
            };
            if (isEditing) {
                await updateVeterinarianSample(sample!.id, data);
            } else {
                await createVeterinarianSample(data);
            }
            refresh();
            close();
        } catch (error: any) {
            console.error(error);
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
                onClick={close}
                className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 overflow-y-auto p-4">
                <div onClick={(e) => e.stopPropagation()} className="modal relative flex flex-col overflow-y-auto bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 gap-5 w-220 max-h-[90vh]">
                    <button
                        onClick={() => close()}
                        className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3"
                        title="Fechar"
                    >
                        ✕
                    </button>

                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        {isEditing ? 'Editando Amostra Veterinária' : 'Nova Amostra Veterinária'}
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
                                    <label className="text-sm font-bold mb-1 text-left">Animal</label>
                                    <select
                                        value={selectedAnimalId}
                                        onChange={(e) => handleAnimalChange(e.target.value ? Number(e.target.value) : '')}
                                        className="border border-border rounded p-2 bg-white"
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {filteredAnimals.map(a => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
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

                        {/* Campos da Amostra */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Tipo da Amostra */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Tipo da Amostra</label>
                                <select
                                    value={sampleTypeId}
                                    onChange={(e) => setSampleTypeId(Number(e.target.value))}
                                    className="border border-border rounded p-2 bg-white"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.sampleTypes.map(t => (
                                        <option key={t.id} value={t.id}>{t.description}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Status</label>
                                <select
                                    value={statusId}
                                    onChange={(e) => setStatusId(Number(e.target.value))}
                                    className="border border-border rounded p-2 bg-white"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.status.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Armazenamento */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Armazenamento</label>
                                <select
                                    value={storageId}
                                    onChange={(e) => setStorageId(Number(e.target.value))}
                                    className="border border-border rounded p-2 bg-white"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.storages.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantidade Total */}
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Quantidade Total</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2"
                                    placeholder="0"
                                    required
                                />
                            </div>
                        </div>

                        {/* Link da Imagem */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1 text-left">Link da Imagem (Opcional)</label>
                            <input
                                type="text"
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                                className="border border-border rounded p-2"
                                placeholder="Digite o link da imagem..."
                            />
                        </div>

                        {/* Observações */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1 text-left">Observações (Opcional)</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="border border-border rounded p-2 resize-none"
                                rows={3}
                                placeholder="Digite observações sobre a amostra..."
                            />
                        </div>

                        {/* Amostras Enviadas */}
                        <div className={`flex flex-col gap-2 mt-2 flex-1 overflow-y-auto ${sendSamples.length === 0 ? 'min-h-20' : sendSamples.length === 1 ? 'min-h-60' : 'min-h-100 border border-border rounded p-2'}`}>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-left">Amostras Enviadas</label>
                                <button
                                    type="button"
                                    onClick={addSendSample}
                                    className="text-sm bg-standard-blue text-white px-3 py-1 rounded cursor-pointer"
                                >
                                    + Adicionar Envio
                                </button>
                            </div>

                            <div className="flex flex-col gap-2 mt-2 flex-1 min-h-0 overflow-y-auto">
                                {sendSamples.length === 0 && (
                                    <p className="text-sm text-text-light-gray italic text-center">Nenhum envio adicionado</p>
                                )}

                                {sendSamples.map((ss, index) => (
                                    <div key={index} className="flex flex-col gap-2 bg-form-bg p-3 rounded">
                                        <div className="flex gap-2 items-end">
                                            {/* Local de Armazenamento */}
                                            <div className="flex flex-col flex-1">
                                                <label className="text-xs font-bold mb-1 text-left">Local de Armazenamento</label>
                                                <select
                                                    value={ss.storageId}
                                                    onChange={(e) => updateSendSample(index, 'storageId', e.target.value)}
                                                    className="border border-border rounded p-2 bg-white"
                                                    required
                                                >
                                                    <option value="">Selecione...</option>
                                                    {options.storages.map(s => (
                                                        <option key={s.id} value={s.id} disabled={sendSamples.some(existing => existing.storageId === s.id && existing !== ss)}>{s.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Status */}
                                            <div className="flex flex-col flex-1">
                                                <label className="text-xs font-bold mb-1 text-left">Status</label>
                                                <select
                                                    value={ss.statusId}
                                                    onChange={(e) => updateSendSample(index, 'statusId', e.target.value)}
                                                    className="border border-border rounded p-2 bg-white"
                                                    required
                                                >
                                                    <option value="">Selecione...</option>
                                                    {options.status.map(s => (
                                                        <option key={s.id} value={s.id}>{s.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Data de Envio */}
                                            <div className="flex flex-col w-36">
                                                <label className="text-xs font-bold mb-1 text-left">Data de Envio</label>
                                                <input
                                                    type="date"
                                                    value={ss.sendDate}
                                                    onChange={(e) => updateSendSample(index, 'sendDate', e.target.value)}
                                                    className="border border-border rounded p-2 bg-white"
                                                    required
                                                />
                                            </div>

                                            {/* Quantidade */}
                                            <div className="flex flex-col w-24">
                                                <label className="text-xs font-bold mb-1 text-left">Quantidade</label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={ss.quantity || ''}
                                                    onChange={(e) => updateSendSample(index, 'quantity', e.target.value)}
                                                    className="border border-border rounded p-2 bg-white"
                                                    placeholder="0"
                                                    required
                                                />
                                            </div>

                                            {/* Botão de Remover */}
                                            <button
                                                type="button"
                                                onClick={() => removeSendSample(index)}
                                                className="text-button-red font-bold text-xl cursor-pointer px-2 pb-2"
                                                title="Remover envio"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {/* Observação */}
                                        <div className="flex flex-col">
                                            <label className="text-xs font-bold mb-1 text-left">Observação (Opcional)</label>
                                            <input
                                                type="text"
                                                value={ss.note || ''}
                                                onChange={(e) => updateSendSample(index, 'note', e.target.value)}
                                                className="border border-border rounded p-2 bg-white"
                                                placeholder="Observação do envio..."
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
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