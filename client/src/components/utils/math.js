
export function movingAverage(dataset, n) {
  
  var runningAvg = [];
  var runningTotal = [];

  dataset.forEach((d, i) => {
    runningTotal.push(d);
    if (i % n > 0) {
      runningTotal.shift();
    }

    runningAvg.push(runningTotal.reduce((t, i) => {return t + i}) / runningTotal.length);
  });

  return runningAvg;
}

export function average(dataset) {

  var total = 0;

  dataset.forEach((d) => {
    total += d;
  })

  var res = total / dataset.length;

  return res.toFixed(2);
}
