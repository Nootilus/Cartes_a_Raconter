// Variables globales
let resultmail = '';
let cartesRestantes = {};

function tirerCartes() {
    const nombreDePersonnes = document.getElementById('nombreDePersonnes').value;
    const choixFichierJson = document.getElementById('choixFichierJson');
    const resultDiv = document.getElementById('result');
    const nomsDiv = document.getElementById('noms');
    const formTirage = document.getElementById('formTirage');
    const rebootBTN = document.getElementById('reboot');
    const goMail = document.getElementById('goMail');
    const cheminFichierJson = choixFichierJson.value;

    // Vérifie que le nombre de personnes est valide
    if (nombreDePersonnes < 1) {
        alert("Veuillez entrer un nombre de personnes valide (au moins 1).");
        return;
    }

    // Efface les résultats précédents
    resultDiv.innerHTML = '';

    // Récupérer les prénoms depuis les champs de saisie
    const prenoms = [];
    for (let i = 0; i < nombreDePersonnes; i++) {
        const input = nomsDiv.children[i];
        const nom = input.value.trim();

        if (!nom) {
            alert(`Veuillez entrer le prénom du participant n°${i + 1}.`);
            return;
        }

        prenoms.push(nom);
    }

    // Charger les listes de cartes depuis le fichier JSON sélectionné
    fetch(cheminFichierJson)
        .then(response => response.json())
        .then(data => {
            const listesDeCartes = data.listesDeCartes;
            
            // Initialiser les listes de cartes
            initialiserListesDeCartes(listesDeCartes);

            // Tirer les cartes pour chaque personne
            for (let i = 0; i < nombreDePersonnes; i++) {
                // Tirer les cartes pour chaque participant
                const rPerso = tirerUneCarte('personnage');
                const rAspect = tirerUneCarte('aspect');
                const rObjet = tirerUneCarte('objet');
                const rLieu = tirerUneCarte('lieu');
                const rEvent = tirerUneCarte('événement');
                const rChute = tirerUneCarte('chute');

                // Afficher les résultats
                const participantDiv = document.createElement('div');
                participantDiv.className = 'participant-block';

                participantDiv.innerHTML = `
                    <table>
                        <tr>
                            <td class="celParticipant celPicto"><img class="pictos" src="svg/participant_01.svg" alt="Participant" title="Le participant"></td>
                            <td class="celTab celParticipant">${prenoms[i]}</td>
                            <td class="celPicto"><img class="pictos" src="svg/personnage_01.svg" alt="Personnage" title="Le personnage"></td>
                            <td class="celTab">${rPerso}</td>
                            <td class="celPicto"><img class="pictos" src="svg/aspect_01.svg" alt="Aspect" title="L’aspect"></td>
                            <td class="celTab">${rAspect}</td>
                        </tr>
                        <tr>
                            <td class="celPicto"><img class="pictos" src="svg/objet_01.svg" alt="Objet" title="L’objet"></td>
                            <td class="celTab">${rObjet}</td>
                            <td class="celPicto"><img class="pictos" src="svg/lieu_01.svg" alt="Lieu" title="Le lieu"></td>
                            <td class="celTab">${rLieu}</td>
                            <td class="celPicto"><img class="pictos" src="svg/evenement_01.svg" alt="Événement" title="L'événement"></td>
                            <td class="celTab">${rEvent}</td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td class="celChute celPicto"><img class="pictos" src="svg/chute_01.svg" alt="Fin de l’histoire" title="La fin de l’histoire"></td>
                            <td class="celChute">${rChute}</td>
                        </tr>
                    </table>
                    <br/>
                    <hr/>
                    <br/>
                `;

                resultDiv.appendChild(participantDiv);

                // Remplir le corps du mail
                resultmail += 'Participant : ' + prenoms[i] + ` ; `
                resultmail += 'Personnage : ' + rPerso + ` ; `
                resultmail += 'Aspect : ' + rAspect + ` ; `
                resultmail += 'Objet : ' + rObjet + ` ; `
                resultmail += 'Lieu : ' + rLieu + ` ; `
                resultmail += 'Événement : ' + rEvent + ` ; `
                resultmail += 'Fin d’histoire : ' + rChute + ` ; `
                resultmail += ' /// ';
            }

            // Affiche la DIV des résultats
            resultDiv.style.display = 'block';
            rebootBTN.style.display = 'block';
            goMail.style.display = 'block';
            formTirage.style.display = 'none';
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));
}

function tirerUneCarte(type) {
    if (cartesRestantes[type] && cartesRestantes[type].length > 0) {
        const index = Math.floor(Math.random() * cartesRestantes[type].length);
        const carteTiree = cartesRestantes[type].splice(index, 1)[0];
        return carteTiree;
    }
    return 'Carte épuisée';
}

function reinitialiserPage() {
    document.getElementById('nombreDePersonnes').value = 1;
    document.getElementById('formTirage').style.display = 'block';
    location.reload();
}

function envoyerMail() {
    var dateDuJour = new Date();
    var jour = ('0' + dateDuJour.getDate()).slice(-2);
    var mois = ('0' + (dateDuJour.getMonth() + 1)).slice(-2);
    var annee = dateDuJour.getFullYear();

    var dateFormattee = jour + '/' + mois + '/' + annee;

    var destinataire = 'scribulerie@nootilus.com';
    var sujet = 'Cartes du ' + dateFormattee;
    var corps = 'Tirage du ' + dateFormattee + ' : ' + resultmail;

    var mailtoLink = 'mailto:' + destinataire + '?subject=' + encodeURIComponent(sujet) + '&body=' + encodeURIComponent(corps);

    window.location.href = mailtoLink;
}

function initialiserListesDeCartes(listesDeCartes) {
    cartesRestantes = {};
    for (let i = 0; i < listesDeCartes.length; i++) {
        const typeCarte = listesDeCartes[i][0].type; // Assure-toi que la première carte de chaque liste a un champ "type"
        cartesRestantes[typeCarte] = [...listesDeCartes[i]];
    } else {
        console.error(`La liste de cartes à l'indice ${i} ne contient pas l'élément attendu.`);
    }
}