import { useState } from "react";
import { type GetAllCastrationOutput } from "srf-shared-types";
import { CastrationFormModal } from "./formCastrationModal";
import { DeleteCastrationModal } from "./deleteCastrationModal";
import { VeterinarianVisitSideDrawer } from "../veterinarianVisit/veterinarianVisitSideDrawer";
import { LiveAnimalSideDrawer } from "../liveAnimal/liveAnimalSideDrawer";

export function CastrationExpansion({ item, close, refresh }: { item: GetAllCastrationOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVeterinarianVisitDrawer, setShowVeterinarianVisitDrawer] = useState(false);
    const [showLiveAnimalDrawer, setShowLiveAnimalDrawer] = useState(false);

    return (
        <>
            {showFormModal && (
                <CastrationFormModal
                    castration={item}
                    close={() => setShowFormModal(false)}
                    refresh={refresh}
                />
            )}
            {showDeleteModal && (
                <DeleteCastrationModal
                    castration={item}
                    close={() => setShowDeleteModal(false)}
                    refresh={refresh}
                />
            )}
            {showLiveAnimalDrawer && (
                <LiveAnimalSideDrawer
                    filters={{ liveAnimalId: item.liveAnimalId }}
                    onClose={() => setShowLiveAnimalDrawer(false)}
                />
            )}
            {showVeterinarianVisitDrawer && item.veterinarianVisitId && (
                <VeterinarianVisitSideDrawer
                    filters={{ liveAnimalId: item.liveAnimalId }}
                    onClose={() => setShowVeterinarianVisitDrawer(false)}
                />
            )}

            {/* ==== Cabeçalho de Expansão ==== */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes da Castração</h3>
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
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="flex gap-2 w-full text-sm">
                    {/* Animal */}
                    <div className="flex flex-col w-5/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={item.liveAnimalCode} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Data */}
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Data</label>
                        <input type="text" disabled value={item.dateFormatted || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Observações */}
                    <div className="flex flex-col w-4/12">
                        <label className="ml-1 font-bold">Observações</label>
                        <input type="text" disabled value={item.note || 'Nenhuma observação informada'} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* ==== Registros Associados ==== */}
            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Registros Associados</h3>
            </div>
            <div className="gap-2 w-full text-sm flex flex-wrap mb-1">
                {/* Animal */}
                <button
                    onClick={() => setShowLiveAnimalDrawer(true)}
                    className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                >
                    Animal
                </button>
                {/* Visita Veterinária */}
                {item.veterinarianVisitId && (
                    <button
                        onClick={() => setShowVeterinarianVisitDrawer(true)}
                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                    >
                        Visita Veterinária
                    </button>
                )}
            </div>
        </>
    );
}
