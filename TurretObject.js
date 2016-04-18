var activated : boolean = false;
private var currentTurret : TurretObject;
private var currentShootTime : float;
var shootTime : float = 1; // in seconds
var bulletDamage = 1;
private var turretAngle = 0;
private var diff = 10;

private var stompTime = 200;
private var stompHexagons = new Array();
private var stompIteration = 0;
private var curStompTime = 200;
private var stomping : boolean = false;

var hide : boolean = true;

var loc : Vector3;
var hexDirection;
var hexRange;
var hexType;
var turretType : String;

function Awake() {
	if(gameObject.transform.Find("AimRange"))
		gameObject.transform.Find("AimRange").GetComponent("TurretAim").parentTurret = gameObject;
}

function Update () {
	var shootPos;
	var shootPos2;
	switch(turretType){
		case "Aiming":
			shootPos = transform.Find("Turret").transform.Find("RotatingPart").transform.Find("ShootPos");
		break;
		case "Straight Line":
			shootPos = transform.Find("Turret").transform.Find("ShootPos");
		break;
		case "Shockwave":
			curStompTime -= Time.deltaTime;
			if(transform.Find("Turret").transform.Find("Stomper").localPosition.y < 0)
				transform.Find("Turret").transform.Find("Stomper").localPosition.y += 0.01 * Time.deltaTime;
				
			if(curStompTime <= 0){
				transform.Find("Turret").transform.Find("Stomper").localPosition.y = -0.03;
				stomp();
				curStompTime = stompTime;
			}
			stompUpdate();
		break;
		case "Hiding":
			shootPos = transform.Find("Turret").transform.Find("RotatingPart").transform.Find("ShootPos");
			shootPos2 = transform.Find("Turret").transform.Find("RotatingPart").transform.Find("ShootPos2");
			arrangeShootPos(shootPos2);
			if(hide)
				hideTurret();
			else
				exposeTurret();
		break;
		default :
			shootPos = transform.Find("Turret").transform.Find("ShootPos");
		break;
	}
	
	arrangeShootPos(shootPos);
}

function arrangeShootPos(go){
	var hit : RaycastHit;
	var laserDistance = 0;
	
	if(go){
		if(Physics.Raycast (Vector3(go.transform.position.x, go.transform.position.y, go.transform.position.z), go.transform.forward, hit, 50)) {
			Debug.DrawLine (go.transform.position, hit.point, Color.red);
			laserDistance = hit.distance;
		}
	
		if(hexRange){
			if(laserDistance == 0 || laserDistance >= hexRange * 9){
				go.transform.Find("Laser").transform.localScale = Vector3(hexRange * 9, 1, 1);
				go.transform.Find("Laser").transform.localPosition.z =  ((hexRange * 3) / 2);
				go.GetComponent("BoxCollider").size = Vector3(1, 1, (hexRange * 9));
				go.GetComponent("BoxCollider").center = Vector3(0, 0, (hexRange * 9) / 2);
			}else{
				go.transform.Find("Laser").transform.localScale = Vector3(laserDistance, 1, 1);
				go.transform.Find("Laser").transform.localPosition.z =  ((laserDistance / 3) / 2);
				go.GetComponent("BoxCollider").size = Vector3(1, 1, laserDistance);
				go.GetComponent("BoxCollider").center = Vector3(0, 0, (laserDistance) / 2);
			}
		}
	}
}

function fireBullet() {
	//rotateTurretY(diff);
	var originalBullet = gameObject.Find("Bullet");
	var shootPosition = transform.Find("Turret").transform.Find("ShootPos").transform.position;
	var bullet = Instantiate(originalBullet, shootPosition, transform.rotation);
	bullet.GetComponent(BulletObject).activateBullet();
	bullet.transform.forward = transform.Find("Turret").transform.Find("ShootPos").transform.forward;
	bullet.GetComponent(BulletObject).setDamage(bulletDamage);
}

function rotateTurretY(angleY){
	turretAngle += angleY;
	if(turretAngle >= 360)
		turretAngle -= 360;
	transform.rotation = Quaternion.Euler(0, turretAngle, 0);
}

function rotateToTarget(go){
	var turret = gameObject.transform.Find("Turret").transform.Find("RotatingPart");
	turret.transform.LookAt(go.transform);
	var tempRot = turret.transform.eulerAngles;
	turret.transform.eulerAngles.y += 90;
	go.transform.rotation.x = 0;
	go.transform.rotation.z = 0;
}

function OnTriggerStay(collision : Collider){
	if(collision.gameObject.tag == "Player"){
		//print("AIM!");
		//gameObject.transform.Find("ShootPos").transform.LookAt(collision.gameObject.transform.position);
	}
}

function stompUpdate(){
	stompIteration++;
	
	for(var i = 0; i < stompHexagons.length; i++){
		var hex = stompHexagons[i];
		if(hex.GetComponent("HexagonObject").stomping){
			if(hex.transform.position.y < hex.GetComponent("HexagonObject").getMaxRaiseHeight()){
				//hex.transform.position.y += 1 * (1 -(stompIteration / 10));
				hex.GetComponent("HexagonObject").raiseHexagon();
				hex.GetComponent("HexagonObject").raiseHexagon();
			}else{
				//print("stompingFALSE");
				hex.GetComponent("HexagonObject").stomping = false;
			}
		}else{
			hex.GetComponent("HexagonObject").lowerHexagon();
			//print("down!");
		//	if(hex.transform.position.y >= hex.GetComponent("HexagonObject").getStartPosY())
			//	hex.transform.position.y -= 0.1;
		}
	}
}

function stomp(){
	yield WaitForSeconds (0.1);
	stompIteration = 0;
	stomping = true;
	for(var i = 0; i < stompHexagons.length; i++){
		var hex = stompHexagons[i];
		hex.GetComponent("HexagonObject").stomping = true;
	}
}

function exposeTurret(){
	if(transform.position.y <= -2.5)
		transform.position.y += 0.5;
	else
		return true;
	
	return false;
}

function hideTurret(){
	if(transform.position.y > -11){
		transform.position.y -= 0.5;
	}
}

function getHexagons(){
	return stompHexagons;
}

function setHexagons(){
	
}