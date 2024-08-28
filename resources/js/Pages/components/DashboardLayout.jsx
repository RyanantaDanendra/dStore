import { Link } from "@inertiajs/react";

const DashboardLayout = ({ auth, children }) => {
    return (
        <>
            <div className="container w-full min-h-screen flex bg-gray-100 overflow-y-scroll">
                <div id="sidebar" className="w-56 h-screen fixed bg-white shadow-sm shadow-gray-200 py-8">
                    <h1 className="font-bold text-center">Dashboard</h1>
                    <div className="links flex flex-col text-justify mt-12 ps-5 text-l gap-2">
                        <Link href="/dashboard/users">Users</Link>
                        <Link href='/dashboard/sneakers'>Sneakers</Link>
                        <Link href="/dashboard/apparels">Apparels</Link>
                        <Link href={route('logout')} method="post" as="button" className="w-14">Logout</Link>
                    </div>
                </div>
                { children }
            </div>
        </>
    )
}
export default DashboardLayout;