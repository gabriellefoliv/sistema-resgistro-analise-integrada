import { type ContentProps } from "../../../components/content";
import { type GetAllVaccineOutput } from "srf-shared-types";
import {
    getVaccines,
    getVaccineFormOptions
} from "../../../services/vaccineService";
import { VaccineToolBar } from "./vaccineToolBar";
import { VaccineExpansion } from "./vaccineExpansion";

let vaccineNameOptions: { value: string | number; label: string }[] = [];
let vaccineTypeOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const vaccineOptions = await getVaccineFormOptions();
        vaccineNameOptions = vaccineOptions.vaccines.map(v => ({ value: v.id, label: v.name }));
        vaccineTypeOptions = vaccineOptions.vaccineTypes.map(vt => ({ value: vt.id, label: vt.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const VaccineContentDefinition = {
    id: 'vacinas-av',
    label: 'Vacinas',
    columns: [
        { key: 'vaccineName', label: 'Vacina', width: 'w-3/12' },
        { key: 'liveAnimalName', label: 'Animal', width: 'w-3/12' },
        { key: 'vaccineTypeName', label: 'Tipo de Aplicação', width: 'w-3/12' },
        { key: 'applicationDateFormatted', label: 'Data da Aplicação', width: 'w-2/12' },
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'applicationDate', label: 'Data da Aplicação', type: 'date' },
            { key: 'liveAnimalName', label: 'Animal', type: 'text' },
            { key: 'vaccineId', label: 'Vacina', type: 'enum', options: vaccineNameOptions },
            { key: 'vaccineTypeId', label: 'Tipo de Aplicação', type: 'enum', options: vaccineTypeOptions },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllVaccineOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllVaccineOutput, close: () => void, refresh: () => void) => (
        <VaccineExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <VaccineToolBar refresh={refresh} />
    )
};

export async function fetchVaccineData() {
    await loadFilterOptions();
    const vaccines = await getVaccines();
    return vaccines.map(s => ({
        ...s,
        applicationDateFormatted: s.applicationDate ? new Date(s.applicationDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        veterinarianVisitDateFormatted: s.veterinarianVisitDate ? new Date(s.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : ''
    }));
};

export const VaccineContent: ContentProps<GetAllVaccineOutput> = Object.assign(
    Object.create(VaccineContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllVaccineOutput>;