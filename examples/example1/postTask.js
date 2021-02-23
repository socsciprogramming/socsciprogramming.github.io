var dataObj = JSON.parse(localStorage.getItem('dataObj'));

if (dataObj == null) {
  window.close();
}

//assigns values from dataObj
var maleKey = dataObj["maleKey"];
var femaleKey = dataObj["femaleKey"];
var currentState = dataObj["currentState"];
var order = dataObj["order"];
var myOrder = dataObj["myOrder"];
var postOrder = dataObj["postOrder"];
var postAnswers = dataObj["postAnswers"];
var highFreq = dataObj["highFreq"];
var medFreq = dataObj["medFreq"];
var lowFreq = dataObj["lowFreq"];
var taskType = dataObj["taskType"];

//console.log(postOrder);
//console.log(postAnswers);

//assigning key values
var lkeys = [76, 108];
var akeys = [65, 97];

var mkeys = [77, 109];
var zkeys = [90, 122];

var ykeys = [89, 121];
var nkeys = [78, 110];
console.log("m: " + maleKey + " f: " + femaleKey);
// if (currentState == 4) {
//   document.getElementById("currLabel").innerHTML = "Post Task Instructions:"
// }


if (currentState !=4) {
  window.close();
}

//initializing variables
var set1f = [];
var set1m = [];
var set2f = [];
var set2m = [];
var taskReady = false;
var halfway = false;
var returnReady = false;

loadImages();

//loads images to be used
function loadImages() {
  document.getElementById("prompt").innerHTML = "Images are currently loading, please wait..."
  document.getElementById("stimL").style.display = "none";
  document.getElementById("stimR").style.display = "none";
  document.getElementById("keyL").style.display = "none";
  document.getElementById("keyR").style.display = "none";
  set1f[0] = "";
  set1m[0] = "";
  set2f[0] = "";
  set2m[0] = "";
  for (var i = 1; i < 54; i++){
    if (i != 53) {
      //only loads images 1 - 52
      set1f[i] = new Image();
      set1m[i] = new Image();
      set2f[i] = new Image();
      set2m[i] = new Image();

      set1f[i].src = "Set1/set1f_" + i + ".jpg";
      set1m[i].src = "Set1/set1m_" + i + ".jpg";
      set2f[i].src = "Set2/set2f_" + i + ".jpg";
      set2m[i].src = "Set2/set2m_" + i + ".jpg";
    }
    else if (i == 53) {
      setTimeout(midQuestion, 8000);
    }
  }
}

//initial question prior to task
var needQAns = false;
var qAns = "";
function midQuestion() {
  document.getElementById("prompt").innerHTML = "Did you notice that different face images were presented with different frequencies? <br><br>If your answer is yes, press y <br>If your answer is no, press n";
  needQAns = true;
}

//after loads gets ready for task
function continueLoad() {
  document.getElementById("prompt").innerHTML = "Your task is to select the image that you believe was more frequently displayed during the preceding tasks. If you are unsure, just guess.<br><br>Unlike previous tasks, this task does not require quick responses, you will have as much time as neccessary to answer the question.<br><br>Press <strong><span class = 'key'>\"Z/z\"</span></strong> for the image on the left and press <strong><span class = 'key'>\"M/m\"</span></strong> for the image on the right.<br><br> Press spacebar to begin the task.";
  taskReady = true;
}

//initializing more variables
var recordData = false;
var imgToDisplay = 0;
var instructions = 0;

var tasksDone = 0;
var currIndex = 0;
var maxIndex = postOrder.length;

var duration = 1000;
var iti = 800;
var stimStart = 0;
var stimResp = 0;
var stimEnd = 0;

// var pracCL_rt = [];
// var pracCL_responses = [];
// var pracCL_correctResp = [];
var rt = [];
var responses = [];
var correctResp = [];
var clData = [];

console.log(postOrder[0][0].substring(9, 12));

//making array of correct answers
for (var i = 0; i < maxIndex; i++) {
  rt[i] = '';
  responses[i] = '';
  if (postAnswers.indexOf(postOrder[i][0].substring(9, 12)) != -1) {
    correctResp[i] = 'Z';
  }
  else {
    correctResp[i] = 'M';
  }
}

console.log(correctResp);


