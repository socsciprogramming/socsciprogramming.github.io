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
var conflictList = dataObj["conflictList"];
var taskType = dataObj["taskType"];
var lkeys = [76, 108];
var akeys = [65, 97];
console.log("m: " + maleKey + " f: " + femaleKey);

//setting current state if practice run multiple times.
if (currentState == 0 || currentState == 2) {
  window.close()
}

if (currentState == 0 || currentState == 1) {
  currentState = 1;
  document.getElementById("currLabel").innerHTML = "Task 1 Instructions:"
}
else if (currentState == 2 || currentState == 3) {
  currentState = 3;
  document.getElementById("currLabel").innerHTML = "Task 2 Instructions:"
}

var set2f = [];
var set2m = [];

var taskReady = false;
var instructionReady = false;
var halfway = false;
var returnReady = false;

loadImages();

//loads images to be used
function loadImages() {
  //document.getElementById("readyText").innerHTML = "Images are currently loading, please wait..."
  set2f[0] = "";
  set2m[0] = "";
  for (var i = 1; i < 54; i++){
    if (i != 53) {
      //only loads images 1 - 52
      set2f[i] = new Image();
      set2m[i] = new Image();

      set2f[i].src = "Set2/set2f_" + i + ".jpg";
      set2m[i].src = "Set2/set2m_" + i + ".jpg";
    }
    else if (i == 53) {
      setTimeout(continueLoad, 8000);
    }
  }
}

//after loads gets ready for task
function continueLoad() {
  //document.getElementById("readyText").innerHTML = "Press spacebar to begin the task."
  taskReady = true;
  if (instructions === 7) {
    document.getElementById("currLabel").innerHTML = 'Memorize that task rule and press on the spacebar to start the task.';
    document.getElementById('spaceBar').style.display = "block";
  }
}


//initializing variables
var recordData = false;
var imgToDisplay = 0;
var instructions = 0;

spec_images = [];
for (var i = 0; i < myOrder.length; i++){
  spec_images[i] = "Set2/set2" + myOrder[i][0] + "_" + myOrder[i].substring(1) + ".jpg";
}

var tasksDone = 0;
var currIndex = 0;
var maxIndex = spec_images.length;

var duration = 1000;
var iti = 800;
var stimStart = 0;
var stimResp = 0;
var stimEnd = 0;

var rt = [];
var responses = [];
var correctResp = [];
var conData = [];

for (var i = 0; i < maxIndex; i++) {
  rt[i] = '';
  responses[i] = '';
  if (myOrder[i][0] == 'f') {
    correctResp[i] = femaleKey;
  }
  else {
    correctResp[i] = maleKey;
  }
}


//triggers events for keypresses
document.addEventListener('keypress', function(event){
  if (instructions < 8){
    if (event.keyCode == 32) {
      instructions++;
      displayNext(instructions);
      console.log(instructions);
    }
  }
  if (recordData) {
    //when 'L' is pressed
    if (event.keyCode == lkeys[0] || event.keyCode == lkeys[1]) {
      //console.log('L pressed');
      responses[currIndex] = 'L';
      stimResp = new Date().getTime();
      rt[currIndex] = stimResp - stimStart;
      console.log(rt[currIndex]);
      recordData = false;
    }
    //when 'A' is pressed
    if (event.keyCode == akeys[0] || event.keyCode == akeys[1]) {
      //console.log('A pressed');
      responses[currIndex] = 'A';
      stimResp = new Date().getTime();
      rt[currIndex] = stimResp - stimStart;
      console.log(rt[currIndex]);
      recordData = false;
    }
  }
  // if (taskReady && instructionReady) {
  //   if (event.keyCode == 32) {
  //     taskReady = false;
  //     console.log("beginning to run task");
  //
  //     //doneCon = false;
  //     displayPlus(spec_images);
  //   }
  // }

  //when halfway through the task, displays a pause
  if (halfway) {
    if (event.keyCode == 32) {
      halfway = false;
      document.getElementById("transitionText").style.display = "none";
      displayPlus(spec_images);
    }
  }
  //when task is complete
  if (returnReady) {
    if (event.keyCode == 32) {
      returnReady = false;
      window.location.href = "index.html";
    }
  }
} );

