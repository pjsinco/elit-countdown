var ready = function(cb) {
  document.addEventListener('DOMContentLoaded', cb);
};

ready(function() {
  var countdownTemplate = document.querySelector('#countdownTemplate');
  var targetEl = document.querySelector('.splash--home-page');
  var countdownDiv = document.createElement('section');
  countdownDiv.classList.add('wrap');
  countdownDiv.classList.add('container-fluid');
  countdownDiv.classList.add('countdown__container');

  countdownDiv.innerHTML = countdownTemplate.innerHTML;

  targetEl.parentNode.insertBefore(countdownDiv, targetEl.nextSibling);

  var DAYS = 60 * 60 * 24 * 1000;
  var HOURS = 60 * 60 * 1000;
  var MINUTES = 60 * 1000;
  var SECONDS = 1000;

  var omedDate = 'October 25, 2019 08:00:00';
  var target = new Date(omedDate).getTime();
  var now = Date.now();

  var daysEl = document.querySelector('#days');
  var daysStrEl = document.querySelector('#daysString');
  var hoursEl = document.querySelector('#hours');
  var hoursStrEl = document.querySelector('#hoursString');
  var minutesEl = document.querySelector('#minutes');
  var secondsEl = document.querySelector('#seconds');

  // Unhide the countdown if the timer hasn't expired
  if (target - now > 0) {
    populateCountdown(target - now);
    document.querySelector('.countdown').classList.remove('hide');
    document.querySelector('.countdown__title').classList.remove('hide');

    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0, len = reveals.length; i < len; i++) {
      reveals[i].classList.add('on');
    }
  }

  function formatTimeString(singularTimeString, time) {
    return (time == 1 ? singularTimeString : singularTimeString + 's');
  }

  function populateCountdown(secondsToGo) {
    var days = Math.floor(secondsToGo / DAYS);
    var hours = Math.floor((secondsToGo % DAYS) / HOURS);
    var minutes = Math.floor((secondsToGo % HOURS) / MINUTES);
    var seconds = Math.floor((secondsToGo % MINUTES) / SECONDS);

    daysEl.innerHTML = days;
    daysStrEl.innerHTML = formatTimeString('day', days);

    hoursEl.innerHTML = hours;
    hoursStrEl.innerHTML = formatTimeString('hour', hours);

    minutesEl.innerHTML = minutes;

    secondsEl.innerHTML = seconds;
  }

  var tick = window.setInterval(function() {
    var now = Date.now();
    var secondsToGo = target - now;

    populateCountdown(secondsToGo);

    if (secondsToGo < 0) {
      clearInterval(tick);
      var countdownContainer = document.querySelector('.countdown__container');
      if (countdownContainer) {
        countdownContainer.removeChild(document.querySelector('.countdown'))
        countdownContainer.removeChild(document.querySelector('.countdown__title'))
      }
    }
  }, 1000);
});
