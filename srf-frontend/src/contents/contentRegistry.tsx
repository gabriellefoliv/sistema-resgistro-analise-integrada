import { type ContentProps } from "../components/content";

export interface PageConfig {
    title: string;
    adminOnly?: boolean;
    contents: ContentConfig[];
}

export interface ContentConfig {
    id: string; // formId
    label: string;
    loader?: () => Promise<any>;
    component: ContentProps<any>;
}

// Registry storage
const registry: Record<string, Record<string, PageConfig>> = {};

export function registerContent(
    categoryId: string,
    subCategoryId: string,
    pageTitle: string,
    content: ContentConfig,
    adminOnly?: boolean
) {
    if (!registry[categoryId]) {
        registry[categoryId] = {};
    }
    if (!registry[categoryId][subCategoryId]) {
        registry[categoryId][subCategoryId] = {
            title: pageTitle,
            adminOnly: adminOnly,
            contents: []
        };
    }

    const existingIndex = registry[categoryId][subCategoryId].contents.findIndex(c => c.id === content.id);
    if (existingIndex >= 0) {
        registry[categoryId][subCategoryId].contents[existingIndex] = content;
    } else {
        registry[categoryId][subCategoryId].contents.push(content);
    }
}

export function getPageConfig(categoryId: string, subCategoryId: string): PageConfig | null {
    return registry[categoryId]?.[subCategoryId] || null;
}

import { fetchUsersData, UsersPermissionsContent } from "./admin/users";
import { fetchApplicantsData, ApplicantPermissionsContent } from "./admin/applicants";
import { fetchVeterinarianVisitData, VeterinarianVisitContent } from "./liveanimals/veterinarianVisit/index";
import { fetchVeterinarianSampleData, VeterinarianSampleContent } from "./liveanimals/veterinarianSample/index";
import { fetchPhysicalExamData, PhysicalExamContent } from "./liveanimals/physicalExam/index";
import { fetchVaccineData, VaccineContent } from "./liveanimals/vaccine/index";
import { fetchExamResultData, ExamResultContent } from "./liveanimals/examResult/index";
import { fetchSorologyResultData, SorologyResultContent } from "./liveanimals/sorologyResult/index";
import { fetchEctoparasiteAnalysisData, EctoparasiteAnalysisContent } from "./liveanimals/ectoparasiteAnalysis/index";
import { fetchStoolAnalysisData, StoolAnalysisContent } from "./liveanimals/stoolAnalysis/index";
import { fetchEggCystAnalysisData, EggCystAnalysisContent } from "./liveanimals/eggCystAnalysis/index";
import { fetchMolecularAnalysisData, MolecularAnalysisContent } from "./liveanimals/molecularAnalysis/index";
import { fetchGpsTrackingData, GpsTrackingContent } from "./liveanimals/gpsTracking/index";

export function initRegistry() {
    registerContent('admin', 'permissoes', 'Permissões', {
        id: UsersPermissionsContent.id,
        label: UsersPermissionsContent.label,
        loader: fetchUsersData,
        component: UsersPermissionsContent
    }, true);

    registerContent('admin', 'permissoes', 'Permissões', {
        id: ApplicantPermissionsContent.id,
        label: ApplicantPermissionsContent.label,
        loader: fetchApplicantsData,
        component: ApplicantPermissionsContent
    }, true);

    registerContent('animaisvivos', 'veterinario', 'Veterinário', {
        id: VeterinarianVisitContent.id,
        label: VeterinarianVisitContent.label,
        loader: fetchVeterinarianVisitData,
        component: VeterinarianVisitContent
    });

    registerContent('animaisvivos', 'veterinario', 'Veterinário', {
        id: VeterinarianSampleContent.id,
        label: VeterinarianSampleContent.label,
        loader: fetchVeterinarianSampleData,
        component: VeterinarianSampleContent
    });


    registerContent('animaisvivos', 'veterinario', 'Veterinário', {
        id: VaccineContent.id,
        label: VaccineContent.label,
        loader: fetchVaccineData,
        component: VaccineContent
    });

    registerContent('animaisvivos', 'veterinario', 'Veterinário', {
        id: PhysicalExamContent.id,
        label: PhysicalExamContent.label,
        loader: fetchPhysicalExamData,
        component: PhysicalExamContent
    });

    registerContent('animaisvivos', 'exameseanalises', 'Exames e Análises', {
        id: PhysicalExamContent.id,
        label: PhysicalExamContent.label,
        loader: fetchPhysicalExamData,
        component: PhysicalExamContent
    });

    registerContent('animaisvivos', 'exameseanalises', 'Exames e Análises', {
        id: ExamResultContent.id,
        label: ExamResultContent.label,
        loader: fetchExamResultData,
        component: ExamResultContent
    });

    registerContent('animaisvivos', 'exameseanalises', 'Exames e Análises', {
        id: SorologyResultContent.id,
        label: SorologyResultContent.label,
        loader: fetchSorologyResultData,
        component: SorologyResultContent
    });

    registerContent('animaisvivos', 'exameseanalises', 'Exames e Análises', {
        id: EctoparasiteAnalysisContent.id,
        label: EctoparasiteAnalysisContent.label,
        loader: fetchEctoparasiteAnalysisData,
        component: EctoparasiteAnalysisContent
    });

    registerContent('animaisvivos', 'exameseanalises', 'Exames e Análises', {
        id: StoolAnalysisContent.id,
        label: StoolAnalysisContent.label,
        loader: fetchStoolAnalysisData,
        component: StoolAnalysisContent
    });

    registerContent('animaisvivos', 'exameseanalises', 'Exames e Análises', {
        id: EggCystAnalysisContent.id,
        label: EggCystAnalysisContent.label,
        loader: fetchEggCystAnalysisData,
        component: EggCystAnalysisContent
    });

    registerContent('animaisvivos', 'exameseanalises', 'Exames e Análises', {
        id: MolecularAnalysisContent.id,
        label: MolecularAnalysisContent.label,
        loader: fetchMolecularAnalysisData,
        component: MolecularAnalysisContent
    });

    registerContent('animaisvivos', 'rastreiodegps', 'Rastreio GPS', {
        id: GpsTrackingContent.id,
        label: GpsTrackingContent.label,
        loader: fetchGpsTrackingData,
        component: GpsTrackingContent
    });
}

