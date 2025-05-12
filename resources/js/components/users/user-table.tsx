import { router } from '@inertiajs/react';
import map from 'lodash/map';
import get from 'lodash/get';

type User = {
    id: number;
    name: string;
    last_name: string;
    email: string;
    roles: { name: string }[];
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        links: PaginationLink[];
    };
};

export default function UserTable({ users }: Props) {
    const handleDelete = (id: number) => {
        if (!confirm('¿Eliminar este usuario?')) return;

        router.delete(`/users/${id}`);
    };

    console.log(users);

    return (
        <div className="rounded-xl border p-4">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Usuarios</h2>
                <button
                    className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
                    onClick={() => router.visit('/users/create')}
                >
                    Nuevo Usuario
                </button>
            </div>

            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-muted text-left">
                        <th className="p-2">Nombre</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th className="text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {map(get(users, 'data', []), (user) => (
                        <tr key={user.id} className="border-t">
                            <td className="p-2">{user.name} {user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{map(get(user, 'roles', []), r => r.name).join(', ')}</td>
                            <td className="text-right">
                                <button
                                    className="mr-2 text-blue-600 hover:underline"
                                    onClick={() => router.visit(`/users/${user.id}/edit`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="text-red-600 hover:underline"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex flex-wrap gap-2">
                {map(users.links, (link, i) => (
                    <button
                        key={i}
                        disabled={!link.url}
                        className={`rounded px-3 py-1 text-sm ${
                            link.active
                                ? 'bg-primary text-white'
                                : 'bg-muted text-black'
                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => link.url && router.visit(link.url)}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
