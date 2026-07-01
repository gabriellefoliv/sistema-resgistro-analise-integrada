import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { Content } from "../components/content";
import { getPageConfig, initRegistry } from "../contents/contentRegistry";
import { useAuth } from "../contexts/AuthContext";
import { getAccessLevelOptions } from "../services/formService";
import { getUserAccess } from "../services/userService";

initRegistry();

export function DynamicContent() {
    const { categoryId, subCategoryId, formId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchParams] = useSearchParams();

    const [config, setConfig] = useState(getPageConfig(categoryId!, subCategoryId!));
    const [contents, setContents] = useState<any[]>([]);

    const [userAccess, setUserAccess] = useState<any[]>([]);
    const [accessLevels, setAccessLevels] = useState<any[]>([]);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoadingAuth(false);
            return;
        }
        async function fetchAuthData() {
            if (user?.role !== 'admin' && user?.role !== 'owner') {
                try {
                    const fetchedAccessLevels = await getAccessLevelOptions();
                    const fetchedUserAccess = await getUserAccess(user!.id);
                    setAccessLevels(fetchedAccessLevels);
                    setUserAccess(fetchedUserAccess);
                } catch (e) {
                    console.error(e);
                }
            }
            setLoadingAuth(false);
        }
        fetchAuthData();
    }, [user]);

    useEffect(() => {
        const pageConfig = getPageConfig(categoryId!, subCategoryId!);
        if (!pageConfig) {
            console.error("Página não encontrada", categoryId, subCategoryId);
            navigate('/404');
            return;
        }

        if (pageConfig.adminOnly && user?.role !== 'admin' && user?.role !== 'owner') {
            navigate('/404');
            return;
        }

        setConfig(pageConfig);
    }, [categoryId, subCategoryId, user]);

    function checkAccess(fId: string) {
        if (user?.role === 'admin' || user?.role === 'owner') return true;

        const readLevel = accessLevels.find(level => level.id === 'read');
        if (!readLevel) return false;

        const hasFormAccess = userAccess.find(access => access.formId === fId);
        if (!hasFormAccess) return false;

        const userLevel = accessLevels.find(level => level.id === hasFormAccess.accessLevelId);
        if (!userLevel) return false;

        return userLevel.value >= readLevel.value;
    }

    function checkEditAccess(fId: string) {
        if (user?.role === 'admin' || user?.role === 'owner') return true;

        const editLevel = accessLevels.find(level => level.id === 'edit');
        if (!editLevel) return false;

        const hasFormAccess = userAccess.find(access => access.formId === fId);
        if (!hasFormAccess) return false;

        const userLevel = accessLevels.find(level => level.id === hasFormAccess.accessLevelId);
        if (!userLevel) return false;

        return userLevel.value >= editLevel.value;
    }

    const loadData = async () => {
        if (!config || loadingAuth) return;
        const loadedContents = await Promise.all(config.contents.map(async (contentConf) => {
            const contentProps = Object.assign(Object.create(Object.getPrototypeOf(contentConf.component)), contentConf.component);

            const hasAccessToTab = checkAccess(contentConf.id);

            if (contentConf.loader && hasAccessToTab) {
                try {
                    const data = await contentConf.loader();
                    contentProps.data = data;
                } catch (error: any) {
                    if (error.response?.status !== 403 && error.response?.status !== 401) {
                        navigate('/404');
                    }
                }
            }

            return contentProps;
        }));
        setContents(loadedContents);
    };

    useEffect(() => {
        if (config && !loadingAuth) {
            loadData();
        }
    }, [config, loadingAuth, userAccess, accessLevels]);

    if (!config || contents.length === 0 || loadingAuth) {
        return <div className="ml-sidebar-size p-8 text-text-main">Carregando...</div>;
    }

    const handleFormChange = (newFormId: string) => {
        navigate(`/${categoryId}/${subCategoryId}/${newFormId}`);
    };

    if (!formId) {
        return <Navigate to={`/${categoryId}/${subCategoryId}/${config.contents[0].id}`} replace />;
    }

    const currentHasAccess = checkAccess(formId);
    const currentCanCreate = checkEditAccess(formId);

    const filtersParam = searchParams.get('filters');
    const initialFilters = filtersParam ? JSON.parse(filtersParam) : undefined;

    return (
        <Content
            title={config.title}
            activeFormId={formId!}
            formChange={handleFormChange}
            contents={contents}
            onRefresh={loadData}
            hasAccess={currentHasAccess}
            canCreate={currentCanCreate}
            initialFilter={initialFilters}
        />
    );
}
