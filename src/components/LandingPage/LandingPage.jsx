import React from 'react';
import Home from './Home';
import './LandingPage.css';
import Services from './Services';
import Pricing from './Pricing';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

const LandingPage = () => {
    return (
        <div className='w-full'>

            <section id="home" className="home-section flex h-[100vh] mt-24 w-full text-6xl font-bold flex-col 
            items-center gap-2">
                {/* <Logo showLogoText={false} className="h-24 w-auto animate-float" imageHeight="h-24" imageWidth="w-24" /> */}
                <Home />
            </section>

            <section id="services" className="services-section flex flex-col items-center">
                <Services />
            </section>

            <section id="pricing" className="pricing-section">
                <Pricing />
            </section>

            <section id="about" className="about-section">
                <About />
            </section>

            <section id="contact" className="contact-section">
                <Contact />
            </section>

            <Footer />

        </div>
    )
}

export default LandingPage;