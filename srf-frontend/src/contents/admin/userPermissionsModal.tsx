import { useEffect, useState } from "react";
import type { User } from "./users";
import { getGroups } from "../../services/groupsService";
import { getAccessLevelOptions, getForms } from "../../services/formService";
import { getUserAccess, updateUserAccess } from "../../services/userService";
import { ModalPortal } from "../../components/modalPortal";

interface UserPermissionsModalProps {
    user: User,
    close: () => void,
}


interface Form {
    id: string,
    name: string,
}

interface AccessLevel {
    id: string,
    value: number,
    name: string,
}

export interface UserAccess {
    formId: string,
    accessLevelId: string,
}

interface Group {
    id: string,
    name: string,
    groupAccess: UserAccess[],
}

export function UserPermissionsModal({ user, close }: UserPermissionsModalProps) {
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const [userGroup, setUserGroup] = useState<{ id: string, name: string } | null>(null);
    const [forms, setForms] = useState<{ category: string, forms: Form[] }[]>([]);
    const [accessLevelOptions, setAccessLevelOptions] = useState<AccessLevel[]>([]);
    const [editedUserAccess, setEditedUserAccess] = useState<UserAccess[]>([]);


    useEffect(() => {
        async function fetchGroups() {
            const groups = await getGroups();
            setGroups(groups);
        }
        async function fetchForms() {
            const forms = await getForms();
            setForms(forms);
        }

        async function fetchAccessLevelOptions() {
            const accessLevel = await getAccessLevelOptions();
            const orderedAccessLevelOptions = accessLevel.sort((a: AccessLevel, b: AccessLevel) => a.value - b.value);
            setAccessLevelOptions(orderedAccessLevelOptions);
        }

        async function fetchUserAccess() {
            const userAccess = await getUserAccess(user.id) as unknown as UserAccess[];
            setEditedUserAccess(userAccess);
        }


        fetchGroups();
        fetchForms();
        fetchAccessLevelOptions();
        fetchUserAccess();
    }, []);

    useEffect(() => {
        async function userHasGroup() {
            for (let i = 0; i < groups.length; i++) {
                let hasGroup = true;
                for (let j = 0; j < groups[i].groupAccess.length; j++) {
                    if (groups[i].groupAccess[j].formId !== editedUserAccess.find(a => a.formId === groups[i].groupAccess[j].formId)?.formId || groups[i].groupAccess[j].accessLevelId !== editedUserAccess.find(a => a.formId === groups[i].groupAccess[j].formId)?.accessLevelId) {
                        hasGroup = false;
                        break;
                    }
                }
                if (hasGroup) {
                    setUserGroup({ id: groups[i].id, name: groups[i].name });
                    return;
                }
            }
            setUserGroup(null);
        }

        userHasGroup();
    }, [groups, editedUserAccess]);



    async function handleSubmitFormsPermissions(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            const newUserAccess = await updateUserAccess(user.id, editedUserAccess);
            console.log(newUserAccess);
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
            close();
        }
    }

    function handleAccessLevelChange(formId: string, accessLevel: string) {
        setEditedUserAccess(prevAccess => {
            const newAccess = [...prevAccess];
            const existingIndex = newAccess.findIndex((a) => a.formId === formId);

            if (existingIndex !== -1) {
                if (newAccess[existingIndex].accessLevelId === accessLevel) {
                    newAccess.splice(existingIndex, 1);
                } else {
                    newAccess[existingIndex] = { formId, accessLevelId: accessLevel };
                }
            } else {
                newAccess.push({ formId, accessLevelId: accessLevel })
            }
            return newAccess;
        });
    }

    function handleGroupChange(groupId: string) {
        const group = groups.find(g => g.id === groupId);
        console.log(group);
        if (group) {
            setEditedUserAccess(group.groupAccess);
        }
    }

    return (
        <ModalPortal>
            <div
                onMouseDown={close}
                className="modal-overlay flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-100">
                <div onMouseDown={(e) => e.stopPropagation()} className="modal relative flex flex-col bg-white justify-center items-center rounded-2xl shadow-xl px-10 pt-12 pb-6 w-320 h-[90%]">

                    <button
                        onClick={() => close()}
                        className="absolute text-text-main hover:text-standard-red font-bold text-xl cursor-pointer leading-none top-3 right-3"
                        title="Fechar"
                    >
                        ✕
                    </button>


                    <h2 className="text-2xl text-standard-blue font-bold absolute top-2">
                        Editando Permissões
                    </h2>

                    <div className="size-full flex flex-col gap-5">
                        <div className="flex gap-5 w-full">
                            <div className="flex flex-col w-2/6">
                                <label htmlFor="name" className="text-sm text-left font-bold mb-1">Usuário:</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    disabled
                                    className="border border-border bg-gray-100 rounded-md p-2"
                                />
                            </div>
                            <div className="flex flex-col w-2/6">
                                <label htmlFor="group" className="text-sm text-left font-bold mb-1">Grupo:</label>
                                <select
                                    id="group"
                                    value={userGroup?.id ?? ''}
                                    onChange={(e) => handleGroupChange(e.target.value)}
                                    disabled={user.role.name === 'admin' || user.role.name === 'owner'}
                                    className="border border-border rounded-md p-2 disabled:bg-gray-100"
                                >
                                    {userGroup ? <option value={userGroup.id}>{userGroup.name}</option> : <option value="">{user.role.name === 'admin' || user.role.name === 'owner' ? 'Administradores não precisam de grupo' : 'Selecione um grupo (opcional)'}</option>}
                                    {groups.map((group) => (
                                        <option key={group.id} value={group.id}>{group.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <form onSubmit={(e) => handleSubmitFormsPermissions(e)} className="w-full flex-1 min-h-0 flex flex-col justify-between">
                            <div className="w-full flex-1 min-h-0 overflow-y-auto mb-5">
                                {forms.map((category) => (
                                    <table key={category.category} className="w-full text-left border-collapse">
                                        <thead className="bg-form-bg border-b border-border">
                                            <tr>
                                                <th className="w-2/3 p-2">{category.category}</th>
                                                <th className="w-1/3 p-2">Nível de Acesso</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {category.forms.map((form) => (
                                                <tr key={category.category + '-' + form.id} className="border-b border-border">
                                                    <td className="w-2/3 p-2">
                                                        <p>{form.name}</p>
                                                    </td>
                                                    <td className="w-1/3 p-2">
                                                        <div className="flex">
                                                            {accessLevelOptions.map((accessLevel) => (
                                                                <label key={accessLevel.id + '-' + form.id} className="flex items-center gap-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        name={`accessLevel-${form.id}`}
                                                                        value={accessLevel.id}
                                                                        checked={editedUserAccess.find((access) => access.formId === form.id)?.accessLevelId === accessLevel.id}
                                                                        onChange={() => handleAccessLevelChange(form.id, accessLevel.id)}
                                                                        disabled={user.role.name === 'admin' || user.role.name === 'owner'}
                                                                        className="accent-standard-blue"
                                                                    />
                                                                    <p className="mr-8">{accessLevel.name}</p>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ))}
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
            </div>
        </ModalPortal>
    )
}