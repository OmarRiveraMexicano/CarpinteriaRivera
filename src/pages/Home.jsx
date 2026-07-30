import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import TrustBar from "../components/TrustBar/TrustBar";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import CustomCTA from "../Custom/CustomCTA";
import Footer from "../components/Footer/Footer";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <TrustBar />
            <FeaturedProducts />
           <CustomCTA /> 
           <Footer />
        </>
    );
}

export default Home;