var brain = require('brain');

var fs = require("fs");
var net = new brain.NeuralNetwork();

function trainAndSaveBrain() {
  var i = 0;
  var trainSetSize = 1000000;
  var trainData = [];
  while(i < trainSetSize) {
    var a = Math.random();
    var b = Math.random();
    var trainSample = {
      input: {
        a: a,
        b: b
      },
      output: {
        sum: (a + b) / 2
      }
    }
    trainData.push(trainSample);
    i++;
  }

  net.train(trainData, {
    errorThresh: 0.0000001, // error threshold to reach
    iterations: 20000,     // maximum training iterations
    log: true,            // console.log() progress periodically
    logPeriod: 100,       // number of iterations between logging
    learningRate: 0.03    // learning rate
  });

  var json = net.toJSON();
  fs.writeFile('sum-brain.json', JSON.stringify(json));
}

fs.readFile('./sum-brain.json', function (err, data) {
    if (err) {
        trainAndSaveBrain();
        testing();
        return;
    }


    var brainJson = JSON.parse(data);
    net.fromJSON(brainJson);
    testing();
});



// testing:
function testing() {
  var j = 0;
  var testSize = 5;
  while(j < testSize) {
    var a = Math.random();
    var b = Math.random();
    console.log(net.run({ a: a, b: b}).sum.toFixed(3), ((a + b) / 2).toFixed(3));
    console.log(net.run({ a: a, b: b}).sum.toFixed(3) == ((a + b) / 2).toFixed(3))
    j++;
  }
}