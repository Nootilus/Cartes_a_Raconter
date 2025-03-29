<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GPL3 License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Nootilus/Cartes_a_Raconter">
    <img src="img_readme/noot_scribulerie.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">Univers à la Carte</h3>
<h4 align="center">Générateur aléatoire de cartes à histoires</h4>

  <p align="center">
    Un générateur de tirages de cartes à raconter des histoires pour atelier d’écriture et jeux d’écriture à contraintes.
    <br />
    <a href="https://github.com/Nootilus/Cartes_a_Raconter"><strong>La doc »</strong></a>
    <br />
    <br />
    <a href="http://test.nootilus.com/cartes/">Accès à la démo</a>
    ·
    <a href="https://github.com/Nootilus/Cartes_a_Raconter/issues">Relever un bug</a>
    ·
    <a href="https://github.com/Nootilus/Cartes_a_Raconter/issues">Suggérer une amélioration</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#about-the-project">À propos du projet</a>
      <ul>
        <li><a href="#built-with">Développement</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Pour commencer</a>
      <ul>
        <li><a href="#prerequisites">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Utilisation</a></li>
    <li><a href="#roadmap">Fait - À faire</a></li>
    <li><a href="#contributing">Contributions</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Remerciements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## À propos

Ce projet propose un système simple et adaptable pour générer des tirages de cartes contenant des éléments destinés à guider l’écriture de courtes histoires dans différents univers.

Pour le moment, les univers disponibles sont :
- Contes de fées
- Science-fiction
- Steampunk
- Horreur

