var bulletSpeed : float = 20.0;
private var damage = 1;
private var bulletActive : boolean = false;
private var lifeTime = 200;

function Update () {
	if(bulletActive){
		gameObject.transform.position += transform.forward * bulletSpeed * Time.deltaTime;
		//Debug.Log("bulletPos:" + gameObject.transform.position);
		//Debug.Log("dhf:" + transform.forward + ", " + bulletSpeed + ", "+ Time.deltaTime);
		if(lifeTime <= 0)
			Destroy(gameObject);
		else
			lifeTime -= Time.deltaTime;
	}
}

function OnCollisionEnter(collision : Collision) {
	print(collision.gameObject.name);
	if(collision.gameObject.tag == "Hexagon" && bulletActive){
		Destroy(gameObject);
	}
	if(collision.gameObject.tag == "Player" && bulletActive){
		print("HIT!");
		collision.gameObject.GetComponent("WTF_Player").subtractPlayerHealth(damage);
		Destroy(gameObject);
	}
}

function activateBullet(){
	bulletActive = true;
	gameObject.GetComponent(MeshRenderer).enabled = true;
}

function setDamage(dmg){
	damage = dmg;
}