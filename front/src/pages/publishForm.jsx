// importations des modules
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
// exportation de la fonction PublishForm
export default function PublishForm() {
    // state (état, données) //
    // comportements //
    const handleChange = (e) => {
       
    };
    const handelSubmit = (e) => {
       
    };
    // affichage (render) //
    return (
        <>
        <header>
            <NavPublish />
            <Header />
        </header>
        <section className='form'>
                <form className="form_container" onSubmit={handelSubmit}>
                    <div className='form_container--value'>
                        <label htmlFor="Image">Image : </label>
                        <input type="file" name="Image" id="Image" onChange={handleChange} />
                    </div>
                    <div className='form_container--value'>
                        <label htmlFor="Texte">Texte : </label>
                        <input type="text" name="Texte" id="Texte" required onChange={handleChange}  />
                    </div>
                    <div className='form--submit'>
                        <button className='inscription' type='submit'>Envoyer</button>
                    </div>
                </form>
            </section>

       </> 
    );
};