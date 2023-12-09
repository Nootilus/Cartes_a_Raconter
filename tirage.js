// Variables globales
resultmail = "";


function tirerCartes() {
    const nombreDePersonnes = document.getElementById('nombreDePersonnes').value;
    const choixFichierJson = document.getElementById('choixFichierJson');
    const resultDiv = document.getElementById('result');
    const nomsDiv = document.getElementById('noms');
    const formTirage = document.getElementById('formTirage');
    const rebootBTN = document.getElementById('reboot');
    const goMail = document.getElementById('goMail');
    const cheminFichierJson = choixFichierJson.value; // Récupère le chemin du fichier sélectionné
    
    // Vérifiez que le nombre de personnes est valide
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
            resultmail += `Deck : ` + choixFichierJson.value +` ; `;

            // Tirer les cartes pour chaque personne
            for (let i = 0; i < nombreDePersonnes; i++) {

                // Étape 1 – Des variables pour l’affichage et le mail
                rPerso = listesDeCartes[0][Math.floor(Math.random() * listesDeCartes[0].length)];
                rAspect = listesDeCartes[1][Math.floor(Math.random() * listesDeCartes[1].length)];
                rObjet =  listesDeCartes[4][Math.floor(Math.random() * listesDeCartes[4].length)];
                rLieu = listesDeCartes[2][Math.floor(Math.random() * listesDeCartes[2].length)];
                rEvent = listesDeCartes[3][Math.floor(Math.random() * listesDeCartes[3].length)];
                rChute = listesDeCartes[5][Math.floor(Math.random() * listesDeCartes[5].length)];

                // Étape 2 – Afficher les résultats
                const participantDiv = document.createElement('div');
                participantDiv.className = 'participant-block';

                participantDiv.innerHTML = `
                    <table>
                        <tr>
                            <td class="participant"><img class="pictos" src="svg/participant_01.svg" alt="Participant"></td>
                            <td class="celTab participant">${prenoms[i]}</td>
                            <td><img class="pictos" src="svg/personnage_01.svg" alt="Personnage"></td>
                            <td class="celTab">${rPerso}</td> <!-- Carte Personnage -->
                            <td><img class="pictos" src="svg/aspect_01.svg" alt="Aspect"></td>
                            <td class="celTab">${rAspect}</td> <!-- Carte Aspect -->
                        </tr>
                        <tr>
                            <td><img class="pictos" src="svg/objet_01.svg" alt="Objet"></td>
                            <td class="celTab">${rObjet}</td> <!-- Carte Objet -->
                            <td><img class="pictos" src="svg/lieu_01.svg" alt="Lieu"></td>
                            <td class="celTab">${rLieu}</td> <!-- Carte Lieu -->
                            <td><img class="pictos" src="svg/evenement_01.svg" alt="Événement"></td>
                            <td class="celTab">${rEvent}</td> <!-- Carte Événement -->
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td class="chute"><img class="pictos" src="svg/chute_01.svg" alt="Fin de l’histoire"></td>
                            <td class="celTab chute">${rChute}</td> <!-- Carte Fin d'histoire -->
                        </tr>
                    </table>
                    <br/>
                    <hr/>
                    <br/>
                `;

                resultDiv.appendChild(participantDiv);

                // Étape 3 – Remplir le corps du mail
                resultmail += 'Participant : ' + prenoms[i] +` ; `
                resultmail += 'Personnage : ' + rPerso +` ; `
                resultmail += 'Aspect : ' + rAspect +` ; `
                resultmail += 'Objet : ' + rObjet +` ; `
                resultmail += 'Lieu : ' + rLieu +` ; `
                resultmail += 'Événement : ' + rEvent +` ; `
                resultmail += 'Fin d’histoire : ' + rChute +` ; `
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
    var corps = 'Tirage du '+ dateFormattee +' : '+ resultmail;

    var mailtoLink = 'mailto:' + destinataire + '?subject=' + encodeURIComponent(sujet) + '&body=' + encodeURIComponent(corps);

    window.location.href = mailtoLink;
}

