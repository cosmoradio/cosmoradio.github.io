var countdown = ( function(){
  function countdown(){

    if (countdown.instance_) {
    return countdown.instance_;
    }
  }
  countdown.instance_ = this;

  this.title='';
  this.timeEnd='';
  this.timer_id='';

  countdown.start = function(){
    let time_end = this.timeEnd
    this.timer_id = setInterval(function() {
      // Get today's date and time
      var now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = time_end  - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if(seconds < 10 && seconds >= 0)seconds = '0' + seconds;

      // Display the result in the element with id="demo"
      document.getElementById("timer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        countdown.stop()
        document.getElementById("timer").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  countdown.stop = function(){
    clearInterval( this.timer_id )
  }

  countdown.create = function(idelem, title, timeEnd){
    //('elem', 'to start', "Dec 25, 2021 12:00:00")
    let elm = document.getElementById(idelem)
    this.title = title
    this.timeEnd = new Date(timeEnd).getTime();

    let ttt = document.createElement('div')
    ttt.setAttribute('id','title')
    ttt.innerHTML = title
    elm.append(ttt)

    let qqq = document.createElement('div')
    qqq.setAttribute('id','timer')
    elm.append(qqq)

  }
  return countdown
}).call(this);

//countdown.create('elem', 'to start', "Dec 25, 2021 12:00:00").start()
