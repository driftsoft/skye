const remote = require('electron').remote;

$("#tabs section .minimize").on("click",function(){
	var window = remote.getCurrentWindow();
	window.minimize();	
});

$("#tabs section .maximize").on("click",function(){
	var window = remote.getCurrentWindow();
	if (!window.isMaximized()){
		window.maximize();
	}else{
		window.unmaximize();
	}
});

$("#tabs section .close").on("click",function(){
	var window = remote.getCurrentWindow();
	window.close();
});