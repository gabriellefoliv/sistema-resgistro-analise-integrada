import { useState } from "react";
import { type GetAllVaccineOutput } from "srf-shared-types";
import { VaccineFormModal } from "./formVaccineModal";
import { DeleteVaccineModal } from "./deleteVaccineModal";
import { LiveAnimalSideDrawer } from "../liveAnimal/liveAnimalSideDrawer";
import { VeterinarianVisitSideDrawer } from "../veterinarianVisit/veterinarianVisitSideDrawer";

export function VaccineExpansion({ item, close, refresh }: { item: GetAllVaccineOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLiveAnimalDrawer, setShowLiveAnimalDrawer] = useState(false);
    const [showVeterinarianVisitDrawer, setShowVeterinarianVisitDrawer] = useState(false);

    return (
        <>
            {showFormModal && (
                <VaccineFormModal
                    vaccine={item}
                    close={() => setShowFormModal(false)}
                    refresh={refresh}
                />
            )}
            {showDeleteModal && (
                <DeleteVaccineModal
                    vaccine={item}
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
                    filters={{ veterinarianVisitId: item.veterinarianVisitId }}
                    onClose={() => setShowVeterinarianVisitDrawer(false)}
                />
            )}
            {/* ==== Cabeçalho de Expansão ==== */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes da Vacina</h3>
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
                    {/* Vacina */}
                    <div className="flex flex-col w-3/12">
                        <label htmlFor="date" className="ml-1 font-bold">Vacina</label>
                        <input type="text" disabled value={item.vaccineName || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Animal */}
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Código do Animal</label>
                        <input type="text" disabled value={item.liveAnimalCode} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Tipo de Aplicação */}
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Tipo de Aplicação</label>
                        <input type="text" disabled value={item.vaccineTypeName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    {/* Data da Aplicação */}
                    <div className="flex flex-col w-2/12">
                        <label className="ml-1 font-bold">Data da Aplicação</label>
                        <input type="text" disabled value={item.applicationDateFormatted} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* ==== Corpo da Expansão ==== */}
            {item.veterinarianVisitId && (
                <>
                    <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                        <h3 className="font-bold text-text-main uppercase">Visita Veterinária Associada</h3>
                    </div>
                    <div className="gap-2 w-full text-sm grid grid-cols-3 mb-1">
                        {/* Data da Visita */}
                        <div className="flex flex-col w-full">
                            <label className="ml-1 font-bold">Data da Visita (Data da Aplicação)</label>
                            <input type="text" disabled value={item.veterinarianVisitDateFormatted} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                        </div>
                        {/* Veterinário */}
                        <div className="flex flex-col w-full">
                            <label className="ml-1 font-bold">Veterinário</label>
                            <input type="text" disabled value={item.veterinarianName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}