// Variables globales
let resultmail = "";
let lastUniversName = '';
let lastPDFEntries = [];

// Sélecteur de thèmes CSS
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('SelectTheme');
    const themeLink = document.getElementById('lienTheme');

    const themeSaved = localStorage.getItem('theme') || 'clair';
    // Appliquer immédiatement le thème enregistré
    if (themeLink) {
      themeLink.setAttribute('href', themeSaved === 'sombre' ? 'styles/univers_sombre.css' : 'styles/univers_clair.css');
    }
    document.documentElement.setAttribute('data-theme', themeSaved);

    if (themeToggle) { // Vérifiez que l'élément existe
      themeToggle.checked = (themeSaved === 'sombre');
      themeToggle.addEventListener('change', function () {
        const newTheme = themeToggle.checked ? 'sombre' : 'clair';
        if (themeLink) {
          themeLink.setAttribute('href', newTheme === 'sombre' ? 'styles/univers_sombre.css' : 'styles/univers_clair.css');
        }
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      });
    } else {
      console.error("L'élément avec l'ID 'SelectTheme' est introuvable.");
    }

    // Cacher l'UI PDF au chargement
    const genPDFBtn = document.getElementById('genPDF');
    if (genPDFBtn) genPDFBtn.style.display = 'none';
  });

// Charge dynamique de la bibliothèque PDF au besoin
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.head.appendChild(s);
    });
}

function ensureHtml2pdf() {
    return new Promise(async (resolve, reject) => {
        if (typeof window.html2pdf !== 'undefined') {
            return resolve();
        }
        const cdns = [
            'https://cdn.jsdelivr.net/npm/html2pdf.js@0.9.2/dist/html2pdf.bundle.min.js',
            'https://unpkg.com/html2pdf.js@0.9.2/dist/html2pdf.bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js'
        ];
        for (let i = 0; i < cdns.length; i++) {
            try {
                await loadScript(cdns[i]);
                if (typeof window.html2pdf !== 'undefined') {
                    return resolve();
                }
            } catch (e) {
                console.warn('Échec du chargement de', cdns[i], e);
            }
        }
        reject(new Error('html2pdf introuvable'));
    });
}

// Le moteur du tirage…

function dateTirage() {
    const dateDuJour = new Date();
    const jour = ('0' + dateDuJour.getDate()).slice(-2);
    const mois = ('0' + (dateDuJour.getMonth() + 1)).slice(-2);
    const annee = dateDuJour.getFullYear();
    const dateFormattee = `${jour}/${mois}/${annee}`;
    return dateFormattee;
}

