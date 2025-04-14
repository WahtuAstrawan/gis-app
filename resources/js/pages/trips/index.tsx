import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Trip } from '@/types/index';
import { formatDate } from '@/utils';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, MapPlus } from 'lucide-react';

type PageProps = {
    trips: {
        data: Trip[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        from: number;
        to: number;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Trips',
        href: '/trips',
    },
];

export default function Trips() {
    const { trips } = usePage<PageProps>().props;
    const { delete: destroy } = useForm();

    function deleteTrip(id: number): void {
        if (confirm('Are u sure to delete this trip?')) {
            destroy(route('trips.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Trips" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Latitude</TableHead>
                            <TableHead>Longitude</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trips.data.map((trip) => (
                            <TableRow key={trip.id}>
                                <TableCell className="font-medium">{trip.id}</TableCell>
                                <TableCell>{trip.title}</TableCell>
                                <TableCell>{trip.description}</TableCell>
                                <TableCell>{trip.latitude}</TableCell>
                                <TableCell>{trip.longitude}</TableCell>
                                <TableCell>{formatDate(trip.created_at)}</TableCell>
                                <TableCell>{formatDate(trip.updated_at)}</TableCell>
                                <TableCell className="space-x-2 text-center">
                                    <Button variant="outline" onClick={() => console.log(`Update trip ${trip.id}`)}>
                                        <Link href={route('trips.edit', trip.id)}>Update</Link>
                                    </Button>
                                    <Button variant="destructive" onClick={() => deleteTrip(trip.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between border-t px-2 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">
                        Showing <span className="font-medium">{trips.from}</span> to <span className="font-medium">{trips.to}</span> of{' '}
                        <span className="font-medium">{trips.total}</span> results
                    </div>
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={trips.current_page === 1}
                                onClick={() => {
                                    window.location.href = `${window.location.pathname}?page=${trips.current_page - 1}`;
                                }}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                Page {trips.current_page} of {trips.last_page}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={trips.current_page === trips.last_page}
                                onClick={() => {
                                    window.location.href = `${window.location.pathname}?page=${trips.current_page + 1}`;
                                }}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Button asChild variant="default" className="fixed right-6 bottom-6 flex items-center gap-2 rounded-full px-6 py-4 shadow-lg">
                    <Link href={route('trips.create')}>
                        <MapPlus className="h-4 w-4" />
                        Create
                    </Link>
                </Button>
            </div>
        </AppLayout>
    );
}
