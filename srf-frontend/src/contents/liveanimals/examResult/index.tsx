import { type ContentProps } from "../../../components/content";
import { type GetAllExamResultOutput } from "srf-shared-types";
import { getExamResults, getExamResultFormOptions } from "../../../services/liveanimals/examResultService";
import { ExamResultToolBar } from "./examResultToolBar";

let interpretationOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const options = await getExamResultFormOptions();
        interpretationOptions = options.interpretations.map(i => ({ value: i.id, label: i.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}
import { ExamResultExpansion } from "./examResultExpansion";

export const ExamResultContentDefinition = {
    id: 'resultadoexame-av',
    label: 'Hemograma/Bioquímico',
    columns: [
        { key: 'veterinarianVisitDateFormatted', label: 'Data da Visita', width: 'w-2/12' },
        { key: 'liveAnimalCode', label: 'Código do Animal', width: 'w-3/12' },
        { key: 'veterinarianName', label: 'Veterinário', width: 'w-3/12' },
        { key: 'interpretationName', label: 'Interpretação', width: 'w-3/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'veterinarianVisitDate', label: 'Data da Visita', type: 'date' },
            { key: 'liveAnimalCode', label: 'Código do Animal', type: 'text' },
            { key: 'veterinarianName', label: 'Veterinário', type: 'text' },
            { key: 'interpretationName', label: 'Interpretação', type: 'enum', options: interpretationOptions }
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllExamResultOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllExamResultOutput, close: () => void, refresh: () => void) => (
        <ExamResultExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <ExamResultToolBar refresh={refresh} />
    ),
};

export async function fetchExamResultData() {
    await loadFilterOptions();
    const results = await getExamResults();
    return results.map(r => ({
        ...r,
        veterinarianVisitDateFormatted: r.veterinarianVisitDate ? new Date(r.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const ExamResultContent: ContentProps<GetAllExamResultOutput> = Object.assign(
    Object.create(ExamResultContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllExamResultOutput>;
