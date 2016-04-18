var upTime : float = 5.0;
var currentHexagon : HexagonObject;
private var up : boolean = false;
private var down : boolean = false;
private var bottomHex : GameObject;
private var hitted : boolean = false;

function Update () {

	if(Input.GetButtonDown("RaiseHex"))
		up = true;
	if(Input.GetButtonUp("RaiseHex"))
		up = false;
	if(Input.GetButtonDown("LowerHex"))
		down = true;
	if(Input.GetButtonUp("LowerHex"))
		down = false;
	
	//if(gameObject.Find("ArmManager").GetComponent("KFTData").pos.y >= 0){
	//	up = true;
	//	down = false;	
	//}else{
	//	up = false;
	//	down = true;
	//}
		
	
	var hit : RaycastHit;
	if(Physics.Raycast (Vector3(transform.position.x, transform.position.y + 0.2, transform.position.z), 
                       Vector3(transform.forward.x , transform.position.y - 8.55,transform.forward.z), hit, 30)) {
	currentHexagon = hit.collider.gameObject.GetComponent(HexagonObject);
	hitted = true;
	Debug.DrawLine (Vector3(transform.position.x, transform.position.y + 0.2, transform.position.z), hit.point, Color.red);
	
	
		if(hit.collider.gameObject.tag=="Hexagon"){
			if(up){
				currentHexagon.raiseHexagon();
				//print((currentHexagon.transform.position.x - 500) / 8.55);
			}
			if(down)
				currentHexagon.lowerHexagon();
			
		}
	}else
		hitted = false;
		
	if(hit.collider)
		if(hit.collider.gameObject.tag == "Hexagon")
			gameObject.Find("SelectedHex").gameObject.transform.position = Vector3(hit.collider.transform.position.x, hit.collider.transform.position.y + 17, hit.collider.transform.position.z - 5);
		else
			gameObject.Find("SelectedHex").gameObject.transform.position.y  = - 20;
}



function OnControllerColliderHit(hit : ControllerColliderHit){
	 if(hit.gameObject.tag == "Hexagon"){
		bottomHex = hit.gameObject;
		if(hit.gameObject.GetComponent("HexagonObject").stomping){
			//print("CARE!!");
			//gameObject.transform.parent = bottomHex.transform;
			gameObject.transform.position.y += 10;
		}
		//transform.parent = hit.gameObject.transform;
	 }
	 if(hit.gameObject.tag == "Laser"){
		gameObject.Find("Player").GetComponent("WTF_Player").subtractPlayerHealth(1);
		print("hitbyLASER!");
	}
}
