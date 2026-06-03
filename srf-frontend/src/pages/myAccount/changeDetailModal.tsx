import { ModalPortal } from "../../components/modalPortal";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateUserDetails } from "../../services/userService";

export function ChangeDetailModal({ close, refresh }: { close: () => void, refresh: () => void }) {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserDetails({ id: user!.id, name, email });
            updateUser({ name, email });
            refresh();
            close();
        } catch (error) {
            setError("Erro ao atualizar dados.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalPortal>
            <div
                onMouseDown={close}
                className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 p-4">
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col bg-white w-full max-w-lg justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-3">
                    <button
                        onClick={() => close()}
                        className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3"
                        title="Fechar"
                    >
                        ✕
                    </button>

                    <h2 className="absolute top-2 text-2xl text-standard-blue font-bold">
                        Alteração de Dados
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center justify-center">

                        <div className="flex flex-col w-full mb-4">
                            <label className="text-sm font-bold mb-1 text-left">Nome</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} className="border border-border rounded p-2 bg-white h-10" required />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-bold mb-1 text-left">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="border border-border rounded p-2 bg-white h-10" required />
                        </div>

                        {error && <p className="text-standard-red text-center mt-4">{error}</p>}

                        <div className="flex justify-center items-center gap-5 mt-4">
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