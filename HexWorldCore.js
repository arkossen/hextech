
var test : boolean = false;
var hexWorld : Array = new Array();
//var hexWorlds : Array = new Array();
var close = 500;
var startWorld : WorldClass;
var currentWorld = 0;
var currentHexLevel= 0;
private var checkpointPosition;
private var spawnPoint;
private var levelInfoTime = 50;

function Awake(){
	loadTextures();
	if(MenuStateManager.chosenLevel.length != 0){
		loadWorld(MenuStateManager.chosenLevel);
		print("testScene:" + MenuStateManager.chosenLevel);
	}else{
		loadWorlds();
	}
}

function Update () {
	levelInfoTime -= Time.deltaTime;
	print(levelInfoTime);
	if(levelInfoTime <= 0)
		if(gameObject.Find("LevelInfo").transform.localPosition.y >= -5)
			gameObject.Find("LevelInfo").transform.localPosition.y -= 1 * Time.deltaTime;
}

function finish(){
	//closeWorld();
	//loadWorld();
	nextLevel();
}

function nextLevel(){
	if(MenuStateManager.hexWorlds[currentWorld].levels.length > currentHexLevel+1){
		currentHexLevel++;
	}else{
		currentHexLevel = 0;
		if(MenuStateManager.hexWorlds.length > currentWorld+1)
			currentWorld++;
		else{
			Application.LoadLevel("MainMenu");
			currentWorld = 0;
			print("NO MORE WORLDS");
		}
	}
		
	checkpointPosition = null;
	closeWorld();
	print("WORLDS :" + currentWorld +", "+ currentHexLevel);
	loadWorld(MenuStateManager.hexWorlds[currentWorld].levels[currentHexLevel].levelname);
}

function setCheckPoint(go, pos){
	spawnPoint = go;
	checkpointPosition = pos;
}

function getCheckPoint(){
	return checkpointPosition;
}

function resetPlayerToCheckpoint(){
	spawnPoint.transform.Find("SpawnProtect").transform.localPosition.y = 0.1;
	gameObject.Find("Player").transform.position.x = checkpointPosition.x;
	gameObject.Find("Player").transform.position.y = checkpointPosition.y + 20;
	gameObject.Find("Player").transform.position.z = checkpointPosition.z;
}

function loadTextures(){
	var www = WWW("file:///" + Application.dataPath +"/Worlds/textures.xml");
	//var www = WWW("http://arkossen.com/WTF_WorldEditor/1.2/textures.xml");
	yield www;
	
	parser = new XMLParser();
	var node = parser.Parse(www.text);
	var textures = node["textures"][0]["texture"];
	
	for(var i = 0; i < textures.length; i++){
		var hexTexture = new HexTexture();
		hexTexture.name = textures[i]["@name"];
		MenuStateManager.hexTextures.push(hexTexture);
	}
}

function loadWorlds(){
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
		MenuStateManager.hexWorlds.push(world);
	}
	
	loadWorld(MenuStateManager.hexWorlds[currentWorld].levels[currentHexLevel].levelname);
}

function loadWorld(world){
	test = true;
	var currentWorld;
	var www = WWW("file:///" + Application.dataPath +"/Worlds/" + world + ".xml");
	//var www = WWW("http://arkossen.com/WTF_WorldEditor/maps/" + world + ".xml");
	yield www;
	parser = new XMLParser();
	var node = parser.Parse(www.text);
	currentWorld = node["world"][0]["hex"];
	openWorld(currentWorld, world);
}

function closeWorld(){
	for(var i = 0; i < hexWorld.length; i++)
		Destroy(hexWorld[i]);
}

