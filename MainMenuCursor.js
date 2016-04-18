private var holdTime  = 5;
var currentHoldTime = 5;
private var count : boolean = false;

function Update () {
	if(count)
		currentHoldTime -= Time.deltaTime;
	else
		currentHoldTime = holdTime;
		
	print(currentHoldTime);
	gameObject.Find("CursorTimer").GetComponent(TextMesh).text = Mathf.Round(currentHoldTime).ToString();
}

function startCount(){
	count = true;
}

function stopCount(){
	count = true;
}