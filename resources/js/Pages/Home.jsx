import React from "react";
import Navbar from "./components/Navbar";
import Sneakers from "./Sneakers";
import '../../css/app.css';
import Apparels from "./Apparels";
import HomeHero from "./components/HomeHero";
import HomeSneakers from "./components/HomeSneakers";
import Layout from "./components/Layout";

function Home({ auth }) {
    return (
        <>
            <Layout auth={auth}>
                <HomeHero />
                <HomeSneakers />
            </Layout>
        </>
    );
}
export default Home;