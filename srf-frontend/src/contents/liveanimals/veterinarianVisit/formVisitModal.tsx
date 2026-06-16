import { useState, useEffect } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type VeterinarianVisitData,
    type VeterinarianVisitFormOptions,
    type BodyMeasurementData,
    getVeterinarianVisitOptions,
    createVeterinarianVisit,
    updateVeterinarianVisit
} from "../../../services/liveanimals/veterinarianVisitService";

interface VeterinarianVisitFormModalProps {
    visit?: VeterinarianVisitData;
    close: () => void;
    refresh: () => void;
}

export function VeterinarianVisitFormModal({ visit, close, refresh }: VeterinarianVisitFormModalProps) {
    const isEditing = !!visit;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<VeterinarianVisitFormOptions | null>(null);

    const [liveAnimalId, setLiveAnimalId] = useState<number | ''>(visit?.liveAnimalId || '');
    const [veterinarianId, setVeterinarianId] = useState<number | ''>(visit?.veterinarianId || '');
    const [date, setDate] = useState(visit?.date ? new Date(visit.date).toISOString().slice(0, 10) : '');
    const [animalPicture, setAnimalPicture] = useState(visit?.animalPicture || '');
    const [note, setNote] = useState(visit?.note || '');
    const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurementData[]>(
        visit?.bodyMeasurements || []
    );

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getVeterinarianVisitOptions();
                setOptions(opts);
            } catch (error) {
                console.error(error);
            }
        }
        loadOptions();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditing) {
                const data = {
                    liveAnimalId: Number(liveAnimalId),
                    veterinarianId: Number(veterinarianId),
                    date: date,
                    animalPicture: animalPicture,
                    note: note,
                    bodyMeasurements: bodyMeasurements.map(bm => ({
                        bodyMeasurementTypeId: bm.bodyMeasurementTypeId,
                        value: bm.value,
                    })),
                };
                await updateVeterinarianVisit(visit!.id, data);
            } else {
                const data = {
                    liveAnimalId: Number(liveAnimalId),
                    veterinarianId: Number(veterinarianId),
                    date: date,
                    animalPicture: animalPicture,
                    note: note,
                    bodyMeasurements: bodyMeasurements.map(bm => ({
                        bodyMeasurementTypeId: bm.bodyMeasurementTypeId,
                        value: bm.value,
                    })),
                };
                await createVeterinarianVisit(data);
            }

            refresh();
            close();
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.error || 'Erro ao salvar');
        } finally {
            setLoading(false);
        }
    }

    function handleAddMeasurement(bodyMeasurementTypeId: number) {
        if (!options) return;
        if (bodyMeasurements.some(bm => bm.bodyMeasurementTypeId === bodyMeasurementTypeId)) return;

        setBodyMeasurements(prev => [...prev, { bodyMeasurementTypeId, value: 0 }]);
    }

    function handleRemoveMeasurement(index: number) {
        setBodyMeasurements(bodyMeasurements.filter((element, i) => i !== index));
    }

    function handleUpdateMeasurement(index: number, field: string, value: any) {
        const updated = [...bodyMeasurements];
        (updated[index] as any)[field] = field === 'value' ? parseFloat(value) : Number(value);
        setBodyMeasurements(updated);
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
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 gap-5 w-200 max-h-[90vh]">
                    <button
                        onClick={() => close()}
                        className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3"
                        title="Fechar"
                    >
                        ✕
                    </button>
                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        {isEditing ? 'Editando Visita Veterinária' : 'Nova Visita Veterinária'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Detalhes da Visita */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Animal</label>
                                <select
                                    value={liveAnimalId}
                                    onChange={(e) => setLiveAnimalId(Number(e.target.value))}
                                    className="border border-border rounded p-2 bg-white"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.liveAnimals.map(a => (
                                        <option key={a.id} value={a.id}>{a.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Veterinário</label>
                                <select
                                    value={veterinarianId}
                                    onChange={(e) => setVeterinarianId(Number(e.target.value))}
                                    className="border border-border rounded p-2 bg-white"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {options.veterinarians.map(v => (
                                        <option key={v.id} value={v.id}>{v.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Data da Realização</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="border border-border rounded p-2"
                                    required
                                />
                            </div>

                            <div className="flex flex-col col-span-2">
                                <label className="text-sm font-bold mb-1 text-left">Foto do Animal (Opcional)</label>
                                <input
                                    type="text"
                                    value={animalPicture}
                                    onChange={(e) => setAnimalPicture(e.target.value)}
                                    className="border border-border rounded p-2"
                                    placeholder="Digite o link da foto do animal..."
                                />
                            </div>

                            <div className="flex flex-col col-span-2">
                                <label className="text-sm font-bold mb-1 text-left">Observações (Opcional)</label>
                                <input
                                    type="text"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="border border-border rounded p-2"
                                    placeholder="Digite as observações..."
                                />
                            </div>
                        </div>

                        {/* Medidas Corporais */}
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-left">Medidas Corporais (Opcional)</label>
                            </div>

                            {bodyMeasurements.map((bm, index) => {
                                const selectedType = options.bodyMeasurementTypes.find(t => t.id === bm.bodyMeasurementTypeId);
                                return (
                                    <div key={index} className="relative flex gap-2 items-end bg-white p-3 border border-border rounded mb-2">
                                        <div className="flex flex-col flex-1">
                                            <label className="text-xs font-bold mb-1 text-left">Tipo</label>
                                            <input
                                                type="text"
                                                className='border border-border rounded p-2 bg-gray-100'
                                                value={selectedType?.description}
                                                disabled
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-col w-32">
                                            <label className="text-xs font-bold mb-1 text-left">
                                                Valor {selectedType ? `(${selectedType.unit})` : ''}
                                            </label>
                                            <input
                                                type="number"
                                                step="1"
                                                min={1}
                                                value={bm.value}
                                                onChange={(e) => handleUpdateMeasurement(index, 'value', e.target.value)}
                                                className='border border-border rounded p-2 bg-white'
                                                placeholder="0"
                                                required
                                            />
                                        </div>

                                        <div className="absolute -top-[10px] right-2 flex items-center bg-white px-2  rounded">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMeasurement(index)}
                                                className="text-standard-red font-bold text-xs cursor-pointer"
                                                title="Remover medida"
                                            >
                                                ✕ Remover
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* Adicionar Medidas Corporais */}
                            {options.bodyMeasurementTypes.filter(bm => !bodyMeasurements.some(bmm => bmm.bodyMeasurementTypeId === bm.id)).length > 0 && (
                                <div className="flex items-center gap-3 border border-dashed border-border rounded p-3">
                                    <label className="text-sm font-bold text-text-main whitespace-nowrap">Adicionar Medida:</label>
                                    <select
                                        value=""
                                        onChange={(e) => {
                                            if (e.target.value) handleAddMeasurement(Number(e.target.value));
                                        }}
                                        className="border border-border rounded p-2 bg-white h-10 flex-1"
                                    >
                                        <option value="">Selecione uma medida para adicionar...</option>
                                        {options.bodyMeasurementTypes.filter(bm => !bodyMeasurements.some(bmm => bmm.bodyMeasurementTypeId === bm.id)).map(bm => (
                                            <option key={bm.id} value={bm.id}>{bm.description}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {(bodyMeasurements.length === 0 && options.bodyMeasurementTypes.length === 0) && (
                            <p className="text-sm text-text-light-gray italic text-center">Nenhuma medida disponível para adicionar.</p>
                        )}

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
    );
}