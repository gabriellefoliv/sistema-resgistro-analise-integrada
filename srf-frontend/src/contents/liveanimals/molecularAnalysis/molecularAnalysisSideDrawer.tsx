import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllMolecularAnalysisOutput } from "srf-shared-types";
import { getMolecularAnalyses } from "../../../services/liveanimals/molecularAnalysisService";
import { SideDrawer } from "../../../components/sideDrawer";

interface MolecularAnalysisSideDrawerFilters {
    stoolAnalysisId?: number;
    liveAnimalId?: number;
}

interface MolecularAnalysisSideDrawerProps {
    filters: MolecularAnalysisSideDrawerFilters;
    onClose: () => void;
}

export function MolecularAnalysisSideDrawer({ filters, onClose }: MolecularAnalysisSideDrawerProps) {
    const [results, setResults] = useState<GetAllMolecularAnalysisOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getMolecularAnalyses()
            .then(all => {
                const filtered = all
                    .map(e => ({
                        ...e,
                        veterinarianVisitDateFormatted: e.veterinarianVisitDate
                            ? new Date(e.veterinarianVisitDate).toLocaleDateString('pt-BR')
                            : '',
                    }))
                    .filter(e => {
                        if (filters.stoolAnalysisId && e.stoolAnalysisId !== filters.stoolAnalysisId) return false;
                        if (filters.liveAnimalId && e.liveAnimalId !== filters.liveAnimalId) return false;
                        return true;
                    });
                setResults(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.stoolAnalysisId, filters.liveAnimalId]);

    const pageFilters: any[] = [];
    const first = results[0];
    if (first) {
        if (first.veterinarianVisitDate) {
            const date = first.veterinarianVisitDate.split('T')[0];
            pageFilters.push({ field: 'veterinarianVisitDate', value: { type: 'date' as const, from: date, to: date } });
        }
        pageFilters.push({ field: 'liveAnimalCode', value: { type: 'text' as const, term: first.liveAnimalCode } });
        pageFilters.push({ field: 'veterinarianName', value: { type: 'text' as const, term: first.veterinarianName } });
    }
    const pageUrl = `/animaisvivos/exameseanalises/analisemolecular?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Análise Molecular da Análise de Fezes"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de análises moleculares"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando análises moleculares...
                </div>
            )}

            {!loading && results.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhuma análise molecular encontrada.
                </div>
            )}

            {!loading && results.length > 0 && (
                <div className="flex flex-col gap-3">
                    {results.map(result => {
                        const isExpanded = expandedId === result.id;
                        return (
                            <div
                                key={result.id}
                                className="border border-border rounded bg-white"
                            >
                                {/* Cabeçalho do Registro */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : result.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{result.eggCystSpecieName}</span>
                                    </div>
                                    <span className="text-standard-blue text-xs font-bold uppercase">
                                        {isExpanded ? 'Recolher' : 'Expandir'}
                                    </span>
                                </button>

                                {/* Detalhes Expandidos */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 border-t border-border bg-form-bg">
                                        <h4 className="font-bold text-text-main text-xs uppercase my-2 border-b border-gray-600 pb-1">
                                            Detalhes da Análise Molecular
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Data da Visita" value={result.veterinarianVisitDateFormatted || ''} />
                                            <Field label="Código do Animal" value={result.liveAnimalCode} />
                                            <Field label="Veterinário" value={result.veterinarianName} />
                                            <Field label="Espécie" value={result.eggCystSpecieName} />
                                            <Field label="Observações" value={result.note || 'Nenhuma observação informada'} fullWidth />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
