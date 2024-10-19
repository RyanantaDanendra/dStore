import React from 'react';
import { Link } from '@inertiajs/react';
import '../../../css/app.css'
import Apparels from '../Apparels';
import Sneakers from '../Sneakers';
import Home from '../Home';
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
            <div id='popover' className={ `absolute flex flex-col justify-center w-40 h-20 bg-white right-14 top-16 popover-content ${visible ? 'fade-in' : 'fade-out'}` }>
                <Link href='/profile' className='text-black w-full hover:bg-gray-200 duration-200 ease-out h-1/2 ps-2 flex items-center'>Profile</Link>
                <Link href='/logout' method='post' as='button' className='text-black w-full ps-2 flex items-center hover:bg-gray-200 text-start h-1/2 duration-200 ease-out'>Logout</Link>
            </div>
        ) : null
    }

    const renderAuthLink = () => {
        if (auth && auth.user) {
            return (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-5 cursor-pointer me-7' id='userName' onClick={togglePopOver} viewBox="0 0 448 512"><path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                    {popOver()}
                </>
            );
        } else {
            return <Link href='/login' className='text-white'>Login</Link>;
        }
    }   

    return (
        <>
            <nav className="primary-color h-20 flex justify-between px-8 items-center fixed w-full">
                    <h1 className="text-2xl text-white font-bold">D'Store</h1>
                    <div className='text-white flex gap-5'>
                        <Link  href='/' className='text-md'>Home</Link>
                        <Link href="/sneakers" className='text-md'>Sneakers</Link>
                        <Link href='/apparels' className='text-md me-6'>Apparels</Link>
                    </div>
                    <div>
                        { renderAuthLink() }
                    </div>
            </nav> 
        </>
    );
}
export default Navbar;