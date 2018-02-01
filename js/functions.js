//Activation d'un joueur au hasard
function activePlayer() {
	var players = document.getElementsByClassName("player");
	var playerIndex = Math.floor(Math.random() * players.length);
	players[playerIndex].className = players[playerIndex].className + " " + "active";
}
/**
* Vérifie si un élement donné a une classe donnée
*  @element : l'élément sur lequel on cherche la classe
*  @cls : classe recherchée parmi les clesses de l'élément
****/
function hasClass(element, cls) {
  return (element.className.split(" ")).indexOf(cls) > -1;
}
/**
 * Renvoie les éléments suivants d'un élément donné
 * @param elmt : l'élément auquel on cherche les éléments suivants
 **/
function getAllNextElmts(elmt) {
  var next  = elmt.nextElementSibling;
  //var next = elmt.nextElementSibling;
  var elmtContainer = [];
  if (next !== undefined) {
    while (next && next.nodeType === 1) {
      elmtContainer.push(next);
      next = next.nextElementSibling;
    }
    return elmtContainer;
  } else {
    console.log("Impossible to trace road");
  }
}
//Renvoie les éléments précédents d'un élément donné
function getAllPrevElmts(elmt) {
  var prev = elmt.previousElementSibling;
  var elmtContainer = [];
  if (prev !== undefined) {
    while (prev && prev.nodeType === 1) {
      elmtContainer.push(prev);
      prev = prev.previousElementSibling;
    }
    return elmtContainer;
  } else {
    console.log("Impossible to trace road");
  }
}
//Renvoie les élements suivants du parent d'un élément donné
function getAllParentNextElmts(elmt) {
  var parentNext = elmt.parentElement.nextElementSibling;
  var elmtContainer = [];
  if (parentNext !== undefined) {
    while (parentNext && parentNext.nodeType === 1) {
      elmtContainer.push(parentNext);
      parentNext = parentNext.nextElementSibling;
    }
    return elmtContainer;
  } else {
    console.log("Impossible to trace road");
  }
}
//Renvoie les élements précédents du parent d'un élément donné
function getAllParentPrevElmts(elmt) {
  var parentPrev = elmt.parentElement.previousElementSibling;
  var elmtContainer = [];
  if (parentPrev !== undefined) {
    while (parentPrev && parentPrev.nodeType === 1) {
      elmtContainer.push(parentPrev);
      parentPrev = parentPrev.previousElementSibling;
    }
    return elmtContainer;
  } else {
    console.log("Impossible to trace road");
  }
}
//Permet d'afficher les messages d'activités en temps réel dans la console du jeu
function display (message) {
	document.getElementById("activity-area-content").textContent = message;
}
//Permet de réinitialiser les routes
function resetRoadCells (weapons) {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var elmt = document.getElementById("X"+i+"Y"+j);
      if (elmt.getAttribute("class") == "box road") {
        elmt.setAttribute("class", "box");
        elmt.style.background = "url('img/sol.png') no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
      }
      for (k in weapons) {
        if (elmt.getAttribute("class") == "box weapon" + " " + weapons[k].getName() + " " + "road") {
          elmt.setAttribute("class", "box weapon"+ " "+ weapons[k].getName());
          elmt.style.background = "url('img/"+ weapons[k].getVisuel() +"') no-repeat scroll 0 0 / 100% auto rgba(0, 0, 0, 0)";
        }
      }
    };
  };
}
