var showLinks = ( function(){
  function showLinks(){
    if (showLinks.instance_) {
    return showLinks.instance_;
    }
  }
  showLinks.instance_ = this;

  showLinks.fileName = '../json/links.json';
  showLinks.nameId = 'showlinks';
  showLinks.idInterval = '';
  showLinks.checkStr = '';                        //func 4 saving las 50 symbols and check it with new input message
  //showLinks.Status = true;
  showLinks.direction = ['append', 'prepend'];
  showLinks.directionL = 0
  showLinks.Memory = null;

  showLinks.readTextFile = function (file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }else{
          //console.log(rawFile.readyState, rawFile.status)
          //console.error("showLinks=>"+"cant load data from server!")
          //showLinks.Status = false
        }
    }
    rawFile.send(null);
  }

  showLinks.load_json = function(){
    showLinks.readTextFile(showLinks.fileName, function(text){
      let data = JSON.parse(text);        
      let pan;
      document.getElementById("news_view").textContent = ''
      let count = data.length;
      console.log(count)
      for(i = 0; i<count; i++){
        pan = document.createElement('div');
        pan.onclick = 'window.open('+data[i].link+");";
        pan.classList.add("showlinks")
        pan.setAttribute("data-newsid", data[i].username+"/"+data[i].message_id)
        g = document.createElement('script')
        g.async = true
        //g.setAttribute('src', "https://telegram.org/js/telegram-widget.js?21")
        g.setAttribute('src', "telegramWidget.js")
        g.setAttribute('data-telegram-post', data[i].username+"/"+data[i].message_id)
        g.setAttribute('data-width', "100%")
        g.setAttribute('data-dark', "1")
        g.setAttribute('data-userpic', (getDevType() == 'desktop')? true : false)
        pan.append(g)
        document.getElementById("news_view").append(pan)
      }
    });
  }

  function addNews(a,b){
    let g;
    let pan = document.createElement('div');
    //pan.onclick = 'window.open('+data[i].link+");";
    pan.classList.add("showlinks")
    g = document.createElement('script')
    g.async = true
    pan.setAttribute("data-newsid", a+"/"+b)
    g.setAttribute('src', "https://telegram.org/js/telegram-widget.js?21")
    g.setAttribute('data-telegram-post', a+"/"+b)
    g.setAttribute('data-width', "100%")
    g.setAttribute('data-dark', "1")
    g.setAttribute('data-userpic', (getDevType() == 'desktop')? true : false)
    pan.append(g)
    document.getElementById("news_view").prepend(pan)
  }

  showLinks.update = function(){
    
    showLinks.readTextFile(showLinks.fileName, function(text){
      let data = JSON.parse(text); 
      let n = document.getElementsByClassName('showlinks')
      if((data[0].username+"/"+data[0].message_id) != (n[0]).getAttribute("data-newsid") ){
        console.log(data[0].username+"/"+data[0].message_id,(n[0]).getAttribute("data-newsid"));
        addNews(data[0].username,data[0].message_id)
      }
    });
  }

  function getDevType(){
    var device;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      device = 'mobile';
    }else{
      device = 'desktop'
    }
    return device;
  }

  showLinks.start = function(){
    console.log('load')
    showLinks.load_json()
    this.idInterval = setInterval(showLinks.update, 1000 * 6 * 1)
  }

  window.addEventListener("load", (event) => {
    showLinks.start()
  });

  return showLinks
})();
