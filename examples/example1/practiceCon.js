var dataObj = JSON.parse(localStorage.getItem('dataObj'));

if (dataObj == null) {
  window.close();
}

var maleKey = dataObj["maleKey"];
var femaleKey = dataObj["femaleKey"];
var currentState = dataObj["currentState"];
var order = dataObj["order"];
var pracOrder = dataObj["pracOrder"];
var taskType = dataObj["taskType"];
var lkeys = [76, 108];
var akeys = [65, 97];
console.log("m: " + maleKey + " f: " + femaleKey);
//setting current state if practice run multiple times.
if (currentState == 0 || currentState == 1) {
  currentState = 0;
  document.getElementById("currLabel").innerHTML = "Practice Task 1 Instructions:"
}
else if (currentState == 2 || currentState == 3) {
  currentState = 2;
  document.getElementById("currLabel").innerHTML = "Practice Task 2 Instructions:"
}

if ((currentState == 0 || currentState == 1) && order[0] == "cl") {
  window.close();
}
else if ((currentState == 2 || currentState == 3) && order[1] == "cl") {
  window.close();
}

var practiceImgs = [];
var taskReady = false;
var returnReady = false;
var instructionReady = false;

loadImages();

function loadImages() {
  //document.getElementById("readyText").innerHTML = "Images are currently loading, please wait..."
  for (i = 0; i < 5; i++) {
    if (i == 4) {
      setTimeout(continueLoad, 4000);
    }
    else {
      practiceImgs[i] = new Image();
      if (i == 0) {
        practiceImgs[i].src = "Practice/g1.jpg";
      }
      if (i == 1) {
        practiceImgs[i].src = "Practice/g2.jpg";
      }
      if (i == 2) {
        practiceImgs[i].src = "Practice/m1.jpg";
      }
      if (i == 3) {
        practiceImgs[i].src = "Practice/m2.jpg";
      }
    }
  }
}

function continueLoad() {
  //document.getElementById("readyText").innerHTML = "Press spacebar to begin the practice task."
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
for (var i = 0; i < pracOrder.length; i++){
  spec_images[i] = "Practice/" + pracOrder[i] + ".jpg";
}
var conflictList = ["MALE", "MALE", "MALE", "MALE", "MALE", "MALE", "FEMALE", "FEMALE", "FEMALE", "FEMALE", "FEMALE", "FEMALE"];
shuffle(conflictList);

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
var pracCondata = [];

for (var i = 0; i < maxIndex; i++) {
  rt[i] = '';
  responses[i] = '';
  if (pracOrder[i] == "g1" || pracOrder[i] == "g2" ) {
    correctResp[i] = femaleKey;
  }
  else {
    correctResp[i] = maleKey;
  }
}



document.addEventListener('keypress', function(event){
  if (instructions < 8){
    if (event.keyCode == 32) {
      instructions++;
      displayNext(instructions);
      console.log(instructions);
    }
  }
  if (recordData) {
    if (event.keyCode == lkeys[0] || event.keyCode == lkeys[1]) {
      console.log('L pressed');
      responses[currIndex] = 'L';
      stimResp = new Date().getTime();
      rt[currIndex] = stimResp - stimStart;
      console.log(rt[currIndex]);
      recordData = false;
    }
    if (event.keyCode == akeys[0] || event.keyCode == akeys[1]) {
      console.log('A pressed');
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
  //     instructionReady = false;
  //     console.log("beginning to run task");
  //
  //     //doneCon = false;
  //     displayPlus(spec_images);
  //   }
  // }
  if (returnReady) {
    if (event.keyCode == 32) {
      returnReady = false;
      window.location.href = "index.html";
    }
  }
} );


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
    label.innerHTML = 'Please stay focused during the experiment and try to get an accuracy above 80%. This is a practice run to get acclimated to the button responses.';
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




//task functions
function displayPlus(){
  document.getElementById("boxLeft").style.display = "none";
  recordData = false;
  iti = Math.floor(Math.random() * 1200) + 800;
  if (currIndex === 0){
    document.getElementById("plus").innerHTML = "+";
  }
  else if (responses[currIndex - 1] === "") {
    document.getElementById("plus").innerHTML = "RESPOND FASTER"
  }
  else if (responses[currIndex - 1] === correctResp[currIndex - 1]) {
    document.getElementById("plus").innerHTML = "CORRECT";
  }
  else {
    document.getElementById("plus").innerHTML = "INCORRECT";
  }
  document.getElementById("plus").style.display = "block";
  imgToDisplay = spec_images[currIndex];
  //console.log(maxIndex);
  //console.log(imgToDisplay);
  setTimeout(displayStimCon, iti);
}

function displayStimCon(){
  stimStart = new Date().getTime();
  recordData = true;
  document.getElementById("plus").style.display = "none";
  //console.log(maxIndex);
  document.getElementById("stim").src = spec_images[currIndex];
  document.getElementById("conflictWord").innerHTML = conflictList[currIndex];
  document.getElementById("stim").style.display = "block";
  document.getElementById("conflictWord").style.display = "block";
  //console.log("Displaying conflict STIMULUS");
  setTimeout(clearStim, duration);
}

function clearStim(){
  recordData = false;
  document.getElementById("stim").style.display = "none";
  document.getElementById("conflictWord").style.display = "none";
  if (currIndex < maxIndex - 1){
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

function taskDone() {
  currentState += 1;
  dataObj["currentState"] = currentState;
  pracCondata = [pracOrder, conflictList, rt, responses, correctResp];
  dataObj["pracCondata"] = pracCondata;
  localStorage.setItem('dataObj', JSON.stringify(dataObj));

  document.getElementById("transitionText").innerHTML = "Your accuracy on the practice task was " + (calculateAccuracy(responses, correctResp)).substring(0, 5) + "%. Please press spacebar to return to the home page to complete the main task."
  document.getElementById("transitionText").style.display = "block";
  returnReady = true;
}


//autoRefresh(5000);

function autoRefresh( t ) {
  setTimeout("location.reload(true);", t);
}

function calculateAccuracy(responses, correctResp) {
  var correct = 0;
  for (var i = 0; i < responses.length; i++) {
    if (responses[i] == correctResp[i]) {
      correct += 1;
    }
  }
  var accuracy = correct / (responses.length);
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
