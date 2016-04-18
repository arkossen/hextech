private var maxHoldTime = 100;
private var currentHoldTime = 100;

//~ function OnMouseEnter(){
	//~ gameObject.Find("MouseOverSound").audio.Play();
	//~ gameObject.Find("Button").transform.position = gameObject.transform.position;
	//~ gameObject.Find("Button").transform.position.z = gameObject.transform.position.z + 1;
	//~ if(gameObject.tag == "LevelButton"){
		//~ gameObject.Find("Button").gameObject.transform.localScale = new Vector3(0.6074052, 0.1012342, 0.1012342);
	//~ }else
		//~ gameObject.Find("Button").gameObject.transform.localScale = new Vector3(1.005765, 0.1676276, 0.1676276);
//~ }

//~ function OnMouseDown(){
	//~ gameObject.Find("MouseDownSound").audio.Play();
	//~ gameObject.Find("Button").GetComponent("MainMenuButtonGraphic").changeMaterial("down");
	//~ if(gameObject.GetComponent(TextMesh).text == "New Game"){
		//~ Application.LoadLevel("testScene");
	//~ }
	//~ if(gameObject.GetComponent(TextMesh).text == "Level Select"){
		//~ gameObject.Find("MenuStateManager").GetComponent(MenuStateManager).gotoState("LEVEL_SELECT");
	//~ }
	//~ if(gameObject.name== "BaseWorldName"){
		//~ gameObject.Find("MenuStateManager").GetComponent(MenuStateManager).startWorld(gameObject.GetComponent(TextMesh).text);
		//~ print("pressed:" + MenuStateManager.chosenLevel);
		//~ Application.LoadLevel("testScene");
	//~ }
	//~ if(gameObject.tag == "LevelButton"){
		//~ gameObject.Find("MenuStateManager").GetComponent(MenuStateManager).startLevel(gameObject.GetComponent(TextMesh).text);
		//~ gameObject.Find("HeaderMain").active = true;
		//~ Application.LoadLevel("testScene");
	//~ }
	//~ // small 0.6074052, 0.1012342, 0.1012342
	//~ // big 1.005765, 0.1676276, 0.1676276
//~ }

//~ function OnMouseUp(){
	//~ gameObject.Find("Button").GetComponent("MainMenuButtonGraphic").changeMaterial("up");
//~ }

function OnTriggerEnter(collision : Collider){
	//if(collision.gameObject.name == "Cursor"){
		gameObject.Find("MouseOverSound").audio.Play();
		gameObject.Find("Button").transform.position = gameObject.transform.position;
		gameObject.Find("Button").transform.position.z = gameObject.transform.position.z + 1;
		if(gameObject.tag == "LevelButton"){
			gameObject.Find("Button").gameObject.transform.localScale = new Vector3(0.6074052, 0.1012342, 0.1012342);
		}else
			gameObject.Find("Button").gameObject.transform.localScale = new Vector3(1.005765, 0.1676276, 0.1676276);
	//}
}

function OnTriggerStay(collision : Collider){
	currentHoldTime -= Time.deltaTime;
	//print(currentHoldTime);
	if(currentHoldTime <= 0){
		gameObject.Find("MouseDownSound").audio.Play();
		gameObject.Find("Button").GetComponent("MainMenuButtonGraphic").changeMaterial("down");
		if(gameObject.GetComponent(TextMesh).text == "New Game"){
			Application.LoadLevel("testScene");
		}
		if(gameObject.GetComponent(TextMesh).text == "Level Select"){
			currentHoldTime = maxHoldTime;
			gameObject.Find("MenuStateManager").GetComponent(MenuStateManager).gotoState("LEVEL_SELECT");
		}
		if(gameObject.name== "BaseWorldName"){
			gameObject.Find("MenuStateManager").GetComponent(MenuStateManager).startWorld(gameObject.GetComponent(TextMesh).text);
			print("pressed:" + MenuStateManager.chosenLevel);
			Application.LoadLevel("testScene");
		}
		if(gameObject.tag == "LevelButton"){
			gameObject.Find("MenuStateManager").GetComponent(MenuStateManager).startLevel(gameObject.GetComponent(TextMesh).text);
			gameObject.Find("HeaderMain").active = true;
			Application.LoadLevel("testScene");
		}
	}
}

function OnTriggerExit(collision : Collider){
	currentHoldTime = maxHoldTime;
	//if(collision.gameObject.name == "Cursor"){
		gameObject.Find("Button").GetComponent("MainMenuButtonGraphic").changeMaterial("up");
	//}
}