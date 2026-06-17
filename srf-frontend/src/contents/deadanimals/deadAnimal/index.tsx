import { type ContentProps } from "../../../components/content";
import { type GetAllDeadAnimalOutput } from "srf-shared-types";
import { getDeadAnimals, getDeadAnimalFormOptions } from "../../../services/deadanimals/deadAnimalService";
import { DeadAnimalToolBar } from "./deadAnimalToolBar";
import { DeadAnimalExpansion } from "./deadAnimalExpansion";

let originsOptions: { value: string | number; label: string }[] = [];
let speciesOptions: { value: string | number; label: string }[] = [];
let statusesOptions: { value: string | number; label: string }[] = [];
let groupsOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const opts = await getDeadAnimalFormOptions();
        originsOptions = opts.deadAnimalOrigins.map(o => ({ value: o.name, label: o.name }));
        speciesOptions = opts.species.map(s => ({ value: s.name, label: s.name }));
        statusesOptions = opts.deadAnimalStatuses.map(s => ({ value: s.name, label: s.name }));
        groupsOptions = opts.deadAnimalGroups.map(g => ({ value: g.name, label: g.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const DeadAnimalContentDefinition = {
    id: 'animal-am', //formId
    label: 'Animais',
    columns: [
        { key: 'code', label: 'Código', width: 'w-3/12' },
        { key: 'deadAnimalOriginName', label: 'Origem', width: 'w-3/12' },
        { key: 'deadAnimalStatusName', label: 'Status', width: 'w-3/12' },
        { key: 'collectionDateFormatted', label: 'Data da Coleta', width: 'w-2/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'code', label: 'Código', type: 'text' },
            { key: 'deadAnimalOriginName', label: 'Origem', type: 'enum', options: originsOptions },
            { key: 'specieName', label: 'Espécie', type: 'enum', options: speciesOptions },
            { key: 'collectionDate', label: 'Data da Coleta', type: 'date' },
            { key: 'deadAnimalStatusName', label: 'Status', type: 'enum', options: statusesOptions },
            { key: 'deadAnimalGroupName', label: 'Grupo Animal', type: 'enum', options: groupsOptions },
            { key: 'collectionResponsibleName', label: 'Responsável pela Coleta', type: 'text' },
            { key: 'hasNecropsy', label: 'Possui Necrópsia?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' }
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllDeadAnimalOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllDeadAnimalOutput, close: () => void, refresh: () => void) => (
        <DeadAnimalExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <DeadAnimalToolBar refresh={refresh} />
    ),
};

export async function fetchDeadAnimalsData() {
    await loadFilterOptions();
    const results = await getDeadAnimals();
    return results.map(r => ({
        ...r,
        collectionDateFormatted: r.collectionDate ? new Date(r.collectionDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const DeadAnimalContent = Object.assign(
    Object.create(DeadAnimalContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllDeadAnimalOutput>;
