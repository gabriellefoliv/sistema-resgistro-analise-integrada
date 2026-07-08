import { type ContentProps } from "../../../components/content";
import { type GetAllLiveAnimalOutput } from "srf-shared-types";
import { getLiveAnimals, getLiveAnimalFormOptions } from "../../../services/liveanimals/liveAnimalService";
import { LiveAnimalToolBar } from "./liveAnimalToolBar";
import { LiveAnimalExpansion } from "./liveAnimalExpansion";

let codeSailsOptions: { value: string | number; label: string }[] = [];
let speciesOptions: { value: string | number; label: string }[] = [];
let gendersOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const opts = await getLiveAnimalFormOptions();
        codeSailsOptions = opts.codeSails.map(s => ({ value: s.sail, label: s.sail }));
        speciesOptions = opts.species.map(s => ({ value: s.name, label: s.name }));
        gendersOptions = opts.genders.map(g => ({ value: g.name, label: g.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const LiveAnimalContentDefinition = {
    id: 'animal-av', //formId
    label: 'Animais',
    columns: [
        { key: 'code', label: 'Código', width: 'w-4/12' },
        { key: 'specieName', label: 'Espécie', width: 'w-4/12' },
        { key: 'activeFormatted', label: 'Ativo?', width: 'w-3/12', }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'code', label: 'Código', type: 'text' },
            { key: 'codeSail', label: 'Sigla (Código)', type: 'enum', options: codeSailsOptions },
            { key: 'codeNumber', label: 'Número (Código)', type: 'text' },
            { key: 'liveAnimalName', label: 'Nome', type: 'text' },
            { key: 'tutorName', label: 'Tutor', type: 'text' },
            { key: 'specieName', label: 'Espécie', type: 'enum', options: speciesOptions },
            { key: 'genderName', label: 'Gênero', type: 'enum', options: gendersOptions },
            { key: 'birthDate', label: 'Data de Nascimento', type: 'date' },
            { key: 'active', label: 'Ativo?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasGpsTracking', label: 'Possui GPS?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasCastration', label: 'Possui Castração?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasAnimalInterview', label: 'Possui Entrevista?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasVeterinarianVisit', label: 'Possui Visita ao Veterinário?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasVaccineApplication', label: 'Possui Vacinação?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' }
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllLiveAnimalOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllLiveAnimalOutput, close: () => void, refresh: () => void) => (
        <LiveAnimalExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <LiveAnimalToolBar refresh={refresh} />
    ),
};

export async function fetchLiveAnimalsData() {
    await loadFilterOptions();
    const results = await getLiveAnimals();
    return results.map(r => ({
        ...r,
        activeFormatted: r.active ? 'Sim' : 'Não',
        birthDateFormatted: r.birthDate ? new Date(r.birthDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const LiveAnimalContent = Object.assign(
    Object.create(LiveAnimalContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllLiveAnimalOutput>;