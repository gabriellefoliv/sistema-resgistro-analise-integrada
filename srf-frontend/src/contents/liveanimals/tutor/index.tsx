import { type ContentProps } from "../../../components/content";
import { type GetAllTutorOutput } from "srf-shared-types";
import { getTutors, getTutorFormOptions } from "../../../services/liveanimals/tutorService";
import { TutorToolBar } from "./tutorToolBar";
import { TutorExpansion } from "./tutorExpansion";

let gendersOptions: { value: string | number; label: string }[] = [];
let optionsLoaded = false;

async function loadFilterOptions() {
    if (optionsLoaded) return;
    try {
        const opts = await getTutorFormOptions();
        gendersOptions = opts.genders.map(g => ({ value: g.name, label: g.name }));
        optionsLoaded = true;
    } catch (error) {
        console.error('Falha ao carregar opções de filtro:', error);
    }
}

export const TutorContentDefinition = {
    id: 'tutor', //formId
    label: 'Tutor',
    columns: [
        { key: 'name', label: 'Nome', width: 'w-4/12' },
        { key: 'birthDateFormatted', label: 'Data de Nascimento', width: 'w-4/12' },
        { key: 'genderName', label: 'Gênero', width: 'w-3/12', }
        // deixar w-1/12 sobrando para ações
    ],
    get filterFields() {
        return [
            { key: 'createdByMe', label: 'Criados por mim', type: 'boolean', trueLabel: 'Sim', falseLabel: 'Não' },
            { key: 'name', label: 'Nome', type: 'text' },
            { key: 'genderName', label: 'Gênero', type: 'enum', options: gendersOptions },
            { key: 'birthDate', label: 'Data de Nascimento', type: 'date' }
        ];
    },
    rowIdField: 'id',
    renderActions: (item: GetAllTutorOutput, isExpanded: boolean, toggle: (id: string) => void, refresh: () => void) => (
        <button
            onClick={() => toggle(String(item.id))}
            className="text-standard-blue text-xs font-bold uppercase cursor-pointer"
        >
            Expandir
        </button>
    ),
    renderExpansion: (item: GetAllTutorOutput, close: () => void, refresh: () => void) => (
        <TutorExpansion item={item} close={close} refresh={refresh} />
    ),
    toolBar: (refresh: () => void) => (
        <TutorToolBar refresh={refresh} />
    ),
};

export async function fetchTutorData() {
    await loadFilterOptions();
    const results = await getTutors();
    return results.map(r => ({
        ...r,
        birthDateFormatted: r.birthDate ? new Date(r.birthDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
    }));
};

export const TutorContent = Object.assign(
    Object.create(TutorContentDefinition),
    { data: [] }
) as unknown as ContentProps<GetAllTutorOutput>;
