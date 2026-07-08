import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllHelminthAnalysisOutput } from "srf-shared-types";
import { getHelminthAnalyses } from "../../../services/deadanimals/helminthAnalysisService";
import { SideDrawer } from "../../../components/sideDrawer";

interface HelminthAnalysisSideDrawerFilters {
    necropsyId?: number;
    deadAnimalId?: number;
}

interface HelminthAnalysisSideDrawerProps {
    filters: HelminthAnalysisSideDrawerFilters;
    onClose: () => void;
}

export function HelminthAnalysisSideDrawer({ filters, onClose }: HelminthAnalysisSideDrawerProps) {
    const [results, setResults] = useState<GetAllHelminthAnalysisOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getHelminthAnalyses()
            .then(all => {
                const filtered = all
                    .map(result => ({
                        ...result,
                        necropsyDateFormatted: result.necropsyDate
                            ? new Date(result.necropsyDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : '',
                    }))
                    .filter(result => {
                        if (filters.necropsyId && result.necropsyId !== filters.necropsyId) return false;
                        if (filters.deadAnimalId && result.deadAnimalId !== filters.deadAnimalId) return false;
                        return true;
                    });
                setResults(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.necropsyId, filters.deadAnimalId]);

    const pageFilters: any[] = [];
    const first = results[0];
    if (first) {
        if (first.necropsyDate) {
            const date = first.necropsyDate.split('T')[0];
            pageFilters.push({ field: 'necropsyDate', value: { type: 'date' as const, from: date, to: date } });
        }
        pageFilters.push({ field: 'deadAnimalCode', value: { type: 'text' as const, term: first.deadAnimalCode } });
    }
    const pageUrl = `/animaismortos/resultadoseanalises/analisehelmintos?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Análise de Helmintos"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de análises de helmintos"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando análises de helmintos...
                </div>
            )}

            {!loading && results.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhuma análise de helmintos encontrada.
                </div>
            )}

            {!loading && results.length > 0 && (
                <div className="flex flex-col gap-3">
                    {results.map(result => {
                        const isExpanded = expandedId === result.id;
                        return (
                            <div key={result.id} className="border border-border rounded bg-white">
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : result.id)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{result.helminthSpecieName}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {result.necropsyDateFormatted} · {result.deadAnimalCode}
                                        </span>
                                    </div>
                                    <span className="text-standard-blue text-xs font-bold uppercase">
                                        {isExpanded ? 'Recolher' : 'Expandir'}
                                    </span>
                                </button>

                                {isExpanded && (
                                    <div className="px-4 pb-4 border-t border-border bg-form-bg">
                                        <h4 className="font-bold text-text-main text-xs uppercase my-2 border-b border-gray-600 pb-1">
                                            Detalhes da Análise de Helmintos
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Data da Necropsia" value={result.necropsyDateFormatted || ''} />
                                            <Field label="Código do Animal" value={result.deadAnimalCode} />
                                            <Field label="Espécie do Helminto" value={result.helminthSpecieName} />
                                            <Field label="Localização" value={result.locationName} />
                                            <Field label="Quantidade de Machos" value={String(result.maleQuantity)} />
                                            <Field label="Quantidade de Fêmeas" value={String(result.femaleQuantity)} />
                                            <Field label="Quantidade Total" value={String(result.totalQuantity)} />
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
