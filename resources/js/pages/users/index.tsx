import UserTable from '@/components/users/user-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import get from 'lodash/get';
import some from 'lodash/some';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Usuarios', href: '/users' },
];

export default function Users() {
    const { auth, users } = usePage<SharedData>().props;

    const isSuperAdmin = some(get(auth, 'user.roles', []) as { name: string }[], { name: 'super-admin' });

    if (!isSuperAdmin) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="No autorizado" />
                <div className="p-4">No tenés permisos para ver esta sección.</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Usuarios" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <UserTable users={users} />
            </div>
        </AppLayout>
    );
}
