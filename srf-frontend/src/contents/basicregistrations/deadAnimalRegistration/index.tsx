import { type ContentProps } from "../../../components/content";
import { type GetAllBasicRegistrationsOutput } from "srf-shared-types";
import { deadAnimalRegistrationService } from "../../../services/basicRegistrationService";
import { BasicRegistrationToolBar } from "../basicRegistrationToolBar";
import { BasicRegistrationActions } from "../basicRegistrationActions";

let typeOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const opts = await deadAnimalRegistrationService.getFormOptions();
        typeOptions = opts.types.map(t => ({ value: t.name, label: t.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const DeadAnimalRegistrationContentDefinition = {
    id: 'cadastrobasico-am',
    label: 'Animais Mortos',
    columns: [
        { key: 'type', label: 'Tipo', width: 'w-5/12' },
        { key: 'displayValue', label: 'Valor', width: 'w-6/12' },
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'type', label: 'Tipo', type: 'enum', options: typeOptions },
            { key: 'displayValue', label: 'Valor', type: 'text' },
        ];
    },
    rowIdField: 'uniqueId',
    renderActions: (item: GetAllBasicRegistrationsOutput, _isExpanded: boolean, _toggle: (id: string) => void, refresh: () => void) => (
        <BasicRegistrationActions
            item={item}
            refresh={refresh}
            getFormOptions={deadAnimalRegistrationService.getFormOptions}
            create={deadAnimalRegistrationService.create}
            update={deadAnimalRegistrationService.update}
            deleteRecord={deadAnimalRegistrationService.delete}
            entityLabel="Cadastro"
        />
    ),
    toolBar: (refresh: () => void) => (
        <BasicRegistrationToolBar
            refresh={refresh}
            getFormOptions={deadAnimalRegistrationService.getFormOptions}
            create={deadAnimalRegistrationService.create}
            update={deadAnimalRegistrationService.update}
            entityLabel="Cadastro"
        />
    ),
};

export async function fetchDeadAnimalRegistrationData() {
    await loadFilterOptions();
    const results = await deadAnimalRegistrationService.getAll();
    return results.map(r => ({
        ...r,
        uniqueId: `${r.type}-${r.id}`,
        displayValue: r.secundaryValue ? `${r.value} (${r.secundaryValue})` : r.value,
    }));
}

export const DeadAnimalRegistrationContent = Object.assign(
    Object.create(DeadAnimalRegistrationContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllBasicRegistrationsOutput>;
