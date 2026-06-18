import { type ContentProps } from "../../../components/content";
import { type GetAllNecropsyOutput } from "srf-shared-types";
import { getNecropsies, getNecropsyFormOptions } from "../../../services/deadanimals/necropsyService";
import { NecropsyExpansion } from "./necropsyExpansion";
import { NecropsyToolBar } from "./necropsyToolBar";

let identifiedGendersOptions: { value: string | number; label: string }[] = [];
let bodyConditionsOptions: { value: string | number; label: string }[] = [];
let clinicalConditionsOptions: { value: string | number; label: string }[] = [];
let reproductiveConditionsOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const opts = await getNecropsyFormOptions();
        identifiedGendersOptions = opts.identifiedGenders.map(i => ({ value: i.name, label: i.name }));
        bodyConditionsOptions = opts.bodyConditions.map(b => ({ value: b.name, label: b.name }));
        clinicalConditionsOptions = opts.clinicalConditions.map(c => ({ value: c.name, label: c.name }));
        reproductiveConditionsOptions = opts.reproductiveConditions.map(r => ({ value: r.name, label: r.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const NecropsyContentDefinition = {
    id: 'necropsia', //formId
    label: 'Necrópsias',
    columns: [
        { key: 'deadAnimalCode', label: 'Código do Animal', width: 'w-4/12' },
        { key: 'performedDateFormatted', label: 'Data da Realização', width: 'w-3/12' },
        { key: 'identifiedGenderName', label: 'Gênero Identificado', width: 'w-4/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'deadAnimalCode', label: 'Código do Animal', type: 'text' },
            { key: 'identifiedGenderName', label: 'Gênero Identificado', type: 'enum', options: identifiedGendersOptions },
            { key: 'performedDate', label: 'Data da Realização', type: 'date' },
            { key: 'bodyConditionName', label: 'Estado do Corpo', type: 'enum', options: bodyConditionsOptions },
            { key: 'clinicalConditionName', label: 'Estado Clínico', type: 'enum', options: clinicalConditionsOptions },
            { key: 'reproductiveConditionName', label: 'Condição Reprodutiva', type: 'enum', options: reproductiveConditionsOptions },
            { key: 'hasHelminthAnalysis', label: 'Possui Análise de Helmintos?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasEctoparasiteAnalysis', label: 'Possui Análise de Ectoparasitos?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasQpcrResult', label: 'Possui Resultado QPCR?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasCpcrResult', label: 'Possui Resultado CPCR?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'hasTutor', label: 'Possui Tutor?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' }
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllNecropsyOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllNecropsyOutput, close: () => void, refresh: () => void) => (
        <NecropsyExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <NecropsyToolBar refresh={refresh} />
    ),
};

export async function fetchNecropsyData() {
    await loadFilterOptions();
    const results = await getNecropsies();
    return results.map(r => ({
        ...r,
        performedDateFormatted: r.performedDate ? new Date(r.performedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const NecropsyContent = Object.assign(
    Object.create(NecropsyContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllNecropsyOutput>;
