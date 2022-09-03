// importations des modules
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// exportation de la fonction PublishUpdateForm
export default function PublishUpdateForm() {
    // state (état, données) //
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [text, setText] = useState("");
    // comportements //
    const handleChangeText = (e) => {
        setText(e.target.value);
    };
    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fetchData = async () =>{
        await fetch(`http://localhost:3001/api/publish/${id}`, {
            mode: "cors",
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: formData
        })
        navigate("..")
    }
        if (image && text) {
            formData.append("image", image);
            formData.append("texte", text);
            fetchData();
        } else if (!image && text) {
            formData.append("texte", text);
            fetchData();
            
        } else if (image && !text) {
            formData.append("image", image);
            fetchData();
        }
    }
    // affichage (render) //
    return (
        <>
            <div className="form--rules">
                <p>Modifier votre publication en remplissant les champs.</p>
                <p>Les champs non remplit ne seront pas modifiés.</p>
            </div>
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
                    <button className='inscription' type='submit'>Modifier</button>
                </div>
            </form>
        </>
    )
};