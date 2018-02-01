/***
* Class Fight : permet de gérer le combat entre joueur
*
****/

function Fight () {


	//Instanciation de la class interface
	intf = new Interface ();

	//Instanciation de la class Game
	game = new Game();

	//Booleen permettant de savoir si le joueur est en mode défense ou non
	isDefend = false;
	var self = this;
	
	//Initialisation des évènements attack / défenses des deux joueurs
	this.init = function () {
		//Attaquer
		document.getElementById("player1-attaquer").addEventListener('click', this.startFight);
		document.getElementById("player2-attaquer").addEventListener('click', this.startFight);

		//Défendre
		document.getElementById("player1-defendre").addEventListener('click', this.startFight);
		document.getElementById("player2-defendre").addEventListener('click', this.startFight);
	}
	/**
	 * [Display given message into popup]
	 * @param  {[type]} msg [message to display]
	 */
	this.displayMsg = function (msg) {
		document.getElementById("info-popup-text").textContent = msg
		document.getElementById("info-popup").style.display = "block";
		setTimeout(function(){ document.getElementById("info-popup").style.display = "none"; }, 5000);
	}
	/**
	 * [Checks weither current html elmt it's player place or not]
	 * @param  {[type]} elmt [the html element]
	 * @param  {[type]} ev   [description]
	 * @return {[type]}      [description]
	 */
	this.checkForPlayerPlace = function (elmt, ev) {
		var isPlayerPlace = false;
		if (typeof elmt !== "undefined" && elmt !== null) {
			if (hasClass(elmt,"player")) {
				if (ev.currentTarget.id == "player1-attaquer" || ev.currentTarget.id == "player2-attaquer") {
					attackDefend(elmt,"attack"); /*Déclenchement du combat*/
				} else {
					attackDefend(elmt,"defendre"); /*Déclenchement du combat*/
				}
				/*Suppression des routes autour de l'ancien joueur*/
				resetRoadCells(intf.getWeapons());
				/*Retraçage des nouvelles routes autour du prochain joueur*/
				intf.traceMoveDirection();
				isPlayerPlace = true
			}
		} else { isPlayerPlace = true; }
		return isPlayerPlace
	}
	/**
	 * [Lauch the game with one of user on top or bottom side]
	 * @param  {[Array]} tabEmlts [tab of top or bottom elements]
	 * @param  {[Event]} ev [event binded to the current element]
	 * @return {[Boolean]}
	 */
	this.lauchGameWithPlayer = function (tabElmts, ev) {
		var isNotGoodPlace = false; /*should be bottom or top place*/
		if (tabElmts.length > 0) {
			for (var i = 0; i < tabElmts.length; i++) {
				var children = tabElmts[i].children;
				for (var j = 0; j < children.length; j++) {
					if (j === activeElementIndex && hasClass(children[j],"player")) {
						isNotGoodPlace = false;
						i = tabElmts.length;
						var tmp_index = j;
						j = children.length;
						self.checkForPlayerPlace(children[tmp_index], ev)
					} else { isNotGoodPlace = true; }
				}
			}
		} else { isNotGoodPlace = true; }
		return isNotGoodPlace
	}
	/*****
	* Permet de démarrer le combat
	*****/
	this.startFight = function (ev) {
		var activePlayer = intf.getActivePlayerInfos().elmt; //Récupération du joueur actif depuis la classe interface
		if ((ev.currentTarget.id === "player1-attaquer" || ev.currentTarget.id === "player1-defendre") && !hasClass(activePlayer,"Mario")) { //Vérifie que le joueur 1 attaque et défends bien depuis sa palette de combat
			self.displayMsg('Votre palette de combat est celle de droite \n vous ne pouvez pas attaquer ou défendre ici'); return;
		} else if ((ev.currentTarget.id === "player2-attaquer" || ev.currentTarget.id === "player2-defendre") && !hasClass(activePlayer,"Bowser")) { //Vérifie que le joueur 2 attaque et défends bien depuis sa palette de combat
			self.displayMsg('Votre palette de combat est celle de gauche \n vous ne pouvez pas attaquer ou défendre ici'); return;
		}
		var activeElementIndex = intf.getActivePlayerInfos().Elmtindex;//Récupération de la posiotion (l'index) du joueur courant
		var nextElmt  = activePlayer.nextElementSibling; //L'élément se trouvant à droite du joueur courant
		var prevElmt = activePlayer.previousElementSibling; //Lélément se trouvant à gauche du joueur courant
		var tabNextElmts = getAllParentNextElmts(activePlayer); //Tous les éléments suivants du parent de l'élément courant
		var tabPrevElmts = getAllParentPrevElmts(activePlayer); //Tous les éléments précédents du parent de l'élément courant
		var isNotNextPlace = false;
		var isNotPrevPlace = false;
		var isNotTopPlace = false;
		var isNotBottomPlace = false;

		isNotNextPlace = self.checkForPlayerPlace(nextElmt, ev);
		isNotPrevPlace = self.checkForPlayerPlace(prevElmt, ev);

		/*Lancement du combat avec l'adversaire placé en bas du joueur courant*/
		isNotTopPlace = self.lauchGameWithPlayer(tabNextElmts, ev);
		/*Lancement du combat avec l'adversaire placé en haut du joueur courant*/
		isNotBottomPlace = self.lauchGameWithPlayer(tabPrevElmts, ev);

		/*Booléens vérifiant si les joueurs peuvent attaquer ou défendre vis à vis de leurs positions*/
		if (isNotNextPlace && isNotPrevPlace && isNotBottomPlace && isNotTopPlace) {
			self.displayMsg('Vous ne pouvez pas encore attaquer ou défendre, essayez de comprendre le jeu');
		}
	}
	/**
	 * [description]
	 * @param  {[type]} attackedPlayerInfos [description]
	 * @param  {[type]} attackerPlayerInfos [description]
	 * @param  {[type]} action              [description]
	 * @return {[Object]}                     [description]
	 */
	this.doAttack = function (attackedPlayerInfos, attackerPlayerInfos, action) {
		var activePlayer = intf.getActivePlayerInfos().elmt;
		var classs = activePlayer.className.split(" ");
		var activePlayerName = classs[classs.length - 2];
		var isGameOver = false;
		var lifePoint;
		var attackedPlayerLife = document.getElementById(attackedPlayerInfos.lifePointId);
		var attackedPlayerPts = attackedPlayerLife.textContent;
		var attackedPlayerWeapon = document.getElementById(attackedPlayerInfos.weaponName).textContent;
		var attackerPlayerLife = document.getElementById(attackerPlayerInfos.lifePointId);
		var attackerPlayerPts = attackerPlayerLife.textContent;
		var attackerPlayerDamage = document.getElementById(attackerPlayerInfos.damageId).textContent;
		var attackerPlayerWeapon = document.getElementById(attackerPlayerInfos.weaponName).textContent;
		var response = {}
		if (action === "attack") {
			if (!isDefend) {
				attackedPlayerLife.textContent = attackedPlayerPts - attackerPlayerDamage;
				lifepoint = attackedPlayerLife.textContent;
				if (lifepoint == 0 || lifepoint < 0) {
					isGameOver = true;
				}
			} else {
				attackedPlayerLife.textContent = attackedPlayerPts - attackerPlayerDamage / 2;
				isDefend = false;
				lifepoint = attackedPlayerLife.textContent;
				if (lifepoint == 0 || lifepoint < 0) {
					isGameOver = true;
				}
			}
			display(attackerPlayerInfos.name + " à attaquer " + attackedPlayerInfos.name); //Affichage des activités dans la console
		} else {
			display(attackerPlayerInfos.name + " se défend");
			isDefend = true;
		}

		/*Update attacked player life points with the current life points*/
		attackedPlayerPts = lifepoint;

		/* Informations about the winner */
		response.winnerName = attackerPlayerPts > attackedPlayerPts ? attackerPlayerInfos.name : attackedPlayerInfos.name;
		response.winnerLifePts = attackerPlayerPts > attackedPlayerPts ? attackerPlayerPts : attackedPlayerPts;
		response.winnerWeapon = attackerPlayerPts > attackedPlayerPts ? attackerPlayerWeapon : attackedPlayerWeapon;

		/*Informations about the loser */
		response.loserName = attackerPlayerPts < attackedPlayerPts ? attackerPlayerInfos.name : attackedPlayerInfos.name;
		response.loserLifePts = attackerPlayerPts < attackedPlayerPts ? attackerPlayerPts : attackedPlayerPts;
		response.loserWeapon = attackerPlayerPts < attackedPlayerPts ? attackerPlayerWeapon : attackedPlayerWeapon;
		response.isGameOver = isGameOver;

		/*Activating next player*/
		intf.activeNextPlayer();

		/*Reseting the previous activate player*/
		activePlayer.className = "box player" + " " + activePlayerName;

		return response;
	}
	/**
	 * [Trigger game over action after each game]
	 * @param  {[type]} fightInfos [informations about current fight to perform]
	 */
	this.performGameOver = function (fightInfos) {
		var content = "";
		content = '<p><span class="winner">Vainqueur</span><span class="w-info">Nom : '+fightInfos.winnerName+'</span>';
		content += '<span class="w-info">Point de Vie : '+fightInfos.winnerLifePts+'</span><span class="w-info">Arme : '+fightInfos.winnerWeapon+'</span></p>';
		content += '<p><span class="winner">Vaincu</span><span class="w-info">Nom : '+fightInfos.loserName+'</span>';
		content += '<span class="w-info">Point de Vie : '+fightInfos.loserLifePts+'</span><span class="w-info">Arme : '+fightInfos.loserWeapon+'</span></p>';
		document.getElementById("game-info").innerHTML = content;
		document.getElementById("popup").style.display = "block";
	}
	/**
	 * [Return current player element infos based on it name and index]
	 * @param  {[type]} name  [Current player name]
	 * @param  {[type]} index [current player index]
	 * @return {[Object]}       [description]
	 */
	this.getPlayerInfo = function (name, index) {
		return {name: name, damageId: "player" + index + "-degat", lifePointId: "player" + index + "-life-point", weaponName: "player" + index + "-weapon-name"};
	}
	/**
	 * [attackDefend perform attack or defend]
	 * @param  {[type]} attackedElmt [the attacked player]
	 * @param  {[type]} action       [Action received from game ("attack" or "defend")]
	 */
	function attackDefend (attackedElmt,action) {
		var players = intf.getPlayers();
		var fightInfos = {}
		var attackedPlayerInfos;
		var attackerPlayerInfos;
		if (!hasClass(attackedElmt,"active")) {
			for (index in players) {
				if (hasClass(attackedElmt,players[index].getFirstName())) {
					var attackedPlayer = players[index];
					/*Case player 1 attaacked*/
					if (attackedPlayer.getFirstName() === "Mario") {
						attackedPlayerInfos = self.getPlayerInfo('Mario',1);
						attackerPlayerInfos = self.getPlayerInfo('Bowser',2);
						fightInfos = self.doAttack(attackedPlayerInfos, attackerPlayerInfos, action);
					} else { /*Case player 2 attacked */
						attackedPlayerInfos = self.getPlayerInfo('Bowser',2);
						attackerPlayerInfos = self.getPlayerInfo('Mario',1);
						fightInfos = self.doAttack(attackedPlayerInfos, attackerPlayerInfos, action);
					}
					if (fightInfos.isGameOver) {
						self.performGameOver(fightInfos);
					}
				}
			}
		}
	}
}
