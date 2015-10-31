/**
* Class Map : Class permettant de créer un nouveau plateau de jeu
**/
function Map () {
	
	
	this.mapInfos = {bgCells : "url('img/sol.png')", wrongCellsBg : "url('img/sol3.jpg')"}; // Tabelau d'objets des images de sol et obstacles
    this.tabs = [[]]; //Tabeleau à 2D qui vas contenir le plateau de jeu
    /*****Initilalisation des méthodes de la classe*******/
	this.init = function() {
		this.create(10,10); //Création d'un tablau 10x10
		this.clickOncases(); //Appelle de la méthode gérant le click sur les cases (toutes confondues)
	}
	/**
	*  Permet de créer l'espace de jeu initial de 
	* "rows" lignes et "cells" colonnes
	*  @param rows : nombre de lignes à afficher
	*  @param cells : nombre de colonnes à afficher
	**/
	this.create = function (rows,cells) {
		for (var i = 0; i < rows; i++) {
				this.tabs[i] = document.createElement('div');
				this.tabs[i].className = "row" + " " + i;
				for (var j = 0; j < cells; j++) {
					this.tabs[i][j] = document.createElement('div');
					this.tabs[i][j].className = "box";
					this.tabs[i][j].id = "X"+i+"Y"+j;
					this.tabs[i][j].style.background = this.mapInfos.bgCells + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
					/***Ajout des celulles à la ligne***/
					this.tabs[i].appendChild(this.tabs[i][j]);
				};
				/***Ajout des lignes au tableau de jeu*****/
			document.getElementById("game-container").appendChild(this.tabs[i]);
		};
		this.createInacessibleCases(10);
	}
	/**
	* Permet de générer des coordonnées aléatoires X,Y du tableau de jeu
	* @param maxNumber : Nombre d'obstacles à placer sur le jeu
	**/
	this.getRandomElement = function (maxObstaclesNumber) {
	    var posX = Math.floor(Math.random() * maxObstaclesNumber);
	    var posY = Math.floor(Math.random() * maxObstaclesNumber);
	    return this.tabs[posX][posY];
	}
	/**
	* Permet de créer des cases inaccessibles
	* @param nbOfObstacles : nombre d'obstacles à afficher sur la carte
	**/
	this.createInacessibleCases = function (nbOfObstacles) {
		var i = 0;
		var idArray = new Array();
		while(i < nbOfObstacles ) {
		    /***Génération d'un emplacement aléatoire de coordonnée X,Y ***/
			var currentElement = this.getRandomElement(10);
			/**
			* On vérifie si le système aléatoire n'a pas encore
			* généré l'élément, afin d'éviter que les éléments 
			* ayant les mêmes coordonées (X,Y) se bouffent entre eux.
			***/
			if (idArray.indexOf(currentElement.id) === -1) { //Ici l'élément courant n'a pas encore été généré
				currentElement.className = currentElement.className + " " + "wrongCell";
			    currentElement.style.background = this.mapInfos.wrongCellsBg + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
			} else { //Ici l'élément courant à déjà été généré par le système aléatoire, donc on regenère à nouveau un autre élément.
			    var isNotExistElement = false;
			    //on itère jusqu'à ce que l'on génère un élément qui n'a pas été encore généré.
	            while (!isNotExistElement) {
	                currentElement = this.getRandomElement(10);
	                if (idArray.indexOf(currentElement.id) === -1) {
	                    isNotExistElement = true;
	                }
	            }
	            //Attribution des images de fond aux obstacles
	            currentElement.style.background = this.mapInfos.wrongCellsBg + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
	            currentElement.className = currentElement.className + " " + "wrongCell";
			}
			//Ajout des id de=éjà générés au tableau d'identifiant
			idArray.push(currentElement.id);
			i++;
		};
	}
	/**Le clic sur les cellules****/
	this.clickOncases = function () {
		var normalCells = document.getElementsByClassName("box"); // Récupéraion toutes les célullues
		for (var i = 0; i <= normalCells.length -1; i++) {
			normalCells[i].addEventListener('click', function(ev) {
				if (ev.currentTarget.getAttribute("class") === "box" || 
					ev.currentTarget.getAttribute("class") === "box wrongCell") //On vérifie si la cellule cliquer est une case libre ou un obstacle, afin d'afficher la croix d'interdiction de déplacement
					document.getElementById("cross-popup").style.display = "block"; //Affichage de la croix d'interdiction de déplacement
					setTimeout(function(){ document.getElementById("cross-popup").style.display = "none"; }, 500); //Fermeture de la croix après un micro seconde
					
			});
		};
		
	}
	
}