À l’origine de cette idée se trouve le jeu de société « _[Il était une fois](https://fr.wikipedia.org/wiki/Il_%C3%A9tait_une_fois%E2%80%A6_(jeu))_ » édité par _Asmodée_. J’utilise ce jeu comme source d’éléments narratifs durant mes ateliers d’écriture. Les participants adorent, mais m’ont fait la remarque que le jeu de base était un peu trop orienté _contes de fées_ et qu’à l’usage il devenait répétitif.

Je me suis donc mis en tête de créer des jeux de cartes sur le même système, mais dans d’autres univers. En attendant un éventuel budget pour les éditer sous forme de cartes, j’ai décidé de créer une application web permettant de simuler les tirages.

L’idée est également de proposer un système modulaire et –je l’espère– suffisamment simple pour que d’autres se l’accaparent et créent leurs propres versions.

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) 

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`-->

<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>

### Développement

* [![vscodium][vscodium-shield]][vscodium-url]
* [![chatGTP][chatGTP-shield]][chatGTP-url]

Ce mini-site a été codé avec [VSCodium](https://vscodium.com/) et un soutien inconditionnel de _ChatGPT 3.5_.

<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>

<!-- GETTING STARTED -->
<!--
## Pour commencer

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prérequis

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>

-->

<!-- USAGE EXAMPLES -->
## Utilisation

### Fonctionnement du site en version v0.7

1. Dans le menu déroulant, on choisit le set de cartes à utiliser.
2. On choisi si les cartes sont uniques (réaliste) ou clonées (infinies)
3. On choisi ensuite le nombre de participants.
4. On renseigne les prénoms de chaque participant.
5. On clique sur le bouton « `Tirer les cartes` »
6. Le site génère le tirage.
7. Cliquer sur « `Recommencer` » pour réinitialiser le système 
8. On peut éventuellement cliquer sur « `Envoyer les résultats` » pour obtenir une trace écrite des tirages

_Note_ : Le choix des cartes uniques ou clonées détermine si le tirage se comporte de manière réaliste ou non. Dans le cas réaliste –à l’image d’un véritable jeu de cartes– lorsqu’une carte est tirée, elle ne peut plus se trouver dans le paquet restant à distribuer. Chaque carte est alors unique. Dans le cas contraire, les cartes sont _clonables_, c’est à dire que peu importe si une carte a été tirée, elle reste dans la liste des cartes disponibles.

### S’emparer du projet

===> À faire :
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!--
Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

-->
<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>

<!-- ROADMAP -->
## Fait & À faire

### Journal de bord

--- Version 0.8c
- Après beauuuucoup trop de tests foireux, on écarte (momentanément ?) l’export PDF des résultats
- Ajout d’un bouton qui permet l’affichage propre et sobre des résultats dans une page séparée
  - D’abord pour pouvoir les copicoller et les imprimer avec une imprimante mobile
  - Ensuite pour améliorer l’affichage HTML de ces résultats dans un futur… futuristique.

--- Version 0.8b
- Déplacement des decks de cartes dans un dossier `decks/`
  - Parce qu’au bout d’un moment, hein, c’est plus claire comme ça.

--- Version 0.8
- Il a un nom ! :)
- Ajout de l’_openGraph_ dans `index.html`
- Ajout de l’affichage des pictos d’univers dans le tableau des résultats
  - Légère Modification de la structure des `json` pour afficher les pictos
   

--- Version 0.7
- Amélioration de l’interface, mais c’est pas encore ça (enfin, un peu quand même).
- Ajout d’un _work in progress_ de l’univers **Horreur**.
  - WiP Horreur terminé (en v1.0)
- Ajout de l’univers **Polar** (en _work in progress_)
- Ajout d’une bannière texte dans le code pour dire que c’est moi qui l’ai fait (sauf les json)
- Ajout du fichier de `LICENSE` pour le _GPL 3.0_.
- Lissage des noms de participants (mise en minuscule + mise en capitale)

--- Version 0.6
- Ajout du choix du système de tirage :
  - Cartes uniques : chaque carte est unique au tirage, elle ne peut apparaitre qu’une fois par tirage (choix par défaut)
  - Cartes clones : Une même carte peut être tirée plusieurs fois dans le même tirage

--- Version 0.5
- Ajout de texte d’aide au survol des pictos
- Mise en page de tableaux de résultats
- Ajout de l’affichage du deck choisi dans les résultats 
  - … et dans le mail

--- Version 0.4
- Ajout de l’envoi des résultats par mail
  - Pas satisfaisant : un mailto basique mal formaté
    - mais c’est déjà ça…
- Ajout de pictos SVG pour les catégories de cartes
- Un peu de couleurs en CSS (à modifier)

--- Version 0.3
- Création du git
- Ajout du `readme.md` de la mort
- Ajout des cartes originales dans la liste
- Ajout du fichier `template_cartes.json`
- Ajout du fichier `originales.json` (Contes de fées)

### Carnet de route

- [X] Amélioration de l’interface
- [x] Choix pour «cloner» les cartes (différents participants peuvent recevoir la même carte, ou non)
- [x] Envoi d’un mail récapitulatif du tirage (pour suivi atelier)
  - [ ] Améliorer le système de mail
- [ ] Responsiveness
- [ ] Possibilité de mélanger les univers ?
- [ ] Création et ajout des autres univers
    - [ ] Fantasy
    - [X] Horreur
    - [ ] Polar
    - [ ] Cyberpunk (thanks E-Mae)
    - [ ] Lovecraftien (merci Lou)

Voir la [page issues](https://github.com/Nootilus/Cartes_a_Raconter/issues) pour une (éventuelle) liste de suggestions et améliorations.

<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>

<!-- CONTRIBUTING -->
## Contributions

Ce projet est composé à peu près de :
- 10 à 20 % de travail fourni par votre serviteur
- 80 à 90 % de code généré par l’ami ChatGPT 3.5

La majorité des pictos ont été créés par [_Icon54_](https://thenounproject.com/icon54app/), proposés sur le site [**Noun Project**](https://thenounproject.com/browse/collection-icon/basic-solid-icons-62704/?p=1) dans la collection correspondante.

<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>

<!-- LICENSE -->
## License

Ce projet est distribué sous _General Public License_ (GPL), version 3.
Voir le fichier `LICENSE` pour plus d’infos.

<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>

<!-- CONTACT -->
## Contact

Vincent Corlaix - [LittleLinks](http://littlelink.nootilus.com/) - vcorlaix@proton.me

Lien du projet : [https://github.com/Nootilus/Cartes_a_Raconter](https://github.com/Nootilus/Cartes_a_Raconter)

<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Remerciements

* [Olivier Gechter](https://gechter.org/blog/) – Très tôt beta-testeur
* [Les participants de la Scribulerie](https://scribulerie.nootilus.com/) – Les cobayes consentants
* [E-Mae](#) – Création de la liste Cyberpunk

<p align="right">(<a href="#readme-top">Retour en haut</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[vscodium-shield]: https://img.shields.io/badge/VS-Codium-blue
[vscodium-url]: https://vscodium.com/
[chatGTP-shield]: https://img.shields.io/badge/Chat-GTP-orange
[chatGTP-url]: https://chat.openai.com/

[contributors-shield]: https://img.shields.io/github/contributors/Nootilus/Cartes_a_Raconter.svg?style=for-the-badge
[contributors-url]: https://github.com/Nootilus/Cartes_a_Raconter/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Nootilus/Cartes_a_Raconter.svg?style=for-the-badge
[forks-url]: https://github.com/Nootilus/Cartes_a_Raconter/network/members
[stars-shield]: https://img.shields.io/github/stars/Nootilus/Cartes_a_Raconter.svg?style=for-the-badge
[stars-url]: https://github.com/Nootilus/Cartes_a_Raconter/stargazers
[issues-shield]: https://img.shields.io/github/issues/Nootilus/Cartes_a_Raconter.svg?style=for-the-badge
[issues-url]: https://github.com/Nootilus/Cartes_a_Raconter/issues
[license-shield]: https://img.shields.io/github/license/Nootilus/Cartes_a_Raconter.svg?style=for-the-badge
[license-url]: https://github.com/Nootilus/Cartes_a_Raconter/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/vincent-corlaix/
[product-screenshot]: images/screenshot.png

<!-- END OF FILE (j’adore !) -->