;var gamepage = ( function(){
  'use strict'
  function gamepage(){
    if (gamepage.instance_) {
      return gamepage.instance_;
    }
    return this;
  }
  gamepage.instance_ = this;

  gamepage.gamelist = ['burjuy']
  gamepage.configList = {"burjuy" : {"fullscreen" : true}}
  gamepage.path = "games/"
  gamepage.idPanGamePage = "game_view"
  gamepage.panGamePage = document.getElementById(gamepage.idPanGamePage)
  gamepage.style = `
    body{
      font-family: "lato", sans-serif;
      font-weight: bold;
    }
    #game_view .gameLable{
      text-align : center;
      color : #fd0272;
      font-family: "lato", sans-serif;
      font-weight: bold;
    }
    .nameGame{
      text-align : center;
    }
  `;

  gamepage.loadGame = function(i){
    let p = document.getElementById(gamepage.idPanGamePage)
    p.textContent = '';
    let q = document.createElement('iframe')
    if(gamepage.configList[i].fullscreen == true){
      p.style.margin = 0;
      p.style.width = "100%";
      p.style.overflow = 'hidden';
    }
    q.setAttribute('src', gamepage.path+i+'/'+'index.html')
    q.style.width = '100%';
    q.style.height = '100%';
    q.style.border = '0';
    q.style.overflow = "none"
    p.append(q)
  }

  gamepage.loadGameList = function(){
    let p = document.getElementById(gamepage.idPanGamePage)
    p.textContent = '';
    let d = document.createElement("h2")
    d.textContent = "ИГРЫ"
    d.classList.add("gameLable")
    p.append(d)
    for (let i in gamepage.gamelist){
      let d = document.createElement("div");
      d.style.display = "block"
      d.style.color = '#fd0272';
      d.style.fontFamily = "lato, bold, sans-serif";
      d.classList.add("nameGame")

      d.textContent = gamepage.gamelist[i]
      d.onclick = function(){
        gamepage.loadGame(gamepage.gamelist[i])
      }
      p.append(d)
    }

  }

  window.addEventListener("load", function(){
    gamepage.loadGameList();
    document.getElementById("button_games").addEventListener("click", function(){
      gamepage.loadGameList();
    });
    let el = document.createElement("style");
    el.setAttribute("rel", "stylesheet");
    el.setAttribute("type", "text/css");
    el.textContent = gamepage.style
    document.getElementsByTagName("head")[0].appendChild(el);
  });



  return gamepage;
})();
