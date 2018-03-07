document.getElementById("webview").setAttribute("src","http://google.com");

function searchSubmit(){
	var requestedURL = document.getElementById("searchEntry").value;

	if(requestedURL.indexOf(" ")==-1 && requestedURL.indexOf(".")!=-1){
		requestedURL = "http://" + requestedURL;
		document.getElementById("webview").setAttribute("src",requestedURL);
	}else{
		document.getElementById("webview").setAttribute("src","http://www.google.com/search?q=" + requestedURL);
	}
}
document.getElementById("searchEntry").onkeyup=function(e){
	if(e.keyCode == 13){
		searchSubmit();
		updateURL();
	}
}
document.getElementById("searchEntry").onfocus=function(){
	this.select();
}