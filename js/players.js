/**
* Class Player : Objet répsentant les joueurs
***/
function Player (firstName, lifePoint, profil, weapon) {

	this.firstName = firstName;
	this.lifePoint = lifePoint;
	this.profil = profil;
	this.weapon = weapon;

	this.getFirstName = function () {
		return this.firstName;
	}
	this.getLifePoint = function () {
		return this.lifePoint;
	}
	this.getProfil = function () {
		return this.profil;
	}
	this.getWeapon = function () {
		return this.weapon;
	}
	this.setFirstName = function (firstName) {
		this.firstName = firstName;
	}
	this.setLifePoint = function (lifePoint) {
		this.lifePoint = lifePoint;
	}
	this.setProfil  = function (profil) {
		this.profil = profil;
	}
	this.setWeapon = function (weapon) {
		this.weapon = weapon;
	}
}