
export function movingAverage(dataset) {
  
  let runningAvg = [];
  let runningTotal = 0;

  dataset.forEach((d, i) => {
    runningTotal += d;
    runningAvg.push(runningTotal / (i + 1));
  });

  return runningAvg;
}
