
var parentTurret : GameObject;
private var hexagons = new Array();

function OnTriggerStay(col : Collider) {
	if(parentTurret.GetComponent("TurretObject").turretType == "Aiming"){
		if(col.gameObject.tag == "Player")
			parentTurret.GetComponent("TurretObject").rotateToTarget(col.gameObject);
	}else if(parentTurret.GetComponent("TurretObject").turretType == "Shockwave"){
		if(col.gameObject.tag == "Hexagon"){
			//if(parentTurret.GetComponent("TurretObject").curStomping < 0)
			//	col.gameObject.GetComponent("HexagonObject").stomp();
		}
	}else if(parentTurret.GetComponent("TurretObject").turretType == "Hiding"){
		if(col.gameObject.tag == "Player")
			parentTurret.GetComponent("TurretObject").rotateToTarget(col.gameObject);
	}
}

function OnTriggerEnter(col : Collider) {
	if(parentTurret.GetComponent("TurretObject").turretType == "Shockwave"){
		if(col.gameObject.tag == "Hexagon"){
			parentTurret.GetComponent("TurretObject").getHexagons().push(col);
			print("hex in reach!");
		}
	}else if(parentTurret.GetComponent("TurretObject").turretType == "Hiding"){
		if(col.gameObject.tag == "Player"){
			print("Hiding false");
			parentTurret.audio.Play();
			parentTurret.GetComponent("TurretObject").hide = false;
		}
	}
}

function OnTriggerExit(col : Collider) {
	if(parentTurret.GetComponent("TurretObject").turretType == "Hiding"){
		if(col.gameObject.tag == "Player"){
			print("Hiding true");
			parentTurret.GetComponent("TurretObject").hide = true;
		}
	}
}