function tirerCartes() {
    const nombreDePersonnes = document.getElementById('nombreDePersonnes').value;
    const cartesUniques = document.getElementById('cartesUniques').checked;
    const choixFichierJson = document.getElementById('choixFichierJson');
    const nomsDiv = document.getElementById('noms');
    const resultDiv = document.getElementById('result');
    const formTirage = document.getElementById('formTirage');
    const rebootBTN = document.getElementById('reboot');
    const goMail = document.getElementById('goMail');
    const genPDF = document.getElementById('genPDF');

    const cheminFichierJson = "decks/" + choixFichierJson.value;
    resultmail = "";


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
            lastUniversName = univers[0];

            // Vérification capacité en mode cartes uniques
            if (cartesUniques) {
                const minDispo = Math.min(
                    listesDeCartes[0].length,
                    listesDeCartes[1].length,
                    listesDeCartes[2].length,
                    listesDeCartes[3].length,
                    listesDeCartes[4].length,
                    listesDeCartes[5].length
                );
                if (nombreDePersonnes > minDispo) {
                    alert(`Nombre de participants (${nombreDePersonnes}) supérieur au nombre de cartes disponibles par catégorie (${minDispo}) pour un tirage unique.`);
                    return;
                }
            }

            let pdfEntries = [];

            resultmail += `<b>Deck : ` + univers[0] +`</b><br>`;
            resultmail += dateTirage();
            resultmail += '<br><br><hr width=25% /><br><br>';

            // Cloner les catégories dans des tableaux temporaires
            let tPerso = [];
            let tAspect = [];
            let tObjet = [];
            let tLieu = [];
            let tEvent = [];
            let tChute = [];

            // personnages
            let who = -1;
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
            choixUnivers.innerHTML = '<img class="pictos" src="svg/ico_'+ univers[1] +'.svg" alt="'+ univers[1] +'" title="'+ univers[1] +'" />&nbsp;Dans l’univers '+ univers[0] +'&nbsp;<img  class="pictos" src="svg/ico_'+ univers[1] +'.svg" alt="'+ univers[1] +'" title="'+ univers[1] +'" />';
            resultDiv.appendChild(choixUnivers);

            // Tirer les cartes pour chaque personne
            for (let i = 0; i < nombreDePersonnes; i++) {

                let rPerso, rAspect, rObjet, rLieu, rEvent, rChute;

                switch(cartesUniques) {
                    case true:
                        // VERSION CARTES UNIQUES
                        // Tirage perso
                        let randPerso = Math.floor(Math.random() * tPerso.length);
                        rPerso = tPerso[randPerso];
                        tPerso.splice(randPerso, 1)

                        // Tirage aspect
                        let randAspect = Math.floor(Math.random() * tAspect.length);
                        rAspect = tAspect[randAspect];
                        tAspect.splice(randAspect, 1)

                        // Tirage objet
                        let randObjet = Math.floor(Math.random() * tObjet.length);
                        rObjet = tObjet[randObjet];
                        tObjet.splice(randObjet, 1)

                        // Tirage lieu
                        let randLieu = Math.floor(Math.random() * tLieu.length);
                        rLieu = tLieu[randLieu];
                        tLieu.splice(randLieu, 1)

                        // Tirage événement
                        let randEvent = Math.floor(Math.random() * tEvent.length);
                        rEvent = tEvent[randEvent];
                        tEvent.splice(randEvent, 1)

                        // Tirage chute
                        let randChute = Math.floor(Math.random() * tChute.length);
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
                <div class="grilleResultat">
                    <div class="grilleTirage">
                        <div class="image-cell celParticipant"><img class="pictos" src="svg/participant.svg" alt="Auteur" title="L’auteur"></div>
                        <div class="text-cell celParticipant">${prenoms[i]}</div>
                        <div class="image-cell"><img class="pictos" src="svg/personnage.svg" alt="Personnage" title="Le personnage"></div>
                        <div class="text-cell">${rPerso}</div>
                        <div class="image-cell"><img class="pictos" src="svg/aspect.svg" alt="Aspect" title="Le caractère"></div>
                        <div class="text-cell">${rAspect}</div>
                        <div class="image-cell"><img class="pictos" src="svg/objet.svg" alt="Objet" title="L’objet"></div>
                        <div class="text-cell">${rObjet}</div>
                        <div class="image-cell"><img class="pictos" src="svg/lieu.svg" alt="Lieu" title="Le lieu"></div>
                        <div class="text-cell">${rLieu}</div>
                        <div class="image-cell"><img class="pictos" src="svg/evenement.svg" alt="Événement" title="L'événement"></div>
                        <div class="text-cell">${rEvent}</div>
                    </div>
                    <div class="grilleChute">
                        <div class="image-cell"><img class="pictos" src="svg/chute.svg" alt="Fin de l’histoire" title="La fin de l’histoire"></div>
                        <div class="text-cell">${rChute}</div>
                    </div>
                </div>
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
                // Données pour PDF text-only
                pdfEntries.push({
                    prenom: prenoms[i],
                    perso: rPerso,
                    aspect: rAspect,
                    objet: rObjet,
                    lieu: rLieu,
                    event: rEvent,
                    chute: rChute
                });
            }

            // Enregistrer les données pour PDF
            lastPDFEntries = pdfEntries;

            // Affiche la DIV des résultats
            resultDiv.style.display = 'block';
            rebootBTN.style.display = 'block';
            //goMail.style.display = 'block';
            genPDF.style.display = 'block';
            genPDF.style.margin = '10px auto';
            formTirage.style.display = 'none';
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));
}


