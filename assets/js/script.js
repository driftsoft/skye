const remote = require('electron').remote;

const {clipboard} = require('electron')

var isMac = false;

if (process.platform == 'darwin') {
  isMac = true;
}

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

remote.getCurrentWindow().on('enter-full-screen', function() {
	$("#tabs").removeAttr("style");
});
remote.getCurrentWindow().on('leave-full-screen', function() {
	$("#tabs").attr("style","padding-left:12.5vh;");
});

Mousetrap.prototype.stopCallback = function(){
	return false;
}

Mousetrap.bind(['ctrl+a', 'command+a'],function(e){
	if($("#topbar input.activeInput").is(":focus")){
		$("#topbar input.activeInput")[0].select();
	}else{
		$("#web webview.activeWeb")[0].selectAll();
	}
	return false;
});
Mousetrap.bind(['ctrl+c', 'command+c'],function(e){
	if($("#topbar input.activeInput").is(":focus")){
		clipboard.writeText(window.getSelection().toString());
	}else{
		$("#web webview.activeWeb")[0].copy();
	}
	return false;
});
Mousetrap.bind(['ctrl+v', 'command+v'],function(e){
	if($("#topbar input.activeInput").is(":focus")){
		if(window.getSelection().toString().length){
			var selectStart = $("#topbar input.activeInput:focus")[0].selectionStart;
			var selectEnd = $("#topbar input.activeInput:focus")[0].selectionEnd;
			var textAreaTxt = $("#topbar input.activeInput:focus")[0].value;
			$("#topbar input.activeInput:focus")[0].value = textAreaTxt.substring(0, selectStart) + clipboard.readText() + textAreaTxt.substring(selectEnd);
		}else{
			var caretPos = $("#topbar input.activeInput:focus")[0].selectionStart;
		var textAreaTxt = $("#topbar input.activeInput:focus")[0].value;
		$("#topbar input.activeInput:focus")[0].value = textAreaTxt.substring(0, caretPos) + clipboard.readText() + textAreaTxt.substring(caretPos);
		}
	}else{
		$("#web webview.activeWeb")[0].paste();
	}
	return false;
});

Mousetrap.bind(['ctrl+shift+v', 'command+shift+v'],function(e){
	if(!$("#topbar input.activeInput").is(":focus")){
		$("#web webview.activeWeb")[0].pasteAndMatchStyle();
	}
	return false;
});
Mousetrap.bind(['ctrl+z', 'command+z'],function(e){
	if(!$("#topbar input.activeInput").is(":focus")){
		$("#web webview.activeWeb")[0].undo();
	}
	return false;
});
Mousetrap.bind(['ctrl+p', 'command+p'],function(e){
	if(!$("#topbar input.activeInput").is(":focus")){
		$("#web webview.activeWeb")[0].print();
	}
	return false;
});
Mousetrap.bind(['ctrl+shift+z', 'command+shift+z'],function(e){
	if(!$("#topbar input.activeInput").is(":focus")){
		$("#web webview.activeWeb")[0].redo();
	}
	return false;
});
Mousetrap.bind(['ctrl+r', 'command+r'],function(e){
	if(!$("#topbar input.activeInput").is(":focus")){
		$("#web webview.activeWeb")[0].reload();
	}
	return false;
});

Mousetrap.bind(['ctrl+w', 'command+w'],function(e){
	removeTab($("#tabs div").index($("#tabs div.activeTab"))
		);
	return false;
});