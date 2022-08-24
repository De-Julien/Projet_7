// importations des modules
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NavPublish from "../components/NavPublish";
/*

const dataList = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/api/publish`)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    })
}
*/
// exportation de la fonction Publish
export default function Publish() {
    // state (état, données) //
    // comportements //
    // affichage (render) //
    return (
        <>
            <header>
                <NavPublish />
                <Header />
            </header>
            <section className="publish_container">
                <Link to="/publish/post" ><button className="publish_container--post">Ajouter votre publication</button></Link>
            </section>
        </>
    );
};