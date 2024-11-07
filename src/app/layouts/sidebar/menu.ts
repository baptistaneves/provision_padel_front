import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'ph-gauge',
        link: '/',
       
    },
    {
        id: 8,
        label: 'Navegação',
        isTitle: true
    },
    {
        id: 9,
        label: 'Câmaras',
        icon: 'ph-calendar',
        link: '/camaras',
        parentId: 8
    },
    {
        id: 10,
        label: 'Campos',
        icon: 'ph-chats',
        link: '/campos',
        parentId: 8
    },
    {
        id: 11,
        label: 'Vídeos',
        icon: 'ph-envelope',
        link: '/videos',
        parentId: 8,
    },
    {
        id: 60,
        label: 'Configurações',
        isTitle: true
    },
    {
        id: 61,
        label: 'Configurações',
        icon: 'ph-user-circle',
        subItems: [
            {
                id: 62,
                label: 'Utilizadores',
                link: '/',
                parentId: 61,
            },
            {
                id: 63,
                label: 'Níveis de Acesso',
                link: '/',
                parentId: 61,
            }
        ]
    }
]