import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    roles?: string[];
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface UsersData {
    data: User[];
    current_page: number;
    last_page: number;
    links: PaginationLink[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    users?: UsersData;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: { name: string }[];
    [key: string]: unknown;
}
