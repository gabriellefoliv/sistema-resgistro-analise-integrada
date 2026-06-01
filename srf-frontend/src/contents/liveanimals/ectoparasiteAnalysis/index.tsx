import { type ContentProps } from "../../../components/content";
import { type GetAllEctoparasiteAnalysisOutput } from "srf-shared-types";
import { getEctoparasiteAnalyses, getEctoparasiteAnalysisFormOptions } from "../../../services/liveanimals/ectoparasiteAnalysisService";
import { EctoparasiteAnalysisToolBar } from "./ectoparasiteAnalysisToolBar";
import { EctoparasiteAnalysisExpansion } from "./ectoparasiteAnalysisExpansion";

let genusOptions: { value: string | number; label: string }[] = [];
let specieOptions: { value: string | number; label: string }[] = [];
let subSpecieOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const ectoOptions = await getEctoparasiteAnalysisFormOptions();
        genusOptions = ectoOptions.genuses.map(g => ({ value: g.name, label: g.name }));
        specieOptions = ectoOptions.species.map(s => ({ value: s.name, label: s.name }));
        subSpecieOptions = ectoOptions.species.map(s => ({ value: s.name, label: s.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const EctoparasiteAnalysisContentDefinition = {
    id: 'analiseectoparasitos-av',
    label: 'Ectoparasitos',
    columns: [
        { key: 'veterinarianVisitDateFormatted', label: 'Data da Visita', width: 'w-2/12' },
        { key: 'liveAnimalName', label: 'Animal', width: 'w-3/12' },
        { key: 'veterinarianName', label: 'Veterinário', width: 'w-3/12' },
        { key: 'genusName', label: 'Gênero', width: 'w-2/12' },
        { key: 'specieName', label: 'Espécie', width: 'w-1/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'veterinarianVisitDate', label: 'Data da Visita', type: 'date' },
            { key: 'liveAnimalName', label: 'Animal', type: 'text' },
            { key: 'veterinarianName', label: 'Veterinário', type: 'text' },
            { key: 'genusName', label: 'Gênero', type: 'enum', options: genusOptions },
            { key: 'specieName', label: 'Espécie', type: 'enum', options: specieOptions },
            { key: 'subSpecieName', label: 'Subespécie', type: 'enum', options: subSpecieOptions },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllEctoparasiteAnalysisOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllEctoparasiteAnalysisOutput, close: () => void, refresh: () => void) => (
        <EctoparasiteAnalysisExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <EctoparasiteAnalysisToolBar refresh={refresh} />
    ),
};

export async function fetchEctoparasiteAnalysisData() {
    await loadFilterOptions();
    const results = await getEctoparasiteAnalyses();
    return results.map(r => ({
        ...r,
        veterinarianVisitDateFormatted: r.veterinarianVisitDate ? new Date(r.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const EctoparasiteAnalysisContent: ContentProps<GetAllEctoparasiteAnalysisOutput> = Object.assign(
    Object.create(EctoparasiteAnalysisContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllEctoparasiteAnalysisOutput>;
