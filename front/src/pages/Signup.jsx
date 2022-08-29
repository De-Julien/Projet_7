// importations des modules
import Header from '../components/Header'
import Nav from '../components/Nav'
import SignupForm from '../components/SignupForm'

// exportation de la fonction Signup
export default function Signup() {
    // affichage (render) //
    return (
        <>
            <header>
                <Nav />
                <Header />
            </header>
            <section className='form'>
                <SignupForm />
            </section>

        </>
    );
};