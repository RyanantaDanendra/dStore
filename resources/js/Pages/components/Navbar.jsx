import '../../../css/app.css'
import Home from '../Home';
import Sneakers from '../Sneakers';
import Apparels from '../Apparels';
import { Link } from '@inertiajs/inertia-react';


function Navbar() {
    return (
        <>
            <nav className="primary-color h-24 flex justify-between px-3 items-center">
                <h1 className="text-3xl text-white">D'Store</h1>
               <div className="links flex gap-5 text-white">
                    <Link href='/'>home</Link>
                    <Link href="/sneakers">Sneakers</Link>
                    <Link href='/apparels'>Apparels</Link>
                </div>
            </nav> 
        </>
    );
}
export default Navbar;