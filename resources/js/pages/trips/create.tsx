import TripForm from '@/components/trip-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

type PageProps = {
    fromMap: boolean;
    lat?: number;
    lng?: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Trips',
        href: '/trips',
    },
];

export default function CreateTrips() {
    const { lat, lng, fromMap } = usePage<PageProps>().props;

    const { data, setData, errors, post } = useForm({
        title: '',
        description: '',
        latitude: lat?.toString() ?? '',
        longitude: lng?.toString() ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('trips.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Trips" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="mx-auto w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>Create New Trip</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <TripForm data={data} setData={setData} errors={errors} onSubmit={submit} submitLabel="Save Trip" />
                    </CardContent>
                </Card>

                <Button asChild variant="default" className="fixed right-6 bottom-6 flex items-center gap-2 rounded-full px-6 py-4 shadow-lg">
                    <Link href={fromMap ? route('map') : route('trips.index')}>
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>
        </AppLayout>
    );
}
