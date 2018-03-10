var allTabs = ["https://google.com"];

$(function(){
	//updateTabs();
	updateRemoveTabEvent();
});

function addTab(url){
	allTabs.push(url);
	$("#tabs div.activeTab").removeClass("activeTab");
	$("<div class='activeTab'><h1>google.com</h1><span></span>").insertAfter($("#tabs div:eq(" + (allTabs.length-2) +")"))

	updateRemoveTabEvent();
}
function removeTab(index){
	allTabs.splice(index,1);
	$("#tabs div:eq(" + index +")").remove();
	$("#web webview:eq(" + index +")").remove();

	if(allTabs.length==0){
		remote.getCurrentWindow().close();
	}
	if($("#tabs div.activeTab").length == 0){
		if(index == 0){
			$("#tabs div:eq(" + (index) + ")").addClass("activeTab");
		}else{
			$("#tabs div:eq(" + (index-1) + ")").addClass("activeTab");
		}
	}
}
function updateRemoveTabEvent(){
	$('#tabs div span').off('click');
	$("#tabs div span").on("click",function(){
		var index = $("#tabs div").index($(this).parent());
		removeTab(index);
	});
}

$("#tabs button.addTab").on("click",function(){
	addTab("https://google.com");
});