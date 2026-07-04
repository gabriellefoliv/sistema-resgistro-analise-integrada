import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllTutorOutput } from "srf-shared-types";
import { getTutors } from "../../../services/liveanimals/tutorService";
import { SideDrawer } from "../../../components/sideDrawer";

interface TutorSideDrawerFilters {
    tutorId?: number;
}

interface TutorSideDrawerProps {
    filters: TutorSideDrawerFilters;
    onClose: () => void;
}

export function TutorSideDrawer({ filters, onClose }: TutorSideDrawerProps) {
    const [tutors, setTutors] = useState<GetAllTutorOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getTutors()
            .then(all => {
                const filtered = all
                    .map(tutor => ({
                        ...tutor,
                        birthDateFormatted: tutor.birthDate
                            ? new Date(tutor.birthDate).toLocaleDateString('pt-BR')
                            : '',
                    }))
                    .filter(tutor => {
                        if (filters.tutorId && tutor.id !== filters.tutorId) return false;
                        return true;
                    });
                setTutors(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.tutorId]);

    const pageFilters: any[] = [];
    const first = tutors[0];
    if (first) {
        pageFilters.push({ field: 'name', value: { type: 'text' as const, term: first.name } });
    }
    const pageUrl = `/animaisvivos/entrevistas/tutor?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Tutor"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de tutores"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando tutor...
                </div>
            )}

            {!loading && tutors.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhum tutor encontrado.
                </div>
            )}

            {!loading && tutors.length > 0 && (
                <div className="flex flex-col gap-3">
                    {tutors.map(tutor => (
                        <div key={tutor.id} className="border border-border rounded bg-form-bg">
                            <div className="px-4 py-4">
                                <h4 className="font-bold text-text-main text-xs uppercase mb-3 border-b border-gray-600 pb-1">
                                    Detalhes do Tutor
                                </h4>
                                <div className="gap-2 w-full text-sm grid grid-cols-2">
                                    <Field label="Nome" value={tutor.name} />
                                    <Field label="Gênero" value={tutor.genderName} />
                                    <Field label="Data de Nascimento" value={tutor.birthDateFormatted || ''} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </SideDrawer>
    );
}

function Field({ label, value, fullWidth }: { label: string; value: string; fullWidth?: boolean }) {
    return (
        <div className={`flex flex-col ${fullWidth ? 'col-span-2' : ''}`}>
            <label className="ml-1 font-bold text-xs text-text-main">{label}</label>
            <input
                type="text"
                disabled
                value={value}
                className="border border-border rounded px-2 py-1 text-text-input text-sm"
            />
        </div>
    );
}
