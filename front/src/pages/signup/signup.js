const prenom = document.querySelector("#firstName");
const nom = document.querySelector("#lastName");
const adresse = document.querySelector("#address");
const ville = document.querySelector("#city");
const email = document.querySelector("#email");
/**  Ecoute le champ prenom du formulaire.
 */
 prenom.addEventListener("change", function () {
    prenomValide = valider("^[a-zA-Z]+-{0,1}[a-zA-Z]+$", prenom.value, "firstNameErrorMsg", "le prénom n'est pas valide !")
    contact.firstName = prenom.value;
});
/**  Ecoute le champ nom du formulaire.
 */
nom.addEventListener("change", function () {
    nomValide = valider("^[a-zA-Z]{2,}$", nom.value, "lastNameErrorMsg", "le nom n'est pas valide !")
    contact.lastName = nom.value;
});
/**  Ecoute le champ adresse du formulaire.
 */
adresse.addEventListener("change", function () {
    adresseValide = valider("^[a-zA-Z0-9- _]{5,}$", adresse.value, "addressErrorMsg", "l'adresse n'est pas valide !")
    contact.address = adresse.value;
});
/**  Ecoute le champ ville du formulaire.
 */
ville.addEventListener("change", function () {
    villeValide = valider("^[a-zA-Z- ]{2,}$", ville.value, "cityErrorMsg", "la ville n'est pas valide !")
    contact.city = ville.value;
});
/**  Ecoute le champ email du formulaire.
 */
email.addEventListener("change", function () {
    emailValide = valider("^[a-zA-Z0-9.-_]+@[a-zA-Z0-9-]{2,}[.][a-z]{2,3}$", email.value, "emailErrorMsg", "l'email n'est pas valide !")
    contact.email = email.value;
});