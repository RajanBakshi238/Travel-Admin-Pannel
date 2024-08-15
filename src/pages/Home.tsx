import Header from '../components/landingPage/Header'
import AboutUs from '../components/landingPage/AboutUs'
import Destination from '../components/landingPage/Destination'
import ContactUs from '../components/landingPage/ContactUs'
import Footer from '../components/landingPage/Footer'
import Travellers from '../components/landingPage/travellers'

const Home = () => {
    return (
        <>
            <Header />
            <AboutUs />
            <Travellers />
            <Destination />
            <ContactUs />
            <Footer />
        </>
    )
}

export default Home