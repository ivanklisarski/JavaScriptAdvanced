function timer() {
    let hours = $('#hours');
    let minutes = $('#minutes');
    let seconds = $('#seconds');
    let start = $('#start-timer');
    let stop = $('#stop-timer');
    let interval = null;
    let sec = 0;


    start.on('click', startOn);

    function stopOn() {
          clearInterval(interval);
          interval = null;
    }

    stop.on('click',stopOn);

    function startOn() {
        if (interval === null) {
            interval = setInterval(step, 1000)
        }
    }

    function step() {
        sec++;
        hours.text(('0' + Math.floor(sec / 60 / 60)).slice(-2));
        minutes.text(('0' + Math.floor(sec / 60 % 60)).slice(-2));
        seconds.text(('0' + Math.floor (sec % 60)).slice(-2));
    }


}



