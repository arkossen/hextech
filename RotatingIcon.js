
function Awake() {
	transform.eulerAngles.y = Random.value * 360;
}

function Update () {
	if(transform.eulerAngles.y >= 360)
		transform.eulerAngles.y = 0;
	
	transform.eulerAngles.y += 50 * Time.deltaTime;
}