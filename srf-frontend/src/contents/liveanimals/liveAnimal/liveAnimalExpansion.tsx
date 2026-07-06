import { useState } from "react";
import { type GetAllLiveAnimalOutput } from "srf-shared-types";
import { LiveAnimalFormModal } from "./formLiveAnimalModal";
import { DeleteLiveAnimalModal } from "./deleteLiveAnimalModal";
import { GpsTrackingSideDrawer } from "../gpsTracking/gpsTrackingSideDrawer";
import { VaccineSideDrawer } from "../vaccine/vaccineSideDrawer";
import { VeterinarianVisitSideDrawer } from "../veterinarianVisit/veterinarianVisitSideDrawer";
import { CastrationSideDrawer } from "../castration/castrationSideDrawer";
import { TutorSideDrawer } from "../tutor/tutorSideDrawer";

export function LiveAnimalExpansion({ item, close, refresh }: { item: GetAllLiveAnimalOutput; close: () => void; refresh: () => void }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showTutorDrawer, setShowTutorDrawer] = useState(false);
    const [showCastrationDrawer, setShowCastrationDrawer] = useState(false);
    const [showGpsTrackingDrawer, setShowGpsTrackingDrawer] = useState(false);
    const [showVaccineApplicationDrawer, setShowVaccineApplicationDrawer] = useState(false);
    const [showVeterinarianVisitDrawer, setShowVeterinarianVisitDrawer] = useState(false);

    return (
        <>
            {/* Modais */}
            {showFormModal && (
                <LiveAnimalFormModal liveAnimal={item} close={() => setShowFormModal(false)} refresh={refresh} />
            )}
            {showDeleteModal && (
                <DeleteLiveAnimalModal liveAnimal={item} close={() => setShowDeleteModal(false)} refresh={refresh} />
            )}

            {/* Side Drawers */}
            {showTutorDrawer && (
                <TutorSideDrawer
                    filters={{ tutorId: item.tutorId }}
                    onClose={() => setShowTutorDrawer(false)}
                />
            )}
            {showGpsTrackingDrawer && (
                <GpsTrackingSideDrawer
                    filters={{ liveAnimalId: item.id }}
                    onClose={() => setShowGpsTrackingDrawer(false)}
                />
            )}
            {showVaccineApplicationDrawer && (
                <VaccineSideDrawer
                    filters={{ liveAnimalId: item.id }}
                    onClose={() => setShowVaccineApplicationDrawer(false)}
                />
            )}
            {showVeterinarianVisitDrawer && (
                <VeterinarianVisitSideDrawer
                    filters={{ liveAnimalId: item.id }}
                    onClose={() => setShowVeterinarianVisitDrawer(false)}
                />
            )}
            {showCastrationDrawer && (
                <CastrationSideDrawer
                    filters={{ liveAnimalId: item.id }}
                    onClose={() => setShowCastrationDrawer(false)}
                />
            )}

            {/* Cabeçalho */}
            <div className="sticky top-0 z-10 bg-form-bg pb-2">
                <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                    <h3 className="font-bold text-text-main uppercase">Detalhes do Animal</h3>
                    <div className="flex gap-2 text-xs font-bold uppercase">
                        {item.canEdit && (<button onClick={() => setShowFormModal(true)} className="text-button-green uppercase cursor-pointer">Editar</button>)}
                        {item.canEdit && (<button onClick={() => setShowDeleteModal(true)} className="text-button-red uppercase cursor-pointer">Excluir</button>)}
                        <button onClick={close} className="text-standard-blue uppercase cursor-pointer">Recolher</button>
                    </div>
                </div>
                <div className="flex gap-2 w-full text-sm">
                    <div className="flex flex-col w-4/12">
                        <label className="ml-1 font-bold">Nome</label>
                        <input type="text" disabled value={item.name || ''} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-4/12">
                        <label className="ml-1 font-bold">Espécie</label>
                        <input type="text" disabled value={item.specieName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <label className="ml-1 font-bold">Ativo?</label>
                        <input type="text" disabled value={item.active ? "Sim" : "Não"} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            {/* Corpo */}
            <div className="gap-2 w-full text-sm grid grid-cols-3 mb-2">
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Data de Nascimento</label>
                    <input type="text" disabled value={item.birthDateFormatted} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Gênero</label>
                    <input type="text" disabled value={item.genderName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="ml-1 font-bold">Tutor</label>
                    <input type="text" disabled value={item.tutorName} className="mb-2 border border-border rounded px-2 py-1 text-text-input" />
                </div>
                <div className="flex flex-col w-full col-span-3">
                    <label className="ml-1 font-bold">Foto</label>
                    <div className="mb-2 border border-border rounded px-2 py-1 text-text-input">
                        {item.animalPicture ? (
                            <a href={item.animalPicture} target="_blank" rel="noopener noreferrer" className="text-standard-blue underline text-sm flex items-center gap-1">
                                {item.animalPicture}
                            </a>
                        ) : (
                            <span className="text-text-input text-sm">Nenhum link para foto informado</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full col-span-3">
                    <label className="ml-1 font-bold">Carteirinha</label>
                    <div className="mb-2 border border-border rounded px-2 py-1 text-text-input">
                        {item.cardLink ? (
                            <a href={item.cardLink} target="_blank" rel="noopener noreferrer" className="text-standard-blue underline text-sm flex items-center gap-1">
                                {item.cardLink}
                            </a>
                        ) : (
                            <span className="text-text-input text-sm">Nenhum link para carteirinha informado</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Registros Associados */}
            <div className="flex justify-between items-center pb-1 mb-2 border-b border-gray-600">
                <h3 className="font-bold text-text-main uppercase">Registros Associados</h3>
            </div>
            <div className="gap-2 w-full text-sm flex flex-wrap mb-1">
                <button
                    onClick={() => setShowTutorDrawer(true)}
                    className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                >
                    Tutor
                </button>
                {item.hasCastration && (
                    <button
                        onClick={() => setShowCastrationDrawer(true)}
                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                    >
                        Castração
                    </button>
                )}
                {item.hasGpsTracking && (
                    <button
                        onClick={() => setShowGpsTrackingDrawer(true)}
                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                    >
                        Rastreio de GPS
                    </button>
                )}
                {item.hasVaccineApplication && (
                    <button
                        onClick={() => setShowVaccineApplicationDrawer(true)}
                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                    >
                        Vacinas
                    </button>
                )}
                {item.hasVeterinarianVisit && (
                    <button
                        onClick={() => setShowVeterinarianVisitDrawer(true)}
                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                    >
                        Visitas Veterinárias
                    </button>
                )}
            </div>
        </>
    )
}