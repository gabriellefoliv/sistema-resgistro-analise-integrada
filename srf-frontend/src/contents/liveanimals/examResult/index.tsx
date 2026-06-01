import { type ContentProps } from "../../../components/content";
import { type GetAllExamResultOutput } from "srf-shared-types";
import { getExamResults } from "../../../services/liveanimals/examResultService";
import { ExamResultToolBar } from "./examResultToolBar";
import { ExamResultExpansion } from "./examResultExpansion";

export const ExamResultContentDefinition = {
    id: 'resultadoexame-av',
    label: 'Hemograma/Bioquímico',
    columns: [
        { key: 'veterinarianVisitDateFormatted', label: 'Data da Visita', width: 'w-3/12' },
        { key: 'liveAnimalName', label: 'Animal', width: 'w-4/12' },
        { key: 'veterinarianName', label: 'Veterinário', width: 'w-4/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'veterinarianVisitDate', label: 'Data da Visita', type: 'date' },
            { key: 'liveAnimalName', label: 'Animal', type: 'text' },
            { key: 'veterinarianName', label: 'Veterinário', type: 'text' }
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
