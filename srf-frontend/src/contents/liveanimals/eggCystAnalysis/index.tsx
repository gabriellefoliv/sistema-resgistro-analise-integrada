import { type ContentProps } from "../../../components/content";
import { type GetAllEggCystAnalysisOutput } from "srf-shared-types";
import { getEggCystAnalyses, getEggCystAnalysisFormOptions } from "../../../services/liveanimals/eggCystAnalysisService";
import { EggCystAnalysisToolBar } from "./eggCystAnalysisToolBar";
import { EggCystAnalysisExpansion } from "./eggCystAnalysisExpansion";

let specieOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const opts = await getEggCystAnalysisFormOptions();
        specieOptions = opts.eggCystSpecies.map(s => ({ value: s.name, label: s.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const EggCystAnalysisContentDefinition = {
    id: 'analiseovocistos',
    label: 'Ovos/Cistos',
    columns: [
        { key: 'veterinarianVisitDateFormatted', label: 'Data da Visita', width: 'w-2/12' },
        { key: 'liveAnimalCode', label: 'Código do Animal', width: 'w-3/12' },
        { key: 'veterinarianName', label: 'Veterinário', width: 'w-3/12' },
        { key: 'eggCystSpecieName', label: 'Espécie', width: 'w-3/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'veterinarianVisitDate', label: 'Data da Visita', type: 'date' },
            { key: 'liveAnimalCode', label: 'Código do Animal', type: 'text' },
            { key: 'veterinarianName', label: 'Veterinário', type: 'text' },
            { key: 'eggCystSpecieName', label: 'Espécie', type: 'enum', options: specieOptions },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllEggCystAnalysisOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllEggCystAnalysisOutput, close: () => void, refresh: () => void) => (
        <EggCystAnalysisExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <EggCystAnalysisToolBar refresh={refresh} />
    ),
};

export async function fetchEggCystAnalysisData() {
    await loadFilterOptions();
    const results = await getEggCystAnalyses();
    return results.map(r => ({
        ...r,
        veterinarianVisitDateFormatted: r.veterinarianVisitDate ? new Date(r.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const EggCystAnalysisContent: ContentProps<GetAllEggCystAnalysisOutput> = Object.assign(
    Object.create(EggCystAnalysisContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllEggCystAnalysisOutput>;
