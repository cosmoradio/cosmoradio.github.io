var showLinks = ( function(){
  function showLinks(){
    alert("12")
    if (showLinks.instance_) {
    return showLinks.instance_;
    }
  }
  showLinks.instance_ = this;

  showLinks.fileName = '../json/links.json';
  showLinks.nameId = 'links';
  showLinks.idInterval = '';

  showLinks.readTextFile = function (file, callback) {
    let rawFile = new XMLHttpRequest();
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
      let data = JSON.parse(text);
      let pan, name, image, link, preview, hash ;
      let body = document.getElementsByTagName('body')[0]
      let count = data.length
      for(i = 0; i<=count; i++){
        console.log(data[i])
        pan = document.createElement('div');
        pan.setAttribute('id',showLinks.nameId);
        name = document.createElement('div')
        image = document.createElement('div')
        link = document.createElement('div')
        hash = document.createElement('div')
        pan.append(name)
        pan.append(image)
        pan.append(link)
        pan.append(hash)
        document.getElementById("news_view").append(pan)
      }
    });
  }

  showLinks.start = function(){
    this.idInterval = setInterval(showLinks.load_json, 1000)
  }

  showLinks.displayed = function(param){

  }

  showLinks.Hide = function(){

  }

  return showLinks
}).call(this);
