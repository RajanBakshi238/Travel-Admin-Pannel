import Header from '../components/landingPage/Header'
import AboutUs from '../components/landingPage/AboutUs'
import Destination from '../components/landingPage/Destination'
import ContactUs from '../components/landingPage/ContactUs'
import Footer from '../components/landingPage/Footer'
import Travellers from '../components/landingPage/travellers'
import Why from '../components/landingPage/Why'

const Home = () => {
    return (
        <>
            <Header />
            <AboutUs />
            <Travellers />
            <Destination />
            <ContactUs />
            <Why />
            <Footer />
        </>
    )
}

export default Home