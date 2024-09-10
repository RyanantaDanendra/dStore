import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import '../../../css/app.css'
import Sneakers from '../Sneakers';
import Apparels from '../Apparels';
import Modal from '@/Components/Modal';
import { useState } from 'react';


const Navbar = ({ auth }) => {
    const [modalopen, setModalOpen] = useState(false);
    
    const openModal = () => { setModalOpen(true); }
    const closeModal = () => { setModalOpen(false); }

    const renderAuthLink = () => {
        if (auth && auth.user) {
            return (
                <>
                    <p className='cursor-pointer' id='userName' onClick={openModal}>{ auth.user.name }</p>
                    <Modal show={modalopen} onClose={closeModal}>
                        <p className='font-bold text-xl'>{ auth.name }</p>
                        <Link href='/profile'>Profile</Link>
                        <Link href='logout' method='post' as='button'>Logout</Link>
                    </Modal>
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