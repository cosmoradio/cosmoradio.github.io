;var cosmoPlayer = ( function(){
    'use strict'
    /*
CHANGE TIME REQUEST!
    */
    function cosmoPlayer(){
      if (cosmoPlayer.instance_) {
        return cosmoPlayer.instance_;
      }
    }
    cosmoPlayer.instance_ = this;
  
    cosmoPlayer.idButPlayer = 'buttPlayer'
    cosmoPlayer.idYTBPlayer = 'yt_player'
    cosmoPlayer.idSongLabel = document.getElementById('songname')
    cosmoPlayer.idArtistLabel = document.getElementById("artist")
    cosmoPlayer.styleDisplay = "none"
    cosmoPlayer.fileStream = './json/stream.json'
    cosmoPlayer.stream = {};// тут обьект с файла  cosmoPlayer.fileStream
    cosmoPlayer.ytplayer = null;// обьект плеера
    cosmoPlayer.requestInterval = 5;// in seccond
    cosmoPlayer.idSetinterval = null;
    cosmoPlayer.playlist = {list: null,current:0};
  
    /*    event onload     */
  
    window.addEventListener("load", function(event) {
      //cosmoPlayer.onLoad()
    });
  
    document.addEventListener("DOMContentLoaded", function(){
      //include YT API
      let tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      cosmoPlayer.onLoad()
    });
  
  
    cosmoPlayer.onLoad = function(){
      cosmoPlayer.loadStream()
      cosmoPlayer.idSetinterval = setInterval(()=>{
        cosmoPlayer.loadStream();
      }, cosmoPlayer.requestInterval*1000);
  
      cosmoPlayer.centrizer();
      cosmoPlayer.addElement();
      cosmoPlayer.setUrlClick();
  
     document.getElementById(cosmoPlayer.idButPlayer).onclick = function(){
       if(document.getElementById(cosmoPlayer.idButPlayer).classList.contains("paused")){
         document.getElementById(cosmoPlayer.idButPlayer).classList.remove("paused")
         // тут надо проверить смену текущей программы
         cosmoPlayer.ytplayer.playVideo();
       }else{
         document.getElementById(cosmoPlayer.idButPlayer).classList.add("paused")
         cosmoPlayer.ytplayer.pauseVideo();
       }
     }
   }
  
   cosmoPlayer.loadStream = function(){
     cosmoPlayer.readTextFile(cosmoPlayer.fileStream, function(text){
       try{
          let t = JSON.parse(text)
          if(cosmoPlayer.stream?.radio?.lastupdate != t.radio.lastupdate){
            cosmoPlayer.stream = t;
            cosmoPlayer.playlist.list = cosmoPlayer.stream.radio.playlist
  
            //if(cosmoPlayer.stream.radio.movement != null ){//<------
            //cosmoPlayer.ytplayer.loadVideoById(cosmoPlayer.playlist.list[cosmoPlayer.playlist.current])
            if(cosmoPlayer.ytplayer){
              cosmoPlayer.playlist.current = 0
              cosmoPlayer.ytplayer.loadVideoById(cosmoPlayer.playlist.list[cosmoPlayer.playlist.current])
            }
            //console.log(cosmoPlayer.ytplayer.getVideoUrl())
            //cosmoPlayer.ytplayer.playVideo()
            //}
          }
       }catch(e){
         console.log(e,text);
  
       }
     });
   }
  
    cosmoPlayer.addElement = function(){
      //let bodyr = document.getElementsByTagName('body')[0]
      let bodyr = document.getElementById('video_view')
      let ifr = document.createElement('div')
      ifr.setAttribute('id',cosmoPlayer.idYTBPlayer)
      //ifr.setAttribute('allow',"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture")
      //ifr.src = cosmoPlayer.prepareLink(cosmoPlayer.stream.radio.streams[0])
      bodyr.append(ifr);
  
    }
  
    cosmoPlayer.createPlayer = function(){
      //https://stackoverflow.com/questions/66609220/catching-errors-in-embedded-youtube-videos
      cosmoPlayer.ytplayer = new YT.Player( cosmoPlayer.idYTBPlayer, {
        height: '100%',
        width: '100%',
        videoId : (cosmoPlayer.playlist?.list[cosmoPlayer.playlist.current]||cosmoPlayer.stream.radio.streams[0]),
        events: {
          'onStateChange': cosmoPlayer.onPlayerStateChange,
          'onReady': cosmoPlayer.onPlayerReady,
          'onError': cosmoPlayer.onPlayerError,
        }
      });
      //console.log(cosmoPlayer.ytplayer);
      //cosmoPlayer.loadStream();//?
    }
  
    cosmoPlayer.onPlayerReady = function(e){
      cosmoPlayer.updater();
    }
  
    cosmoPlayer.updater = function(){
        /*
        MTHFCKER SAYS:
          Тут  релей должен автоматом менять тэг  div на marquee и назад с привязкой по ширене блока.
        */
        //document.getElementById("artist").textContent = cosmoPlayer.ytplayer.getVideoData().title;
        //document.getElementById("songname").textContent = cosmoPlayer.stream.radio.nowplay.programm
        cosmoPlayer.relayMarquee2("artist", cosmoPlayer.ytplayer.getVideoData().title)
        cosmoPlayer.relayMarquee2("songname", cosmoPlayer.stream.radio.nowplay.programm)
    }
  
    cosmoPlayer.relayMarquee2 = function(id,text){
      let t = document.getElementById(id)
      t.textContent = text;
      if((t.getBoundingClientRect().width+t.getBoundingClientRect().left)> window.innerWidth && !t.classList.contains("marquee-inner") ){
          let c = 0;
          let d = window.innerWidth - t.getBoundingClientRect().left // free space
          if(t.getBoundingClientRect().width > d){
            d = t.getBoundingClientRect().width - d
            t.style.width = d +'px'
            //alert(1)
          }else{
            //alert(2)
            t.style.width = d+'px'
          }
        //t.style.width = t.getBoundingClientRect().width - window.innerWidth - t.getBoundingClientRect().left  +'px'
        t.classList.add("marquee-inner")
      }else{
        if(t.classList.contains("marquee-inner"))t.classList.remove("marquee-inner")
      }
    }
    cosmoPlayer.relayMarquee = function(id,text){
      let t = document.getElementById(id)
      t.textContent = text;
      if((t.getBoundingClientRect().width+t.getBoundingClientRect().left)> window.innerWidth ){
          console.log(t.getBoundingClientRect().right)
        if(t.tagName != 'marquee'){
          let q = Math.abs(window.innerWidth - t.getBoundingClientRect().width )
          let r = document.createElement('marquee')
          let c = t.cloneNode(true)
          c.style.display = 'inline-block'
          r.appendChild(c)
          t.parentNode.appendChild(r);
          t.parentNode.style.width = q+'px'
          t.remove()
        }
        //r.textContent = text;
      }
      else if((t.getBoundingClientRect().width+t.getBoundingClientRect().left)< window.innerWidth ){
        //t.parentNode.parentNode.appendChild(t)
        //t.parentNode.remove()
      }
  
    }
    cosmoPlayer.onPlayerError = function(e){
      //console.log(e.target)
      switch(e.data){
        case 2:
          //console.log("The request contains an invalid parameter value")
          cosmoPlayer.Next();
          break;
        case 5:
          console.log("The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.")
          cosmoPlayer.Next();
          break;
        case 100:
          console.log("The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.")
          cosmoPlayer.Next();
          break;
        case 101:
          console.log("The owner of the requested video does not allow it to be played in embedded players.")
          cosmoPlayer.Next();
          break;
        case 150:
          console.log("not found or licens privacy. call next ");
          cosmoPlayer.Next();
          break;
        default :
          console.log(e);
      }
      //console.log("cosmoPlayer Error",e);
    }
    cosmoPlayer.onPlayerStateChange = function(e){
      console.log(e.data)
      switch(e.data) {
        case 0:
          console.log('video ended');
          cosmoPlayer.Next();
          break;
        case 1:
          // YT.PlayerState.PLAYING
          //console.log('video playing from '+cosmoPlayer.player.getCurrentTime());
          cosmoPlayer.updater();
          break;
        case 2:
          // YT.PlayerState.PAUSED
          //console.log('video paused at '+cosmoPlayer.player.getCurrentTime());
          break;
        case 3:
          // YT.PlayerState.BUFFERING
          //cosmoPlayer.updater();
          break;
        case 4:
          //console.log('video paused at '+autoplayer.player.getCurrentTime());
          break;
        case 5:
          // YT.PlayerState.CUED
          // Playing not started
          console.log(cosmoPlayer.ytplayer.getVideoData().title)
          //console.log('video paused at '+autoplayer.player.getCurrentTime());
          break;
        case -1:
          // Playing not started
          //console.log('video paused at '+cosmoPlayer.player.getCurrentTime());
          break;
      }
    }
  
    cosmoPlayer.Play = function(){
  
    }
  
    cosmoPlayer.Next = function(){
      console.log("current is "+cosmoPlayer.playlist.current)
      cosmoPlayer.playlist.current++;// ++ making 0,0,1,2,3
      //if( cosmoPlayer.playlist.current >= cosmoPlayer.playlist.list.length ){
      if( !cosmoPlayer.playlist.list[cosmoPlayer.playlist.current] ){//ok
        cosmoPlayer.playlist.list = cosmoPlayer.stream.radio.streams;
        cosmoPlayer.playlist.current = 0;
      }
      cosmoPlayer.ytplayer.loadVideoById(cosmoPlayer.playlist.list[cosmoPlayer.playlist.current]);
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
  
    cosmoPlayer.setUrlClick = function(){
      document.getElementById('title').addEventListener("click", function(){
        //window.open( cosmoPlayer.controlPlayer('getVideoUrl')  , '_blank' ).focus()
      });
    }
  
    cosmoPlayer.centrizer =  function(){
      /**/
      let width = window.innerWidth || html.clientWidth;
      let aa = document.getElementById('button_news').getBoundingClientRect();
      let wText = aa.width
      let lText = aa.left
      let d = (width-aa.left)-(wText/2)
      document.getElementById('menu').scrollTo((width-wText)-d, 0);
      //console.log(width,wText)
    }
  
  
    cosmoPlayer.controlPlayer = function(func, param="" ){
      let frameOb = document.getElementById(cosmoPlayer.idYTBPlayer);
      let funct = ""
      /*
          youtube api
  
      https://developers.google.com/youtube/iframe_api_reference?hl=ru#Functions
  
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
      if ( func == "getVideoUrl" )funct = "getVideoUrl"
  
  
      return frameOb.contentWindow.postMessage('{"event":"command","func":"' + funct + '","args":"' + param + '"}', '*')
      */
  
    }
  
  
    cosmoPlayer.prepareLink = function( ident ){
      let l = "https://www.youtube.com/embed/"+ ident +"?controls=0&enablejsapi=1"
      return l
      //document.getElementById(cosmoPlayer.idYTBPlayer).src = l;
    }
    return cosmoPlayer;
  })();
  
  function onYouTubeIframeAPIReady() {// yt auto-cli call this function after upload src
    cosmoPlayer.createPlayer();
  }
  