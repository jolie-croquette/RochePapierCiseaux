"use strict";

//Déclaration des variables
let SelectionDuJoueur = "";
let SelectionDeOrdinateur = "";

// Sélection des éléments du DOM
const lesChoix = document.querySelectorAll('.choix');

// Options de jeu
const options = {
    1: "Roche",
    2: "Papier",
    3: "Ciseaux"
}

// Valide le choix du joueur et l'assigne à la variable
function ValiderChoixDuJoueur(choixDuJoueur){
    SelectionDuJoueur = choixDuJoueur;
    ValdierSelectionOrdinateur();
    CommencerLaPartie();
}

// Assigne un choix à l'ordinateur
function ValdierSelectionOrdinateur(){
    //Assignation d'un nombre aléatoire entre 1 et 3
    SelectionDeOrdinateur = options[Math.floor(Math.random() * 3) + 1];
    return;
}

//Commence la partie
function CommencerLaPartie(){
    //Récupération de la page de jeu
    let leJeu = document.getElementById('jeu');

    //Suppression des éléments enfants
    leJeu.innerHTML = "";

    //Création des éléments enfants

    //Création de la div du joueur
    let divJoueur = document.createElement('div');
    divJoueur.setAttribute('class', 'col-6 divJoueur');

    //Création du texte du joueur
    let textJoueur = document.createElement('h2')
    textJoueur.textContent = 'Joueur';
    divJoueur.appendChild(textJoueur);

    //Création de l'image du joueur
    let ImageJoueur = document.createElement('img');
    ImageJoueur.setAttribute('src', `/ressources/img/Roche.png`);
    ImageJoueur.setAttribute('class', 'img-fluid CompteARebourJoueur');
    divJoueur.appendChild(ImageJoueur);

    //Création de la div de l'ordinateur
    let divOrdinateur = document.createElement('div');
    divOrdinateur.setAttribute('class', 'col-6 divOrdinateur');

    //Création du texte de l'ordinateur
    let textOrdinateur = document.createElement('h2')
    textOrdinateur.textContent = 'Ordinateur';
    divOrdinateur.appendChild(textOrdinateur);

    //Création de l'image de l'ordinateur
    let ImageOrdinateur = document.createElement('img');
    ImageOrdinateur.setAttribute('src', `/ressources/img/Roche.png`);
    ImageOrdinateur.setAttribute('class', 'img-fluid CompteARebourOrdinateur');
    divOrdinateur.appendChild(ImageOrdinateur);

    //Création du bouton recommencer
    let BoutonRecommencer = document.createElement('button');
    BoutonRecommencer.textContent = 'Recommencer';
    BoutonRecommencer.setAttribute('class', 'btn btn-warning fs-3 mt-5 col-12 w-25 mx-auto');
    BoutonRecommencer.setAttribute('onclick', 'window.location.reload()');

    //Ajout des éléments enfants à la page de jeu
    leJeu.appendChild(divJoueur);
    leJeu.appendChild(divOrdinateur);
    leJeu.appendChild(BoutonRecommencer);

    DemarrerCompteARebour();
}

//Démarre le compte à rebour
function DemarrerCompteARebour(){
    //Durée du compte à rebour
    let temps = 3;

    //Sélection des éléments du DOM
    let CompteRebourOrdinateur = document.querySelector('.CompteARebourOrdinateur');
    let CompteARebourJoueur = document.querySelector('.CompteARebourJoueur');

    //Démarrage de l'animation
    CompteARebourJoueur.classList.add('AnimateCompteARebourJoueur');
    CompteRebourOrdinateur.classList.add('AnimateCompteARebourOrdinateur');

    //Décompte
    setTimeout(() => {
        //Changement d'image pour l'options sélectionner par le joueur et l'ordinateur
        CompteARebourJoueur.setAttribute('src', `/ressources/img/${SelectionDuJoueur}.png`);
        CompteRebourOrdinateur.setAttribute('src', `/ressources/img/${SelectionDeOrdinateur}.png`);

        //Suppression de l'animation
        CompteARebourJoueur.classList.remove('AnimateCompteARebourJoueur');
        CompteRebourOrdinateur.classList.remove('AnimateCompteARebourOrdinateur');

        AfficherGagnant();
    }, 3000);

}

// Affiche le gagnant¸
function AfficherGagnant(){
    //Sélection de la page de jeu
    let leJeu = document.getElementById('jeu');

    //Création de la div du gagnant
    let divGagnant = document.createElement('div');
    divGagnant.setAttribute('class', 'col-12 text-center fs-1 mt-5');

    //Création du texte du gagnant
    let textGagnant = document.createElement('h2');
    textGagnant.textContent = 'Gagnant: ';

    //Création du span pour le gagnant
    let leGagnant = document.createElement('span');
    leGagnant.setAttribute('class', 'fw-bold');

    //Détermination du gagnant
    let resultat = DeterminerGagnant();
    leGagnant.textContent = resultat;

    //Changement de la couleur de fond en fonction du gagnant
    //Si le joueur gagne
    if (resultat === "Joueur"){
        let divJoueur = document.querySelector('.divJoueur');
        divJoueur.setAttribute('class', 'col-6 bg-success divJoueur text-white rounded');
    }
    //Si l'ordinateur gagne
    else if (resultat === "Ordinateur"){
        let divOrdinateur = document.querySelector('.divOrdinateur');
        divOrdinateur.setAttribute('class', 'col-6 bg-success divOrdinateur text-white rounded');
    }
    //Si égalité
    else {
        leJeu.setAttribute('class', 'bg-danger rounded row text-center text-white');
    }

    //Ajout des éléments enfants
    textGagnant.appendChild(leGagnant);
    divGagnant.appendChild(textGagnant);
    leJeu.appendChild(divGagnant);
}

// Détermine le gagnant
function DeterminerGagnant(){
    // Vérifier si le choix du joueur est égal à celui de l'ordinateur
    if (SelectionDuJoueur === SelectionDeOrdinateur) {
        return "Égalité";
    }

    // Règles de victoire du joueur
    const gagnantJoueur = {
        "Roche": "Ciseaux",
        "Papier": "Roche",
        "Ciseaux": "Papier"
    };

    // Vérifier si le choix de l'ordinateur est battu par celui du joueur
    return gagnantJoueur[SelectionDuJoueur] === SelectionDeOrdinateur ? "Joueur" : "Ordinateur";
}

// Initialisation de l'écouteur d'événement
function initialisons(){
    //Ajout de l'écouteur d'événement pour chaque choix
    lesChoix.forEach((leChoix) => {
        leChoix.addEventListener('click', () =>{ValiderChoixDuJoueur(leChoix.textContent)});
    });
}

// Écouteur d'événement pour le chargement du DOM
addEventListener('DOMContentLoaded', initialisons);