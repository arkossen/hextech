private var maxSpeed = 20;
var characterController : CharacterController;
private var  rot : float= -1.0;
var movementRestriction = 15;
private var movementPercentage = 100 - movementRestriction;
var rotating = false;
var dead : boolean = false;

private var charMoveSpeedX = 0;
private var charMoveSpeedY = 0;

function Update () {
	
	if(gameObject.Find("Main Camera").transform.eulerAngles.y >= 0)
		gameObject.Find("Main Camera").transform.eulerAngles.y = 0;
	//var mouseX : float = ((Input.mousePosition.x - Screen.width / 2) / (Screen.width / 2)) * 100;
	//var mouseY : float = ((Input.mousePosition.y - Screen.height / 2) / (Screen.height / 2)) * 100;
	// CHANGE Y TO Z!
	var mouseX : float = gameObject.Find("ArmManager").GetComponent("KFTData").pos.x * 100;
	var mouseY : float = -(gameObject.Find("ArmManager").GetComponent("KFTData").pos.z) * 100;
	//gameObject.find("ArmManager").GetComponent(KFTData).pos.x;
	
	var speedX : float;
	var speedY : float;
	var deg = Mathf.Atan2(mouseX, mouseY) * Mathf.Rad2Deg;
	
	gameObject.GetComponent(CharacterController).transform.eulerAngles.y = deg;
	
	if(mouseX > movementRestriction)
		mouseX -= movementRestriction;
	else if(mouseX < -movementRestriction)
		mouseX += movementRestriction;
	else
		mouseX /= movementPercentage;
		
	if(mouseY > movementRestriction)
		mouseY -= movementRestriction;
	else if(mouseY < -movementRestriction)
		mouseY += movementRestriction;
	else
		mouseY /= movementPercentage;
	
	if(mouseX > movementRestriction || mouseX < -movementRestriction || mouseY > movementRestriction || mouseY < -movementRestriction){
		speedX = ((mouseX) / movementPercentage) * maxSpeed;
		speedY = ((mouseY) / movementPercentage) * maxSpeed;
	}
	//else
	//	gameObject.GetComponent(CharacterController).transform.eulerAngles.y = deg;
	
	charMoveSpeedX = speedX;
	charMoveSpeedY = speedY;
	if(!dead)
		gameObject.GetComponent(CharacterController).SimpleMove(Vector3(speedX, 0, speedY));
	else{
		gameObject.GetComponent(CharacterController).SimpleMove(Vector3(0, 0, 0));
		dead = false;
	}
		
	//postMoveCheck();
	//gameObject.transform.position = gameObject.transform.forward;
}

function getSpeedY(){
	return charMoveSpeedY;
}

function getSpeedX(){
	return charMoveSpeedX;
}

function postMoveCheck (){
	transform.parent = null;
}
