import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllNecropsyExamResultOutput } from "srf-shared-types";
import { getNecropsyExamResults } from "../../../services/deadanimals/necropsyExamResultService";
import { SideDrawer } from "../../../components/sideDrawer";

interface NecropsyExamResultSideDrawerFilters {
    necropsyId?: number;
    deadAnimalId?: number;
}

interface NecropsyExamResultSideDrawerProps {
    filters: NecropsyExamResultSideDrawerFilters;
    onClose: () => void;
}

export function NecropsyExamResultSideDrawer({ filters, onClose }: NecropsyExamResultSideDrawerProps) {
    const [results, setResults] = useState<Array<GetAllNecropsyExamResultOutput & {
        performedDateFormatted: string;
        necropsyDateFormatted: string;
    }>>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getNecropsyExamResults()
            .then(all => {
                const filtered = all
                    .map(result => ({
                        ...result,
                        performedDateFormatted: result.result.performedDate
                            ? new Date(result.result.performedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : '',
                        necropsyDateFormatted: result.result.necropsyDate
                            ? new Date(result.result.necropsyDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : '',
                    }))
                    .filter(result => {
                        if (filters.necropsyId && result.result.necropsyId !== filters.necropsyId) return false;
                        if (filters.deadAnimalId && result.result.deadAnimalId !== filters.deadAnimalId) return false;
                        return true;
                    });
                setResults(filtered);
            })
            .finally(() => setLoading(false));
    }, [filters.necropsyId, filters.deadAnimalId]);

    const pageFilters: any[] = [];
    const first = results[0];
    if (first) {
        if (first.result.necropsyDate) {
            const date = first.result.necropsyDate.split('T')[0];
            pageFilters.push({ field: 'necropsyDate', value: { type: 'date' as const, from: date, to: date } });
        }
        pageFilters.push({ field: 'deadAnimalCode', value: { type: 'text' as const, term: first.result.deadAnimalCode } });
    }
    const pageUrl = `/animaismortos/resultadoseanalises/resultadoexame-am?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Resultados CPCR/QPCR"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de resultados CPCR/QPCR"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando resultados CPCR/QPCR...
                </div>
            )}

            {!loading && results.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhum resultado CPCR/QPCR encontrado.
                </div>
            )}

            {!loading && results.length > 0 && (
                <div className="flex flex-col gap-3">
                    {results.map(result => {
                        const isExpanded = expandedId === result.uniqueId;
                        const isCPCR = result.type === 'cpcr' || result.type === 'CPCR';
                        return (
                            <div key={result.uniqueId} className="border border-border rounded bg-white">
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : result.uniqueId)}
                                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-hover-bg transition-colors"
                                >
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-bold text-text-main">{isCPCR ? 'CPCR' : 'QPCR'}</span>
                                        <span className="text-xs text-text-light-gray">
                                            {result.performedDateFormatted} · {result.result.deadAnimalCode}
                                        </span>
                                    </div>
                                    <span className="text-standard-blue text-xs font-bold uppercase">
                                        {isExpanded ? 'Recolher' : 'Expandir'}
                                    </span>
                                </button>

                                {isExpanded && (
                                    <div className="px-4 pb-4 border-t border-border bg-form-bg">
                                        <h4 className="font-bold text-text-main text-xs uppercase my-2 border-b border-gray-600 pb-1">
                                            Detalhes do Resultado
                                        </h4>
                                        <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                            <Field label="Data da Realização" value={result.performedDateFormatted || ''} />
                                            <Field label="Data da Necropsia" value={result.necropsyDateFormatted || ''} />
                                            <Field label="Código do Animal" value={result.result.deadAnimalCode} />
                                            <Field label="Tipo" value={isCPCR ? 'CPCR' : 'QPCR'} />
                                            <Field label="Tipo de Amostra" value={result.result.sampleTypeName} />
                                            <Field label="Gene Alvo" value={result.result.targetGeneName} />
                                            <Field label="Agente Suspeito" value={result.result.suspiciousAgentName} />
                                            {isCPCR ? (
                                                <>
                                                    <Field label="Tipo de Extração" value={(result.result as any).extractionTypeName || ''} />
                                                    <Field label="Primer" value={(result.result as any).primer || ''} />
                                                    <Field label="PB" value={String((result.result as any).pb ?? '')} />
                                                    <Field label="Método CPCR" value={(result.result as any).cpcrMethodName || ''} />
                                                    <Field label="Status CPCR" value={(result.result as any).cpcrStatusName || ''} />
                                                </>
                                            ) : (
                                                <>
                                                    <Field label="CT Médio" value={String((result.result as any).meanCt ?? '')} />
                                                    <Field label="Cópias Estimadas" value={String((result.result as any).estimatedCopies ?? '')} />
                                                    <Field label="Status QPCR" value={(result.result as any).qpcrStatusName || ''} />
                                                </>
                                            )}
                                            <Field label="Controle" value={result.result.control || ''} fullWidth />
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
