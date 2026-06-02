import { useEffect, useState } from "react"
import { getNavigationOptions } from "../services/formService";
import { useAuth } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import userImg from "../assets/loginUser.svg"
import permissionsImg from "../assets/permissions.svg"

interface SubCategoryProps {
    id: string,
    name: string,
}

interface CategoryProps {
    id: string,
    name: string,
    categoryIcon?: string,
    subCategory: SubCategoryProps[] | null,
}

export function Sidebar() {
    const location = useLocation();
    const { user } = useAuth();

    const [options, setOptions] = useState<CategoryProps[]>([]);
    const [selected, setSelected] = useState('');
    const [width, setWidth] = useState(() => {
        const savedWidth = localStorage.getItem('sidebarWidth');
        return savedWidth ? parseInt(savedWidth) : 280;
    });
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        getNavigationOptions().then(options => setOptions(options));
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty('--spacing-sidebar-size', `${width}px`);
        localStorage.setItem('sidebarWidth', width.toString());
    }, [width]);

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            const newWidth = Math.max(200, Math.min(500, e.clientX));
            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = '';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = '';
        };
    }, [isResizing]);

    return (
        <aside className="w-sidebar-size h-screen fixed top-0 left-0 z-99 bg-white border-r border-border flex flex-col">
            {/* User info */}
            <Link to="/minha-conta" onClick={() => setSelected('minha-conta')}>
                <div className="py-5 px-3.5 flex items-center gap-3.75 border-b border-border">
                    <span className="text-text-main text-[16px] font-bold overflow-hidden whitespace-nowrap text-ellipsis">{user?.name}</span>
                </div>
            </Link>
            {/* List of forms */}
            <nav className="grow overflow-y-auto pt-2.5 pr-3.5">
                <p className="py-2.5 px-3.5 text-3 font-bold text-text-light-gray tracking-[1px]">MENU</p>
                <ul>
                    {options.map((option) => (
                        <li key={option.name}>
                            <div className="flex items-center py-3 px-3.5 gap-3 font-medium text-text-main">
                                <img src={option.categoryIcon} alt="Image for Category" className="w-6 h-6" />
                                <span className="overflow-hidden whitespace-nowrap text-ellipsis">{option.name}</span>
                            </div>
                            {option.subCategory && option.subCategory.length > 0 && (
                                <ul className="flex flex-col text-text-main text-[16px]">
                                    {option.subCategory.map((subCategory) => (
                                        <li key={subCategory.name}>
                                            <Link to={`/${option.id.split('_')[1]}/${subCategory.id}`} className={`block py-1 pl-16 w-full cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis ${location.pathname.split('/')[2] === subCategory.id ? 'bg-selected-bg' : 'hover:bg-hover-bg'}`}>
                                                {subCategory.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Permissions (only for admin and owner) */}
            <div className="border-t border-border mt-auto">
                {(user?.role === 'admin' || user?.role === 'owner') && (
                    <Link to="/admin/permissoes/usuarios"
                        className={`flex items-center py-3.75 px-3.5 gap-3 text-text-main text-[16px] font-bold cursor-pointer ${location.pathname.split('/')[2] === 'permissoes' ? 'bg-selected-bg' : 'hover:bg-hover-bg'}`}>
                        <img src={permissionsImg} alt="Image for Permissions Settings" />
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">Gerenciar Permissões</span>
                    </Link>
                )}
                {/* Configs */}
                {/* <a href="#"
                    onClick={() => setSelected('configs')}
                    className={`flex items-center py-3.75 px-3.5 gap-3 text-text-main text-[16px] font-bold cursor-pointer ${selected === 'configs' ? 'bg-selected-bg' : 'hover:bg-hover-bg'}`}>
                    <img src={configsImg} alt="Image for Configs Settings" />
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">Configurações</span>
                </a> */}
            </div>

            {/* Resize bar */}
            <div
                className="absolute right-0 top-0 w-0.5 h-full cursor-col-resize hover:bg-standard-blue transition-colors group-hover:opacity-100"
                onMouseDown={() => setIsResizing(true)}
            />
        </aside>
    )
}