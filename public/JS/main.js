// création classe personne --> méthode et propriété
let personne = {
    nom: "Houssein",
    lieu: [],
    argent: 70,
    mainDroite: [],
    mainGauche: [],
    // methode pour tout ce qui est déplacement
    seDeplacer(lieu) {
        // rajoute le lieu
        lieu.personnes.push(this);
        // suppr le lieu
        this.lieu.splice(this.lieu.indexOf(this, 1));
        console.log(`${this.nom} est actuellement à ${lieu.nom}`);
    },
    // methode pour payer l'article à l'épicerie
    payerArticle(article, lieu) {
        this.argent -= article.prix;
        lieu.caisse += article.prix;
        console.log(`${personne.nom} a payé ${article.nom}`);
        // je prends et retire mon article dans la main droite apres avoir payer
        this.mainDroite.push(article);
        this.mainDroite[0].contenu.splice(this.mainDroite[0].contenu.indexOf(article, 1));
    },
    // methode pour rendre le panier au magasin que j'ai mis en parametre
    rendrePanier(lieu) {
        // rajoute le panier
        lieu.paniers.push(this.mainDroite[0])
        // retire le panier de la main
        this.mainDroite.splice(0, 1);
        
    },
    // fonction pour remplir mon bol et j'ai mis 2 parametre 
    remplirBol(ingredient, contenant) {
        // je rajoute mes ingredients
        contenant.contenu.push(ingredient);
        // retire de ma main droite
        this.mainDroite.splice(this.mainDroite.indexOf(ingredient, 1));
        console.log(`${ingredient.nom} est dans le ${contenant.nom}`);;
    },
    // methode  pour couper mes ingredient que s'ils sont en etat entier
    couper(ingredient) {
        if (ingredient.etat == "entier") {
            ingredient.etat = "coupé"
            console.log(`${ingredient.nom} est ${ingredient.etat}`)
        } else {
            console.log(`${ingredient.nom} n'a pas besoin d'être coupé`)
        }
    },

};
// creer objet maison 
let maison = {
    nom: "la maison",
    personnes: [],

};
let couteau = {
    nom:"couteau",
    action:"coupe"
}
// creation poele + methode cuir (cuit apres 4s)
let poele = {
    nom: "poêle",
    contenu: [],
    cuire(melange){
        console.log(`l'${this.contenu[0].nom} est dans la ${this.nom} mais n'est ${this.contenu[0].etat}`)
        this.contenu.push(melange.contenu[0], melange.contenu[1], melange.contenu[2], melange.contenu[3]);
        melange.contenu.splice(0, melange.contenu.length);

        setTimeout(() => {
            this.contenu[0].etat = "cuite"
            console.log(`l'${this.contenu[0].nom} est ${this.contenu[0].etat} en 4 secondes parce que ma maison c'est un volcan`)
        }, 4000);
    },
};

// creation bol + méthode melanger pour mon omelette
let bol = {
    nom: "bol",
    contenu: [],
    melanger(nomMelange, etat) {
        let newMelange = {
            nom: nomMelange,
            etat: etat
        };
        poele.contenu.push(newMelange);
        console.log(`les ingrédients du ${this.nom} sont mélangés, c'est maintenant une ${nomMelange} qui n'est ${etat}`)
    }

};



// la classe lieu sera le parent
class Lieu {
    constructor(nom, personnes) {
        this.nom = nom;
        this.personnes = personnes
    }
};
// epicerie et l'enfants de lieu
class Epicerie extends Lieu {
    constructor(nom, personnes, paniers, ingredients, caisse) {
        super(nom, personnes);
        this.paniers = paniers;
        this.ingredients = ingredients;
        this.caisse = caisse;
        // cette methode pour retirer mes panier
        this.methodePaniers = () => {
            // recupere au hasard un panier
            let panierRandom = this.paniers[Math.floor(Math.random()*this.paniers.length)];
            personne.mainDroite.push(panierRandom);
            this.paniers.splice(this.paniers.indexOf(panierRandom, 1))
            console.log(`${personne.nom} prend un panier de ${this.nom}, le ${personne.mainDroite[0].nom}`)
            return true
        };
        // methode pour recuperer mes course/article
        this.methodeCourses = () => {
            // remplire mon panier
            this.ingredients.forEach(element => {
                personne.mainDroite[0].contenu.push(element);
                console.log(`${personne.nom} a mis ${element.nom} dans son panier`)
            });
        };
    }
    
};

// class
class Ingredients {
    constructor(nom, etat, prix) {
        this.nom = nom;
        this.etat = etat;
        this.prix = prix;
    };
};

// mes paniers
let panier1 = {
    nom: "panier 1",
    contenu: [],
};
let panier2 = {
    nom: "panier 2",
    contenu: [],
};
let panier3 = {
    nom: "panier 3",
    contenu: [],
};
let panier4 = {
    nom: "panier 4",
    contenu: [],
};

// instance
let oignon = new Ingredients("l'oignon", "entier", 1);
let oeuf = new Ingredients ("l'oeuf", "entier", 3);
let epices = new Ingredients ("le mélange d'épices", "moulues", 4);
let fromage = new Ingredients ("le fromage", "entier", 2);

// contient tous mes ingredients
let tabIngredients = [];
tabIngredients.push(oignon, oeuf, epices, fromage);


// contient tous mes tableaux
let tabPaniers = [];
tabPaniers.push(panier1, panier2, panier3, panier4);

let magasin = new Epicerie ("l'épicerie", [], tabPaniers, tabIngredients, 0);

// debut omelette


// Pour dire que le personnage est a la maison
personne.seDeplacer(maison);
// Pour dire  que le perso est au magasin
personne.seDeplacer(magasin);

// perso prend un des paniers dans lépicerie 
magasin.methodePaniers();
// et mets les ingredient dans panier
magasin.methodeCourses();


// Payer chaque ingrédient récupéré dans le panier. Avec une boucle aussi, on va les passer 1 à 1 dans la fonction payerArticle()

personne.payerArticle(oignon, magasin);
personne.payerArticle(oeuf, magasin);
personne.payerArticle(epices, magasin);
personne.payerArticle(fromage, magasin);

personne.rendrePanier(magasin);
// affiche argent qui me reste 
console.log(`${personne.nom} a ${personne.argent}€ après ses courses.`);

// direction maison
personne.seDeplacer(maison);
// je rempli mon bol
personne.remplirBol(oignon, bol);
personne.remplirBol(oeuf, bol);
personne.remplirBol(epices, bol);
personne.remplirBol(fromage, bol);

// je coupe mes aliment avec fonction couper
personne.couper(oignon);
personne.couper(oeuf);
personne.couper(epices);
personne.couper(fromage);

// mon omelette pas encore cuite
bol.melanger("omelette", "pas cuite"); 

// mon omelette cuite
poele.cuire(bol);





