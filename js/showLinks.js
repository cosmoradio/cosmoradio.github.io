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
  showLinks.checkStr = '';                        //func 4 saving las 50 symbols and check it with new input message
  //showLinks.Status = true;
  showLinks.direction = ['append', 'prepend'];
  showLinks.directionL = 0

  showLinks.readTextFile = function (file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }else{
          console.error("showLinks=>"+"cant load data from server!")
          //showLinks.Status = false
        }
    }
    rawFile.send(null);
  }

  showLinks.load_json = function(){
    showLinks.readTextFile(showLinks.fileName, function(text){
      let data = JSON.parse(text);
      let pan, name, image, link, preview, hash ;
      let body = document.getElementsByTagName('body')[0];
      let count = data.length;
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
        //showLinks.direction(showLinks.directionL)
        document.getElementById("news_view").append(pan)
      }
    });
  }

  showLinks.start = function(){
    this.idInterval = setInterval(showLinks.load_json, 1000 * 60 * 10)
  }

  showLinks.displayed = function(param){

  }

  showLinks.Hide = function(){

  }
  
  window.addEventListener("load", (event) => {
    showLinks.start()
  });

  //document.getElementById('button_news')


  return showLinks
}).call(this);
