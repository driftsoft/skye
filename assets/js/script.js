const remote = require('electron').remote;

$("section#windowBtns .minimize").on("click",function(){
	var window = remote.getCurrentWindow();
	window.minimize();	
});

$("section#windowBtns .maximize").on("click",function(){
	var window = remote.getCurrentWindow();
	if (!window.isMaximized()){
		window.maximize();
	}else{
		window.unmaximize();
	}
});

$("section#windowBtns .close").on("click",function(){
	var window = remote.getCurrentWindow();
	window.close();
});