//displays next instruction
function displayNext(x){
  var label = document.getElementById("currLabel");
  label.style.fontWeight = "normal";
  console.log(label);
  if (x === 1) {
    label.innerHTML = "Please enlarge this window to encompass the entire computer screen and sit at a comfortable distance from the screen.";
  }
  else if (x === 2){
    label.innerHTML = "In this experiment you will see a series of face images.";
  }
  else if (x === 3) {
    label.innerHTML = "A text label will also be presented on top of every face image.<br><br>Your task is to ignore the meaning of the word and to categorize the gender of the face image.";
  }
  else if (x===4) {
    label.innerHTML = 'Press <strong><span id = "maleKey" class = "key">\"' + maleKey + '\"</span></strong> if the image shows a male face and <strong><span id = "femaleKey" class = "key">\"' + femaleKey + '\"</span></strong> if the image shows a female face.';
  }
  else if (x===5) {
    label.innerHTML = 'Respond to each face image as quickly as possible while still being accurate. You will have until the image disappears to make your response. Always press the a/A key with your LEFT index finger and the l/L key with your RIGHT index finger.';
  }
  else if (x===6) {
    label.innerHTML = 'Please stay focused during the experiment and try to get an accuracy above 80%.';
  }
  else if (x===7) {
    label.innerHTML = 'Please wait for the images to load.';
    document.getElementById('spaceBar').style.display = "none";
    instructionReady = true;
    if (taskReady) {
      label.innerHTML = 'Press <strong><span id = "maleKey" class = "key">\"' + maleKey + '\"</span></strong> if the image shows a male face and <strong><span id = "femaleKey" class = "key">\"' + femaleKey + '\"</span></strong> if the image shows a female face.<br><br>Memorize the task rule and press on the spacebar to start the task.';
      document.getElementById('spaceBar').style.display = "block";
    }
  }
  //starts task on last instruction after images are loaded
  else if (x===8) {
    if (taskReady && instructionReady) {
      label.style.display = "none";
      document.getElementById('spaceBar').style.display = "none";
      taskReady = false;
      instructionReady = false;
      console.log("beginning to run task");
      displayPlus(spec_images);
    }else {
      instructions = 7;
    }
  }

}


//task functions - changes HTML elements to display fixation or feedback
function displayPlus(){
  document.getElementById("boxLeft").style.display = "none";
  recordData = false;
  iti = Math.floor(Math.random() * 1200) + 800;
  if (currIndex === 0){
    document.getElementById("plus").innerHTML = "+";
  }
  else if (responses[currIndex - 1] === ""){
    document.getElementById("plus").innerHTML = "RESPOND FASTER";
  }
  else {
    document.getElementById("plus").innerHTML = "+"
  }
  document.getElementById("plus").style.display = "block";
  imgToDisplay = spec_images[currIndex];

  setTimeout(displayStimCon, iti);
}

//task functions - changes stimulus to new image and changes conflict word to new word
function displayStimCon(){
  stimStart = new Date().getTime();
  recordData = true;
  document.getElementById("plus").style.display = "none";
  console.log(currIndex);
  document.getElementById("stim").src = spec_images[currIndex];
  document.getElementById("conflictWord").innerHTML = conflictList[currIndex];
  document.getElementById("stim").style.display = "block";
  document.getElementById("conflictWord").style.display = "block";
  setTimeout(clearStim, duration);
}

//clears stimulus and increments task index by 1, continues in loop
function clearStim(){
  recordData = false;
  document.getElementById("stim").style.display = "none";
  document.getElementById("conflictWord").style.display = "none";
  if (currIndex == (maxIndex/2)-1) {
    //halfway point
    halfway = true;
    currIndex += 1;
    document.getElementById("transitionText").innerHTML = "Your accuracy up to this point was " + (calculateAccuracy(halfway, responses, correctResp)).substring(0, 5) + "%. Press spacebar to continue the task."
    document.getElementById("transitionText").style.display = "block";
  }
  else if (currIndex < maxIndex - 1){
    currIndex += 1;
    console.log("curr Index: " + currIndex);
    displayPlus();
  }
  else {
    tasksDone +=1;
    console.log(rt);
    console.log(responses);
    console.log(correctResp);
    taskDone();
  }
}

//task functions - task is complete, stores data in dataObj to be returned
function taskDone() {
  currentState += 1;
  dataObj["currentState"] = currentState;
  conData = [myOrder, conflictList, rt, responses, correctResp];
  dataObj["conData"] = conData;
  localStorage.setItem('dataObj', JSON.stringify(dataObj));

  document.getElementById("transitionText").innerHTML = "Your accuracy on the task was " + (calculateAccuracy(false, responses, correctResp)).substring(0, 5) + "%. Please press spacebar to return to the home page."
  document.getElementById("transitionText").style.display = "block";
  returnReady = true;
}


//autoRefresh(5000);

function autoRefresh( t ) {
  setTimeout("location.reload(true);", t);
}

//calculates accuracy to display to subject
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

//shuffles an array
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
