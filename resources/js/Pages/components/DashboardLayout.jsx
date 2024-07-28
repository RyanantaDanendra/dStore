import { Link } from "@inertiajs/react";

const DashboardLayout = ({ auth, children }) => {
    return (
        <>
            <div className="container w-full h-screen flex fixed bg-gray-100">
                <div id="sidebar" className="w-56 h-full bg-white shadow-sm shadow-gray-200 py-8">
                    <h1 className="font-bold text-center">Dashboard</h1>
                    <div className="links flex flex-col text-justify mt-12 ps-5 text-l gap-2">
                        <Link>Users</Link>
                        <Link href='dashboard/sneakers'>Sneakers</Link>
                        <Link>Apparels</Link>
                    </div>
                </div>
                { children }
            </div>
        </>
    )
}
export default DashboardLayout;