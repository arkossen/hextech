var buttonUpTexture:Texture2D;
var buttonDownTexture:Texture2D;

function changeMaterial(event){
	if(event == "up"){
		renderer.material.mainTexture = buttonUpTexture;
	}
	if(event == "down"){
		renderer.material.mainTexture = buttonDownTexture;
	}
}