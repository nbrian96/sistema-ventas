import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Props {
    user?: {
        id: number;
        name: string;
        last_name: string;
        email: string;
    };
}

export default function UserForm({ user }: Props) {
    const isEdit = !!user;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Usuarios', href: '/users' },
        { title: isEdit ? 'Editar usuario' : 'Nuevo usuario', href: '#' },
    ];

    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name ?? '',
        last_name: user?.last_name ?? '',
        email: user?.email ?? '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        isEdit
            ? put(`/users/${user!.id}`)
            : post('/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar usuario' : 'Nuevo usuario'} />
            <form onSubmit={handleSubmit} className="space-y-6 p-4 max-w-2xl">
                <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <Label htmlFor="last_name">Apellido</Label>
                    <Input id="last_name" value={data.last_name} onChange={e => setData('last_name', e.target.value)} />
                    {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {!isEdit && (
                    <>
                        <div>
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                            <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                        </div>
                    </>
                )}

                <Button type="submit" disabled={processing}>
                    {isEdit ? 'Actualizar' : 'Crear'}
                </Button>
            </form>
        </AppLayout>
    );
}
