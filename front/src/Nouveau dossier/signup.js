
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const email = document.querySelector("#email");
const mdp = document.querySelector("#mdp");
let prenomValide = false;
let nomValide = false;
let emailValide = false;
let mdpValide = false;
let signupForm = {
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
}

function validation(regex, value, errMsg) {
    let requis = new RegExp(regex);
    let verif = requis.test(value);
    /** Si la vérification de la regex est fausse, affiche le message d'erreur.
     */
    if (verif === false) {
        document.getElementById(errMsg).style.display = "block";
        return false;
        /** Si la vérification de la regex est vrai, retire le message d'erreur.
         */
    } else {
        document.getElementById(errMsg).style.display = "none";
        return true;
    }
}

/**  Ecoute le champ prenom du formulaire.
 */
 nom.addEventListener("change", function () {
    nomValide = validation("^[a-zA-Z]{2,}$", nom.value, "nomErreur")
    signupForm.nom = nom.value;
});
/**  Ecoute le champ nom du formulaire.
 */
prenom.addEventListener("change", function () {
    prenomValide = validation("^[a-zA-Z]+-{0,1}[a-zA-Z]+$", prenom.value, "prenomErreur")
    signupForm.prenom = prenom.value;
});
/**  Ecoute le champ email du formulaire.
 */
email.addEventListener("change", function () {
    emailValide = validation("^[a-zA-Z0-9.-_]+@[a-zA-Z0-9-]{2,}[.][a-z]{2,3}$", email.value, "emailErreur")
    signupForm.email = email.value;
});
/**  Ecoute le champ email du formulaire.
 */
mdp.addEventListener("change", function () {
    mdpValide = validation("^[*]{2,}$", mdp.value, "mdpErreur")
    signupForm.mdp = mdp.value;
});

let postSignup = document.querySelector(".inscription");

postSignup.addEventListener("click", async function (e) {
    e.preventDefault();
    /**  Si tous les champs sont valide les données sont envoyé.
    */
    if (prenomValide && nomValide && emailValide && mdpValide) {
        await fetch(`http://localhost:3000/api/auth/signup`, {
            method: "POST",
            body: JSON.stringify(signupForm),
            headers: {
                "Content-Type": "application/json"
            }
        })
        /**  Si un des champs n'est pas validé l'utilisateur reçoit une alerte.
        */
    } else {
        alert("les champs ne sont pas remplis !")
    }
})