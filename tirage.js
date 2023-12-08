function tirerCartes() {
    const formTirage = document.getElementById('formTirage');
    const resultDiv = document.getElementById('result');
    const rebootBTN = document.getElementById('reboot');
    const nombreDePersonnes = document.getElementById('nombreDePersonnes').value;
    const nomsDiv = document.getElementById('noms');
    const choixFichierJson = document.getElementById('choixFichierJson');
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

            // Tirer les cartes pour chaque personne
            for (let i = 0; i < nombreDePersonnes; i++) {
                // Créez une div pour chaque participant
                const participantDiv = document.createElement('div');
                participantDiv.className = 'participant-block';

                // Ajoutez les informations dans la div du participant
                participantDiv.innerHTML = `
                    <table>
                        <tr>
                            <th>Participant&nbsp;:</th>
                            <th>Personnage&nbsp;:</th>
                            <th>Aspect&nbsp;:</th>
                        </tr>
                        <tr>
                            <td>${prenoms[i]}</td>
                            <td>${listesDeCartes[0][Math.floor(Math.random() * listesDeCartes[0].length)]}</td> <!-- Carte Personnage -->
                            <td>${listesDeCartes[1][Math.floor(Math.random() * listesDeCartes[1].length)]}</td> <!-- Carte Aspect -->
                        </tr>
                        <tr>
                            <th>Objet&nbsp;:</th>
                            <th>Lieu&nbsp;:</th>
                            <th>Événement&nbsp;:</th>
                        </tr>
                        <tr>
                            <td>${listesDeCartes[4][Math.floor(Math.random() * listesDeCartes[4].length)]}</td> <!-- Carte Objet -->
                            <td>${listesDeCartes[2][Math.floor(Math.random() * listesDeCartes[2].length)]}</td> <!-- Carte Lieu -->
                            <td>${listesDeCartes[3][Math.floor(Math.random() * listesDeCartes[3].length)]}</td> <!-- Carte Événement -->
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <th>La Fin de l'histoire&nbsp;:</th>
                        </tr>
                        <tr>
                            <td>${listesDeCartes[5][Math.floor(Math.random() * listesDeCartes[5].length)]}</td> <!-- Carte Fin d'histoire -->
                        </tr>
                    </table>
                    <br/>
                    <hr/>
                    <br/>
                `;

                // Ajoutez la div du participant à la page
                resultDiv.appendChild(participantDiv);
            }

            // Affiche la DIV des résultats
            resultDiv.style.display = 'block';
            rebootBTN.style.display = 'block';
            formTirage.style.display = 'none';
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));
}


function reinitialiserPage() {
    document.getElementById('nombreDePersonnes').value = 1;
    document.getElementById('formTirage').style.display = 'block';
    location.reload();
}