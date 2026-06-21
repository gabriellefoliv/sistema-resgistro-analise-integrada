import React, { useState, useEffect } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllDeadAnimalOutput,
    type GetFormOptionsDeadAnimalOutput
} from "srf-shared-types";
import {
    getDeadAnimalFormOptions,
    createDeadAnimal,
    updateDeadAnimal
} from "../../../services/deadanimals/deadAnimalService";

interface DeadAnimalFormModalProps {
    deadAnimal?: GetAllDeadAnimalOutput;
    close: () => void;
    refresh: () => void;
}

export function DeadAnimalFormModal({ deadAnimal, close, refresh }: DeadAnimalFormModalProps) {
    const isEditing = !!deadAnimal;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [options, setOptions] = useState<GetFormOptionsDeadAnimalOutput | null>(null);

    const [code, setCode] = useState<string>(deadAnimal?.code ?? '');
    const [deadAnimalGroupId, setDeadAnimalGroupId] = useState<number | ''>(deadAnimal?.deadAnimalGroupId ?? '');
    const [specieId, setSpecieId] = useState<number | ''>(deadAnimal?.specieId ?? '');
    const [deadAnimalOriginId, setDeadAnimalOriginId] = useState<number | ''>(deadAnimal?.deadAnimalOriginId ?? '');
    const [deadAnimalStatusId, setDeadAnimalStatusId] = useState<number | ''>(deadAnimal?.deadAnimalStatusId ?? '');
    const [collectionDate, setCollectionDate] = useState(deadAnimal?.collectionDate ? deadAnimal.collectionDate.split('T')[0] : '');
    const [collectionResponsibleId, setCollectionResponsibleId] = useState<number | ''>(deadAnimal?.collectionResponsibleId ?? '');
    const [collectionLatitude, setCollectionLatitude] = useState<number | ''>(deadAnimal?.collectionLatitude ?? '');
    const [collectionLongitude, setCollectionLongitude] = useState<number | ''>(deadAnimal?.collectionLongitude ?? '');
    const [imageLink, setImageLink] = useState<string>(deadAnimal?.imageLink ?? '');
    const [note, setNote] = useState<string>(deadAnimal?.note ?? '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getDeadAnimalFormOptions();
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
        setError('');
        try {
            const data = {
                code: code,
                deadAnimalGroupId: Number(deadAnimalGroupId),
                specieId: Number(specieId),
                deadAnimalOriginId: Number(deadAnimalOriginId),
                deadAnimalStatusId: Number(deadAnimalStatusId),
                collectionDate: collectionDate,
                collectionResponsibleId: Number(collectionResponsibleId),
                collectionLatitude: Number(collectionLatitude),
                collectionLongitude: Number(collectionLongitude),
                imageLink: imageLink || undefined,
                note: note || undefined
            };
            if (isEditing && deadAnimal) {
                await updateDeadAnimal(deadAnimal.id, data);
            } else {
                await createDeadAnimal(data);
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
                        {isEditing ? 'Editando Animal Morto' : 'Novo Animal Morto'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Campos do Animal Morto */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Código</label>
                                <input type="text" value={code} onChange={(e) => setCode(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="Digite o código..." required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Grupo Animal</label>
                                <select value={deadAnimalGroupId} onChange={(e) => setDeadAnimalGroupId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.deadAnimalGroups.map(g => (<option key={g.id} value={g.id}>{g.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Espécie</label>
                                <select value={specieId} onChange={(e) => setSpecieId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.species.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Origem</label>
                                <select value={deadAnimalOriginId} onChange={(e) => setDeadAnimalOriginId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.deadAnimalOrigins.map(o => (<option key={o.id} value={o.id}>{o.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Status</label>
                                <select value={deadAnimalStatusId} onChange={(e) => setDeadAnimalStatusId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.deadAnimalStatuses.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Data da Coleta</label>
                                <input type="date" value={collectionDate} onChange={(e) => setCollectionDate(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Responsável pela Coleta</label>
                                <select value={collectionResponsibleId} onChange={(e) => setCollectionResponsibleId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.collectionResponsibles.map(r => (<option key={r.id} value={r.id}>{r.name}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Latitude</label>
                                <input type="number" step="any" value={collectionLatitude} onChange={(e) => setCollectionLatitude(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Longitude</label>
                                <input type="number" step="any" value={collectionLongitude} onChange={(e) => setCollectionLongitude(e.target.value ? Number(e.target.value) : '')}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="0" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Imagem (Opcional)</label>
                                <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="Digite o link da imagem..." />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Observações (Opcional)</label>
                                <textarea value={note} onChange={(e) => setNote(e.target.value)}
                                    className="border border-border rounded p-2 bg-white min-h-[60px]" placeholder="Digite observações..." />
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
