// Variables globales
resultmail = "";

// Sélecteur de thèmes CSS

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('SelectTheme');
    
    const Themesauve = localStorage.getItem('theme') || 'clair';
    document.documentElement.setAttribute('data-theme', Themesauve);
  
    if (themeToggle) { // Vérifiez que l'élément existe
      themeToggle.addEventListener('change', function () {
        const themeLink = document.getElementById('lienTheme');
        if (themeToggle.checked) {
          themeLink.setAttribute('href', 'styles/univers_sombre.css');
          localStorage.setItem('theme', 'sombre');
        } else {
          themeLink.setAttribute('href', 'styles/univers_clair.css');
          localStorage.setItem('theme', 'clair');
        }
      });
    } else {
      console.error("L'élément avec l'ID 'SelectTheme' est introuvable.");
    }
  });

// Le moteur du tirage…

function tirerCartes() {
    const nombreDePersonnes = document.getElementById('nombreDePersonnes').value;
    const cartesUniques = document.getElementById('cartesUniques').checked;
    const choixFichierJson = document.getElementById('choixFichierJson');
    const resultDiv = document.getElementById('result');
    const nomsDiv = document.getElementById('noms');
    const formTirage = document.getElementById('formTirage');
    const rebootBTN = document.getElementById('reboot');
    const goMail = document.getElementById('goMail');
    const cheminFichierJson = "decks/" + choixFichierJson.value; // Récupère le chemin du fichier sélectionné


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
            const univers = data.univers;
            resultmail += `<b>Deck : ` + univers[0] +`</b><br>`;
            resultmail += '<br><br><hr width=25% /><br><br>';

            // Cloner les catégories dans des tableaux temporaires
            tPerso = [];
            tAspect = [];
            tObjet = [];
            tLieu = [];
            tEvent = [];
            tChute = [];

            // personnages
            who = -1;
            while (++who < listesDeCartes[0].length) {
                tPerso[who] = listesDeCartes[0][who];
            };
            // aspects
            who = -1;
            while (++who < listesDeCartes[1].length) {
                tAspect[who] = listesDeCartes[1][who];
            };
            // lieux 
            who = -1;
            while (++who < listesDeCartes[2].length) {
                tLieu[who] = listesDeCartes[2][who];
            };
            // événements
            who = -1;
            while (++who < listesDeCartes[3].length) {
                tEvent[who] = listesDeCartes[3][who];
            };
            // objets
            who = -1;
            while (++who < listesDeCartes[4].length) {
                tObjet[who] = listesDeCartes[4][who];
            };
            // chutes
            who = -1;
            while (++who < listesDeCartes[5].length) {
                tChute[who] = listesDeCartes[5][who];
            };

            // Afficher le deck choisi
            const choixUnivers = document.createElement('h3');
            choixUnivers.className = "univers";
            choixUnivers.innerHTML = '<img  class="pictos" src="svg/ico_'+ univers[1] +'.svg" alt="'+ univers[1] +'" title="'+ univers[1] +'" />&nbsp;Dans l’univers '+ univers[0] +'&nbsp;<img  class="pictos" src="svg/ico_'+ univers[1] +'.svg" alt="'+ univers[1] +'" title="'+ univers[1] +'" />';
            resultDiv.appendChild(choixUnivers);

            // Tirer les cartes pour chaque personne
            for (let i = 0; i < nombreDePersonnes; i++) {

                switch(cartesUniques) {
                    case true:
                        // VERSION CARTES UNIQUES
                        // Tirage perso
                        randPerso = Math.floor(Math.random() * tPerso.length);
                        rPerso = tPerso[randPerso];
                        tPerso.splice(randPerso, 1)

                        // Tirage aspect
                        randAspect = Math.floor(Math.random() * tAspect.length);
                        rAspect = tAspect[randAspect];
                        tAspect.splice(randAspect, 1)

                        // Tirage objet
                        randObjet = Math.floor(Math.random() * tObjet.length);
                        rObjet = tObjet[randObjet];
                        tObjet.splice(randObjet, 1)

                        // Tirage lieu
                        randLieu = Math.floor(Math.random() * tLieu.length);
                        rLieu = tLieu[randLieu];
                        tLieu.splice(randLieu, 1)

                        // Tirage événement
                        randEvent = Math.floor(Math.random() * tEvent.length);
                        rEvent = tEvent[randEvent];
                        tEvent.splice(randEvent, 1)

                        // Tirage chute
                        randChute = Math.floor(Math.random() * tChute.length);
                        rChute = tChute[randChute];
                        tChute.splice(randChute, 1)
                        break;

                    case false: 
                // VERSION CARTES CLONÉES
                    rPerso = listesDeCartes[0][Math.floor(Math.random() * listesDeCartes[0].length)];
                    rAspect = listesDeCartes[1][Math.floor(Math.random() * listesDeCartes[1].length)];
                    rObjet =  listesDeCartes[4][Math.floor(Math.random() * listesDeCartes[4].length)];
                    rLieu = listesDeCartes[2][Math.floor(Math.random() * listesDeCartes[2].length)];
                    rEvent = listesDeCartes[3][Math.floor(Math.random() * listesDeCartes[3].length)];
                    rChute = listesDeCartes[5][Math.floor(Math.random() * listesDeCartes[5].length)];
                    break;
                }
                // Étape 2 – Afficher les résultats
                const participantDiv = document.createElement('div');
                participantDiv.className = 'participant-block';

                participantDiv.innerHTML = `
                    <table>
                        <tr>
                            <td class="celParticipant celPicto"><img class="pictos" src="svg/participant.svg" alt="Participant" title="Le participant"></td>
                            <td class="celTab celParticipant">${prenoms[i].toLowerCase()}</td>
                            <td class="celPicto"><img class="pictos" src="svg/personnage.svg" alt="Personnage" title="Le personnage"></td>
                            <td class="celTab">${rPerso}</td> <!-- Carte Personnage -->
                            <td class="celPicto"><img class="pictos" src="svg/aspect.svg" alt="Aspect" title="Le caractère"></td>
                            <td class="celTab">${rAspect}</td> <!-- Carte Aspect -->
                        </tr>
                        <tr>
                            <td class="celPicto"><img class="pictos" src="svg/objet.svg" alt="Objet" title="L’objet"></td>
                            <td class="celTab">${rObjet}</td> <!-- Carte Objet -->
                            <td class="celPicto"><img class="pictos" src="svg/lieu.svg" alt="Lieu" title="Le lieu"></td>
                            <td class="celTab">${rLieu}</td> <!-- Carte Lieu -->
                            <td class="celPicto"><img class="pictos" src="svg/evenement.svg" alt="Événement" title="L'événement"></td>
                            <td class="celTab">${rEvent}</td> <!-- Carte Événement -->
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td class="celChute celPicto"><img class="pictos" src="svg/chute.svg" alt="Fin de l’histoire" title="La fin de l’histoire"></td>
                            <td class="celChute">${rChute}</td> <!-- Carte Fin d'histoire -->
                        </tr>
                    </table>
                    <br/>
                    <hr/>
                    <br/>`;

                resultDiv.appendChild(participantDiv);

                // Étape 3 – Remplir le corps du mail
                resultmail += '<i>Participant</i> : <b>' + prenoms[i] +`</b><br>`
                resultmail += '<i>Personnage</i> : ' + rPerso +`<br>`
                resultmail += '<i>Caractère</i> : ' + rAspect +`<br>`
                resultmail += '<i>Objet</i> : ' + rObjet +`<br>`
                resultmail += '<i>Lieu</i> : ' + rLieu +`<br>`
                resultmail += '<i>Événement</i> : ' + rEvent +`<br>`
                resultmail += '<i>Fin d’histoire</i> : ' + rChute +`<br>`
                resultmail += '<br><br><hr width=25% /><br><br>';
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

const envoyerMail = () => {
    const dateDuJour = new Date();
    const jour = ('0' + dateDuJour.getDate()).slice(-2);
    const mois = ('0' + (dateDuJour.getMonth() + 1)).slice(-2);
    const annee = dateDuJour.getFullYear();

    const dateFormattee = `${jour}/${mois}/${annee}`;

    const destinataire = 'scribulerie@nootilus.com';
    const sujet = `Cartes du ${dateFormattee}`;
    const corps = `Tirage du ${dateFormattee} : ${resultmail}`;

    const mailtoLink = `mailto:${destinataire}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;

    //window.location.href = mailtoLink;
    // Ouvrir une nouvelle fenêtre
    var nouvelleFenetre = window.open("", "_blank");
            
    // Écrire dans le document de la nouvelle fenêtre
    nouvelleFenetre.document.open();
    nouvelleFenetre.document.write(resultmail);
    nouvelleFenetre.document.close();
}


/*
   _____ _______ _____   _____    
  / ____|__   __/ ____| |  __ \   
 | |  __   | | | |      | |__) |  
 | | |_ |  | | | |      |  _  /   
 | |__| |_ | |_| |____ _| | \ \ _ 
  \_____(_)|_(_)\_____(_)_|  \_(_)
    Générateur de Tirages de Cartes à Raconter©™®                            
                                  
Version 0.8d — Avril 2025
Créé par Vincent Corlaix avec de gros coups de main de ChatGPT 3.5
Github du projet : https://github.com/Nootilus/Cartes_a_Raconter

Fichier : tirage.js

*/