//triggers events for keypresses
document.addEventListener('keypress', function(event){
  console.log("here");
  //if initial question has not been answered
  if (needQAns) {
    console.log(event.keyCode);
    if (event.keyCode == ykeys[0] || event.keyCode == ykeys[1]) {
      console.log('Y pressed');
      qAns = 'Y';
      needQAns = false;
      continueLoad();
    }
    else if (event.keyCode == nkeys[0] || event.keyCode == nkeys[1]) {
      console.log('N pressed');
      qAns = 'N';
      needQAns = false;
      continueLoad();
    }
  }
  //to record data
  if (recordData) {
    //'M' pressed
    if (event.keyCode == mkeys[0] || event.keyCode == mkeys[1]) {
      console.log('M pressed');
      responses[currIndex] = 'M';
      stimResp = new Date().getTime();
      rt[currIndex] = stimResp - stimStart;
      console.log(rt[currIndex]);
      recordData = false;
      clearStim();
    }
    //'Z' pressed
    if (event.keyCode == zkeys[0] || event.keyCode == zkeys[1]) {
      console.log('Z pressed');
      responses[currIndex] = 'Z';
      stimResp = new Date().getTime();
      rt[currIndex] = stimResp - stimStart;
      console.log(rt[currIndex]);
      recordData = false;
      clearStim();
    }
  }
  //begins task
  if (taskReady) {
    if (event.keyCode == 32) {
      taskReady = false;
      console.log("beginning to run task");
      document.getElementById("prompt").innerHTML = "Which image was presented with a HIGHER frequency?";

      //doneCon = false;
      displayPlus(postOrder);
    }
  }
  //ready to leave task
  if (returnReady) {
    if (event.keyCode == 32) {
      returnReady = false;
      window.location.href = "index.html";
    }
  }
} );



//task functions
function displayPlus(){
  //document.getElementById("boxLeft").style.display = "none";
  recordData = false;
  iti = 800;
  //document.getElementById("plus").style.display = "block";
  imgToDisplay = postOrder[currIndex];
  setTimeout(displayStim, iti);
}

function displayStim(){
  stimStart = new Date().getTime();
  recordData = true;
  document.getElementById("plus").style.display = "none";
  //console.log(maxIndex);
  document.getElementById("stimL").src = postOrder[currIndex][0];
  document.getElementById("stimR").src = postOrder[currIndex][1];
  document.getElementById("keyL").style.display = "block";
  document.getElementById("keyR").style.display = "block";
  document.getElementById("stimL").style.display = "block";
  document.getElementById("stimR").style.display = "block";
  //setTimeout(clearStim, duration);
}

function clearStim(){
  recordData = false;
  document.getElementById("stimL").style.display = "none";
  document.getElementById("stimR").style.display = "none";
  document.getElementById("keyL").style.display = "none";
  document.getElementById("keyR").style.display = "none";

  if (currIndex < maxIndex - 1){
    currIndex += 1;
    console.log("curr Inndex: " + currIndex);
    displayPlus();
  }
  else {
    tasksDone +=1;
    // for (var i = 0; i < rt.length; i++){
    //   pracCL_rt[i] = rt[i];
    //   pracCL_responses[i] = responses[i];
    // }
    console.log(rt);
    console.log(responses);
    console.log(correctResp);
    taskDone();
  }
}

function taskDone() {
  currentState += 1;
  dataObj["currentState"] = currentState;
  postData = [postOrder, rt, responses, correctResp];
  dataObj["postData"] = postData;
  dataObj["qAns"] = qAns;
  localStorage.setItem('dataObj', JSON.stringify(dataObj));

  document.getElementById("prompt").style.display = "none";
  document.getElementById("transitionText").innerHTML = "Please press spacebar to return to the home page."
  document.getElementById("transitionText").style.display = "block";
  returnReady = true;
}



//autoRefresh(5000);

function autoRefresh( t ) {
  setTimeout("location.reload(true);", t);
}

function calculateAccuracy(isHalf, responses, correctResp) {
  var correct = 0;
  var stopPoint = responses.length;
  if (isHalf) {
    stopPoint = stopPoint/2;
  }
  for (var i = 0; i < stopPoint; i++) {
    if (responses[i] == correctResp[i]) {
      correct += 1;
    }
  }
  var accuracy = correct / (stopPoint);
  return (accuracy * 100).toString();
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
