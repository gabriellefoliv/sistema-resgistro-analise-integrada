import { type ContentProps } from "../../../components/content";
import { type GetAllStoolAnalysisOutput } from "srf-shared-types";
import { getStoolAnalyses, getStoolAnalysisFormOptions } from "../../../services/liveanimals/stoolAnalysisService";
import { StoolAnalysisToolBar } from "./stoolAnalysisToolBar";
import { StoolAnalysisExpansion } from "./stoolAnalysisExpansion";

let processingTechOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const opts = await getStoolAnalysisFormOptions();
        processingTechOptions = opts.processingTechnologies.map(pt => ({ value: pt.name, label: pt.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const StoolAnalysisContentDefinition = {
    id: 'analisefezes',
    label: 'Fezes',
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
            { key: 'veterinarianName', label: 'Veterinário', type: 'text' },
            { key: 'processingTechnologyName', label: 'Tecnologia de Processamento', type: 'enum', options: processingTechOptions },
            { key: 'hasEggCystAnalysis', label: 'Possui Análise de Ovos/Cistos', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasMolecularAnalysis', label: 'Possui Análise Molecular', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllStoolAnalysisOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllStoolAnalysisOutput, close: () => void, refresh: () => void) => (
        <StoolAnalysisExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <StoolAnalysisToolBar refresh={refresh} />
    ),
};

export async function fetchStoolAnalysisData() {
    await loadFilterOptions();
    const results = await getStoolAnalyses();
    return results.map(r => ({
        ...r,
        veterinarianVisitDateFormatted: r.veterinarianVisitDate ? new Date(r.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const StoolAnalysisContent: ContentProps<GetAllStoolAnalysisOutput> = Object.assign(
    Object.create(StoolAnalysisContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllStoolAnalysisOutput>;
