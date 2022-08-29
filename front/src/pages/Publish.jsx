// importations des modules
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NavPublish from "../components/NavPublish";

// exportation de la fonction Publish
export default function Publish() {
    // state (état, données) //
    const [publishData, setPublishData] = useState([]);
    const fetchData = async () => {
        const result = await fetch(`http://localhost:3001/api/publish`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .catch(err => console.log(err))
        setPublishData(result);
    };
    // comportements //
    useEffect(() => {
        fetchData();
    }, [setPublishData]);
    // affichage (render) //
    return (
        <>
            <header>
                <NavPublish />
                <Header />
            </header>
            <section>
                <div className="publish">
                {publishData.map(item => (
                    <div className="publish_container">
                        <div className="publish_container--user">
                            <p>Créé le {item.createdAt.split("T", 1)} à {item.createdAt.slice(11, 16)} par {item.User.nom} {item.User.prenom}</p>
                        </div>
                        <div className="publish_container--contents">
                            <img src={item.imageUrl} alt="" />
                            <p>{item.texte}</p>
                        </div>
                        <div className="publish_container_button">
                            <button className="publish_container_button--update">Modifier</button>
                            <button className="publish_container_button--delete">Supprimer</button>
                            <button className="publish_container_button--like">like</button>
                        </div>
                    </div>
                ))}
                </div>
                <div className="publish_container_create">
                <Link to="/publish/post" ><button className="publish_container_create--post">Ajouter votre publication</button></Link>
                </div>
            </section>
        </>
    );
};
