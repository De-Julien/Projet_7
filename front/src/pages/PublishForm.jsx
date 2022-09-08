// importations des modules
import Header from "../components/Header";
import NavPublish from "../components/NavPublish";
import PublishCreate from "../components/PublishCreate";

// exportation de la fonction PublishForm
export default function PublishForm() {
    // affichage (render) //
    return (
        <>
            <header>
                <NavPublish />
                <Header />
            </header>
            <section className='form'>
                <PublishCreate />
            </section>
        </>
    );
};
