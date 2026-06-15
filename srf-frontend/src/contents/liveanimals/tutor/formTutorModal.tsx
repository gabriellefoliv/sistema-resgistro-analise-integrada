import React, { useState, useEffect } from "react";
import { ModalPortal } from "../../../components/modalPortal";
import {
    type GetAllTutorOutput,
    type GetFormOptionsTutorOutput
} from "srf-shared-types";
import {
    getTutorFormOptions,
    createTutor,
    updateTutor
} from "../../../services/liveanimals/tutorService";

interface TutorFormModalProps {
    tutor?: GetAllTutorOutput;
    close: () => void;
    refresh: () => void;
}

export function TutorFormModal({ tutor, close, refresh }: TutorFormModalProps) {
    const isEditing = !!tutor;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [options, setOptions] = useState<GetFormOptionsTutorOutput | null>(null);

    const [name, setName] = useState<string>(tutor?.name ?? '');
    const [genderId, setGenderId] = useState<number | ''>(tutor?.genderId ?? '');
    const [birthDate, setBirthDate] = useState(tutor?.birthDate ? tutor.birthDate.split('T')[0] : '');

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts = await getTutorFormOptions();
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
                name: name,
                genderId: Number(genderId),
                birthDate: birthDate,
            };
            if (isEditing && tutor) {
                await updateTutor(tutor.id, data);
            } else {
                await createTutor(data);
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
                        {isEditing ? 'Editando Tutor' : 'Novo Tutor'}
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col overflow-y-auto gap-4 mt-2 flex-1 min-h-0">
                        {/* Campos do Tutor */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col col-span-2">
                                <label className="text-sm font-bold mb-1 text-left">Nome</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10" placeholder="Digite o nome do tutor..." required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Data de Nascimento</label>
                                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                                    className="border border-border rounded p-2 bg-white h-10" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold mb-1 text-left">Gênero</label>
                                <select value={genderId} onChange={(e) => setGenderId(e.target.value ? Number(e.target.value) : '')} className="border border-border rounded p-2 bg-white h-10" required>
                                    <option value="">Selecione...</option>
                                    {options.genders.map(g => (<option key={g.id} value={g.id}>{g.name}</option>))}
                                </select>
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
