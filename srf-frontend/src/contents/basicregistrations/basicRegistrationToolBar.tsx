import { useState } from "react";
import { BasicRegistrationFormModal } from "./formBasicRegistrationModal";
import greenPlusIcon from "../../assets/greenPlus.svg";
import grayPlusIcon from "../../assets/grayPlus.svg";
import type { GetFormOptionsBasicRegistrationOutput } from "srf-shared-types";

interface BasicRegistrationToolBarProps {
    refresh: () => void;
    getFormOptions: () => Promise<GetFormOptionsBasicRegistrationOutput>;
    create: (data: any) => Promise<any>;
    update: (recordId: number, data: any) => Promise<any>;
    entityLabel: string;
}

export function BasicRegistrationToolBar({ refresh, getFormOptions, create, update, entityLabel }: BasicRegistrationToolBarProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowCreateModal(true)}
                className={`flex items-center justify-center bg-form-bg w-10 rounded-t-xl cursor-pointer ${showCreateModal ? "h-8" : "h-6"} hover:h-8`}
                title="Novo Registro"
            >
                <img src={showCreateModal ? greenPlusIcon : grayPlusIcon} alt="Novo Registro" className="w-4 h-4" />
            </button>
            {showCreateModal && (
                <BasicRegistrationFormModal
                    close={() => setShowCreateModal(false)}
                    refresh={refresh}
                    getFormOptions={getFormOptions}
                    create={create}
                    update={update}
                    entityLabel={entityLabel}
                />
            )}
        </>
    );
}
