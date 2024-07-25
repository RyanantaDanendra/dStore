import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashboardLayout from './components/DashboardLayout';

export default function Dashboard({ auth }) {
    if (auth.user.as == 'admin') {
        return (
            <>
                <Head title="Dashboard" />

                <DashboardLayout auth={auth}>

                </DashboardLayout>
            </>
        );
    } else {
        <p>Sorr, you're not an admin</p>
    }

}
