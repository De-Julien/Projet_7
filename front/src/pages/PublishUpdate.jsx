// importations des modules
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import NavPublish from "../components/NavPublish";

export default function PublishUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [text, setText] = useState("");

    const handleChangeText = (e) => {
        setText(e.target.value);
    };
    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image && text) {
            formData.append("image", image);
            formData.append("texte", text);
            await fetch(`http://localhost:3001/api/publish/${id}`, {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: formData
            })
            navigate("..");
        } else if (!image && text) {
            formData.append("texte", text);
            await fetch(`http://localhost:3001/api/publish/${id}`, {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: formData
            })
            navigate("..")
        } else if (image && !text) {
            formData.append("image", image);
            await fetch(`http://localhost:3001/api/publish/${id}`, {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: formData
            })
            navigate("..");
        }
    }
    // affichage (render) //
    return (
        <>
            <header>
                <NavPublish />
                <Header />
            </header>
            <section className='form'>
                <form className="form_container" onSubmit={handleSubmit}>
                    <div className='form_container--value'>
                        <label htmlFor="image">Image : </label>
                        <input type="file" name="image" id="image" onChange={handleChangeImage} />
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="Texte">Texte : </label>
                        <input type="text" name="Texte" id="Texte" onChange={handleChangeText} value={text} />
                    </div>
                    <div className='form--submit'>
                        <button className='inscription' type='submit'>Envoyer</button>
                    </div>
                </form>
            </section>
        </>
    );
};


