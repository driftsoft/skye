const remote = require('electron').remote;

$("#tabs section .minimize").on("click",function(){
	var window = remote.getCurrentWindow();
	window.minimize();	
});

$("#tabs section .minimize").on("click",function(){
	alert("bruh");
	var window = remote.getCurrentWindow();
	if (!window.isMaximized()) {
		window.maximize();
	} else {
		window.unmaximize();
	}
});

$("#tabs section .close").on("click",function(){
	var window = remote.getCurrentWindow();
	window.close();
});

document.getElementById("searchEntry").onfocus=function(){
	this.select();
}