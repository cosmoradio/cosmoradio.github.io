function getDevType(){
	var device;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		device = 'mobile';
	}else{
		device = 'desktop'
	}
	return device;
}

window.onload = function() {
	loadPage();
	loadStyle('./css/'+'style'+'.css');
	loadStyle('./css/'+getDevType()+'.css', 'visor');
	loadBackground("stars");
	loadStyle('./css/'+getDevType()+'.css', 'visor');
}

window.addEventListener('resize', function(event){
	// do stuff here
	//<link rel="stylesheet" type="text/css" href="./css/desktop.css">
	loadStyle('./css/'+getDevType()+'.css', 'visor');
});

function loadPage(){
	let doc = document.getElementsByTagName('body')[0];
	let frm = document.createElement('iframe');
	frm.setAttribute('id','visor');
	frm.src = getDevType()+'.html'
	doc.append(frm)
}

function loadStyle(name, toFrame = null){
	var element = document.createElement("link");
	element.setAttribute("rel", "stylesheet");
	element.setAttribute("type", "text/css");
	element.setAttribute("href", name);
	if(!toFrame){
		document.getElementsByTagName("head")[0].appendChild(element);
	}else{
		let iframeName = document.getElementById(toFrame);
		let iframeContent = iframeName.contentDocument;
		console.log(iframeContent,iframeName,toFrame)
		console.log(iframeContent.getElementsByTagName("head")[0].appendChild(element));
	}

}

function loadBackground(name){
	if(name == 'stars'){
		let doc = document.getElementsByTagName('body')[0];

		let wrp = document.createElement('div');
		/*wrp.setAttribute('id','wrap');*/
		wrp.classList.add("wrap");

	  let div = document.createElement('div');
		div.setAttribute('id','stars');
		wrp.append(div)

	  let div2 = document.createElement('div');
		div2.setAttribute('id','stars2');
		wrp.append(div2)

	  let div3 = document.createElement('div');
		div3.setAttribute('id','stars3');
		wrp.append(div3)

		doc.append(wrp);

		loadStyle('./css/stars.css');
	}
}


//<iframe id="yt_player" width="560" height="315" src="https://www.youtube.com/embed/WTXDOn-Ph0M?controls=0&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
