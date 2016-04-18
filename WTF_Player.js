var playerHealth = 3;

function subtractPlayerHealth(dmg){
	playerHealth -= dmg;
}

function Update(){
	if(gameObject.transform.position.y < -10)
		subtractPlayerHealth(1);
		
	if(playerHealth <= 0){
		gameObject.Find("Core").GetComponent(HexWorldCore).resetPlayerToCheckpoint();
		playerHealth = 1;
	}
	//print(gameObject.transform.position.y);
}