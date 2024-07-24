import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import '../../../css/app.css'
import Sneakers from '../Sneakers';
import Apparels from '../Apparels';
import Modal from '@/Components/Modal';
import { useState } from 'react';


const Navbar = ({ auth }) => {
    

    const isLoggedIn = () => {
        if (auth) {
            const [modalopen, setModalOpen] = useState(false);

            const openModal = () => { setModalOpen(true); }
            const closeModal = () => { setModalOpen(false); }
            return (
                <>
                    <p className='cursor-pointer' id='userName' onClick={openModal}>{ auth.name }</p>
                    <Modal className='absolute top-0' show={modalopen} onClose={closeModal}>
                        <h1>Hello</h1>
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
                    { isLoggedIn() }
                </div>
            </nav> 
        </>
    );
}
export default Navbar;