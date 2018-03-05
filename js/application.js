/**Lancement du jeu**/
window.onload = function () {
	/*****Création du plateau de jeu*****/
	var map = new Map();
	map.init();
	/******Création de interface****/
	var interfaces = new Interface();
	interfaces.launchGame();
	/****Lancement du jeu******/
	var game = new Game();
	game.move();
	/*****Lancement des combats******/
	var fight = new Fight();
	fight.init();


	/*******Le bouton replay, pour réfaire une nouvelle partie*****/
	function replay () {
		/**
		* Suppression du tableau existant dans l'élément conteneur, afin de pouvoir
		* insérer à nouveau un nouveau tableau
		***/
		document.getElementById("game-container").innerHTML = " ";
		document.getElementById("activity-area-content").textContent = " ";
		//Refaire le jeu
		/*****Création d'un nouveau plateau de jeu*****/
		var map = new Map();
		map.init();
		/******Création d'une nouvelle interface****/
		var interfaces = new Interface();
		interfaces.launchGame();
		/****Lancement du jeu à nouveau******/
		var game = new Game();
		game.move();

	}

	/****Appelle de la fonction replay sur le button Le menu*******/
	document.getElementById("menu").addEventListener('click', replay);
	/****Fermeture du popup de gamevoer via le bouton <<Quitter>> ******/
	document.getElementById("close").addEventListener('click', function () {
		document.getElementById("popup").style.display = "none";
		replay(); //Réinitialisation du jeu, après la fermeture du popup
	});
	/******Fermeture du popup de gameover via l'icône en X en haut et à droite du popup*****/
	document.getElementById("leave").addEventListener('click', function () {
		document.getElementById("popup").style.display = "none";
		replay();//Réinitialisation du jeu, après la fermeture du popup
	});

}
