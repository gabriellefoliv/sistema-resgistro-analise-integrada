import { useState } from "react";
import { NecropsyEctoparasiteAnalysisFormModal } from "./formNecropsyEctoparasiteAnalysisModal";
import greenPlusIcon from "../../../assets/greenPlus.svg";
import grayPlusIcon from "../../../assets/grayPlus.svg";

export function NecropsyEctoparasiteAnalysisToolBar({ refresh }: { refresh: () => void }) {
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
                <NecropsyEctoparasiteAnalysisFormModal
                    close={() => setShowCreateModal(false)}
                    refresh={refresh}
                />
            )}
        </>
    );
}
