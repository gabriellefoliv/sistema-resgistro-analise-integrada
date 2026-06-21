import { useState, useEffect } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllNecropsySampleOutput,
    type GetFormOptionsNecropsySampleOutput,
    type SendSampleInput
} from "srf-shared-types";
import {
    getNecropsySampleFormOptions,
    createNecropsySample,
    updateNecropsySample
} from "../../../services/deadanimals/necropsySampleService";

interface NecropsySampleFormModalProps {
    sample?: GetAllNecropsySampleOutput;
    close: () => void;
    refresh: () => void;
}

export function NecropsySampleFormModal({ sample, close, refresh }: NecropsySampleFormModalProps) {
    const isEditing = !!sample;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GetFormOptionsNecropsySampleOutput | null>(null);

    const [selectedNecropsyId, setSelectedNecropsyId] = useState<number | ''>('');

    // Campos do formulário
    const [sampleTypeId, setSampleTypeId] = useState<number | ''>(sample?.sampleTypeId || '');
    const [statusId, setStatusId] = useState<number | ''>(sample?.statusId || '');
    const [storageId, setStorageId] = useState<number | ''>(sample?.storageId || '');
    const [quantity, setQuantity] = useState<number | ''>(sample?.quantity || '');
    const [imageLink, setImageLink] = useState(sample?.imageLink || '');
    const [note, setNote] = useState(sample?.note || '');
    const [sendSamples, setSendSamples] = useState<SendSampleInput[]>(
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
                const opts = await getNecropsySampleFormOptions();
                setOptions(opts);

                // Pré-preencher seletores no modo edição
                if (sample) {
                    const matchingNecropsy = opts.necropsies.find(n => n.id === sample.necropsyId);
                    if (matchingNecropsy) {
                        setSelectedNecropsyId(matchingNecropsy.id);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadOptions();
    }, []);

    function addSendSample(storageId: number) {
        if (sendSamples.some(ss => ss.storageId === storageId)) return;
        setSendSamples([...sendSamples, { id: 0, storageId: storageId, statusId: 0, sendDate: '', quantity: 0, note: '' }]);
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
        if (!selectedNecropsyId) {
            setError('Selecione uma necrópsia associada.');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const data = {
                necropsyId: Number(selectedNecropsyId),
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
                await updateNecropsySample(sample!.id, data);
            } else {
                await createNecropsySample(data);
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
                        {isEditing ? 'Editando Amostra de Necrópsia' : 'Nova Amostra de Necrópsia'}
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
                                        const d = new Date(n.performedDate);
                                        const dateStr = isNaN(d.getTime()) ? '' : d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                                        return (
                                            <option key={n.id} value={n.id}>{dateStr} - {n.deadAnimal.code}</option>
                                        )
                                    })}
                                </select>
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
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-left">Envio de Amostras (Opcional)</label>
                            </div>

                            {sendSamples.map((ss, index) => {
                                const selectedStorage = options.storages.find(s => s.id === ss.storageId);
                                return (
                                    <div key={index} className="relative flex gap-2 items-end bg-white p-3 border border-border rounded mb-2">
                                        <div className="grid grid-cols-4 gap-2">
                                            <div className="flex flex-col">
                                                <label className="text-xs font-bold mb-1 text-left">Local de Armazenamento</label>
                                                <input
                                                    className="border border-border rounded p-2 bg-gray-100"
                                                    value={selectedStorage?.name}
                                                    disabled
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col">
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

                                            <div className="flex flex-col">
                                                <label className="text-xs font-bold mb-1 text-left">Data de Envio</label>
                                                <input
                                                    type="date"
                                                    value={ss.sendDate}
                                                    onChange={(e) => updateSendSample(index, 'sendDate', e.target.value)}
                                                    className="border border-border rounded p-2 bg-white"
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col">
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

                                            <div className="flex flex-col col-span-4">
                                                <label className="text-xs font-bold mb-1 text-left">Observação (Opcional)</label>
                                                <input
                                                    type="text"
                                                    value={ss.note || ''}
                                                    onChange={(e) => updateSendSample(index, 'note', e.target.value)}
                                                    className="border border-border rounded p-2 bg-white"
                                                    placeholder="Observação do envio..."
                                                />
                                            </div>

                                            <div className="absolute -top-[10px] right-2 flex items-center bg-white px-2  rounded">
                                                <button
                                                    type="button"
                                                    onClick={() => removeSendSample(index)}
                                                    className="text-standard-red font-bold text-xs cursor-pointer"
                                                    title="Remover envio"
                                                >
                                                    ✕ Remover
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* Adicionar envio */}
                            {options.storages.filter(s => !sendSamples.some(ss => ss.storageId === s.id)).length > 0 && (
                                <div className="flex items-center gap-3 border border-dashed border-border rounded p-3">
                                    <label className="text-sm font-bold text-text-main whitespace-nowrap">Adicionar Envio:</label>
                                    <select
                                        value=""
                                        onChange={(e) => {
                                            if (e.target.value) addSendSample(Number(e.target.value));
                                        }}
                                        className="border border-border rounded p-2 bg-white h-10 flex-1"
                                    >
                                        <option value="">Selecione um armazenamento para adicionar...</option>
                                        {options.storages.filter(s => !sendSamples.some(ss => ss.storageId === s.id)).map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
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
