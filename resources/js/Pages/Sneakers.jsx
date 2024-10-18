import React from 'react';
import Layout from "./components/Layout";
import '../../css/app.css';
import SneakersPage from './Sneakers/SneakersPage';

const Sneakers = ({ sneakers, images, searchSneaker, search, bests, auth, bestImages }) => {
    return (
        <Layout auth={auth}>
            <SneakersPage sneakers={sneakers} images={images} searchSneaker={searchSneaker} search={search} bests={bests} bestImages={bestImages} />
        </Layout>
    );
}
export default Sneakers