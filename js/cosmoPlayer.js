;var cosmoPlayer = ( function(){
  'use strict'
  function cosmoPlayer(){
    if (cosmoPlayer.instance_) {
      return cosmoPlayer.instance_;
    }
  }
  cosmoPlayer.instance_ = this;

  cosmoPlayer.idButPlayer = 'buttPlayer'
  cosmoPlayer.idYTBPlayer = 'yt_player'
  cosmoPlayer.styleDisplay = "none"
  cosmoPlayer.fileStream = './json/stream.json'
  cosmoPlayer.srcLinkStr = ''

  /*    event onload     */
  window.addEventListener("load", function(event) {
    try {
      cosmoPlayer.addElement();
      document.getElementById(cosmoPlayer.idButPlayer).onclick = function(){
        let name = document.getElementById(cosmoPlayer.idButPlayer).src
        if(!name.includes('img/1play.png') )  {
          document.getElementById('buttPlayer').src = 'img/1play.png'
          cosmoPlayer.controlPlayer("play");
        }else{
          document.getElementById('buttPlayer').src = 'img/1pause.png'  ;
          cosmoPlayer.controlPlayer("pause");
        }
      };
    }
    catch (e) {   }
  });

  cosmoPlayer.addElement = function(){
    let bodyr = document.getElementsByTagName('body')[0]
    let ifr = document.createElement('iframe')
    ifr.setAttribute('id',cosmoPlayer.idYTBPlayer)
    cosmoPlayer.readTextFile(cosmoPlayer.fileStream, function(text){
      ifr.src = text;
    });
    ifr.setAttribute('allow',"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture")
    ifr.style.display = 'none'
    bodyr.append(ifr)
  }

  cosmoPlayer.readTextFile = function (file, callback) {
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


  cosmoPlayer.controlPlayer = function(func, param="" ){
    let frameOb = document.getElementById(cosmoPlayer.idYTBPlayer);
    let funct = ""
    /*
        youtube api

    https://developers.google.com/youtube/iframe_api_reference?hl=ru#Functions
    */
    if ( func == "play" )funct = "playVideo"
    if ( func == "pause")funct = "pauseVideo"
    if ( func == "stop" )funct = "stopVideo"
    if ( func == "mute" )funct = "mute"
    if ( func == "unMute" )funct = "isMuted"
    if ( func == "setVolume" )funct = "setVolume"
    if ( func == "getCurrentTime" )funct = "getCurrentTime"
    if ( func == "getDuration" )funct = "getDuration"
    if ( func == "getVideoUrl" )funct = "getVideoUrl"
    if ( func == "getIframe" )funct = "getIframe"
    if ( func == "destroy" )funct = "destroy"



    console.log(
      frameOb.contentWindow.postMessage('{"event":"command","func":"' + funct + '","args":"' + param + '"}', '*')
      );
  }

  cosmoPlayer.parseResponse = function( resp ){
    if(resp.indexOf('reload') != -1){
      //reload page

    }
    if(resp.indexOf('source') != -1){
      //source of stream

    }

    if(resp.indexOf('show_player') != -1){
      //display on
    }
    return true
  }

  cosmoPlayer.prepareLink = function( ident ){
    let linker = "https://www.youtube.com/embed/"+ ident +"?controls=0&enablejsapi=1"
    document.getElementById(cosmoPlayer.idYTBPlayer).src = linker;
  }


  return cosmoPlayer;
}).call(this);
