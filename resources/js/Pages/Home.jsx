import React from "react";
import Navbar from "./components/Navbar";
import Sneakers from "./Sneakers";
import '../../css/app.css';
import Apparels from "./Apparels";
import HomeHero from "./components/HomeHero";
import HomeSneakers from "./components/HomeSneakers";
import Layout from "./components/Layout";
import { Link } from "@inertiajs/react";

function Home({ auth, images, sneakers }) {
    if (auth.user) {
        if(auth.user.status == 'active') {
            return (
                <>
                    <Layout auth={auth}>
                        <HomeHero />
                        <HomeSneakers images={images} sneakers={sneakers} />
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
                    <HomeSneakers images={images} sneakers={sneakers} />
                </Layout>
            </>
        );
    }
}
export default Home;