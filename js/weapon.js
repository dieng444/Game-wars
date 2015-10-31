/**
* Class Weapon : classe qui représente les armes 
****/
function Weapon (names, damage, visuel, roadImage) {
	
	this.names = names;
	this.damage = damage;
	this.visuel = visuel;
	this.roadImage = roadImage;

	/**
	* Renvoie le nom de l'arme
	* @return names
	**/
	this.getName = function () {
		return this.names;
	}
	/**
	* Renvoie le dégât de l'arme
	* @return damage
	**/
	this.getDamage = function () {
		return this.damage;
	}
	/**
	* Renvoie le visuel associé à l'arme
	* @return visuel
	**/
	this.getVisuel = function () {
		return this.visuel;
	}
	/**
	* Renvoie le visuel associé à l'arme
	* @return visuel
	**/
	this.getRoadImage = function () {
		return this.roadImage
	}
	/**
	* Modifie le nom de l'arme
	* @param names
	**/
	this.setName = function (names) {
		this.names = names;
	}
	/**
	* Modifie le dégât de l'arme
	* @param damage
	**/
	this.setDamage = function (damage) {
		this.damage = damage;
	}
	/**
	* Modifie le visuel de l'arme
	* @param visuel
	**/
	this.setVisuel = function (visuel) {
		this.visuel = visuel;
	}
	/**
	* Modfie l'image de route de l'arme
	* @return visuel
	**/
	this.setRoadImage = function (roadImage) {
		this.roadImage = roadImage;
	}

}