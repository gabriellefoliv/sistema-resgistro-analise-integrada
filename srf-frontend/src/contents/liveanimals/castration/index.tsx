import { type ContentProps } from "../../../components/content";
import { type GetAllCastrationOutput } from "srf-shared-types";
import { getCastrations } from "../../../services/liveanimals/castrationService";
import { CastrationToolBar } from "./castrationToolBar";
import { CastrationExpansion } from "./castrationExpansion";

export const CastrationContentDefinition = {
    id: 'castracao',
    label: 'Castrações',
    columns: [
        { key: 'liveAnimalName', label: 'Animal', width: 'w-5/12' },
        { key: 'dateFormatted', label: 'Data', width: 'w-5/12' },
        // deixar w-2/12 sobrando para ações
    ],
    filterFields: [
        { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
        { key: 'liveAnimalName', label: 'Animal', type: 'text' },
        { key: 'date', label: 'Data', type: 'date' },
        { key: 'hasVeterinarianVisit', label: 'Realizada em Visita Veterinária?', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
    ],
    rowIdField: 'id',
    renderActions: (item: GetAllCastrationOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllCastrationOutput, close: () => void, refresh: () => void) => (
        <CastrationExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <CastrationToolBar refresh={refresh} />
    ),
};

export async function fetchCastrationData() {
    const castrations = await getCastrations();
    return castrations.map(c => ({
        ...c,
        dateFormatted: c.date ? new Date(c.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        veterinarianVisitDateFormatted: c.veterinarianVisitDate ? new Date(c.veterinarianVisitDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : ''
    }));
};

export const CastrationContent: ContentProps<GetAllCastrationOutput> = Object.assign(
    Object.create(CastrationContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllCastrationOutput>;
