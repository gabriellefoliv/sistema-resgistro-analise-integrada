import { type ContentProps } from "../../../components/content";
import { type GetAllGpsTrackingOutput } from "srf-shared-types";
import { getGpsTrackings, getGpsTrackingFormOptions } from "../../../services/gpsTrackingService";
import { GpsTrackingToolBar } from "./gpsTrackingToolBar";
import { GpsTrackingExpansion } from "./gpsTrackingExpansion";

let trackingDeviceOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const options = await getGpsTrackingFormOptions();
        trackingDeviceOptions = options.trackingDevices.map(td => ({ value: td.id, label: `${td.brand} ${td.serialNumber}` }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const GpsTrackingContentDefinition = {
    id: 'rastreiogps',
    label: 'Registros',
    columns: [
        { key: 'liveAnimalName', label: 'Animal', width: 'w-5/12' },
        { key: 'trackingDeviceBrandSerialNumber', label: 'Dispositivo de Rastreamento', width: 'w-6/12' },
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'liveAnimalName', label: 'Animal', type: 'text' },
            { key: 'trackingDeviceId', label: 'Dispositivo de Rastreamento', type: 'enum', options: trackingDeviceOptions },
            { key: 'startDate', label: 'Data de Instalação', type: 'date' },
            { key: 'withdrawn', label: 'Retirada', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'endDate', label: 'Data de Retirada', type: 'date' },
            { key: 'lastUpdateDate', label: 'Última Atualização', type: 'date' },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllGpsTrackingOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllGpsTrackingOutput, close: () => void, refresh: () => void) => (
        <GpsTrackingExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <GpsTrackingToolBar refresh={refresh} />
    ),
};

export async function fetchGpsTrackingData() {
    await loadFilterOptions();
    const results = await getGpsTrackings();
    return results.map(r => ({
        ...r,
        lastUpdateDateFormatted: r.lastUpdateDate ? new Date(r.lastUpdateDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-',
        startDateFormatted: r.startDate ? new Date(r.startDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        endDateFormatted: r.endDate ? new Date(r.endDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-',
        rawSpreadsheetUpdateDateFormatted: r.rawSpreadsheetUpdateDate ? new Date(r.rawSpreadsheetUpdateDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-',
        editedSpreadsheetUpdateDateFormatted: r.editedSpreadsheetUpdateDate ? new Date(r.editedSpreadsheetUpdateDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-',
    }));
};

export const GpsTrackingContent: ContentProps<GetAllGpsTrackingOutput> = Object.assign(
    Object.create(GpsTrackingContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllGpsTrackingOutput>;
