import { type ContentProps } from "../../../components/content";
import { type GetAllAnimalInterviewOutput } from "srf-shared-types";
import { getAnimalInterviews } from "../../../services/animalInterviewService";
import { AnimalInterviewToolBar } from "./animalInterviewToolBar";
import { AnimalInterviewExpansion } from "./animalInterviewExpansion";

export const AnimalInterviewContentDefinition = {
    id: 'entrevistaanimal',
    label: 'Respostas sobre o Animal',
    columns: [
        { key: 'liveAnimalName', label: 'Animal', width: 'w-5/12' },
        { key: 'tutorName', label: 'Tutor', width: 'w-6/12' },
        // deixar w-1/12 sobrando para ações
    ],
    filterFields: [
        { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'liveAnimalName', label: 'Animal', type: 'text' },
        { key: 'tutorName', label: 'Tutor', type: 'text' },
    ],
    rowIdField: 'id',
    renderActions: (item: GetAllAnimalInterviewOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllAnimalInterviewOutput, close: () => void, refresh: () => void) => (
        <AnimalInterviewExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <AnimalInterviewToolBar refresh={refresh} />
    ),
};

export async function fetchAnimalInterviewData() {
    const interviews = await getAnimalInterviews();
    return interviews.map(i => ({
        ...i,
        tutorName: i.tutorName || 'Sem tutor vinculado',
    }));
};

export const AnimalInterviewContent: ContentProps<GetAllAnimalInterviewOutput> = Object.assign(
    Object.create(AnimalInterviewContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllAnimalInterviewOutput>;
