import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Trip } from '@/types/index';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Map',
        href: '/map',
    },
];

function MapClickRedirect() {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const url = route('trips.create') + `?fromMap=true&lat=${lat}&lng=${lng}`;
            window.location.href = url;
        },
    });
    return null;
}

type PageProps = {
    trips: Trip[];
};

export default function Map() {
    const { trips } = usePage<PageProps>().props;
    const { delete: destroy } = useForm();

    const defaultPosition: [number, number] = [-8, 115];
    const center: [number, number] =
        trips && trips.length > 0 ? [trips[0].latitude || defaultPosition[0], trips[0].longitude || defaultPosition[1]] : defaultPosition;

    function deleteTrip(id: number): void {
        if (confirm('Are u sure to delete this trip?')) {
            destroy(route('trips.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Map" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <MapContainer center={center} zoom={8} scrollWheelZoom={true} className="z-0 h-full w-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapClickRedirect />
                        {trips.map((trip) => (
                            <Marker key={trip.id} position={[trip.latitude, trip.longitude]}>
                                <Popup>
                                    <div className="space-y-2">
                                        <h2 className="font-semibold">{trip.title}</h2>
                                        <p className="font-medium">{trip.description}</p>
                                        <div className="flex gap-2">
                                            <Link href={route('trips.edit', trip.id) + '?fromMap=true'}>
                                                <Button variant="secondary">Update</Button>
                                            </Link>
                                            <Button variant="destructive" onClick={() => deleteTrip(trip.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </AppLayout>
    );
}
