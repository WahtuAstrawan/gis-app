import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { FormEventHandler } from 'react';

interface TripFormProps {
    data: {
        title: string;
        description: string;
        latitude: string;
        longitude: string;
    };
    setData: (field: string, value: string) => void;
    errors: Record<string, string>;
    onSubmit: FormEventHandler;
    submitLabel?: string;
}

export default function TripForm({ data, setData, errors, onSubmit, submitLabel = 'Save Trip' }: TripFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Trip title..." />
                    <InputError className="mt-1" message={errors.title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Trip description..."
                    />
                    <InputError className="mt-1" message={errors.description} />
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                    <div>
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input id="latitude" value={data.latitude} onChange={(e) => setData('latitude', e.target.value)} placeholder="-8.4095" />
                        <InputError className="mt-1" message={errors.latitude} />
                    </div>
                    <div>
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input id="longitude" value={data.longitude} onChange={(e) => setData('longitude', e.target.value)} placeholder="115.1889" />
                        <InputError className="mt-1" message={errors.longitude} />
                    </div>
                </div>

                <div className="rounded-full pt-2">
                    <Button type="submit">{submitLabel}</Button>
                </div>
            </div>
        </form>
    );
}
