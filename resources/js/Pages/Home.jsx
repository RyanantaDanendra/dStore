import React from "react";
import Navbar from "./components/Navbar";
import Sneakers from "./Sneakers";
import '../../css/app.css';
import Apparels from "./Apparels";
import HomeHero from "./components/HomeHero";
import HomeSneakers from "./components/HomeSneakers";
import Layout from "./components/Layout";
import { Link } from "@inertiajs/react";

function Home({ auth }) {
    if (auth.user) {
        if(auth.user.status == 'active') {
            return (
                <>
                    <Layout auth={auth}>
                        <HomeHero />
                        <HomeSneakers />
                    </Layout>
                </>
            );
        } else {
            return (
                <>
                    <div className="container flex justify-center h-screen items-center flex-col">
                        <p className="text-center">Sorry, your account has been de-activated due to a violation.</p>
                        <Link href='logout' method="post" as="button">Logout</Link>
                    </div>
                </>
            );
        }
    } else {
        return (
            <>
                <Layout auth={auth}>
                    <HomeHero />
                    <HomeSneakers />
                </Layout>
            </>
        );
    }
}
export default Home;