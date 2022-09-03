// importations des modules
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavPublish from "../components/NavPublish";

// exportation de la fonction Publish
export default function Publish() {
    // state (état, données) //
    const [publishData, setPublishData] = useState([]);
    const [likeData, setLikeData] = useState([]);
    const navigate = useNavigate();
    const userId = JSON.parse(sessionStorage.getItem('userId'));
    const isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));

    const fetchLikeData = async () => {
        const resultLike = await fetch(`http://localhost:3001/api/publish/like`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .catch(err => console.log(err))
        setLikeData(resultLike);
    };
    const fetchData = async () => {
        const resultPublish = await fetch(`http://localhost:3001/api/publish`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .catch(err => console.log(err))
        setPublishData(resultPublish);
    };
    // comportements //
    useEffect(() => {
        fetchData();
        fetchLikeData();
    }, [setPublishData, setLikeData]);
        
    function see(item) {
        if (item.User.id === userId || isAdmin) {
            return true
        }
        return false
    };

    function post(item) {
        if (item.imageUrl) {
            return true
        }
        return false
    };
    function colorLike(publishId) {
        if (likeData.find(element => element.publishId === publishId && userId === element.userId && element.myLike === 1)) {
            return true
        } else {
            return false
        }
    };
    const handleClickUpdate = (publishId) => {
        navigate(`/Publish/${publishId}`)
    };
    const handleClickDelete = async (publishId) => {
        await fetch(`http://localhost:3001/api/publish/${publishId}`, {
            mode: "cors",
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        })
        fetchData();
    };
    const handleClickLike = async (publishId) => {
        const like = { "myLike": 1 }
        const noLike = { "myLike": 0 }
        if (likeData.find(element => element.publishId === publishId && userId === element.userId && element.myLike === 1)) {
            await fetch(`http://localhost:3001/api/publish/${publishId}/like`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(noLike)
            })
                .then((response) => {
                    response.json()
                    console.log('retire like');
                    fetchData();
                    fetchLikeData();
                })
        } else if (likeData.find(element => element.publishId === publishId && userId === element.userId && element.myLike === 0)) {
            await fetch(`http://localhost:3001/api/publish/${publishId}/like`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(like)
            })
                .then((response) => {
                    response.json()
                    console.log('like');
                    fetchData();
                    fetchLikeData();
                })

        } else {
            await fetch(`http://localhost:3001/api/publish/${publishId}/like`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(like)
            })
                .then((response) => {
                    response.json()
                    console.log('nouveau like');
                    fetchData();
                    fetchLikeData();
                })
        };
    }
    // affichage (render) //
    return (
        <>
            <header>
                <NavPublish />
                <Header />
            </header>
            <section>
                <div className="publish_container_create">
                    <Link to="/publish/post" ><button className="publish_container_create--post">Ajouter votre publication</button></Link>
                </div>
                <div className="publish">
                    {publishData.map(item => (
                        <div className="publish_container" key={item.id}>
                            <div className="publish_container--user">
                                <p>
                                    Créé le {item.createdAt.split("T", 1)} à
                                    {item.createdAt.slice(11, 16)} par {item.User.nom} {item.User.prenom}
                                </p>
                            </div>
                            <div className="publish_container--contents">
                                {post(item) ?
                                    <>
                                        <img src={item.imageUrl} alt="" />
                                        <p>{item.texte}</p>
                                    </>
                                    :
                                    <p>{item.texte}</p>
                                }
                            </div>
                            <div className="publish_container_button">
                                {see(item) ?
                                    <>
                                        <button className="publish_container_button--update"
                                            onClick={() => handleClickUpdate(item.id)}>
                                            Modifier
                                        </button>
                                        <button className="publish_container_button--delete"
                                            onClick={() => handleClickDelete(item.id)}>
                                            Supprimer
                                        </button>
                                    </>
                                        :
                                        <>
                                        </>
                                }
                                        <p className="publish_container_button--number">{item.like}</p>
                                        <button className="publish_container_button--like"
                                            onClick={() => handleClickLike(item.id)}>
                                            {colorLike(item.id) ?
                                                <i style={{ color: "green" }} className="fa-solid fa-thumbs-up"></i>
                                                :
                                                <i style={{ color: "black" }} className="fa-solid fa-thumbs-up"></i>
                                            }
                                        </button>
                                    </div>
                        </div>
                    ))}
                        </div>
            </section>
        </>
    );
};
