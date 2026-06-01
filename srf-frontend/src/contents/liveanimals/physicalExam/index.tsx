import { type ContentProps } from "../../../components/content";
import { type GetAllPhysicalExamOutput } from "srf-shared-types";
import { getPhysicalExams } from "../../../services/liveanimals/physicalExamService";
import { getPhysicalExamFormOptions } from "../../../services/liveanimals/physicalExamService";
import { PhysicalExamToolBar } from "./physicalExamToolBar";
import { PhysicalExamExpansion } from "./physicalExamExpansion";

let generalConditionOptions: { value: string | number; label: string }[] = [];
let mucousOptions: { value: string | number; label: string }[] = [];
let hydrationOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const physicalExamOptions = await getPhysicalExamFormOptions();
        generalConditionOptions = physicalExamOptions.generalConditions.map(gc => ({ value: gc.id, label: gc.name }));
        mucousOptions = physicalExamOptions.mucous.map(m => ({ value: m.id, label: m.name }));
        hydrationOptions = physicalExamOptions.hydrations.map(h => ({ value: h.id, label: h.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const PhysicalExamContentDefinition = {
    id: 'examefisico',
    label: 'Exames Físicos',
    columns: [
        { key: 'veterinarianVisitDateFormatted', label: 'Data da Visita', width: 'w-2/12' },
        { key: 'liveAnimalName', label: 'Animal', width: 'w-2/12' },
        { key: 'veterinarianName', label: 'Veterinário', width: 'w-2/12' },
        { key: 'generalConditionName', label: 'Condição Geral', width: 'w-5/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'veterinarianVisitDate', label: 'Data da Visita', type: 'date' },
            { key: 'liveAnimalName', label: 'Animal', type: 'text' },
            { key: 'veterinarianName', label: 'Veterinário', type: 'text' },
            { key: 'generalConditionId', label: 'Condição Geral', type: 'enum', options: generalConditionOptions },
            { key: 'mucousId', label: 'Mucosa', type: 'enum', options: mucousOptions },
            { key: 'hydrationId', label: 'Hidratação', type: 'enum', options: hydrationOptions },
            { key: 'score', label: 'Score', type: 'text' }
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllPhysicalExamOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllPhysicalExamOutput, close: () => void, refresh: () => void) => (
        <PhysicalExamExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <PhysicalExamToolBar refresh={refresh} />
    ),
};

export async function fetchPhysicalExamData() {
    await loadFilterOptions();
    const exams = await getPhysicalExams();
    return exams.map(e => ({
        ...e,
        veterinarianVisitDateFormatted: e.veterinarianVisitDate ? new Date(e.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const PhysicalExamContent: ContentProps<GetAllPhysicalExamOutput> = Object.assign(
    Object.create(PhysicalExamContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllPhysicalExamOutput>;