function reinitialiserPage() {
    const resultDiv = document.getElementById('result');
    const rebootBTN = document.getElementById('reboot');
    const goMail = document.getElementById('goMail');
    const genPDF = document.getElementById('genPDF');
    const formTirage = document.getElementById('formTirage');

    if (resultDiv) resultDiv.style.display = 'none';
    if (rebootBTN) rebootBTN.style.display = 'none';
    if (goMail) goMail.style.display = 'none';
    if (genPDF) genPDF.style.display = 'none';
    if (formTirage) formTirage.style.display = 'block';

    // Réinitialise le contenu des résultats
    if (resultDiv) resultDiv.innerHTML = '';

    // Optionnel: rétablir l'état initial des champs si souhaité
    // document.getElementById('nombreDePersonnes').value = 1;
}

function escapeHtml(s) {
    if (s === undefined || s === null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function genererPDF() {
    // Vérifications de données PDF
    if (!lastPDFEntries || !Array.isArray(lastPDFEntries) || lastPDFEntries.length === 0) {
        alert('Aucun résultat disponible pour générer le PDF.');
        return;
    }

    const options = {
        margin: 10,
        filename: 'resultats_tirage_cartes.pdf',
        html2canvas: { backgroundColor: '#fff', scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Construire un HTML text-only (N&B) avec labels en gras
    const bodyHtml = lastPDFEntries.map(e => {
        return (
            '<div style="margin:0 0 10px 0;padding:0 0 10px 0;border-bottom:1px solid #999">'
            + '<div><b>Participant : </b>' + escapeHtml(e.prenom) + '</div>'
            + '<div><b>Personnage : </b>' + escapeHtml(e.perso) + '</div>'
            + '<div><b>Caractère : </b>' + escapeHtml(e.aspect) + '</div>'
            + '<div><b>Objet : </b>' + escapeHtml(e.objet) + '</div>'
            + '<div><b>Lieu : </b>' + escapeHtml(e.lieu) + '</div>'
            + '<div><b>Événement : </b>' + escapeHtml(e.event) + '</div>'
            + '<div><b>La chute : </b></div>'
            + '<div>' + escapeHtml(e.chute) + '</div>'
            + '</div>'
        );
    }).join('');

    const html = (
        '<div style="font-family:Arial,Helvetica,sans-serif;color:#000;background:#fff;font-size:12pt;line-height:1.4">'
        + '<h2 style="margin:0 0 12px 0;padding:0;color:#000">Dans l’univers ' + escapeHtml(lastUniversName) + '</h2>'
        + bodyHtml
        + '</div>'
    );

    ensureHtml2pdf().then(() => {
        try {
            window.html2pdf().set(options).from(html).save();
        } catch (err) {
            console.warn('Export texte vers PDF a échoué, impression navigateur:', err);
            const w = window.open('', '_blank');
            if (w) {
                w.document.open();
                w.document.write('<html><head><meta charset="utf-8"><title>Résultats</title></head><body style="color:#000;background:#fff">' + html + '</body></html>');
                w.document.close();
                w.focus();
                w.print();
            } else {
                alert('Impossible de générer ou d’imprimer le PDF.');
            }
        }
    }).catch((e) => {
        console.warn('Bibliothèque html2pdf indisponible, impression navigateur en secours:', e);
        const w = window.open('', '_blank');
        if (w) {
            w.document.open();
            w.document.write('<html><head><meta charset="utf-8"><title>Résultats</title></head><body style="color:#000;background:#fff">' + html + '</body></html>');
            w.document.close();
            w.focus();
            w.print();
        } else {
            alert('La bibliothèque PDF n’a pas pu être chargée et la fenêtre d’impression n’a pas pu s’ouvrir.');
        }
    });
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

/* Gestion des préférences utilisateur */
/* À faire… */


/*
   _____ _______ _____   _____    
  / ____|__   __/ ____| |  __ \   
 | |  __   | | | |      | |__) |  
 | | |_ |  | | | |      |  _  /   
 | |__| |_ | |_| |____ _| | \ \ _ 
  \_____(_)|_(_)\_____(_)_|  \_(_)
    Générateur de Tirages de Cartes à Raconter©™®                            
                                  
Version 1.0 — septembre 2025
Créé par Vincent Corlaix avec de gros coups de main de ChatGPT 3.5
Github du projet : https://github.com/Nootilus/Cartes_a_Raconter

Fichier : tirageCartes.js

*/