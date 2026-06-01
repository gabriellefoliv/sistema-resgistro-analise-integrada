import { type ContentProps } from "../../../components/content";
import { type GetAllSorologyResultOutput } from "srf-shared-types";
import { getSorologyResults, getSorologyResultFormOptions } from "../../../services/liveanimals/sorologyResultService";
import { SorologyResultToolBar } from "./sorologyResultToolBar";
import { SorologyResultExpansion } from "./sorologyResultExpansion";

let testNameOptions: { value: string | number; label: string }[] = [];
let interpretationOptions: { value: string | number; label: string }[] = [];
let agentNameOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const sorologyOptions = await getSorologyResultFormOptions();
        testNameOptions = sorologyOptions.sorologyTests.map(t => ({ value: t.name, label: t.name }));
        interpretationOptions = sorologyOptions.interpretations.map(i => ({ value: i.name, label: i.name }));
        agentNameOptions = sorologyOptions.sorologyAgents.map(a => ({ value: a.name, label: a.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const SorologyResultContentDefinition = {
    id: 'resultadosorologico',
    label: 'Sorologias',
    columns: [
        { key: 'veterinarianVisitDateFormatted', label: 'Data da Visita', width: 'w-2/12' },
        { key: 'liveAnimalName', label: 'Animal', width: 'w-3/12' },
        { key: 'veterinarianName', label: 'Veterinário', width: 'w-3/12' },
        { key: 'testName', label: 'Teste', width: 'w-2/12' },
        { key: 'interpretationName', label: 'Interpretação', width: 'w-1/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'veterinarianVisitDate', label: 'Data da Visita', type: 'date' },
            { key: 'liveAnimalName', label: 'Animal', type: 'text' },
            { key: 'veterinarianName', label: 'Veterinário', type: 'text' },
            { key: 'testName', label: 'Teste', type: 'enum', options: testNameOptions },
            { key: 'interpretationName', label: 'Interpretação', type: 'enum', options: interpretationOptions },
            { key: 'agentName', label: 'Agente', type: 'enum', options: agentNameOptions },
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllSorologyResultOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllSorologyResultOutput, close: () => void, refresh: () => void) => (
        <SorologyResultExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <SorologyResultToolBar refresh={refresh} />
    ),
};

export async function fetchSorologyResultData() {
    await loadFilterOptions();
    const results = await getSorologyResults();
    return results.map(r => ({
        ...r,
        veterinarianVisitDateFormatted: r.veterinarianVisitDate ? new Date(r.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const SorologyResultContent: ContentProps<GetAllSorologyResultOutput> = Object.assign(
    Object.create(SorologyResultContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllSorologyResultOutput>;
