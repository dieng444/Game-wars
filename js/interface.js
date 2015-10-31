function Interface () {
	
	//Créations des armes et joueurs
	var bombe = new Weapon('bombe', 20, 'bombe.jpg','bombe300.png');
	var missile = new Weapon('missile', 25, 'missile.jpg','missile300.png');
	var carapaceBleu = new Weapon('carapaceBleu', 30, 'carapaceBleu.jpg','carapaceBleu300.png');
	var klaxon = new Weapon('klaxon', 15, 'klaxon.jpg','klaxon300.png');
	var carapaceVerte = new Weapon('carapaceVerte', 10, 'carapaceVerte.jpg', 'carapaceVerte300.png');

	var mario = new Player('Mario', 100, ['3.jpg','mario.jpg'], carapaceVerte);
	var bowser = new Player('Bowser', 100, ['4.jpg','bowser.jpg'], carapaceVerte);

	var weaponsArray = [bombe, missile, carapaceBleu, klaxon, carapaceVerte];
	var playersArray = [mario,bowser];
	
	var roadImage = "url('img/1.png') no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";

	

	/** 
	* Permet de générer des coordonnées aléatoires X,Y du tableau de jeu
	* @param maxNumber : Nombre d'obstavles à placer sur le jeu
	**/
	this.lunchGame = function () {

		this.putWeapons();
		this.putPlayers();
		//Activation du joueur courant
		this.activeAnPlayer();
		this.traceMoveDirection();


		//this.getGameInstance();
	}
	this.getWeapons = function () {
		return weaponsArray;
	}
	this.getPlayers = function () {
		return playersArray;
	}
	/*this.getGameInstance = function() {
		var game = new Game();
		game.move(playersArray,weaponsArray,this);
	}*/
	this.getRandomId = function (maxNumber) {
	    var posX = Math.floor(Math.random() * maxNumber);
	    var posY = Math.floor(Math.random() * maxNumber);
	    var id = "X"+posX+"Y"+posY;
	    var currentElement = document.getElementById(id);
		var classs = currentElement.className.split(" ");
	    return {Id : id, classs : classs, elmt : currentElement };
	}
	/****
	*	Permet de placer des éléments sur le plateau de jeu (armes ou joueurs)
	***/
	this.put = function(objArray, objIndexArray, nbIteration, objType) {

		var idArray = new Array();
		var i = 0;

		while (i < nbIteration) {
			var obj = this.getRandomId(10);
			var objId = Math.floor(Math.random() * nbIteration);
			//Placement des objets sur le plateau si ces derniers n'existent pas encore
			if (idArray.indexOf(obj.Id) === -1 && obj.classs.indexOf("wrongCell") === -1 && objIndexArray.indexOf(objId) === -1) {
				//Si l'élément est objet de type waepon
				if (objType==="weapon") {
					obj.elmt.style.background = "url('img/" + objArray[objId].getVisuel() + "')" + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
					obj.elmt.className = obj.elmt.className + " " + "weapon" + " " + objArray[objId].getName();
				} else { //Ici il s'agit d'unn objet player
					if (obj.classs.indexOf("weapon") === -1) { // L'emplacement généré ne doit pas être celui d'une arme
						obj.elmt.style.background = "url('img/" + objArray[objId].getProfil()[1] + "')" + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
						obj.elmt.className = obj.elmt.className + " " + "player" + " " + objArray[objId].getFirstName();
					} else { //Si l'emplacement est celui d'une arme, alors on regenère un nouveau emplacement pour le joueur
						while (!isNotExistElement) {
			                obj = this.getRandomId(10)
			                var objId = Math.floor(Math.random() * nbIteration);
			                //L'on vérifie que l'id de de l'emplacement n'a pas encore été généré et que sa classe n'est pas "wrongCell"
			                //et que elle n'est "weapon" n'ont plus, et que son index n'a pas été déjà généré.
			                if (idArray.indexOf(obj.Id) === -1 && obj.classs.indexOf("wrongCell") === -1 && 
			                	obj.classs.indexOf("weapon") === -1 && objIndexArray.indexOf(objId) === -1) {

			                    isNotExistElement = true;
			                }
			            }
						obj.elmt.style.background = "url('img/" + objArray[objId].getProfil()[1] + "')" + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
						obj.elmt.className = obj.elmt.className + " " + "player" + " " + objArray[objId].getFirstName();
					}
				}
			} else { //Ici l'emplacement généré aléatoirement existe déjà, donc on regénère un autre
				var isNotExistElement = false;
			    //on itère jusqu'à ce que l'on génère un élément qui n'a pas été encore généré.
	            while (!isNotExistElement) {
	                obj = this.getRandomId(10)
	                var objId = Math.floor(Math.random() * nbIteration);
	                if (idArray.indexOf(obj.Id) === -1 && obj.classs.indexOf("wrongCell") === -1 && objIndexArray.indexOf(objId) === -1) {
	                    isNotExistElement = true;
	                }
	            }
	            if (objType==="weapon") {
					obj.elmt.style.background = "url('img/" + objArray[objId].getVisuel() + "')" + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
					obj.elmt.className = obj.elmt.className + " " + "weapon" + " " + objArray[objId].getName();
				} else {
					obj.elmt.style.background = "url('img/" + objArray[objId].getProfil()[1] + "')" + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
					obj.elmt.className = obj.elmt.className + " " + "player" + " " +objArray[objId].getFirstName();
				}
			}
			//Autre façon de déclarer un tableau
			//var idArray = [];
			//console.log(this.getRandomId(10).classs); return false;
			idArray.push(obj.Id);
			objIndexArray.push(objId);
			i++;
		}
	}
	/**
	* Permet de placer les armes sur le plateau
	**/
	this.putWeapons = function () {

		var idArray = new Array();
		var weaponsIndexArray = new Array();
		var newWeaponsArray = new Array();

		//Formation d'un nouveau tableau d'armes sans l'arme par défaut
		for (var i = 0; i < weaponsArray.length - 1; i++) {
			newWeaponsArray.push(weaponsArray[i]);
		}
		this.put(newWeaponsArray, weaponsIndexArray, newWeaponsArray.length, "weapon");
	}
	/**
	* Permet de placer les joueurs sur le plateau
	**/
	this.putPlayers = function () {

		var playersIndexArray = new Array();

		//placement des informations par défaut du joueur 1 de façon dynamique
		document.getElementById("player1-profil-img").src = 'img/' + mario.getProfil()[0];
		document.getElementById("player1-name").textContent = mario.getFirstName();
		document.getElementById("player1-life-point").textContent = mario.getLifePoint();
		//Information sur l'arme du joueur 1
		document.getElementById("player1-weapon-visuel").src = 'img/' + carapaceVerte.getVisuel();
		document.getElementById("player1-weapon-name").textContent = carapaceVerte.getName();
		document.getElementById("player1-degat").textContent = carapaceVerte.getDamage();

		//placement des informations par défaut du joueur 2 de façon dynamique
		document.getElementById("player2-profil-img").src = 'img/' + bowser.getProfil()[0];
		document.getElementById("player2-name").textContent = bowser.getFirstName();
		document.getElementById("player2-life-point").textContent = bowser.getLifePoint();

		//Information sur l'arme du joueur 2
		document.getElementById("player2-weapon-visuel").src = 'img/' + carapaceVerte.getVisuel();
		document.getElementById("player2-weapon-name").textContent = carapaceVerte.getName();
		document.getElementById("player2-degat").textContent = carapaceVerte.getDamage();

		this.put(playersArray, playersIndexArray, playersArray.length, "player");		
	}
	/***
	* Permet de tracer la direction de déplacement des joueurs (les routes)
	**/
	this.traceMoveDirection = function () {
		
		
		//Récupération de la position du  joueur courant
		var activePlayer = document.getElementsByClassName("active")[0];
		var tabNextElmts = getAllNextElmts(activePlayer);
		var tabPreviouseElmts = getAllPrevElmts(activePlayer);
		var tabBottomRoadElmts = getAllParentNextElmts(activePlayer);
		var tabTopRoadElmts = getAllParentPrevElmts(activePlayer);
		var activeElementIndex = 0;
		var childrens = activePlayer.parentElement.children;

		//Récupération de l'index du joueur courant (Joueur actif)
		activeElementIndex = this.getActivePlayerInfos().Elmtindex;
		//Appel aux méthodes de traçage de route
		this.traceLeftRightRoad(tabNextElmts);
		this.traceLeftRightRoad(tabPreviouseElmts);
		this.traceTopBottomRoad(tabBottomRoadElmts,activeElementIndex);
		this.traceTopBottomRoad(tabTopRoadElmts,activeElementIndex);
	}
	//Permet d'activer un joueur au hasard
	this.activeAnPlayer = function () {
		var players = document.getElementsByClassName("player");
		var playerIndex = Math.floor(Math.random() * players.length);
		players[playerIndex].className = players[playerIndex].className + " " + "active";
	}
	//Activation du prochain joueur
	this.activeNextPlayer = function () {
		var tabPlayers = document.getElementsByClassName("player");
		for (var i =0; i < tabPlayers.length; i++) {
			if (!hasClass(tabPlayers[i],"active")) {
				var classs = tabPlayers[i].className.split(" ");
				var playerName = classs[classs.length-1];
				tabPlayers[i].className = "box player" + " " + playerName + " " + "active";
			}
		}
	}
	//Récupération des infos  du joueur courant (Joueur actif)
	this.getActivePlayerInfos = function () {
		var activePlayer = document.getElementsByClassName("active")[0];
		var childrens = activePlayer.parentElement.children;
		for (var i=0; i < childrens.length; i++) {
			if (hasClass(childrens[i],"active")) {
				activeElementIndex = i;
				return {elmt : activePlayer, Elmtindex : i};
			}
		}
	}
	/**
	* Permet de tracer les routes à droite et à gauche du joueur
	* tabElmts : tableau des éléments (précédents ou suivants)
	****/

	this.traceLeftRightRoad = function (tabElmts) {

		if (tabElmts.length === 1) {
			if (!(hasClass(tabElmts[0],"wrongCell")) && !(hasClass(tabElmts[0],"player"))) {
				if (hasClass(tabElmts[0],"weapon")) {
					for (i in weaponsArray) {
						if (hasClass(tabElmts[0], weaponsArray[i].getName())) {
							tabElmts[0].style.background = "url('img/" + weaponsArray[i].getRoadImage() + "')"  + " " +"no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
							tabElmts[0].className = tabElmts[0].className + " " + "road";
						}
					}
				} else {
					tabElmts[0].style.background = roadImage;
					tabElmts[0].className = tabElmts[0].className + " " + "road";
				}
			} else {
				return;
			}
		} else if (tabElmts.length === 2 || tabElmts.length === 3) {
			for (var i = 0; i < tabElmts.length; i++) {
				if (!(hasClass(tabElmts[i],"wrongCell")) && !(hasClass(tabElmts[i],"player"))) {
					if (hasClass(tabElmts[i],"weapon")) {
						for (j in weaponsArray) {
							if (hasClass(tabElmts[i],weaponsArray[j].getName())) {
								tabElmts[i].style.background = "url('img/" + weaponsArray[j].getRoadImage() + "')" + " " +"no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
								tabElmts[i].className = tabElmts[i].className + " " + "road";
							}
						}
					} else {
						tabElmts[i].style.background = roadImage;
						tabElmts[i].className = tabElmts[i].className + " " + "road";
					}
				} else {
					return;	
				}
			}
		} else if (tabElmts.length > 3 ) {
			for (var i = 0; i < 3; i++) {
				if (!(hasClass(tabElmts[i],"wrongCell")) && !(hasClass(tabElmts[i],"player"))) {
					if (hasClass(tabElmts[i],"weapon")) {
						for (j in weaponsArray) {
							if (hasClass(tabElmts[i],weaponsArray[j].getName())) {
								tabElmts[i].style.background = "url('img/" + weaponsArray[j].getRoadImage() + "')" + " " +"no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
								tabElmts[i].className = tabElmts[i].className + " " + "road";
							}
						}
					} else {
						tabElmts[i].style.background = roadImage;
						tabElmts[i].className = tabElmts[i].className + " " + "road";
					}
				} else {
					return;
				}
			}
		} else {
			console.log("No road is possible to trace");
		}
	}
	this.traceTopBottomRoad = function(tabElmts,activeElementIndex) {
		if (tabElmts.length === 1) {
			var childrens = tabElmts[0].children;
			for (var i = 0; i < childrens.length; i++) {
				//Vérication de l'index de l'élément actif par rapport aux différents éléments
				if (i === activeElementIndex) {
					if (!(hasClass(childrens[i],"wrongCell")) && !(hasClass(childrens[i],"player"))) {
						if (hasClass(childrens[i],"weapon")) {
							for (j in weaponsArray) {
								if (hasClass(childrens[i], weaponsArray[j].getName())) {
									childrens[i].style.background = "url('img/" + weaponsArray[j].getRoadImage() + "')"  + " " +"no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
									childrens[i].className = childrens[i].className + " " + "road";
								}
							}
						} else {
							childrens[i].style.background = roadImage;
							childrens[i].className = childrens[i].className + " " + "road";
						}
					} else {
						return;
					}
				}
			}
		} else if (tabElmts.length === 2 || tabElmts.length === 3) {
			for (var i = 0; i < tabElmts.length; i++) {
				var childrens = tabElmts[i].children;
				for (var j = 0; j < childrens.length; j++) {
					//Vérication de l'index de l'élément actif par rapport aux différents éléments
					if (j === activeElementIndex) {
						if (!(hasClass(childrens[j],"wrongCell")) && !(hasClass(childrens[j],"player"))) {
							if (hasClass(childrens[j],"weapon")) {
								for (k in weaponsArray) {
									if (hasClass(childrens[j], weaponsArray[k].getName())) {
										childrens[j].style.background = "url('img/" + weaponsArray[k].getRoadImage() + "')"  + " " +"no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
										childrens[j].className = childrens[j].className + " " + "road";
									}
								}
							} else {
								childrens[j].style.background = roadImage;
								childrens[j].className = childrens[j].className + " " + "road";
							}
						} else {
							return;
						}
					}
				}
			}
			
		} else if (tabElmts.length > 3 ) {
			for (var i = 0; i < 3; i++) {
				var childrens = tabElmts[i].children;
				for (var j = 0; j < childrens.length; j++) {
					//Vérication de l'index de l'élément actif par rapport aux différents éléments
					if (j === activeElementIndex) {
						if (!(hasClass(childrens[j],"wrongCell")) && !(hasClass(childrens[j],"player"))) {
							if (hasClass(childrens[j],"weapon")) {
								for (k in weaponsArray) {
									if (hasClass(childrens[j], weaponsArray[k].getName())) {
										childrens[j].style.background = "url('img/" + weaponsArray[k].getRoadImage() + "')"  + " " +"no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
										childrens[j].className = childrens[j].className + " " + "road";
									}
								}
							} else {
								childrens[j].style.background = roadImage;
								childrens[j].className = childrens[j].className + " " + "road";
							}
						} else
							return;
					}
				}
			}
		} else {
			console.log("No road is possible to trace");
		}
	}
}