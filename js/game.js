/**
* Class Game : permet de lancer le jeu
***/
function Game () {
	var intf = new Interface();
	var playersArray = intf.getPlayers();
	var tabWeapons = intf.getWeapons();
	var playerIndex = 0;
	var m_isWeapon = false;
	var isWeaponChanged = false;
	var b_isWeapon = false;
	var self = this;

	//Gère le déplacement du joueur
	this.move = function () {
		var tabRows = document.getElementsByClassName("row");
		for (var i = 0; i < tabRows.length; i++) {
			tabRows[i].addEventListener('click', this.BeforeMove);
		};
	}
	/**
	 * [Helper method]
	 * @param  {[type]} playerName   [description]
	 * @param  {[type]} currentPlace [description]
	 */
	this.BeforeMoveCommonAction = function (playerName, currentPlace) {
		var img = playerName.toLowerCase()+'.jpg';
		currentPlace.style.background = "url('img/"+ img + "')" + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
		currentPlace.className = "box player"+" "+playerName.toLowerCase()+ " "+"active";
		/**
		* booléen qui vérifie que l'on est bien passé sur une arme,
		* donc si on s'arrête pas ici dans cette function,
		* ce qui veut dire qu'on a encore cliquer sur une autre arme
		* au clic successif, alors il ne faut pas laissé le dernier block
		* s'exécuté (Le block permettant de mettre l'image de sol, mettre pluôt l'image de
		* l'ancienne arme du joueur,ce qui est fais dans les lignes 50 et 51 au dessus)
		**/
		isWeaponChanged = true;
		/*Activation du prochain joueur*/
		intf.activeNextPlayer();
		/*Mise à défaut du joueur précédent*/
		currentPlace.className = "box player" + " " + playerName;
		/*Réinitialisation des anciennes routes (remise à défaut)*/
		resetRoadCells(tabWeapons);
		/*Retraçage des nouvelles routes autour du nouveau joueur actif*/
		intf.traceMoveDirection();
	}
	/**
	 * [Method called before moving player]
	 * @param  {[type]} ev [description]
	 */
	this.BeforeMove = function(ev) {
		if (ev.target !== ev.currentTarget) {
			if (hasClass(ev.target,"road")) {
				var activePlayer = document.getElementsByClassName("active")[0];
				var currentPlace = ev.target;
				if(hasClass(currentPlace,"weapon")) { //Vérification afin de savoir si l'élément cliquer est une arme
					for (k in tabWeapons) {
						if (hasClass(currentPlace,tabWeapons[k].getName())) {
							currentWeapnPlaceName = tabWeapons[k].getName();
						}
					}
				}
				if(hasClass(activePlayer,"Mario")) { //Vérification afin de savoir si l'élément cliquer est Mario
					playerIndex = 1;
					playerName = "Mario";
				} else { //Sinon c'est bowser
					playerIndex = 2;
					playerName = "Bowser"
				}
				if(hasClass(currentPlace,"weapon")) {
					if (isWeaponChanged && typeof m_oldPlayerName!=="undefined" && m_oldPlayerName===playerName) //Vérifie si bowser à changer d'arme
						isWeaponChanged = isWeaponChanged;
					else if (isWeaponChanged && typeof b_oldPlayerName!=="undefined" && b_oldPlayerName===playerName) //Vérifie si Mario à changer d'arme
						isWeaponChanged = isWeaponChanged;
					else { isWeaponChanged = false; }
				} else { isWeaponChanged = false; }
				if (m_isWeapon && typeof m_oldPlayerName!=="undefined" && m_oldPlayerName===playerName) { //Vérifie la récupération d'arme simultannée pour Mario
					m_oldCurrentPlace.style.background = "url("+ m_oldWeapponVisuel + ")" + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
					m_oldCurrentPlace.className = "box weapon"+" "+m_oldWeaponName;
					m_isCanReturn = true;
					if (hasClass(currentPlace,"weapon")) { m_isCanReturn = false; }
					else { m_isWeapon = false; }
					self.BeforeMoveCommonAction(playerName, currentPlace);
					if (m_isCanReturn) { return; }
				} else if (b_isWeapon && typeof b_oldPlayerName !=="undefined" && b_oldPlayerName === playerName) {  //Vérifie la récupération d'arme simultannée pour Bowser
					b_oldCurrentPlace.style.background = "url("+ b_oldWeapponVisuel + ")" + " " + "no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
					b_oldCurrentPlace.className = "box weapon"+" "+b_oldWeaponName;
					b_isCanReturn = true;
					if (hasClass(currentPlace,"weapon")) { b_isCanReturn = false; }
					else { b_isWeapon = false; }
					self.BeforeMoveCommonAction(playerName, currentPlace);
					if (b_isCanReturn) { return; }
				}
				if (typeof currentWeapnPlaceName !=="undefined")
				/*Première récupération d'arme par un joueur*/
				if(hasClass(currentPlace,"weapon") || typeof m_isCanReturn !=="undefined"
					|| typeof b_isCanReturn !=="undefined") {
					for (k in tabWeapons) {
						if (hasClass(currentPlace,tabWeapons[k].getName()) ||
							(typeof currentWeapnPlaceName !=="undefined" && tabWeapons[k].getName()===currentWeapnPlaceName)) {
							if (playerName === "Mario") {
								m_oldWeapponVisuel = document.getElementById("player"+playerIndex+"-weapon-visuel").getAttribute("src");
								m_oldWeaponName = document.getElementById("player"+playerIndex+"-weapon-name").textContent;
								m_oldCurrentPlace = currentPlace; //Mémorisation de l'emplacement de l'arme qui vient d'être récupérée par le joueur
								m_oldPlayerName = playerName;
								m_isWeapon = true;
							} else {
								b_oldWeapponVisuel = document.getElementById("player"+playerIndex+"-weapon-visuel").getAttribute("src");
								b_oldWeaponName = document.getElementById("player"+playerIndex+"-weapon-name").textContent;
								b_oldCurrentPlace = currentPlace; //Mémorisation de l'emplacement de l'arme qui vient d'être récupérée par le joueur
								b_oldPlayerName = playerName;
								b_isWeapon = true;
							}
							self.logWeaponActivities(tabWeapons[k]);
							/*Mise à jour des informations du joueur courant (Arme, dégât)*/
							document.getElementById("player"+playerIndex+"-weapon-visuel").src = 'img/' + tabWeapons[k].getVisuel();
							document.getElementById("player"+playerIndex+"-weapon-name").textContent = tabWeapons[k].getName();
							document.getElementById("player"+playerIndex+"-degat").textContent = tabWeapons[k].getDamage();
							isCanBeNormal = false;
							currentWeapnPlaceName = " ";
						}
					}
				}
				if (!isWeaponChanged) { //Vérifie si le joueur à déjà changer d'arme ou pas
					self.performWeaponChange(currentPlace, activePlayer);
				}
				intf.activeNextPlayer();
				/*Updating the previous current player*/
				currentPlace.className = "box player" + " " + playerName;
				/*Reseting old road*/
				resetRoadCells(tabWeapons);
				/*Retraçage des nouvelles routes autour du nouveau joueur actif*/
				intf.traceMoveDirection();
			}
			ev.stopPropagation();
		}
	}
	/**
	 * [Trace player weapon change activities]
	 * @return {[type]} [description]
	 */
	this.logWeaponActivities = function (currentWeapon) {
		message = " ";
		switch (currentWeapon.getName()) {
			case "bombe":
				message = playerName +" "+"a récupéré la Bombe";
				break;
			case "missile":
				message = playerName +" "+"a récupéré le Missile";
				break;
			case "klaxon":
				message = playerName +" "+"a récupéré le Klaxon";
				break;
			case "carapaceBleu":
				message = playerName +" "+"a récupéré la Carapace bleue";
				break;
			default:
				message = playerName +" "+"a récupéré la Carapace verte";
				break;
		}
		display(message); //Affichage des messages dans la console du jeu
	}
	/**
	 * [Do some action when current player weapon change]
	 * @param  {[type]} currentPlace [description]
	 * @param  {[type]} activePlayer [description]
	 */
	this.performWeaponChange = function (currentPlace, activePlayer) {
		currentPlace.style.background = activePlayer.style.background;
		currentPlace.className = activePlayer.className;
		activePlayer.style.background = "url('img/sol.png') no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
		activePlayer.className = "box";
	}
}
