import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = { ...data };
            if (isEdit && !formData.password) {
                const { ...dataWithoutPassword } = formData;
                // @ts-expect-error - Inertia types issue
                await put(`/users/${user!.id}`, dataWithoutPassword);
            } else {
                // @ts-expect-error - Inertia types issue
                await (isEdit ? put(`/users/${user!.id}`, formData) : post('/users', formData));
            }
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar usuario' : 'Nuevo usuario'} />
            <div className="container max-w-2xl py-6 px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEdit ? 'Editar usuario' : 'Nuevo usuario'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form onSubmit={handleSubmit}>
                            <FormField
                                id="name"
                                label="Nombre"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                required
                                autoFocus
                            />

                            <FormField
                                id="last_name"
                                label="Apellido"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                error={errors.last_name}
                                required
                            />

                            <FormField
                                id="email"
                                label="Email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                required
                            />

                            {!isEdit ? (
                                <>
                                    <FormField
                                        id="password"
                                        label="Contraseña"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        error={errors.password}
                                        required
                                    />

                                    <FormField
                                        id="password_confirmation"
                                        label="Confirmar contraseña"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        error={errors.password_confirmation}
                                        required
                                    />
                                </>
                            ) : (
                                <>
                                    <FormField
                                        id="password"
                                        label="Nueva contraseña"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        error={errors.password}
                                    />

                                    <FormField
                                        id="password_confirmation"
                                        label="Confirmar nueva contraseña"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        error={errors.password_confirmation}
                                    />
                                </>
                            )}

                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {isEdit ? 'Actualizar' : 'Crear'}
                                </Button>
                            </div>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
