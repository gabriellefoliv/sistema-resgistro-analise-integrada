import { useState } from "react";
import { NecropsyFormModal } from './formNecropsyModal';
import greenPlusIcon from "../../../assets/greenPlus.svg";
import grayPlusIcon from "../../../assets/grayPlus.svg";

export function NecropsyToolBar({ refresh }: { refresh: () => void }) {
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
                <NecropsyFormModal
                    close={() => setShowCreateModal(false)}
                    refresh={refresh}
                />
            )}
        </>
    );
}
