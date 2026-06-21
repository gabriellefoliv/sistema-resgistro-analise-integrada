import { type ContentProps } from "../../../components/content";
import { type GetAllNecropsySampleOutput } from "srf-shared-types";
import { getNecropsySamples, getNecropsySampleFormOptions } from "../../../services/deadanimals/necropsySampleService";
import { SampleToolBar } from "./sampleToolBar";
import { SampleExpansion } from "./sampleExpansion";

let sampleTypeOptions: { value: string | number; label: string }[] = [];
let statusOptions: { value: string | number; label: string }[] = [];
let storageOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const sampleOptions = await getNecropsySampleFormOptions();
        sampleTypeOptions = sampleOptions.sampleTypes.map(st => ({ value: st.id, label: st.description }));
        statusOptions = sampleOptions.status.map(s => ({ value: s.id, label: s.name }));
        storageOptions = sampleOptions.storages.map(s => ({ value: s.id, label: s.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const NecropsySampleContentDefinition = {
    id: 'amostras-am',
    label: 'Amostras',
    columns: [
        { key: 'necropsyDateFormatted', label: 'Data da Necrópsia', width: 'w-2/12' },
        { key: 'deadAnimalCode', label: 'Código do Animal', width: 'w-3/12' },
        { key: 'sampleTypeDescription', label: 'Tipo da Amostra', width: 'w-3/12' },
        { key: 'statusName', label: 'Status', width: 'w-3/12' },
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'necropsyDate', label: 'Data da Necrópsia', type: 'date' },
            { key: 'deadAnimalCode', label: 'Código do Animal', type: 'text' },
            { key: 'sampleTypeId', label: 'Tipo da Amostra', type: 'enum', options: sampleTypeOptions },
            { key: 'statusId', label: 'Status', type: 'enum', options: statusOptions },
            { key: 'storageId', label: 'Armazenamento', type: 'enum', options: storageOptions },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllNecropsySampleOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllNecropsySampleOutput, close: () => void, refresh: () => void) => (
        <SampleExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <SampleToolBar refresh={refresh} />
    ),
};

export async function fetchNecropsySampleData() {
    await loadFilterOptions();
    const samples = await getNecropsySamples();
    return samples.map(s => ({
        ...s,
        necropsyDateFormatted: s.necropsyDate ? new Date(s.necropsyDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        sendSamples: s.sendSamples?.map(ss => ({
            ...ss,
            sendDateFormatted: ss.sendDate ? new Date(ss.sendDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        })),
    }));
};

export const NecropsySampleContent: ContentProps<GetAllNecropsySampleOutput> = Object.assign(
    Object.create(NecropsySampleContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllNecropsySampleOutput>;
