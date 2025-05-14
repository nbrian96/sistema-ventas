import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Trash2 } from 'lucide-react';
import get from 'lodash/get';
import map from 'lodash/map';

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
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = (user: User) => {
        setUserToDelete(user);
    };

    const confirmDelete = () => {
        if (!userToDelete) return;

        router.delete(`/users/${userToDelete.id}`, {
            onSuccess: () => {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        });
        setUserToDelete(null);
    };

    return (
        <div className="rounded-xl border p-4">
            {showAlert && (
                <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Usuario eliminado</AlertTitle>
                    <AlertDescription>
                        El usuario ha sido eliminado exitosamente.
                    </AlertDescription>
                </Alert>
            )}

            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Usuarios</h2>
                <Button onClick={() => router.visit('/users/create')}>
                    Nuevo Usuario
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {map(get(users, 'data', []), (user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                {user.name} {user.last_name}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {map(get(user, 'roles', []), (r) => r.name).join(', ')}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.visit(`/users/${user.id}/edit`)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(user)}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-4">
                <Pagination
                    links={users.links}
                    onPageChange={(url) => router.visit(url)}
                />
            </div>

            <Dialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Eliminar usuario?</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro que deseas eliminar al usuario {userToDelete?.name} {userToDelete?.last_name}?
                            Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setUserToDelete(null)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
