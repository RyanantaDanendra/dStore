import { Head } from '@inertiajs/react';
import DashboardLayout from './components/DashboardLayout';

export default function Dashboard({ auth, sneakers, totalUsers }) {
    const sneakersTotal = sneakers ? sneakers.length : 0;

    if (auth.user.as == 'admin') {
        return (
            <>
                <Head title="Dashboard" />

                <DashboardLayout auth={auth}>
                    <div className="container w-full p-8 flex gap-8">
                        <div className="sneakersTotal">
                            <h1>Sneakers</h1>
                            <p>{ sneakersTotal }</p>
                        </div>
                        <div className="usersTotal">
                            <h1>Users</h1>
                            <p>{ totalUsers }</p>
                        </div>
                    </div>
                </DashboardLayout>
            </>
        );
    } else {
        return <p>Sorry, you're not an admin</p>;
    }

}
