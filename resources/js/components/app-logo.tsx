import { LocateFixed } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <LocateFixed className="h-8 w-8" />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">GIS App</span>
            </div>
        </>
    );
}
