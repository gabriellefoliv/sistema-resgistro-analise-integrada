import { type ContentProps } from "../../../components/content";
import { type GetAllInterviewOutput } from "srf-shared-types";
import { getInterviews } from "../../../services/liveanimals/interviewService";
import { InterviewToolBar } from "./interviewToolBar";
import { InterviewExpansion } from "./interviewExpansion";

export const InterviewContentDefinition = {
    id: 'entrevista',
    label: 'Entrevistas',
    columns: [
        { key: 'tutorName', label: 'Tutor', width: 'w-5/12' },
        { key: 'dateFormatted', label: 'Data da Realização', width: 'w-6/12' },
        // deixar w-1/12 sobrando para ações
    ],
    filterFields: [
        { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'tutorName', label: 'Tutor', type: 'text' },
        { key: 'liveAnimalCodes', label: 'Código do Animal', type: 'text' },
        { key: 'date', label: 'Data da Realização', type: 'date' },
    ],
    rowIdField: 'id',
    renderActions: (item: GetAllInterviewOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllInterviewOutput, close: () => void, refresh: () => void) => (
        <InterviewExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <InterviewToolBar refresh={refresh} />
    ),
};

export async function fetchInterviewData() {
    const interviews = await getInterviews();
    return interviews.map(i => ({
        ...i,
        dateFormatted: i.date ? new Date(i.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const InterviewContent: ContentProps<GetAllInterviewOutput> = Object.assign(
    Object.create(InterviewContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllInterviewOutput>;
