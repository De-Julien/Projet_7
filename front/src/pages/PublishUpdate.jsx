// importations des modules
import Header from "../components/Header";
import NavPublish from "../components/NavPublish";
import PublishUpdateForm from '../components/PublishUpdateForm'

export default function PublishUpdate() {  
    // affichage (render) //
    return (
        <>
            <header>
                <NavPublish />
                <Header />
            </header>
            <section className='form'>
                <PublishUpdateForm />
            </section>
        </>
    );
};


