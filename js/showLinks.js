var showLinks = ( function(){
  function showLinks(){

    if (showLinks.instance_) {
    return showLinks.instance_;
    }
  }
  showLinks.instance_ = this;

  showLinks.fileName = '../json/links.json';
  showLinks.nameId = 'links';
  showLinks.idInterval = '';

  showLinks.readTextFile = function (file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

  showLinks.load_json = function(){
    showLinks.readTextFile(showLinks.fileName, function(text){
      var data = JSON.parse(text);
      let body = document.getElementByTagName('body')[0]

      let count = data.length
      for(i = 0; i<=count; i++){
        
      }
      let pan = document.createElement(div)
      pan.setAttribute('id',showLinks.nameId);

      let pan = document.createElement(div)

    });
  }

  showLinks.start = function(){
    this.idInterval = setInterval(showLinks.load_json, 1000)
  }

  showLinks.displayed = function(param){

  }


  return showLinks
}).call(this);
