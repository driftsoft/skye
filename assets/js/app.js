var allTabs = ["https://google.com"];

$(function(){
	updateDragWidth();
	updateEvents();
});

function addTab(url){
	allTabs.push(url);
	$("#tabs div.activeTab").removeClass("activeTab");
	$("<div class='activeTab'><h1>google.com</h1><span></span></div>").insertAfter($("#tabs div:eq(" + (allTabs.length-2) +")"));

	$("#web webview.activeWeb").removeClass("activeWeb");
	$("<webview class='activeWeb' src='http://google.com'></webview>").insertAfter($("#web webview:eq(" + (allTabs.length-2) +")"));

	$("#topbar input.activeInput").removeClass("activeInput");
	$('<input class="activeInput" type="text" placeholder="Type URL or Search Google...">').insertAfter($("#topbar input:eq(" + (allTabs.length-2) +")"));

	updateEvents();
	updateDragWidth();
}
function removeTab(index){
	allTabs.splice(index,1);
	$("#tabs div:eq(" + index +")").remove();
	$("#web webview:eq(" + index +")").remove();
	$("#topbar input:eq(" + index + ")").remove();

	if(allTabs.length==0){
		remote.getCurrentWindow().close();
	}
	if($("#tabs div.activeTab").length == 0){
		if(index == 0){
			$("#web webview:eq(" + (index) + ")").addClass("activeWeb");
			$("#tabs div:eq(" + (index) + ")").addClass("activeTab");
			$("#topbar input:eq(" + (index) + ")").addClass("activeInput");
		}else{
			$("#web webview:eq(" + (index-1) + ")").addClass("activeWeb");
			$("#tabs div:eq(" + (index-1) + ")").addClass("activeTab");
			$("#topbar input:eq(" + (index-1) + ")").addClass("activeInput");
		}
	}

	updateDragWidth();
}
function updateEvents(){
	$('#tabs div span').off('click');
	$("#tabs div span").on("click",function(){
		var index = $("#tabs div").index($(this).parent());
		removeTab(index);
	});

	$("#tabs div").off("click");
	$("#tabs div").on("click",function(e){
		$("#tabs div.activeTab").removeClass("activeTab");
		$(this).addClass("activeTab");

		var index = $("#tabs div").index($(this));

		$("#web webview.activeWeb").removeClass("activeWeb");
		$("#web webview:eq(" + index + ")").addClass("activeWeb");

		$("#topbar input.activeInput").removeClass("activeInput");
		$("#topbar input:eq(" + index + ")").addClass("activeInput");
	});

	$("#topbar input").off("keydown");
	$("#topbar input").on("keydown",function(e){
		if(e.keyCode == 13){
			var url = $(this).val();

			if(url.indexOf(" ") != -1 || url.indexOf(".") == -1){
				url = "http://google.com/search?q=" + url;
			}
			if(!url.startsWith("http://") && !url.startsWith("file://") && !url.startsWith("https://")){
				url = "http://" + url;	
			}

			var index = $("#tabs div").index($("#tabs div.activeTab"));

			$("#web webview:eq(" + index + ")")[0].loadURL(url);

			$(this).blur();
		}
	});

	$("#web webview").off("did-stop-loading");
	$("#web webview").on("did-stop-loading",function(){
		var index = $("#web webview").index($(this));
		if(!$("#topbar input:eq(" + index + ")").is(":focus")){
			$("#topbar input:eq(" + index + ")").val($(this).attr("src"));
		}
		var fakeA = document.createElement("a");
		fakeA.href = $(this).attr("src");
		fakeA = fakeA.hostname;
		if(fakeA.startsWith("www.")){
			fakeA = fakeA.replace("www.","");
		}
		$("#tabs div h1:eq(" + index + ")").text(fakeA);
		updateDragWidth();
	});

	$("#topbar input").off("focus");
	$("#topbar input").on("focus",function(){
		$(this)[0].select();
	});
}

function updateDragWidth(){
	$("#dragArea").css("width","calc(100vw - 22.5vh - " + $("#tabs").outerWidth() + "px)");
}

$("#tabs button.addTab").on("click",function(){
	addTab("https://google.com");
});

$(document).on("resize",function(e){
	updateDragWidth();
});