import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type GetAllExamResultOutput } from "srf-shared-types";
import { getExamResults } from "../../../services/liveanimals/examResultService";
import { SideDrawer } from "../../../components/sideDrawer";
import grayQuestionMark from '../../../assets/grayQuestionMark.svg';

interface ExamResultSideDrawerFilters {
    veterinarianVisitId?: number;
    liveAnimalId?: number;
}

interface ExamResultSideDrawerProps {
    filters: ExamResultSideDrawerFilters;
    onClose: () => void;
}

export function ExamResultSideDrawer({ filters, onClose }: ExamResultSideDrawerProps) {
    const [results, setResults] = useState<GetAllExamResultOutput[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getExamResults()
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
    const pageUrl = `/animaisvivos/exameseanalises/resultadoexame-av?filters=${encodeURIComponent(JSON.stringify(pageFilters))}`;

    return (
        <SideDrawer
            title="Hemograma/Bioquímico"
            onClose={onClose}
            headerExtra={
                <button
                    onClick={() => navigate(pageUrl)}
                    className="text-standard-blue text-xs font-bold uppercase cursor-pointer hover:underline mr-2"
                    title="Abrir página completa de hemograma/bioquímico"
                >
                    Abrir Página
                </button>
            }
        >
            {loading && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Carregando resultados de exames...
                </div>
            )}

            {!loading && results.length === 0 && (
                <div className="flex items-center justify-center py-12 text-text-light-gray text-sm">
                    Nenhum resultado de exame encontrado.
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
                                    Detalhes do Hemograma/Bioquímico
                                </h4>
                                <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                    <Field label="Data da Visita" value={result.veterinarianVisitDateFormatted || ''} />
                                    <Field label="Animal" value={result.liveAnimalName} />
                                    <Field label="Veterinário" value={result.veterinarianName} />
                                </div>

                                {/* Hemograma */}
                                <h4 className="font-bold text-text-main text-xs uppercase my-2 border-b border-gray-600 pb-1 mt-4">
                                    Hemograma
                                </h4>
                                <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                    <Field key='erythrocytes' label='Eritrócitos' value={String(result.erythrocytes)} />
                                    <Field key='hemoglobin' label='Hemoglobina' value={String(result.hemoglobin)} />
                                    <Field key='hematocrit' label='Hematócrito' value={String(result.hematocrit)} />
                                    <Field key='vcm' label='VCM' value={String(result.vcm)} tooltip="VCM..." />
                                    <Field key='hcm' label='HCM' value={String(result.hcm)} tooltip="HCM..." />
                                    <Field key='chcm' label='CHCM' value={String(result.chcm)} tooltip="CHCM..." />
                                    <Field key='platelets' label='Plaquetas' value={String(result.platelets)} />
                                </div>
                                <div className="gap-2 w-full text-sm grid grid-cols-2 mt-2">
                                    <Field key='leukocytes' label='Leucócitos' value={String(result.whiteBloodCells)} />
                                    <Field key='bandCells' label='Bastonetes' value={String(result.bandCells)} />
                                    <Field key='segmentedCells' label='Segmentados' value={String(result.segmentedCells)} />
                                    <Field key='segmentedCellsPercentage' label='Segmentados (%)' value={String(result.segmentedCellsPercentage)} />
                                    <Field key='lymphocytes' label='Linfócitos' value={String(result.lymphocytes)} />
                                    <Field key='lymphocytesPercentage' label='Linfócitos (%)' value={String(result.lymphocytesPercentage)} />
                                    <Field key='monocytes' label='Monócitos' value={String(result.monocytes)} />
                                    <Field key='monocytesPercentage' label='Monócitos (%)' value={String(result.monocytesPercentage)} />
                                    <Field key='eosinophils' label='Eosinófilos' value={String(result.eosinophils)} />
                                    <Field key='eosinophilsPercentage' label='Eosinófilos (%)' value={String(result.eosinophilsPercentage)} />
                                    <Field key='basophils' label='Basófilos' value={String(result.basophils)} />
                                    <Field key='basophilsPercentage' label='Basófilos (%)' value={String(result.basophilsPercentage)} />
                                </div>

                                {/* Bioquímico */}
                                <h4 className="font-bold text-text-main text-xs uppercase my-2 border-b border-gray-600 pb-1 mt-4">
                                    Bioquímico
                                </h4>
                                <div className="gap-2 w-full text-sm grid grid-cols-2 mt-3">
                                    <Field key="alt" label="ALT" value={String(result.alt)} tooltip="ALT..." />
                                    <Field key="creatinine" label="Creatinina" value={String(result.creatinine)} />
                                    <Field key="alkalinePhosphatase" label="Fosfatase Alcalina" value={String(result.alkalinePhosphatase)} />
                                    <Field key="totalProtein" label="Proteína Total" value={String(result.totalProtein)} />
                                    <Field key="urea" label="Ureia" value={String(result.urea)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </SideDrawer>
    );
}

function Field({ label, value, fullWidth, tooltip }: { label: string; value: string; fullWidth?: boolean; tooltip?: string }) {
    return (
        <div className={`flex flex-col ${fullWidth ? 'col-span-2' : ''}`}>
            <label className="ml-1 font-bold text-xs text-text-main flex items-center">
                {label}
                {tooltip && (
                    <img src={grayQuestionMark}
                        title={tooltip}
                        alt={`Sobre o campo ${label}`}
                        className="inline-block size-4 ml-1"
                    />
                )}
            </label>
            <input
                type="text"
                disabled
                value={value}
                className="border border-border rounded px-2 py-1 text-text-input text-sm"
            />
        </div>
    );
}
