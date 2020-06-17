const { interval } = require('rxjs');

// source observable
const numbers = interval(1000);

setTimeout(function() {
  // 1st subscriber after 2 seconds
  console.log('subscriber1' + ' joined after: ' + 2 + ' seconds');
  numbers.subscribe(x => console.log('Next - 1: ', x));

  // 2nd Subscriber after 5 Seconds
  setTimeout(function() {
    console.log('subscriber2' + ' joined after: ' + 5 + ' seconds');
    numbers.subscribe(x => console.log('Next - 2: ', x));
  }, 5000);
}, 2000);
