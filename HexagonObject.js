
var up : boolean = false;
private var raiseY = 10;
private var startPositionY = -11;

private var raiseSpeed : float= 1;
private var maxRaiseHeight = 2.5;
var stomping : boolean = false;
private var stompingRange = 3;
private var standardPosition : Vector3;
var upTime : float = 5.0;
var worldPosition : Vector3;
var hexType = "BaseHexagon";
var hex;
var passed : boolean = false;
var checkpointNumber;

var loc : Vector3;
var hexDirection;
var hexRange;

// Size = Vector3(11.4, 21.6, 9.9)
function Awake(){
	standardPosition = gameObject.transform.position;
}

function Update () {
	if(gameObject.transform.Find("SpawnProtect")){
		if(gameObject.transform.Find("SpawnProtect").transform.localPosition.y > 0){
			gameObject.transform.Find("SpawnProtect").transform.localPosition.y -= 0.1 * Time.deltaTime;
		}
	}
}

function raiseHexagon(){
	if(gameObject.transform.position.y < maxRaiseHeight){
		transform.Translate(Vector3.up * raiseSpeed);
		//gameObject.transform.position.y += raiseSpeed;
	}
}

function lowerHexagon(){
	if(gameObject.transform.position.y > startPositionY){
		transform.Translate(-Vector3.up * raiseSpeed);
	}
}

function getMaxRaiseHeight(){
	return maxRaiseHeight;
}

function getStartPosY(){
	return startPositionY;
}

function OnCollisionEnter(collision : Collision) {
	
}
//OnTriggerEnter, OnTriggerExit and OnTriggerStay

function OnTriggerEnter(collision : Collider){
	switch(hexType){
		case "BaseFinish" : 
			if(collision.gameObject.tag == "Player"){
				gameObject.Find("Player").transform.position.y += 50;
				gameObject.Find("Core").GetComponent(HexWorldCore).finish();
				print("FINISH!");
			}
			break;
		case "BaseCheckpoint":
			if(collision.gameObject.tag == "Player" && !passed){
				gameObject.Find("Core").GetComponent(HexWorldCore).setCheckPoint(gameObject, gameObject.transform.position);
				passed = true;
				print("CHECKPOINT!");
			}
			break;
		case "BaseSafeZone":
			if(collision.gameObject.tag == "Bullet")
				Destroy(collision.gameObject);
			break;
	}
}

function stomp(){
	if(!stomping){
		stomping = true;
		
	}
}