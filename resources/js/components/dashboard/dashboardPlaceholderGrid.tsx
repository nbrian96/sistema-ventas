import DashboardCard from './dashboardCard';

export default function DashboardPlaceholderGrid() {
    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <DashboardCard />
            </div>
        </>
    );
}
