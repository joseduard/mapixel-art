// Organisation de code
// App c'est mon objet qui va contenir toutes les variables ( donc proprietes) et toutes mes functions (donc methodes) dans ces methodes il aura la methode init qui va déclancher toutes nos fucntiones qui von lancer la application
// process d'organisation en module
// 1 . Je crée mon object
// 2 . Je crée une fucntion init qui va contenir tt le code qui n'est pas deja dans une function
// 3. Je passe toutes mes functions comme methode du objet app donc a la pace de un = serta une : // Donc une propriete et une function anonyme
// 4. J dois corriger l'appel a mes fonctions. La ou je faisais maMethode je dois faire monModule.monMethode(par ex app.changeColor)
// 5. Je n'hesite pas à repasser dans mes méthodes(notament init() pour essayer de recuper par sens mon code)
// 6. J n'oublie pas d'appeler app.init en bas mon fichier.
var app = {
  // la propriete styles a comme valuer un tableau avce la liste de styles que peut avoir chaque une des cellules.
  styles: [
    "plain",
    "empty",
    "light",
    "highlight",
    "higtligth2",
    "greenlight",
    "yellowligtht",
    "redlight",
  ],
  // Pour pouvoir choisir une couleur et s'en souvenir lorque l'on cliquera sur ue case on va avoir besoin d'une variable comme mémoire
  selectedStyle: "plain",

  init: function () {
    // La functon init va lancer la function generetConfigForm() et createdGrid(8) depuis le premier chargement de la page.
    app.generateConfigForm();
    app.createGrid(8, 32);
    app.generatepalette();
  },

  generateConfigForm: function () {
    // III.I Géneration de formulaire plus gestion du formulaire.

    // Je vais commencer por generer le formulaire. (input et un label)
    // Je recupere l'element form pour mettre dedans mes input et mon label
    var formNode = document.querySelector(".configuration");
    // Je vais créer mon element input
    var gridSizeInput = document.createElement("input");
    // Je peut ajouter une class mais non maintenant
    // Dans le cas de un formulaire il faut ajouter ou specifier les atributs dans le input
    // on vais faire cela avec la methode setAttribute
    // setAttribute renvoie la valeur d'un attribut donné de l'element specifie
    gridSizeInput.setAttribute("type", "number");
    gridSizeInput.setAttribute("name", "gridSize");
    //required c'est une propriete d'un element (noud) est c'est true ou false, ici il donne come requirement que le champ de saisi de input soit remplis pour pouvoir valider (submit)
    gridSizeInput.required = true;
    gridSizeInput.setAttribute("placeholder", "Taille de la grille");
    // je luis donne un id
    gridSizeInput.id = "gridSize";
    // Je met dans le aprent leur enfant gridSizeInput
    formNode.appendChild(gridSizeInput);

    //Géneration de une autre input por la taille de chaque cellule

    var cellSizeInput = document.createElement("input");
    cellSizeInput.setAttribute("type", "number");
    cellSizeInput.setAttribute("name", "gridSize");
    cellSizeInput.required = true;
    cellSizeInput.setAttribute("placeholder", "Taille d'une cellule");
    cellSizeInput.id = "cellSize";
    formNode.appendChild(cellSizeInput);

    // je vais céer mon button
    var submitButton = document.createElement("button");
    // je vais cutumiser (ajoute des atributs, id ou class ou meme du texte)
    submitButton.getAttribute("type", "submit");
    submitButton.classList.add("config-form-submit");
    submitButton.textContent = "Valider";
    // On l'ajoute au parent
    formNode.appendChild(submitButton);

    // III.II On va donner un event submit ou formulaie
    formNode.addEventListener("submit", function (event) {
      // je utilise une function anonyme, car si je met comme deuxieme argument (listener) la function createGrid, comme parametre va paser (event) et pas la taille de la grid mais je ne vais pas que soit event le parametre sinon 'gridSize'. Donc je ne puet pas la passer directement
      // De cette façon code createGrid attend en argument la taille de ma grid pour passer ce même valeur comme parametre de la function createGrid.
      // C'est une function anonyme intermediarie qu'appelle createGrid
      // Comme je suis sous la summision d'un formulaire ma page va vouloir se recharge, j'empeche ça avec event.preventDefault()
      event.preventDefault();
      var gridSizeInputNode = document.getElementById("gridSize");
      var cellSizeInputNode = document.getElementById("cellSize");
      // gridSizeInputNode est une node <input> et ces nodes on une propriete special: VALUE pour acceder à la valeur saisie dans le champ
      console.log(gridSizeInputNode);
      app.createGrid(gridSizeInputNode.value, cellSizeInputNode.value);
    });
  },

  generatepalette: function () {
    // je vais ciler l'elemente ou je vais creer les elements de forEach
    var paletteNode = document.getElementById("palette");

    // Via les callback JS propose une alternative au for
    // lorsque l'on veut iterer sur chaque element d'une liste
    // C'est la methode forEach
    // ForEach prend un seul parametre, c'est une fucntion callback, cette fucntion n'as pas un "event" sinon el prends comme parametre la valeur courante d'element du tableau en cours de traitement
    app.styles.forEach(function (style) {
      // Cette fucntion sera appelle 1 foid pour chaque element de mon tableau.
      // A chaque fois le premier parametre vaudra un nouvel élément de la liste de mon tableau, il sera appelle 4 fois en total
      // Tour a tour style vaudra plain','empty','light',highlight
      var styleNode = document.createElement("div");
      styleNode.classList.add("style-selector");
      // un attribut custome:
      // On peu rajouter les attributs de notre choix sur les balises
      // La seule regle c'est que ces atributs doivent commencer par data- et être éris en kebab-case car est la sintaxe en css, les classes et les id's
      styleNode.setAttribute("data-style-name", style);
      // Une fois ma palette créé je veut lui donner un event click a chaque item de ma palette. On veut de la logique, on veut selectioner et conserver une de colour de la palette, je besoin de un variable qui va se ouvenir du coluleur selectione: var selectedStyle
      styleNode.addEventListener("click", app.selectStyle);
      paletteNode.appendChild(styleNode);
    });
  },

  selectStyle: function (event) {
    var itemSelectorNode = event.target;
    // lorque l'on click sur une des couleurs de la palette
    // Je viens lire l'attribut data-style-name de cet élément
    // Et je stock la valeur dans pp.selectedStyle
    app.selectedStyle = itemSelectorNode.getAttribute("data-style-name");
  },

  // II Gérer le click sur un pixel
  // Je dois devoir changer la couleur d'un pixel lorsque l'on click dessus
  // c'est un évenement donc je vais avoir besoin d'une function à éxecuter (var changeCellColor)
  // et d'attacher cette fonction à l'évenement
  changeCellColor: function (event) {
    // les fonctions comme ça qui son attaché via le systéme d'évenement (addEventListener) reçoient un paramètre (event ou evt ou e)qui nous donnera, entre autre le noud (ou element) du DOM qui à générer cet event et le cible avec le target
    // ici cellNode c'est la div ou element ou noud responsable du event. c'est la cellul ou on as clicked
    var celNode = event.target;
    // Je dois maintenant appliquer la couleur choisi, je viens donc definir un attribut sur la cellule cliqué
    // attribut de nom data-style-name et qui aura pour valeur le style choisi, comme ça les selecteurs CSS marcheron ausii pour les celluels de dessin
    celNode.setAttribute("data-style-name", app.selectedStyle);
    // set Attribute créé l'atribute s'il n'exuste pas encore
    // et ne se preocupe pas de lma valeur en place il remplace par ce qui est donnée

    // le premier tour ma cellule n'a aucune de deux couleurs, donc on ajoute le colour green
    //   if (
    //     !celNode.classList.contains("cell--colored-orange") &&
    //     !celNode.classList.contains("cell--colored-green")
    //   ) {
    //     celNode.classList.add("cell--colored-green");
    //   } else {
    //     //! cette condition avec contains, remove et add existe dejà est c'est le toogle
    //     // la logique est: Si la cellule à la classe cell -- colored je dois enlever cette classe sino je dois l'ajouter
    //     celNode.classList.toggle("cell--colored-orange");
    //     celNode.classList.toggle("cell--colored-green");
    //   }
  },

  // III.III Ici je vais coder ma function de generation de la grille.
  // comme parametre j'utilise gridSize que sera la taille de la grid et sera la valeur que va venir du valeur saisi dans le input
  // Alors: Je met en parametre gridsize car je veut que soit dynamique. C'est l'utilisateur qui va choisir la atille de la grille dans le input du formulaire, c'est une fucntion parametrable
  // J'utilise le code de la etape I
  createGrid: function (gridSize, cellSize) {
    // I - Génerer l' ardoise
    // On génere ou l'ardoise? J'ai besoin du parent dans lequel je vais créer l'ardoise (div id=invader)
    // C'est dans là que je vais ajouter les cellules
    var gridNode = document.getElementById("invader");

    // III.IV
    // var gridSize = 8; il va passer comme un parametre
    // On doit commencer pour vider la grille actuel. Remove toutes les enfants
    // Tant qu'il y a un premier noeid ==> ta,t qu'il y a au  moins un noeud enfant alors!
    while (gridNode.firstChild) {
      // Suprime le dernier enfant de la liste
      gridNode.removeChild(gridNode.lastChild);
    }

    //   //**
    //   * Pour forcer les cellules à revenir à la ligne au bout de "gridSize"
    //   * (avec le flex wrap) je dois donner une width à mon block
    //   * la largeur d'une cellule X le nombre de cellule
    //   */
    // var cellSize = 34;  devine parametre
    gridNode.style.width = gridSize * cellSize + "px";

    // je fais une boucle pour générer mes 64 cellules (8*8)
    for (var cellIndex = 0; cellIndex < gridSize * gridSize; cellIndex++) {
      // Ici le code pour créer un seule cellule
      // L même principe
      // 1- Je créé l'element qui va contenir 1 cellule
      var cellNode = document.createElement("div");
      // 2- Je vais ajouter une class (je le customize)
      cellNode.classList.add("cell");
      cellNode.style.width = cellSize + "px";
      cellNode.style.height = cellSize + "px";

      // Partie II: j'ai besoin d'attacher un event (addEventListener)sur la cellule et ça tomber bien car ici je suis dans un boucle ou a chaque tour j'ai accès à une cellule
      // ! Dans la function changeColor pas de parenthése, on n veut pas lancer la fonction mais la donner en argument
      // comme deuxieme argument de la methode addEventListener on peut passer la variable ou est stocke la function qui va déclanche l'évenement ou on peut le pase directemente la fuction
      var eventName = "click";
      cellNode.addEventListener(eventName, app.changeCellColor);

      // 3- Je l'ajoute au parent
      gridNode.appendChild(cellNode);
    }
  },
};
// Bonne pratique
// il exist un évenement du document spécial qui permet de savoir que toutes les ressources de la page HTML sont bien chargé
// par exemple dans le cas de une mouvaise connexion et que on a plusiers modules dans plusiers fichier

document.addEventListener("DOMContentLoaded", function () {
  // Cette function app.init ne vas pas se déclancher qu'une fois que le navigateur à charge toutes les ressources, c'est donc une bonne pratique que de mettre notre app.init dedans
  app.init();
});
