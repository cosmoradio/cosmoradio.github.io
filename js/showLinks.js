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
  showLinks.offset = 10;

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

  showLinks.load_json = function(offset = 0){
    showLinks.readTextFile(showLinks.fileName, function(text){
      let data = JSON.parse(text);
      let count, i;
      count = (data.length < showLinks.offset)? data.length : (offset + showLinks.offset)// если меньше чем showLinks.offset, загрузи сколько есть
      if(offset ==  0){
        i = 0;
        document.getElementById("news_view").textContent = ''
      }else{
        i = offset;
      }
      for(i; i<count; i++){
        if(i>data.length){
          console.log(123213);
          break;
        }
        addNews(data[i].username, data[i].message_id, false);
      }
    });
  }

  function addNews(a,b,c=false){
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
    g.setAttribute('data-color', "#cc00ff")
    g.setAttribute('data-userpic', (getDevType() == 'desktop')? true : false)
    pan.append(g)
    if(c){ document.getElementById("news_view").prepend(pan) }
    else { document.getElementById("news_view").append(pan) }
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

  showLinks.download = function(){
    /// get count of elements
    /// load with ofset 
    let c = document.getElementsByClassName('showLinks').length 
    showLinks.load_json(c)
  }

  window.addEventListener("load", (event) => {
    showLinks.start()
    let x = document.getElementById("news_view")
    x.addEventListener("scroll", (e) => {
      let z = x.scrollHeight - Math.round(x.scrollTop) === x.clientHeight;
      console.log(z)
      if(x.scrollHeight - Math.round(x.scrollTop) === x.clientHeight) {
        let y = document.getElementsByClassName('showLinks').length
        console.log(y);
        showLinks.download(y);
      }

    });
  });



  return showLinks
})();
