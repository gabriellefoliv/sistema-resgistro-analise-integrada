import { type ContentProps } from "../../../components/content";
import { type GetAllHelminthAnalysisOutput } from "srf-shared-types";
import { getHelminthAnalyses, getHelminthAnalysisFormOptions } from "../../../services/deadanimals/helminthAnalysisService";
import { HelminthAnalysisToolBar } from "./helminthAnalysisToolBar";
import { HelminthAnalysisExpansion } from "./helminthAnalysisExpansion";

let specieOptions: { value: string | number; label: string }[] = [];
let locationOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const options = await getHelminthAnalysisFormOptions();
        specieOptions = options.helminthSpecies.map(hs => ({ value: hs.name, label: hs.name }));
        locationOptions = options.locations.map(l => ({ value: l.name, label: l.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const HelminthAnalysisContentDefinition = {
    id: 'analisehelmintos',
    label: 'Helmintos',
    columns: [
        { key: 'necropsyDateFormatted', label: 'Data da Necropsia', width: 'w-3/12' },
        { key: 'deadAnimalCode', label: 'Código do Animal', width: 'w-3/12' },
        { key: 'helminthSpecieName', label: 'Espécie do Helminto', width: 'w-5/12' },
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'necropsyDate', label: 'Data da Necropsia', type: 'date' },
            { key: 'deadAnimalCode', label: 'Código do Animal', type: 'text' },
            { key: 'helminthSpecieName', label: 'Espécie do Helminto', type: 'enum', options: specieOptions },
            { key: 'locationName', label: 'Localização', type: 'enum', options: locationOptions }
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllHelminthAnalysisOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllHelminthAnalysisOutput, close: () => void, refresh: () => void) => (
        <HelminthAnalysisExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <HelminthAnalysisToolBar refresh={refresh} />
    ),
};

export async function fetchHelminthAnalysisData() {
    await loadFilterOptions();
    const results = await getHelminthAnalyses();
    return results.map(r => ({
        ...r,
        necropsyDateFormatted: r.necropsyDate ? new Date(r.necropsyDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const HelminthAnalysisContent: ContentProps<GetAllHelminthAnalysisOutput> = Object.assign(
    Object.create(HelminthAnalysisContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllHelminthAnalysisOutput>;
