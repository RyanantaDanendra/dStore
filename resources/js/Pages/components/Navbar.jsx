import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import '../../../css/app.css'
import Sneakers from '../Sneakers';
import Apparels from '../Apparels';
import { useState } from 'react';
import { useEffect } from 'react';


const Navbar = ({ auth }) => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const togglePopOver = () => {
        if(!open) {
            setOpen(true);
            setTimeout(() => setVisible(true), 10);
        } else {
            setOpen(false);
            setTimeout(() => setVisible(false), 300);
        }
    }

    useEffect(() => {   
        const handleclickOutside = (event) => {
            if(!event.target.closest('#popover') && !event.target.closest('#userName')) {
                setOpen(false);
                setVisible(false);
                setTimeout(() => setOpen(false), 300)
            }
        };

        document.addEventListener('click', handleclickOutside);
        return () => {
            document.removeEventListener('click', handleclickOutside);
        };
    }, [])

    const popOver = () => {
        return open ? (
            <div id='popover' className={ `absolute flex items-center flex-col justify-center w-32 h-20 pb-2 bg-white right-10 top-14 shadow-md shadow-black popover-content ${visible ? 'fade-in' : 'fade-out'}` }>
                <Link href='/profile' className='text-black w-full block text-center hover:bg-blue-600 hover:text-white duration-200 ease-out '>Profile</Link>
                 <Link href='logout' method='post' as='button' className='text-black w-full block mx-auto hover:bg-blue-600 hover:text-white duration-200 ease-out'>Logout</Link>
            </div>
        ) : null
    }

    const renderAuthLink = () => {
        if (auth && auth.user) {
            return (
                <>
                    <p onClick={togglePopOver} className='cursor-pointer font-bold' id='userName'>{ auth.user.name }</p>
                    {popOver()}
                </>
            );
        } else {
            return <Link href='/login'>Login</Link>;
        }
    }   

    return (
        <>
            <nav className="primary-color h-20 flex justify-between px-5 items-center fixed w-full">
                <h1 className="text-2xl text-white font-bold">D'Store</h1>
               <div className="links flex gap-3 text-white">
                    <Link href='/' className='text-md'>Home</Link>
                    <Link href="/sneakers" className='text-md'>Sneakers</Link>
                    <Link href='/apparels' className='text-md'>Apparels</Link>
                    { renderAuthLink() }
                </div>
            </nav> 
        </>
    );
}
export default Navbar;