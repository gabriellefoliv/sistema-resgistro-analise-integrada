import { type ContentProps } from "../../../components/content";
import { type GetAllNecropsyExamResultOutput } from "srf-shared-types";
import { getNecropsyExamResults, getCPCRFormOptions, getQPCRFormOptions } from "../../../services/deadanimals/necropsyExamResultService";
import { NecropsyExamResultToolBar } from "./necropsyExamResultToolBar";
import { NecropsyExamResultExpansion } from "./necropsyExamResultExpansion";

let sampleTypeOptions: { value: string | number; label: string }[] = [];
let extractionTypeOptions: { value: string | number; label: string }[] = [];
let targetGeneOptions: { value: string | number; label: string }[] = [];
let suspiciousAgentOptions: { value: string | number; label: string }[] = [];
let cpcrMethodOptions: { value: string | number; label: string }[] = [];
let cpcrStatusOptions: { value: string | number; label: string }[] = [];
let qpcrStatusOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const cpcrOptions = await getCPCRFormOptions();
        const qpcrOptions = await getQPCRFormOptions();
        sampleTypeOptions = cpcrOptions.sampleTypes.map(st => ({ value: st.id, label: st.name }));
        extractionTypeOptions = cpcrOptions.extractionTypes.map(et => ({ value: et.id, label: et.name }));
        targetGeneOptions = cpcrOptions.targetGenes.map(tg => ({ value: tg.id, label: tg.name }));
        suspiciousAgentOptions = cpcrOptions.suspiciousAgents.map(sa => ({ value: sa.id, label: sa.name }));
        cpcrMethodOptions = cpcrOptions.cpcrMethods.map(cm => ({ value: cm.id, label: cm.name }));
        cpcrStatusOptions = cpcrOptions.cpcrStatuses.map(cs => ({ value: cs.id, label: cs.name }));
        qpcrStatusOptions = qpcrOptions.qpcrStatuses.map(qs => ({ value: qs.id, label: qs.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const EctoparasiteAnalysisContentDefinition = {
    id: 'resultadoexame-am',
    label: 'CPCR e QPCR',
    columns: [
        { key: 'performedDateFormatted', label: 'Data de Realização', width: 'w-2/12' },
        { key: 'necropsyDateFormatted', label: 'Data da Necropsia', width: 'w-2/12' },
        { key: 'deadAnimalCode', label: 'Código do Animal', width: 'w-2/12' },
        { key: 'type', label: 'Tipo do Resultado', width: 'w-2/12' },
        { key: 'sampleTypeName', label: 'Tipo de Amostra', width: 'w-3/12' }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'necropsyDate', label: 'Data da Necropsia', type: 'date' },
            { key: 'deadAnimalCode', label: 'Código do Animal', type: 'text' },
            { key: 'type', label: 'Tipo do Resultado', type: 'enum', options: [{ value: 'CPCR', label: 'CPCR' }, { value: 'QPCR', label: 'QPCR' }] },
            { key: 'sampleTypeName', label: 'Tipo de Amostra', type: 'enum', options: sampleTypeOptions },
            { key: 'extractionTypeName', label: 'Tipo de Extração', type: 'enum', options: extractionTypeOptions },
            { key: 'targetGeneName', label: 'Gene Alvo', type: 'enum', options: targetGeneOptions },
            { key: 'suspiciousAgentName', label: 'Agente Suspeito', type: 'enum', options: suspiciousAgentOptions },
            { key: 'cpcrMethodName', label: 'Método CPCR', type: 'enum', options: cpcrMethodOptions },
            { key: 'cpcrStatusName', label: 'Status CPCR', type: 'enum', options: cpcrStatusOptions },
            { key: 'qpcrStatusName', label: 'Status QPCR', type: 'enum', options: qpcrStatusOptions }
        ];
    },
    rowIdField: 'uniqueId',
    renderActions: (item: GetAllNecropsyExamResultOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(item.uniqueId)}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllNecropsyExamResultOutput, close: () => void, refresh: () => void) => (
        <NecropsyExamResultExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <NecropsyExamResultToolBar refresh={refresh} />
    ),
};

export async function fetchNecropsyExamResult() {
    await loadFilterOptions();
    const results = await getNecropsyExamResults();
    return results.map(r => ({
        ...r,
        ...r.result,
        necropsyDateFormatted: r.result.necropsyDate ? new Date(r.result.necropsyDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        performedDateFormatted: r.result.performedDate ? new Date(r.result.performedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        type: r.type.toUpperCase()
    }));
};

export const NecropsyExamResultContent: ContentProps<GetAllNecropsyExamResultOutput> = Object.assign(
    Object.create(EctoparasiteAnalysisContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllNecropsyExamResultOutput>;
