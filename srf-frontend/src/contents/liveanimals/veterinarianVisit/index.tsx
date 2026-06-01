import { type ContentProps } from "../../../components/content";
import {
    getVeterinarianVisits,
    type VeterinarianVisitData,
} from "../../../services/liveanimals/veterinarianVisitService";
import { VisitExpansion } from "./visitExpansion";
import { VisitToolBar } from "./visitToolBar";

export const VeterinarianVisitContentDefinition = {
    id: 'visitaveterinaria',
    label: 'Visitas Veterinárias',
    columns: [
        { key: 'dateFormatted', label: 'Data da Realização', width: 'w-2/12' },
        { key: 'liveAnimalName', label: 'Animal', width: 'w-4/12' },
        { key: 'veterinarianName', label: 'Veterinário', width: 'w-5/12' },
        // deixar w-1/12 sobrando para ações
    ],
    filterFields: [
        { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'liveAnimalName', label: 'Animal', type: 'text' },
        { key: 'veterinarianName', label: 'Veterinário', type: 'text' },
        { key: 'date', label: 'Data da Realização', type: 'date' },
        { key: 'hasSample', label: 'Possui Amostra', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'hasPhysicalExam', label: 'Possui Exame Físico', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'hasVaccine', label: 'Possui Vacina', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'hasExamResult', label: 'Possui Hemograma/Bioquímico', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'hasSorologyAnalysis', label: 'Possui Sorologia', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'hasEctoparasiteAnalysis', label: 'Possui Análise de Ectoparasitos', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'hasStoolAnalysis', label: 'Possui Análise de Fezes', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
    ],
    rowIdField: 'id',
    renderActions: (item: VeterinarianVisitData, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: VeterinarianVisitData, close: () => void, refresh: () => void) => (
        <VisitExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <VisitToolBar refresh={refresh} />
    ),
};

export async function fetchVeterinarianVisitData() {
    const visits = await getVeterinarianVisits();
    return visits.map(v => ({
        ...v,
        dateFormatted: new Date(v.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    }));
}

export const VeterinarianVisitContent: ContentProps<VeterinarianVisitData> = {
    ...VeterinarianVisitContentDefinition,
    data: [],
} as unknown as ContentProps<VeterinarianVisitData>;
