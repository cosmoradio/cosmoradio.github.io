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
      let data = JSON.parse(text);        // name: 'qwerty', link: 'https://telegra.ph/Zapusk-cosmoPlayera-12-19', preview: 'jpg', hashtag: 'tttt'}
      let pan, name, image, link, preview, hash ;
      //let body = document.getElementsByTagName('body')[0];
      console.log(document.getElementById("news_view"))
      document.getElementById("news_view").innerHTML = ''
      let count = data.length;
      for(i = 0; i<count; i++){
        //console.log(data[i])
        pan = document.createElement('div');
        //pan.setAttribute('id',showLinks.nameId);
        /* */
        data[i].username = 'telegram'
        data[i].message_id = 83

        pan.onclick = 'window.open('+data[i].link+");";
        pan.classList.add("showlinks")
        g = document.createElement('script')
        g.async = true
        g.setAttribute('src', "https://telegram.org/js/telegram-widget.js?21")
        g.setAttribute('data-telegram-post', "telegram/83")
        g.setAttribute('data-width', "100%")
        pan.append(g)
        //pan.innerHTML = '<script async src="https://telegram.org/js/telegram-widget.js?21" data-telegram-post="telegram/83" data-width="100%"></script>'
        /*
        //pan.href = data[i].link;
        name = document.createElement('a')
        name.textContent = data[i].name
        //name.href = data[i].link
        name.classList.add("name_lab", "alltext")
        pan.append(name)
        //console.log(data[i].name, data[i])
        if(data[i].preview){
          image = document.createElement('img')
          image.src = data[i].preview
          image.classList.add("img_lab")
          pan.append(image)
        }

        link = document.createElement('a')
        //link.href = data[i].link
        hash = document.createElement('div')
        hash.textContent = data[i].hashTag
        text = document.createElement('div')
        text.textContent = data[i].text
        text.classList.add("text_lab", "alltext")
        */

        //pan.append(link)
        //pan.append(hash)
        //pan.append(text)
        //console.log(pan)
        //showLinks.direction(showLinks.directionL)
        document.getElementById("news_view").append(pan)
      }
    });
  }

  showLinks.start = function(){
    console.log('load')
    showLinks.load_json()
    this.idInterval = setInterval(showLinks.load_json, 1000 * 6 * 10)
  }

  window.addEventListener("load", (event) => {
    showLinks.start()
  });

  return showLinks
})();
