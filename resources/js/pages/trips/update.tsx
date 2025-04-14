import TripForm from '@/components/trip-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Trip } from '@/types/index';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Update Trips',
        href: '/trips',
    },
];

type PageProps = {
    trip: Trip;
    fromMap: boolean;
};

export default function UpdateTrips() {
    const { trip, fromMap } = usePage<PageProps>().props;

    const { data, setData, errors, put } = useForm({
        title: trip.title || '',
        description: trip.description || '',
        latitude: trip.latitude?.toString() || '',
        longitude: trip.longitude?.toString() || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('trips.update', trip.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Trips" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="mx-auto w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>Update Trip</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <TripForm data={data} setData={setData} errors={errors} onSubmit={submit} submitLabel="Update Trip" />
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
