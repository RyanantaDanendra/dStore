import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import '../../../css/app.css'
import Sneakers from '../Sneakers';
import Apparels from '../Apparels';
import Modal from '@/Components/Modal';
import { useState } from 'react';


const Navbar = ({ auth }) => {
    console.log(auth);
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
            <nav className="primary-color h-24 flex justify-between px-3 items-center fixed w-full">
                <h1 className="text-3xl text-white">D'Store</h1>
               <div className="links flex gap-5 text-white">
                    <Link href='/'>Home</Link>
                    <Link href="/sneakers">Sneakers</Link>
                    <Link href='/apparels'>Apparels</Link>
                    { renderAuthLink() }
                </div>
            </nav> 
        </>
    );
}
export default Navbar;