import { useState } from "react";
import { type GetAllBasicRegistrationsOutput, type GetFormOptionsBasicRegistrationOutput } from "srf-shared-types";
import { BasicRegistrationFormModal } from "./formBasicRegistrationModal";
import { BasicRegistrationDeleteModal } from "./deleteBasicRegistrationModal";

interface BasicRegistrationActionsProps {
    item: GetAllBasicRegistrationsOutput;
    refresh: () => void;
    getFormOptions: () => Promise<GetFormOptionsBasicRegistrationOutput>;
    create: (data: any) => Promise<any>;
    update: (recordId: number, data: any) => Promise<any>;
    deleteRecord: (recordId: number, type: string) => Promise<any>;
    entityLabel: string;
}

export function BasicRegistrationActions({ item, refresh, getFormOptions, create, update, deleteRecord, entityLabel }: BasicRegistrationActionsProps) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            {showFormModal && (
                <BasicRegistrationFormModal
                    record={item}
                    close={() => setShowFormModal(false)}
                    refresh={refresh}
                    getFormOptions={getFormOptions}
                    create={create}
                    update={update}
                    entityLabel={entityLabel}
                />
            )}
            {showDeleteModal && (
                <BasicRegistrationDeleteModal
                    record={item}
                    close={() => setShowDeleteModal(false)}
                    refresh={refresh}
                    deleteRecord={deleteRecord}
                />
            )}
            <div className="flex gap-2 text-xs font-bold uppercase">
                {item.canEdit && (
                    <button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">
                        Editar
                    </button>
                )}
                {item.canEdit && (
                    <button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">
                        Excluir
                    </button>
                )}
            </div>
        </>
    );
}
