// importations des modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// exportation de la fonction PublishCreate
export default function PublishCreate() {
    // state (état, données) //
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    // comportements //
    const handleChangeImage = (e) => {
        let imageCopy = { ...image };
        imageCopy = e.target.files[0];
        setImage(imageCopy);
        console.log(image);
    };
    // fonction qui récupère la valeur et sauvegarde dans le state
    const handleChangeText = (e) => {
        setText(e.target.value);
    };
    // fonction qui récupère l'image et le texte et les sauvegarde dans le state
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.set("texte", text);
        formData.append("image", image)
        await fetch(`http://localhost:3001/api/publish`, {
            mode: "cors",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: formData
        })
        navigate("/publish");
    };
    // affichage (render) //
    return (
        <form className="form_container" onSubmit={handleSubmit}>
            <div className='form_container--value'>
                <label htmlFor="image">Image : </label>
                <input type="file" name="image" id="image" onChange={handleChangeImage} />
            </div>
            <div className='form_container--value'>
                <label htmlFor="Texte">Texte : </label>
                <input type="text" name="Texte" id="Texte" required onChange={handleChangeText} value={text} />
            </div>
            <div className='form--submit'>
                <button className='inscription' type='submit'>Ajouter</button>
            </div>
        </form>
    )
}