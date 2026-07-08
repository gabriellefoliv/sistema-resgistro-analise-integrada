import { type ContentProps } from "../../../components/content";
import { type GetAllVeterinarianSampleOutput } from "srf-shared-types";
import { getVeterinarianSamples } from "../../../services/liveanimals/veterinarianSampleService";
import { getVeterinarianSampleFormOptions } from "../../../services/liveanimals/veterinarianSampleService";
import { SampleToolBar } from "./sampleToolBar";
import { SampleExpansion } from "./sampleExpansion";

let sampleTypeOptions: { value: string | number; label: string }[] = [];
let statusOptions: { value: string | number; label: string }[] = [];
let storageOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const sampleOptions = await getVeterinarianSampleFormOptions();
        sampleTypeOptions = sampleOptions.sampleTypes.map(st => ({ value: st.id, label: st.description }));
        statusOptions = sampleOptions.status.map(s => ({ value: s.id, label: s.name }));
        storageOptions = sampleOptions.storages.map(s => ({ value: s.id, label: s.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const VeterinarianSampleContentDefinition = {
    id: 'amostras-av',
    label: 'Amostras',
    columns: [
        { key: 'veterinarianVisitDateFormatted', label: 'Data da Visita', width: 'w-2/12' },
        { key: 'liveAnimalCode', label: 'Código do Animal', width: 'w-2/12' },
        { key: 'veterinarianName', label: 'Veterinário', width: 'w-2/12' },
        { key: 'sampleTypeDescription', label: 'Tipo da Amostra', width: 'w-2/12' },
        { key: 'statusName', label: 'Status', width: 'w-3/12' },
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'veterinarianVisitDate', label: 'Data da Visita', type: 'date' },
            { key: 'liveAnimalCode', label: 'Código do Animal', type: 'text' },
            { key: 'veterinarianName', label: 'Veterinário', type: 'text' },
            { key: 'sampleTypeId', label: 'Tipo da Amostra', type: 'enum', options: sampleTypeOptions },
            { key: 'statusId', label: 'Status', type: 'enum', options: statusOptions },
            { key: 'storageId', label: 'Armazenamento', type: 'enum', options: storageOptions },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllVeterinarianSampleOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllVeterinarianSampleOutput, close: () => void, refresh: () => void) => (
        <SampleExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <SampleToolBar refresh={refresh} />
    ),
};

export async function fetchVeterinarianSampleData() {
    await loadFilterOptions();
    const samples = await getVeterinarianSamples();
    return samples.map(s => ({
        ...s,
        veterinarianVisitDateFormatted: s.veterinarianVisitDate ? new Date(s.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        sendSamples: s.sendSamples?.map(ss => ({
            ...ss,
            sendDateFormatted: ss.sendDate ? new Date(ss.sendDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        })),
    }));
};

export const VeterinarianSampleContent: ContentProps<GetAllVeterinarianSampleOutput> = Object.assign(
    Object.create(VeterinarianSampleContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllVeterinarianSampleOutput>;