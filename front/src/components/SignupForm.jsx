// importations des modules
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// exportation de la fonction SignupForm
export default function SignupForm() {
    // state (état, données) //
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            nom: "",
            prenom: "",
            email: "",
            mot_de_passe: ""
        },
        validationSchema: Yup.object({
            nom: Yup.string().matches(/^[a-zA-Z]{2,}$/, "Le format de votre nom est incorrect").required('Veuillez entrer un nom !'),
            prenom: Yup.string().matches(/^[a-zA-Z]+-{0,1}[a-zA-Z]+$/, "Le format de votre prénom est incorrect").required('Veuillez entrer un prénom !'),
            email: Yup.string().email("Le format de votre email est incorrect").required('Veuillez entrer un email !'),
            mot_de_passe: Yup.string().min(4, "Veuillez entrer mot de passe d'aux moins 4 caractères !").required('Veuillez entrer un mot de passe !'),
        }),
        onSubmit: (values) => {
            fetch(`http://localhost:3001/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
                .then(response => {
                    if (response.status === 201) {
                        alert('Votre compte à bien été créé !')
                        navigate('/login')
                    } else {
                        alert(`L'adresse email entré est déjà utilisé !`)
                    }
                })
                .catch(err => {
                    alert(err)
                })
        }
    });
    // affichage (render) //
    return (
        <form className="form_container" onSubmit={formik.handleSubmit}>
            <div className='form_container--value'>
                <label htmlFor="nom">Nom : </label>
                <input 
                type="text" 
                name="nom" 
                id="nom" 
                required 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                value={formik.values.nom} />
                {formik.touched.nom && formik.errors.nom ?
                    <p className="msgError">{formik.errors.nom}</p>
                    :
                    null
                }
            </div>
            <div className='form_container--value'>
                <label htmlFor="prenom">Prénom : </label>
                <input type="text" name="prenom" id="prenom" required onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.prenom} />
                {formik.touched.prenom && formik.errors.prenom ? 
                <p className="msgError">{formik.errors.prenom}</p>
                :
                null
            }
            </div>
            <div className='form_container--value'>
                <label htmlFor="email">Email : </label>
                <input type="email" name="email" id="email" required onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? 
                <p className="msgError">{formik.errors.email}</p>
                :
                null
            }
            </div>
            <div className='form_container--value'>
                <label htmlFor="mdp">Mot de passe : </label>
                <input type="password" name="mot_de_passe" id="mot_de_passe" required onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.mot_de_passe} />
                {formik.touched.mot_de_passe && formik.errors.mot_de_passe ? 
                <p className="msgError">{formik.errors.mot_de_passe}</p>
                :
                null
            }
            </div>
            <div className='form--submit'>
                <button className='inscription' type='submit'>S'inscrire</button>
            </div>
        </form>
    )
}