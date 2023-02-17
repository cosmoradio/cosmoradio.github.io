;var pinned = ( function(){
    'use strict'
    function pinned(){
      if (pinned.instance_) {
        return pinned.instance_;
      }
    }
    pinned.instance_ = this;
    pinned.idButton = 'button_pinned'
    pinned.idPanel = 'pinned_view'
  
    pinned.listNewbi = {'КУЛЬТПРОСВЕТ' : "https://www.youtube.com/@Kultprosvet1917",
                        "REDNESS" : "https://www.youtube.com/@redness4879",
                        "тов. Marcus Flavius Mangustus" : "https://marcus-mangust.livejournal.com/"
                      }
  
    pinned.listContact = {'RADIOCOSMOPOLIT(telegram)' : "https://t.me/radiocosmopolit",
                          "ADMIN(telegram)" : "https://t.me/m0th3rH4ck3r",
                         }
  
    window.addEventListener('load', function(){
      pinned.onloaded()
    })
  
    pinned.onloaded = function(){
      let x = document.getElementById(pinned.idPanel);
      let z = document.createElement('div');
      z.style.textAlign = "center"
      z.innerHTML = "<h3>Дорогу МОЛОДЫМ:</h3>"
      let a,p;
      for ( let key in pinned.listNewbi)
      {
        a = document.createElement('a')
        //a.style.color = "white"
        a.innerHTML = key
        a.style.color = "transparent";    
        a.style.webkitBackgroundClip = "text";
        a.style.backgroundClip="text";
        a.style.backgroundImage="linear-gradient(90deg, red, orange, fuchsia)";
        a.onclick = function(){
          window.open(pinned.listNewbi[key], '_blank').focus()
        }
        p = document.createElement('p')
        p.append(a)
        z.append(p)
      }
      let our = document.createElement("h3")
      our.innerHTML = "LINKS TO OUR RESOURCES :"
      z.append(our)
  
      for ( let key in pinned.listContact)
      {
        a = document.createElement('a')
        //a.style.color = "white"
        a.innerHTML = key
        //a.href = pinned.listNewbi[key]
        a.onclick = function(){
          window.open(pinned.listContact[key], '_blank').focus()
        }
        p = document.createElement('p')
        p.append(a)
        z.append(p)
      }
      //z.innerHTML = "qwe";
      x.style.color = "white"
      x.style.fontFamily= '"lato", sans-serif';
      x.append(z)
    }
  
    return pinned;
  })();
  