function openWorld(world, worldName){
	var spawn;
	var textures = new Array();
	textures.push("Texture-Side-1-Color");
	textures.push("Texture-Side-2-Spec");
	textures.push("Texture-Side-3-Color");
	textures.push("Texture-Side-4-Color");
	textures.push("Texture-Side-5-Color");
	
	gameObject.Find("LevelInfo").transform.localPosition.y = -2;
	gameObject.Find("LevelText").GetComponent("TextMesh").text = worldName;
	levelInfoTime = 50;

	for(hex in world){
		var temp : GameObject;
		var tempTopHexTexture;
		var tempSideHexTexture;
		if(hex["@hexTexture"]){
			switch(hex["@hexType"]){
					case "BaseHexagon":
						tempTopHexTexture = Resources.Load("HexagonTops/" + hex["@hexTexture"]);
						tempSideHexTexture = Resources.Load("HexagonSides/" + textures[Mathf.Floor(Random.value * 5)]);
					break;
					case "BaseSpawn":
						tempTopHexTexture = Resources.Load("HexagonTops/" + hex["@hexTexture"]);
						tempSideHexTexture = Resources.Load("HexagonSides/" + textures[Mathf.Floor(Random.value * 5)]);
					break;
					case "BaseFinish":
						tempTopHexTexture = Resources.Load("HexagonTops/" + hex["@hexTexture"]);
						tempSideHexTexture = Resources.Load("HexagonSides/" + textures[Mathf.Floor(Random.value * 5)]);
					break;
					case "BaseCheckpoint":
						tempTopHexTexture = Resources.Load("HexagonTops/" + hex["@hexTexture"]);
						tempSideHexTexture = Resources.Load("HexagonSides/" + textures[Mathf.Floor(Random.value * 5)]);
					break;
					case "BaseSafeZone":
						tempTopHexTexture = Resources.Load("HexagonTops/" + hex["@hexTexture"]);
						tempSideHexTexture = Resources.Load("HexagonSides/" + textures[Mathf.Floor(Random.value * 5)]);
					break;
					case "BaseUnmoveable":
						tempTopHexTexture = Resources.Load("HexagonSides/Texture-Side-Unmoveable-Color");
						tempSideHexTexture = Resources.Load("HexagonSides/Texture-Side-Unmoveable-Color");
					break;
					default:
					
					break;
			}
		}
		if(hex["@hexType"] == "BaseTurret")
			switch(hex["@turretType"]){
				case "Aiming":
				temp = gameObject.Find("BaseAimTurret");
				break;
				case "Straight Line":
				temp = gameObject.Find(hex["@hexType"]);
				break;
				case "Shockwave":
				temp = gameObject.Find("BaseShockwaveTurret");
				break;
				case "Hiding":
				temp = gameObject.Find("BaseHidingTurret");
				break;
				default :
				temp = gameObject.Find(hex["@hexType"]);
				break;
			}
		else
			temp = gameObject.Find(hex["@hexType"]);
		
		var newObject;
		if(parseInt(hex["@y"]) % 2 == 0){
			newObject = Instantiate(temp, Vector3(520 + (parseInt(hex["@x"]) * 17.1) ,-11 + ( 3 * (parseInt(hex["@z"]))), 540 - (parseInt(hex["@y"])*4.95)  ), Quaternion.identity);
		}else{
			newObject = Instantiate(temp, Vector3(520 + (parseInt(hex["@x"]) * 17.1) + (8.65),-11 + ( 3 * (parseInt(hex["@z"]))), 540 - (parseInt(hex["@y"])*4.95)), Quaternion.identity);
		}
		if(newObject.GetComponent(HexagonObject)){
			newObject.GetComponent(HexagonObject).loc = Vector3(parseInt(hex["@x"]) , parseInt(hex["@z"]) , parseInt(hex["@y"]));
			newObject.GetComponent(HexagonObject).hexDirection = parseInt(hex["@direction"]);
			newObject.GetComponent(HexagonObject).hexRange = parseInt(hex["@range"]);
			newObject.GetComponent(HexagonObject).hexType = hex["@hexType"];
			//Changes textures to the right one(TEST)
			if(hex["@hexTexture"])
				if(hex["@hexTexture"] != "")
					if(hex["@turretType"] != "Hiding"){
						newObject.GetComponent(MeshRenderer).materials[1].mainTexture = tempTopHexTexture;
						newObject.GetComponent(MeshRenderer).materials[0].mainTexture = tempSideHexTexture;
					}else{
						
					}
			//newObject.GetComponent(MeshRenderer).materials[0].mainTexture = Resources.Load("hexagonside1");
		}
		if(newObject.GetComponent(TurretObject)){
			newObject.GetComponent(TurretObject).activated = true;
			newObject.GetComponent(TurretObject).loc = Vector3(parseInt(hex["@x"]) , parseInt(hex["@z"]) , parseInt(hex["@y"]));
			newObject.GetComponent(TurretObject).hexDirection = parseInt(hex["@direction"]);
			newObject.GetComponent(TurretObject).hexRange = parseInt(hex["@range"]);
			newObject.GetComponent(TurretObject).hexType = hex["@hexType"];
			newObject.GetComponent(TurretObject).turretType = hex["@turretType"];
			if(newObject.transform.Find("Turret"))
				newObject.transform.Find("Turret").transform.rotation = Quaternion.Euler(0,(parseInt(hex["@direction"]) * 60) + -90,0);
			
			//if(newObject.transform.Find("Turret").transform.Find("ShootPos").transform.Find("Laser")){
			//	newObject.transform.Find("Turret").transform.Find("ShootPos").transform.Find("Laser").transform.localScale = Vector3(parseInt(hex["@range"]) * 9, 1, 1);
				//newObject.transform.Find("Turret").transform.Find("ShootPos").transform.Find("Laser").transform.position.z =  ((parseInt(hex["@range"]) * 9) / 2);
			//}
			if(newObject.transform.Find("AimRange"))
				if(hex["@turretType"] == "Shockwave")
					newObject.transform.Find("AimRange").GetComponent("SphereCollider").radius = ((parseInt(hex["@range"])) * 9);
				else
					newObject.transform.Find("AimRange").GetComponent("SphereCollider").radius = ((parseInt(hex["@range"]) * 2) * 9);
				
			
			//newObject.transform.Find("Turret").transform.Find("ShootPos").GetComponent("BoxCollider").size = Vector3(1, 1, -(parseInt(hex["@range"]) * 9));
			//newObject.transform.Find("Turret").transform.Find("ShootPos").GetComponent("BoxCollider").center = Vector3(0, 0, (parseInt(hex["@range"]) * 9) / 2);
		}
		if(hex["@hexType"] == "BaseSpawn")
			spawn = newObject;
		hexWorld.push(newObject);
	}
	if(spawn){
		gameObject.Find("Player").transform.position.x = spawn.transform.position.x;
		gameObject.Find("Player").transform.position.y = spawn.transform.position.y + 20;
		gameObject.Find("Player").transform.position.z = spawn.transform.position.z;
		setCheckPoint(spawn, spawn.transform.position);
	}
	gameObject.Find("arrow").GetComponent(ArrowPointer).setCheckpoints();
	//gameObject.Find("Player").transform.Find("arrow").gameObject.GetComponent(ArrowPointer).setCheckPoints();
}