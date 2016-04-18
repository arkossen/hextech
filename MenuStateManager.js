var menuState = ["PROFILE_SELECT_INTRO", "PROFILE_SELECT_OUTRO", "MAIN_MENU_INTRO", "MAIN_MENU_OUTRO", "LEVEL_SELECT"];
var currentState = "MAIN_MENU";
var menuLeftSide : Texture;
var menuRightSide : Texture;
var menuMainBar : Texture;
var menuObjects = new Array();
static var hexWorlds = new Array();
static var hexTextures = new Array();
static var chosenLevel = "";

function Update () {
	//CHANGE Y TO Z
	gameObject.Find("Cursor").transform.position.x = (gameObject.Find("ArmManager").GetComponent("KFTData").pos.x * (10));
	gameObject.Find("Cursor").transform.position.y = (gameObject.Find("ArmManager").GetComponent("KFTData").pos.z * (8));
	
	gameObject.Find("Cursor").transform.position.z = 0;
}

function OnGUI(){
	//GUI.DrawTexture(Rect(0,0,512,768), menuLeftSide, ScaleMode.ScaleToFit, true, 0);
	//GUI.DrawTexture(Rect(Screen.width/2,0,571,1050), menuRightSide, ScaleMode.ScaleToFit, true, 0);
	//GUI.DrawTexture(Rect(0,0,1024,156), menuMainBar, ScaleMode.ScaleToFit, true, 0);
	//showState(currentState);
}

function Awake(){
	var temp = gameObject.Find("NewGame");
	var newObject;
	newObject = Instantiate(temp, Vector3(0,0,2), Quaternion.identity);
	newObject.name = "LevelSelect";
	newObject.GetComponent(TextMesh).text = "Level Select";
}

function gotoState(state){
	var oldState = currentState;
	var newState = state;
	hideCurrentState();
	showState(state);
	
	currentState = newState;
}

function hideCurrentState(){
	switch(currentState){
		case "PROFILE_SELECT" :
			break;
		case "MAIN_MENU" :
			gameObject.Find("NewGame").transform.position.x = -100;
			gameObject.Find("NewGame").renderer.enabled = false;
			//gameObject.Find("Continue").transform.position.z = 10;
			//gameObject.Find("Continue").renderer.enabled = false;
			gameObject.Find("LevelSelect").transform.position.x = -100;
			gameObject.Find("LevelSelect").renderer.enabled = false;
			gameObject.Find("Quit").transform.position.x = -100;
			gameObject.Find("Quit").renderer.enabled = false;
			gameObject.Find("HeaderMain").renderer.enabled = false;
			break;
		case "LEVEL_SELECT" :
			break;
	}
}

function getWorlds(){
	if(hexWorlds.length == 0){
		var www = WWW("file:///" + Application.dataPath +"/Worlds/worlds.xml");
		//var www = WWW("http://arkossen.com/WTF_WorldEditor/maps/worlds.xml");
		yield www;
		parser = new XMLParser();
		var node = parser.Parse(www.text);
		var worlds = node["worlds"][0]["world"];
		
		for(var i = 0; i < worlds.length; i++){
			var world = new WorldClass();
			world.worldname = worlds[i]["@name"];
			var levels = new Array();
			for(var l = 0; l < worlds[i]["level"].length; l++){
				var level = new LevelClass();
				level.levelname = worlds[i]["level"][l]["@name"];
				levels.push(level);
			}
			world.levels = levels;
			hexWorlds.push(world);
		}
		
	}
	
	showWorlds();
}

function showWorlds(){
print("showWorlds");
	for(var i = 0; i < hexWorlds.length; i++){
		var world = hexWorlds[i];
		var temp = gameObject.Find("NewGame");
		var newObject;
		newObject = Instantiate(temp, Vector3(-8 + (i * 8),5,2), Quaternion.identity);
		newObject.renderer.enabled = true;
		newObject.name = "BaseWorldName";
		newObject.GetComponent(TextMesh).text = world.worldname;
		for(var l = 0; l < world.levels.length; l++){
			var level = world.levels[l];
			var temp2 = gameObject.Find("BaseLevelName");
			var newObject2;
			newObject2 = Instantiate(temp2, Vector3(-8 + (i * 8),4 - (l * 1),2), Quaternion.identity);
			newObject2.renderer.enabled = true;
			newObject2.name = level.levelname;
			newObject2.GetComponent(TextMesh).text = level.levelname;
		}
	}
}

function showState(state){
	switch(state){
		case "PROFILE_SELECT" :
			break;
		case "MAIN_MENU" :
			gameObject.Find("NewGame").renderer.enabled = true;
			gameObject.Find("Continue").renderer.enabled = true;
			gameObject.Find("LevelSelect").renderer.enabled = true;
			gameObject.Find("Quit").renderer.enabled = true;
			gameObject.Find("HeaderMain").renderer.enabled = true;
			break;
		case "LEVEL_SELECT" :
			gameObject.Find("MenuLeft").gameObject.transform.position.x = -14;
			gameObject.Find("MenuRight").gameObject.transform.position.x = 14;
			gameObject.Find("HeaderWorld").renderer.enabled = true;
			getWorlds();
			break;
	}
	
}

function startLevel(levelName){
	chosenLevel = levelName;
	var world = new WorldClass();
	world.worldname = "chosen";
	var level = new LevelClass();
	level.levelname = levelName;
	world.levels = new Array();
	world.levels.push(level);
	
	hexWorlds = new Array();
	hexWorlds.push(world);
}

function startWorld(worldName){
	var tempWorld = new WorldClass();
	for(var i = 0; i < hexWorlds.length; i++){
		var world = hexWorlds[i];
		if(worldName == world.worldname){
			tempWorld.worldname = worldName;
			tempWorld.levels = world.levels;
		}
	}
	hexWorlds = new Array();
	hexWorlds.push(tempWorld);
	print(tempWorld.levels[0].levelname);
	chosenLevel = tempWorld.levels[0].levelname;
}