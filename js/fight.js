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
	//Initialisation des évènements attack / défenses des deux joueurs
	this.init = function () {
		
		//Attaquer
		document.getElementById("player1-attaquer").addEventListener('click', this.startFight);
		document.getElementById("player2-attaquer").addEventListener('click', this.startFight);
		//Défendre
		document.getElementById("player1-defendre").addEventListener('click', this.startFight);
		document.getElementById("player2-defendre").addEventListener('click', this.startFight);
	}
	/*****
	* Permet de démarrer le combat
	*****/
	this.startFight = function (ev) {
		var activePlayer = intf.getActivePlayerInfos().elmt; //Récupération du joueur actif depuis la classe interface
		
		if ((ev.currentTarget.id === "player1-attaquer" || ev.currentTarget.id === "player1-defendre") && !hasClass(activePlayer,"Mario")) { //Vérifie que le joueur 1 attaque et défends bien depuis sa palette de combat
			document.getElementById("info-popup-text").textContent = "Votre palette de combat est celle de droite\n vous ne pouvez pas attaquer ou défendre ici";
            document.getElementById("info-popup").style.display = "block";
            setTimeout(function(){ document.getElementById("info-popup").style.display = "none"; }, 5000);
			return;
		} else if ((ev.currentTarget.id === "player2-attaquer" || ev.currentTarget.id === "player2-defendre") && !hasClass(activePlayer,"Bowser")) { //Vérifie que le joueur 2 attaque et défends bien depuis sa palette de combat
			document.getElementById("info-popup-text").textContent = "Votre palette de combat est celle de gauche\n vous ne pouvez pas attaquer ou defendre ici";
            document.getElementById("info-popup").style.display = "block";
            setTimeout(function(){ document.getElementById("info-popup").style.display = "none"; }, 5000);
			return;
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
		
		//Lancement du combat avec l'adversaire placé à droite du joueur courant
		if (typeof nextElmt !== "undefined" && nextElmt !== null) {
			if (hasClass(nextElmt,"player")) {
				if(ev.currentTarget.id == "player1-attaquer" || ev.currentTarget.id == "player2-attaquer")
					attackDefend(nextElmt,"attack"); //Déclenchement du combat
				else
					attackDefend(nextElmt,"defendre"); //Déclenchement du combat

				//Suppression des routes autour de l'ancien joueur
				resetRoadCells(intf.getWeapons());
				//Retraçage des nouvelles routes autour du prochain joueur
				intf.traceMoveDirection();
			} else
				isNotNextPlace = true;
		} else
			isNotNextPlace = true;

		//Lancement du combat avec l'adversaire placé à gauche du joueur courant
		if (typeof prevElmt !== "undefined" && prevElmt !== null) {
			if(hasClass(prevElmt,"player")) {
				if(ev.currentTarget.id == "player1-attaquer" || ev.currentTarget.id == "player2-attaquer")
					attackDefend(prevElmt,"attack");
				else
					attackDefend(prevElmt,"defendre");

				//Suppression des routes autour de l'ancien joueur
				resetRoadCells(intf.getWeapons());
				//Retraçage des nouvelles routes autour du prochain joueur
				intf.traceMoveDirection();
			} else
				isNotPrevPlace = true;
		} else 
			isNotPrevPlace = true;
		
		//Lancement du combat avec l'adversaire placé en bas du joueur courant
		if (tabNextElmts.length > 0) {
			for (var i = 0; i < tabNextElmts.length; i++) {
				var children = tabNextElmts[i].children;
				for (var j = 0; j < children.length; j++) {
					if (j === activeElementIndex && hasClass(children[j],"player")) {
						isNotBottomPlace = false;
						i = tabNextElmts.length;
						var tmp_index = j;
						j = children.length;
						if(ev.currentTarget.id == "player1-attaquer" || ev.currentTarget.id == "player2-attaquer")
							attackDefend(children[tmp_index],"attack");
						else
							attackDefend(children[tmp_index],"defendre");

						//Suppression des routes autour de l'ancien joueur
						resetRoadCells(intf.getWeapons());
						//Retraçage des nouvelles routes autour du prochain joueur
						intf.traceMoveDirection();
					} else
						isNotBottomPlace = true;
				};
			};
		} else
			isNotBottomPlace = true;
		
		//Lancement du combat avec l'adversaire placé en haut du joueur courant
		if (tabPrevElmts.length > 0) {
			for (var i = 0; i < tabPrevElmts.length; i++) {
				var children = tabPrevElmts[i].children;
				for (var j = 0; j < children.length; j++) {
					if (j === activeElementIndex && hasClass(children[j],"player")) {
						console.log("Player top");
						isNotTopPlace = false;
						i = tabPrevElmts.length;
						var tmp_index = j;
						 j = children.length;
						if(ev.currentTarget.id == "player1-attaquer" || ev.currentTarget.id == "player2-attaquer")
							attackDefend(children[tmp_index],"attack");
						else
							attackDefend(children[tmp_index],"defendre");

						//Suppression des routes autour de l'ancien joueur
						resetRoadCells(intf.getWeapons());
						//Retraçage des nouvelles routes autour du prochain joueur
						intf.traceMoveDirection();
					} else {
						isNotTopPlace = true;
					}
						
				};
			};
		} else
			isNotTopPlace = true; //console.log("No player place");
		
		
		checks = [isNotNextPlace,isNotPrevPlace,isNotBottomPlace,isNotTopPlace]; //Tableau de booléen vérifiant si les joueurs peuvent attaquer ou défendre vis à vis de leurs positions
		console.log(checks);
		
		if (isNotNextPlace && isNotPrevPlace && isNotBottomPlace && isNotTopPlace) {
			document.getElementById("info-popup-text").textContent = "Vous ne pouvez pas encore attaquer ou défendre, essayez de comprendre le jeu";
            document.getElementById("info-popup").style.display = "block";
            setTimeout(function(){ document.getElementById("info-popup").style.display = "none"; }, 5000);
		}
	}
	/**
	* Fonction permettant d'attaquer ou défendre
	* @param action : le mode du combat (Attaquer,défendre)
	* */
	function attackDefend (attackedElmt,action) {
		var activePlayer = intf.getActivePlayerInfos().elmt,
		classs = activePlayer.className.split(" "),
		activePlayerName = classs[classs.length - 2];
		var players = intf.getPlayers();
		var isGameOver = false;
		var content = "";
		if (!hasClass(attackedElmt,"active")) {
			for (index in players) {
				if (hasClass(attackedElmt,players[index].getFirstName())) {
					var attackedPlayer = players[index];
					
					if (attackedPlayer.getFirstName() === "Mario") {
						/****Mise à jour des infos du joueur 1 en temps réel*****/
						marioLifePoint = document.getElementById("player1-life-point").textContent;
						marioWeaponDamage = document.getElementById("player1-degat").textContent;
						bowserWeaponDamage = document.getElementById("player2-degat").textContent;
						if (action === "attack") {
							if (!isDefend) {
								document.getElementById("player1-life-point").textContent = marioLifePoint - bowserWeaponDamage;
								var lifepoint = document.getElementById("player1-life-point").textContent;
								if (lifepoint == 0 || lifepoint < 0) {
									isGameOver = true;
								}
							} else {	
								document.getElementById("player1-life-point").textContent = marioLifePoint - bowserWeaponDamage/2;
								isDefend = false;
								var lifepoint = document.getElementById("player1-life-point").textContent;
								if (lifepoint == 0 || lifepoint < 0) {
									isGameOver = true;
								}
							}
							display("Bowser à attaquer Mario"); //Affichage des activités dans la console
						} else {
							display("Bowser se défend");
							isDefend = true;
						}
						//Formations des informations sur le vainqueur et le vaincu à la fin du jeu
						nomVainqueur = "Bowser";
						pdvVainqueur = document.getElementById("player2-life-point").textContent;
						armeVainqueur = document.getElementById("player2-weapon-name").textContent;

						nomVaincu = "Mario";
						pdvVaincu = lifepoint;
						armeVaincu = document.getElementById("player1-weapon-name").textContent;
						
						//Activation du prochain joueur
						intf.activeNextPlayer();
						//Mise à défaut de l'ancien joueur actif
						activePlayer.className = "box player" + " " + activePlayerName;
					} else {
						/****Mise à jour des infos du joueur 2 en temps réel****/
						bowserLifePoint = document.getElementById("player2-life-point").textContent;
						bowserWeaponDamage = document.getElementById("player2-degat").textContent;
						marioWeaponDamage = document.getElementById("player1-degat").textContent;

						if (action === "attack") {
							if (!isDefend) {
								document.getElementById("player2-life-point").textContent = bowserLifePoint - marioWeaponDamage;
								var lifepoint = document.getElementById("player2-life-point").textContent;
								if (lifepoint == 0 || lifepoint < 0) {
									isGameOver = true;
								}
							} else {
								document.getElementById("player2-life-point").textContent = bowserLifePoint - marioWeaponDamage/2;
								isDefend = false;
								var lifepoint = document.getElementById("player2-life-point").textContent;
								if (lifepoint == 0 || lifepoint < 0) {
									isGameOver = true;
								}
							}
							display("Mario à attaquer Bowser");
						} else {
							display("Mario se défend");
							isDefend = true;
						}
						//Formations des informations sur le vainqueur et le vaincu à la fin du jeu
						nomVainqueur = "Mario";
						pdvVainqueur = document.getElementById("player1-life-point").textContent;
						armeVainqueur = document.getElementById("player1-weapon-name").textContent;

						nomVaincu = "Bowser";
						pdvVaincu = lifepoint;
						armeVaincu = document.getElementById("player2-weapon-name").textContent;

						//Activation du prochain joueur
						intf.activeNextPlayer();
						//Mise à défaut de l'ancien joueur actif
						activePlayer.className = "box player" + " " + activePlayerName;
					}
					if (isGameOver) {

						  content = '<p><span class="winner">Vainqueur</span><span class="w-info">Nom : '+nomVainqueur+'</span>';
			              content += '<span class="w-info">Point de Vie : '+pdvVainqueur+'</span><span class="w-info">Arme : '+armeVainqueur+'</span></p>';           
			              content += '<p><span class="winner">Vaincu</span><span class="w-info">Nom : '+nomVaincu+'</span>';     
			              content += '<span class="w-info">Point de Vie : '+pdvVaincu+'</span><span class="w-info">Arme : '+armeVaincu+'</span></p>';            
			                            
                        document.getElementById("game-info").innerHTML = content;
                        document.getElementById("popup").style.display = "block";
					}	
				}
			}
		}
		
	}
	
}
