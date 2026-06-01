import { type ContentProps } from "../../../components/content";
import { type GetAllMolecularAnalysisOutput } from "srf-shared-types";
import { getMolecularAnalyses, getMolecularAnalysisFormOptions } from "../../../services/liveanimals/molecularAnalysisService";
import { MolecularAnalysisToolBar } from "./molecularAnalysisToolBar";
import { MolecularAnalysisExpansion } from "./molecularAnalysisExpansion";

let specieOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const opts = await getMolecularAnalysisFormOptions();
        specieOptions = opts.eggCystSpecies.map(s => ({ value: s.name, label: s.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const MolecularAnalysisContentDefinition = {
    id: 'analisemolecular',
    label: 'Molecular',
    columns: [
        { key: 'veterinarianVisitDateFormatted', label: 'Data da Visita', width: 'w-2/12' },
        { key: 'liveAnimalName', label: 'Animal', width: 'w-3/12' },
        { key: 'veterinarianName', label: 'Veterinário', width: 'w-3/12' },
        { key: 'eggCystSpecieName', label: 'Espécie', width: 'w-3/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'veterinarianVisitDate', label: 'Data da Visita', type: 'date' },
            { key: 'liveAnimalName', label: 'Animal', type: 'text' },
            { key: 'veterinarianName', label: 'Veterinário', type: 'text' },
            { key: 'eggCystSpecieName', label: 'Espécie', type: 'enum', options: specieOptions },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllMolecularAnalysisOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllMolecularAnalysisOutput, close: () => void, refresh: () => void) => (
        <MolecularAnalysisExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <MolecularAnalysisToolBar refresh={refresh} />
    ),
};

export async function fetchMolecularAnalysisData() {
    await loadFilterOptions();
    const results = await getMolecularAnalyses();
    return results.map(r => ({
        ...r,
        veterinarianVisitDateFormatted: r.veterinarianVisitDate ? new Date(r.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const MolecularAnalysisContent: ContentProps<GetAllMolecularAnalysisOutput> = Object.assign(
    Object.create(MolecularAnalysisContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllMolecularAnalysisOutput>;
