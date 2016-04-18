private var checkpoints : GameObject[];
private var currentCheckpoint;

function Update () {
	var closest : GameObject;
    var distance = Mathf.Infinity;
    var position = transform.position;
    // Iterate through them and find the closest one
	if(checkpoints){
    for (var checkpoint : GameObject in checkpoints)  {
	//print(checkpoint.name);
		if(!checkpoint.GetComponent("HexagonObject").passed && checkpoint.name != "BaseCheckpoint" && checkpoint.name != "BaseFinish"){
			var diff = (checkpoint.transform.position - position);
			var curDistance = diff.sqrMagnitude; 
			if (curDistance < distance) {
				closest = checkpoint; 
				distance = curDistance; 
			}
		}
    }
	// Move an object towards the closest checkpoint
	// This will be used in the Path-finding
	//gameObject.transform.position = gameObject.transform.position.MoveTowards (gameObject.transform.position, closest.transform.position, 1.0);
	
	//	Path-finding
	//	Use the hexagons.loc to find a position around the "PathFinder" which is closest towards the "Object".
	//	gameObject.Find(HexCore).hexagons loop through and get the "hexagons.loc" and look for the closest again and again.
	
	gameObject.transform.LookAt(closest.transform);
	transform.rotation.x = 0;
	transform.rotation.z = 0;
	}
}

function setCheckpoints(){
	checkpoints = GameObject.FindGameObjectsWithTag ("Checkpoint");
}