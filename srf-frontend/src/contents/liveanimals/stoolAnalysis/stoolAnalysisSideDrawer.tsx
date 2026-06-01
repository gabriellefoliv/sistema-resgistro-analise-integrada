import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllStoolAnalysisOutput } from "srf-shared-types";
import { getStoolAnalyses } from "../../../services/liveanimals/stoolAnalysisService";
import { SideDrawer } from "../../../components/sideDrawer";
import { EggCystAnalysisSideDrawer } from "../eggCystAnalysis/eggCystAnalysisSideDrawer";
import { MolecularAnalysisSideDrawer } from "../molecularAnalysis/molecularAnalysisSideDrawer";

interface StoolAnalysisSideDrawerFilters {
    veterinarianVisitId?: number;
    liveAnimalId?: number;
}

interface StoolAnalysisSideDrawerProps {
    filters: StoolAnalysisSideDrawerFilters;
    onClose: () => void;
}

export function StoolAnalysisSideDrawer({ filters, onClose }: StoolAnalysisSideDrawerProps) {
    const [results, setResults] = useState<GetAllStoolAnalysisOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [showEggCystDrawer, setShowEggCystDrawer] = useState(false);
    const [showMolecularDrawer, setShowMolecularDrawer] = useState(false);
    const [activeStoolAnalysisId, setActiveStoolAnalysisId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getStoolAnalyses()
            .then(all => {
                const filtered = all
                    .map(e => ({
                        ...e,
                        veterinarianVisitDateFormatted: e.veterinarianVisitDate
                            ? new Date(e.veterinarianVisitDate).toLocaleDateString('pt-BR')
                            : '',
                    }))
                    .filter(e => {
                        if (filters.veterinarianVisitId && e.veterinarianVisitId !== filters.veterinarianVisitId) return false;
                        if (filters.liveAnimalId && e.liveAnimalId !== filters.liveAnimalId) return false;
                        return true;
                    });
                setResults(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.veterinarianVisitId, filters.liveAnimalId]);

    const pageFilters: any[] = [];
    const first = results[0];
    if (first) {
        if (first.veterinarianVisitDate) {
            const date = first.veterinarianVisitDate.split('T')[0];
            pageFilters.push({ field: 'veterinarianVisitDate', value: { type: 'date' as const, from: date, to: date } });
        }
        pageFilters.push({ field: 'liveAnimalName', value: { type: 'text' as const, term: first.liveAnimalName } });
        pageFilters.push({ field: 'veterinarianName', value: { type: 'text' as const, term: first.veterinarianName } });
    }
    const pageUrl = `/animaisvivos/exameseanalises/analisefezes?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <>
            {showEggCystDrawer && activeStoolAnalysisId && (
                <EggCystAnalysisSideDrawer
                    filters={{ stoolAnalysisId: activeStoolAnalysisId }}
                    onClose={() => setShowEggCystDrawer(false)}
                />
            )}
            {showMolecularDrawer && activeStoolAnalysisId && (
                <MolecularAnalysisSideDrawer
                    filters={{ stoolAnalysisId: activeStoolAnalysisId }}
                    onClose={() => setShowMolecularDrawer(false)}
                />
            )}
            <SideDrawer
                title="Análise de Fezes"
                onClose={onClose}
                headerExtra={
                    <button
                        onClick={() => navigate(pageUrl)}
                        className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                        title="Abrir página completa de análises de fezes"
                    >
                        Abrir Página
                    </button>
                }
            >
                {loading && (
                    <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                        Carregando análises de fezes...
                    </div>
                )}

                {!loading && results.length === 0 && (
                    <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                        Nenhuma análise de fezes encontrada.
                    </div>
                )}

                {!loading && results.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {results.map(result => (
                            <div
                                key={result.id}
                                className="border border-border rounded bg-form-bg"
                            >
                                <div className="px-4 pb-4 bg-form-bg">
                                    <h4 className="font-bold text-text-main text-xs uppercase my-2 border-b border-gray-600 pb-1">
                                        Detalhes da Análise de Fezes
                                    </h4>
                                    <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                        <Field label="Data da Visita" value={result.veterinarianVisitDateFormatted || ''} />
                                        <Field label="Animal" value={result.liveAnimalName} />
                                        <Field label="Veterinário" value={result.veterinarianName} />
                                        <Field label="Peso (Kg)" value={String(result.weight)} />
                                        <Field label="Tecnologia de Processamento" value={result.processingTechnologyName} />
                                        <Field label="Observações" value={result.note || 'Nenhuma observação informada'} fullWidth />
                                    </div>
                                    {(result.hasEggCystAnalysis || result.hasMolecularAnalysis) && (
                                        <>
                                            <div className="flex justify-between items-center pb-1 my-2 border-b border-gray-600">
                                                <h4 className="font-bold text-text-main text-xs uppercase">Registros Associados</h4>
                                            </div>
                                            <div className="gap-2 w-full text-sm flex flex-wrap mb-1">
                                                {result.hasEggCystAnalysis && (
                                                    <button
                                                        onClick={() => { setActiveStoolAnalysisId(result.id); setShowEggCystDrawer(true); }}
                                                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                                                    >
                                                        Ovos/Cistos
                                                    </button>
                                                )}
                                                {result.hasMolecularAnalysis && (
                                                    <button
                                                        onClick={() => { setActiveStoolAnalysisId(result.id); setShowMolecularDrawer(true); }}
                                                        className="bg-standard-blue text-white font-bold cursor-pointer px-4 py-2 rounded text-sm"
                                                    >
                                                        Molecular
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </SideDrawer>
        </>
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
