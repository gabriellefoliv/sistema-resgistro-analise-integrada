import { useState } from "react";
import type { User } from "./users";
import { updateUserDetails, updateUserRole } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";
import userImg from "../../assets/loginUser.svg";
import { ModalPortal } from "../../components/modalPortal";

interface EditUserModalProps {
    user: User
    close: () => void,
    refresh: () => void,
}

export function EditUserModal({ user, close, refresh }: EditUserModalProps) {
    const { user: currentUser, updateUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [editError, setEditError] = useState<{ name?: string, email?: string, role?: string } | null>(null);
    const [editName, setEditName] = useState(user.name);
    const [editEmail, setEditEmail] = useState(user.email);
    const [editRole, setEditRole] = useState(user.role?.name);

    async function handleSubmitEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setEditError(null);
        try {
            await updateUserDetails({ id: user.id, name: editName, email: editEmail });
            if (editRole !== user.role?.name) await updateUserRole({ id: user.id, roleName: editRole });
            if (user.id === currentUser?.id) {
                updateUser({ name: editName, email: editEmail, role: editRole });
            }
            refresh();
            close();
        } catch (error: any) {
            console.error(error);
            if (error.response?.data?.message === 'Email já cadastrado') {
                setEditError({ email: 'Email já cadastrado' });
            } else if (error.response?.data?.message === 'Função não existe') {
                setEditError({ role: 'Função não existe' });
            } else if (error.response?.data?.message.name[0] === 'Nome inválido') {
                setEditError({ name: 'Nome inválido' });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalPortal>
            <div className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100">
                <div onClick={(e) => e.stopPropagation()} className="modal relative flex flex-col bg-white justify-center items-center rounded-2xl shadow-xl p-10 gap-5 w-160">
                    <button
                        onClick={() => close()}
                        className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3"
                        title="Fechar"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl text-standard-blue font-bold absolute top-2">
                        Editando Usuário
                    </h2>

                    <form onSubmit={(e) => handleSubmitEdit(e)} className="w-full h-full flex flex-col items-center justify-between gap-5 mt-5">
                        <div className="flex justify-center items-center rounded-full overflow-hidden size-24 bg-[#444141]">
                            <img src={user.userPic || userImg} alt="User picture" />
                        </div>

                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-sm text-left font-bold mb-1">Nome</label>
                                {(user.id === currentUser?.id || user.role.name !== 'owner') ? (
                                    <input
                                        type="text"
                                        id="name"
                                        value={editName}
                                        onChange={(e) => { setEditName(e.target.value); setEditError(null); }}
                                        className="border border-border rounded p-2"
                                    />
                                ) : (
                                    <input type="text" value={editName} disabled className="border border-border rounded p-2 bg-gray-100" />
                                )}
                                {editError?.name && <p className="text-red-500 text-left text-sm">{editError.name}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm text-left font-bold mb-1">Email</label>
                                {(user.id === currentUser?.id || user.role.name !== 'owner') ? (
                                    <input
                                        type="email"
                                        id="email"
                                        value={editEmail}
                                        onChange={(e) => { setEditEmail(e.target.value); setEditError(null); }}
                                        className="border border-border rounded p-2"
                                    />
                                ) : (
                                    <input type="text" value={editEmail} disabled className="border border-border rounded p-2 bg-gray-100" />
                                )}
                                {editError?.email && <p className="text-red-500 text-left text-sm">{editError.email}</p>}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="role" className="text-sm text-left font-bold mb-1">Função</label>
                                {user.role?.name !== 'owner' ? (
                                    <select
                                        id="role"
                                        value={editRole}
                                        onChange={(e) => { setEditRole(e.target.value); setEditError(null); }}
                                        className="border border-border rounded p-2 bg-white"
                                    >
                                        <option value="common">Usuário Comum</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                ) : (
                                    <input type="text" value="Super Admin" disabled className="border border-border rounded p-2 bg-gray-100" />
                                )}
                                {editError?.role && <p className="text-red-500 text-left text-sm">{editError.role}</p>}
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-5">
                            <button
                                type="submit"
                                className="bg-standard-blue text-white text-xl font-bold py-2 px-5 rounded-xl cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? 'Salvando...' : 'Salvar'}
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