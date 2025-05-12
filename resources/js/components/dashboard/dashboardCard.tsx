import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export default function DashboardCard() {
    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
    );
}
