import { useState } from "react";
import type { User } from "./users";
import { deleteUser } from "../../services/userService";
import { ModalPortal } from "../../components/modalPortal";


interface DeleteUserModalProps {
    user: User,
    close: () => void,
    refresh: () => void
}

export function DeleteUserModal({ user, close, refresh }: DeleteUserModalProps) {
    const [loading, setLoading] = useState(false);

    async function handleSubmitDelete(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            await deleteUser(user.id);
            refresh();
            close();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalPortal>
            <div
                onMouseDown={close}
                className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100 p-4">
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col bg-white w-full max-w-lg justify-center items-center rounded-2xl shadow-xl p-6 md:p-10">

                    <button
                        onClick={() => close()}
                        className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3"
                        title="Fechar"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl text-standard-blue font-bold -mt-6 mb-6">
                        Confirmação de Exclusão
                    </h2>

                    <form onSubmit={(e) => handleSubmitDelete(e)} className="w-full h-full flex flex-col items-center justify-center">
                        <p className="text-xl text-center">Deseja realmente excluir o usuário <span className="font-bold">{user.name}</span> ?</p>

                        <div className="flex justify-center items-center gap-5 mt-4">
                            <button
                                type="submit"
                                className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? 'Confirmando...' : 'Confirmar'}
                            </button>
                            <button
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