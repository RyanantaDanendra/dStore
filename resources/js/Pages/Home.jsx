import Navbar from "./components/Navbar";
import Sneakers from "./Sneakers";
import '../../css/app.css';
import Apparels from "./Apparels";
import HomeHero from "./components/HomeHero";
import HomeSneakers from "./components/HomeSneakers";

function Home() {
    return (
        <>
            <Navbar />
            <HomeHero />
            <HomeSneakers />
        </>
    );
}
export default Home;