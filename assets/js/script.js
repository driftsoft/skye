const remote = require('electron').remote;

const {clipboard} = require('electron')

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

$("#topbar input").on("focus",function(){
	$(this)[0].select();
});

Mousetrap.prototype.stopCallback = function(){
	return false;
}

Mousetrap.bind(['ctrl+a', 'command+a'],function(e){
	if($("#topbar input:focus")){
		$("#topbar input")[0].select();
	}
	return false;
});
Mousetrap.bind(['ctrl+c', 'command+c'],function(e){
	clipboard.writeText(window.getSelection().toString());
	return false;
});
Mousetrap.bind(['ctrl+v', 'command+v'],function(e){
	if($("#topbar input:focus")){
		if(window.getSelection().toString().length){
			var selectStart = $("#topbar input:focus")[0].selectionStart;
			var selectEnd = $("#topbar input:focus")[0].selectionEnd;
			var textAreaTxt = $("#topbar input:focus")[0].value;
			$("#topbar input:focus")[0].value = textAreaTxt.substring(0, selectStart) + clipboard.readText() + textAreaTxt.substring(selectEnd);
		}else{
			var caretPos = $("#topbar input:focus")[0].selectionStart;
		var textAreaTxt = $("#topbar input:focus")[0].value;
		$("#topbar input:focus")[0].value = textAreaTxt.substring(0, caretPos) + clipboard.readText() + textAreaTxt.substring(caretPos);
		}
	}
	return false;
});