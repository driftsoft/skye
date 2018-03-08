const remote = require('electron').remote;

if(remote.getCurrentWindow().isMaximized()){
	$("section#windowBtns .maximize").addClass("maximized");
}

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

remote.getCurrentWindow().on('maximize', function() {
	$("section#windowBtns .maximize").addClass("maximized");
});
remote.getCurrentWindow().on('unmaximize', function() {
	$("section#windowBtns .maximize").removeClass("maximized");
});