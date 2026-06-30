import { type ContentProps } from "../../../components/content";
import { type GetAllNecropsyEctoparasiteAnalysisOutput } from "srf-shared-types";
import { getNecropsyEctoparasiteAnalyses, getNecropsyEctoparasiteAnalysisFormOptions } from "../../../services/deadanimals/necropsyEctoparasiteAnalysisService";
import { NecropsyEctoparasiteAnalysisToolBar } from "./necropsyEctoparasiteAnalysisToolBar";
import { NecropsyEctoparasiteAnalysisExpansion } from "./necropsyEctoparasiteAnalysisExpansion";

let genusOptions: { value: string | number; label: string }[] = [];
let specieOptions: { value: string | number; label: string }[] = [];
let subSpecieOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const ectoOptions = await getNecropsyEctoparasiteAnalysisFormOptions();
        genusOptions = ectoOptions.genuses.map(g => ({ value: g.name, label: g.name }));
        specieOptions = ectoOptions.species.map(s => ({ value: s.name, label: s.name }));
        subSpecieOptions = ectoOptions.species.map(s => ({ value: s.name, label: s.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const NecropsyEctoparasiteAnalysisContentDefinition = {
    id: 'analiseectoparasitos-am',
    label: 'Ectoparasitos',
    columns: [
        { key: 'necropsyDateFormatted', label: 'Data da Necropsia', width: 'w-2/12' },
        { key: 'deadAnimalCode', label: 'Código do Animal', width: 'w-3/12' },
        { key: 'genusName', label: 'Gênero', width: 'w-2/12' },
        { key: 'specieName', label: 'Espécie', width: 'w-2/12' },
        { key: 'subSpecieName', label: 'Subespécie', width: 'w-2/12' },
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'necropsyDate', label: 'Data da Necropsia', type: 'date' },
            { key: 'deadAnimalCode', label: 'Código do Animal', type: 'text' },
            { key: 'genusName', label: 'Gênero', type: 'enum', options: genusOptions },
            { key: 'specieName', label: 'Espécie', type: 'enum', options: specieOptions },
            { key: 'subSpecieName', label: 'Subespécie', type: 'enum', options: subSpecieOptions },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllNecropsyEctoparasiteAnalysisOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllNecropsyEctoparasiteAnalysisOutput, close: () => void, refresh: () => void) => (
        <NecropsyEctoparasiteAnalysisExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <NecropsyEctoparasiteAnalysisToolBar refresh={refresh} />
    ),
};

export async function fetchNecropsyEctoparasiteAnalysisData() {
    await loadFilterOptions();
    const results = await getNecropsyEctoparasiteAnalyses();
    return results.map(r => ({
        ...r,
        necropsyDateFormatted: r.necropsyDate ? new Date(r.necropsyDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const NecropsyEctoparasiteAnalysisContent: ContentProps<GetAllNecropsyEctoparasiteAnalysisOutput> = Object.assign(
    Object.create(NecropsyEctoparasiteAnalysisContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllNecropsyEctoparasiteAnalysisOutput>;
