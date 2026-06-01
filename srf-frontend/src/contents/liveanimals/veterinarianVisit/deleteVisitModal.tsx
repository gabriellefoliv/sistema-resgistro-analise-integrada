import { useState } from "react";
import {
    type VeterinarianVisitData,
    deleteVeterinarianVisit
} from "../../../services/liveanimals/veterinarianVisitService";
import { ModalPortal } from "../../../components/modalPortal";

interface DeleteVisitModalProps {
    visit: VeterinarianVisitData;
    close: () => void;
    refresh: () => void;
}

export function DeleteVisitModal({ visit, close, refresh }: DeleteVisitModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await deleteVeterinarianVisit(visit.id);
            refresh();
            close();
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.error || 'Erro ao excluir');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalPortal>
            <div
                onClick={close}
                className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 p-4">
                <div onClick={(e) => e.stopPropagation()} className="modal relative flex flex-col bg-white w-full max-w-lg justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-3">
                    <button
                        onClick={() => close()}
                        className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3"
                        title="Fechar"
                    >
                        ✕
                    </button>

                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        Confirmação de Exclusão
                    </h2>

                    <form onSubmit={handleDelete} className="w-full h-full flex flex-col items-center justify-center">
                        <p className="text-xl text-center">
                            Deseja realmente excluir a visita do animal <span className="font-bold">{visit.liveAnimalName}</span> do dia <span className="font-bold">{visit.dateFormatted}</span> realizada pelo veterinário <span className="font-bold">{visit.veterinarianName}</span>?
                        </p>

                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                        <div className="flex justify-center items-center gap-5 mt-4">
                            <button
                                type="submit"
                                className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? 'Confirmando...' : 'Confirmar'}
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