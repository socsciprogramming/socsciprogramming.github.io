//index page: creates all new objects, structures, and random orders to be passed to each task

//pulls current dataObj from local storage if subject has already completed other tasks and is returning back to home page. If so, all data from other tasks will be stored in this dataObj
var dataObj = JSON.parse(localStorage.getItem('dataObj'));

//if no dataObj is present, that means that the subject is opening this page for the first time and that they are just beginning the experiment. This code initializes the basic settings for the subject including their gender keys, their task order, their order of images, their high/medium/low frequency images, their post task images, conflict task images, practice task order, and more. All these individual settings are stored in the dataObj to be passed between pages.
if (dataObj == null) {
  //randomizing and initializing keys associated to genders
  var keyO = Math.floor(Math.random() * 2);
  if (keyO == 0) {
    var maleKey = 'A';
    var femaleKey = 'L';
  }else {
    var maleKey = 'L';
    var femaleKey = 'A';
  }


  //initializing current State
  var currentState = -1;

  //randomizing order of conflict task or CL task first
  var taskO = Math.floor(Math.random() * 2);
  //var order = ["con", "cl"];
  if (taskO == 0) {
    order = ["cl", "con"];
  } else {
    order = ["con", "cl"];
  }

  //generating order of images to be shown for all tasks and selecting high/med/low frequency images
  var myOrder, low_freq, med_freq, high_freq, postOrder, postAnswers;
  [myOrder, high_freq, med_freq, low_freq] = generateOrder();
  [postAnswers, postOrder] = createPostOrder(low_freq, med_freq, high_freq);

  [conflictList, conflictKey] = giveConflictOrder(myOrder, high_freq, med_freq, low_freq);

  var pracOrder = ['g1', 'g1', 'g1', 'g2', 'g2', 'g2', 'm1', 'm1', 'm1', 'm2', 'm2', 'm2'];
  shuffle(pracOrder);

  var linkCode = document.location['href'].split('?SONAcode=');

  //setting dataObj
  var dataObj = {
    maleKey: maleKey,
    femaleKey: femaleKey,
    currentState: -1,
    order: order,
    myOrder: myOrder,
    lowFreq: low_freq,
    medFreq: med_freq,
    highFreq: high_freq,
    conflictKey: conflictKey,
    conflictList: conflictList,
    pracOrder: pracOrder,
    postOrder: postOrder,
    postAnswers: postAnswers,
    netId: "",
    consent: false,
    linkCode: linkCode
  }

  //storing dataObj
  localStorage.setItem('dataObj', JSON.stringify(dataObj));
}
else {
  //if dataObj exists, set variables to data from dataObj
  var maleKey = dataObj["maleKey"];
  var femaleKey = dataObj["femaleKey"];
  var currentState = dataObj["currentState"];
  var order = dataObj["order"];
  if (dataObj["netId"] != "") {
    document.getElementById("netIdAsker").style.display = "none";
    document.getElementById("bigBox").style.display = "flex";
    document.getElementById("boxRight").style.display = "flex";
  }
}

//sets key values
var lkeys = [76, 108];
var akeys = [75, 97];

//changes text to display keys
document.getElementById("maleKey").innerHTML = "\"" + maleKey + "\"";
document.getElementById("femaleKey").innerHTML = "\"" + femaleKey + "\"";

console.log(dataObj);

runState();

//runs the current state depending on which task to run enxt
function runState() {
  if (currentState == -1) {
    //consent form needs to be completed, subject has just began the experiment
    document.getElementById("currLabel").innerHTML = "Consent Form Instructions:";
    document.getElementById("currentInst").innerHTML = "Current Instruction: Complete the Consent Form.";

    document.getElementById("pTask1").style.display = "none";
    document.getElementById("Task1").style.display = "none";
    document.getElementById("pTask2").style.display = "none";
    document.getElementById("Task2").style.display = "none";
    document.getElementById("postTask").style.display = "none";
    document.getElementById("consent").style.display = "block";
    document.getElementById("demographics").style.display = "none";

    document.getElementById("pTask1").disabled = true;
    document.getElementById("Task1").disabled = true;
    document.getElementById("pTask2").disabled = true;
    document.getElementById("Task2").disabled = true;
    document.getElementById("postTask").disabled = true;
    document.getElementById("consent").disabled = false;
    document.getElementById("demographics").disabled = true;

    document.getElementById("topInst").innerHTML = "Now, you will complete the consent form.";
    document.getElementById("midInst").innerHTML = "Please read through the consent form before accepting.";
    document.getElementById("bottomInst").innerHTML = "Press on the consent button to see the form";
  }
  if (currentState == 0) {
    //practice task 1 needs to be completed, subject completed consent form
    document.getElementById("currLabel").innerHTML = "Task 1 Instructions:";
    document.getElementById("currentInst").innerHTML = "Current Instruction: Complete Practice Task 1.";

    document.getElementById("pTask1").style.display = "block";
    document.getElementById("Task1").style.display = "none";
    document.getElementById("pTask2").style.display = "none";
    document.getElementById("Task2").style.display = "none";
    document.getElementById("postTask").style.display = "none";
    document.getElementById("consent").style.display = "none";
    document.getElementById("demographics").style.display = "none";

    document.getElementById("pTask1").disabled = false;
    document.getElementById("Task1").disabled = true;
    document.getElementById("pTask2").disabled = true;
    document.getElementById("Task2").disabled = true;
    document.getElementById("postTask").disabled = true;
    document.getElementById("consent").disabled = false;
    document.getElementById("demographics").disabled = false;

    //sets display text dependent on task order
    if (order[0] == "cl") {
      document.getElementById("topInst").innerHTML = "In this experiment you will see a series of face images.<br><br>Your task is to categorize to categorize the gender of the face images.";
    }
    else if (order[0] == "con") {
      document.getElementById("topInst").innerHTML = "In this experiment you will see a series of face images. <br><br>A text label will also be presented on top of every face image. <br><br>Your task is to ignore the meaning of the word and to categorize the gender of the face image.";
    }

    document.getElementById("bottomInst").innerHTML = "Memorize that task rule and press on Practice Task 1 to run the practice trials.";
  }
  else if (currentState == 1) {
    //task 1 needs to be completed, subject completed practice task 1
    document.getElementById("currLabel").innerHTML = "Task 1 Instructions:";
    document.getElementById("currentInst").innerHTML = "Current Instruction: Complete Task 1.";

    document.getElementById("pTask1").style.display = "block";
    document.getElementById("Task1").style.display = "block";
    document.getElementById("pTask2").style.display = "none";
    document.getElementById("Task2").style.display = "none";
    document.getElementById("postTask").style.display = "none";
    document.getElementById("consent").style.display = "none";
    document.getElementById("demographics").style.display = "none";

    document.getElementById("pTask1").disabled = false;
    document.getElementById("Task1").disabled = false;
    document.getElementById("pTask2").disabled = true;
    document.getElementById("Task2").disabled = true;
    document.getElementById("postTask").disabled = true;
    document.getElementById("consent").disabled = false;
    document.getElementById("demographics").disabled = false;

    //sets display text dependent on task order
    if (order[0] == "cl") {
      document.getElementById("topInst").innerHTML = "In this experiment you will see a series of face images.<br><br>Your task is to categorize to categorize the gender of the face images.";
    }
    else if (order[0] == "con") {
      document.getElementById("topInst").innerHTML = "In this experiment you will see a series of face images. <br><br>A text label will also be presented on top of every face image. <br><br>Your task is to ignore the meaning of the word and to categorize the gender of the face image.";
    }

    document.getElementById("bottomInst").innerHTML = "Memorize that task rule and press on Task 1 when you are ready to run the task.";
  }
  else if (currentState == 2) {
    //practice task 2 needs to be completed, subject completed task 1
    document.getElementById("currLabel").innerHTML = "Task 2 Instructions:";
    document.getElementById("currentInst").innerHTML = "Current Instruction: Complete practice Task 2.";

    document.getElementById("pTask1").style.display = "block";
    document.getElementById("Task1").style.display = "block";
    document.getElementById("pTask2").style.display = "block";
    document.getElementById("Task2").style.display = "none";
    document.getElementById("postTask").style.display = "none";
    document.getElementById("consent").style.display = "none";
    document.getElementById("demographics").style.display = "none";

    document.getElementById("pTask1").disabled = true;
    document.getElementById("Task1").disabled = true;
    document.getElementById("pTask2").disabled = false;
    document.getElementById("Task2").disabled = true;
    document.getElementById("postTask").disabled = true;
    document.getElementById("consent").disabled = false;
    document.getElementById("demographics").disabled = false;

    //sets display text dependent on task order
    if (order[1] == "con") {
      document.getElementById("topInst").innerHTML = "Now, you will complete a slightly different version of the gender classification task.<br><br>This time, a text label will be presented on top of every face image.<br><br>Your task is to ignore the meaning of the word and still to categorize the gender of the face image.";
    }
    else if (order[1] == "cl") {
      document.getElementById("topInst").innerHTML = "Now, you will complete a slightly different version of the gender classification task.<br><br>This time, the word will no longer be shown on top of the images.<br><br>Your task is still to categorize the gender of the face image.";
    }

    document.getElementById("bottomInst").innerHTML = "Memorize that task rule and press on Practice Task 2 when you are ready to run the practice trials.";
  }
  else if (currentState == 3) {
    //task 2 needs to be completed, subject completed practice task 2
    document.getElementById("currLabel").innerHTML = "Task 2 Instructions:";
    document.getElementById("currentInst").innerHTML = "Current Instruction: Complete Task 2.";

    document.getElementById("pTask1").style.display = "block";
    document.getElementById("Task1").style.display = "block";
    document.getElementById("pTask2").style.display = "block";
    document.getElementById("Task2").style.display = "block";
    document.getElementById("postTask").style.display = "none";
    document.getElementById("consent").style.display = "none";
    document.getElementById("demographics").style.display = "none";

    document.getElementById("pTask1").disabled = true;
    document.getElementById("Task1").disabled = true;
    document.getElementById("pTask2").disabled = false;
    document.getElementById("Task2").disabled = false;
    document.getElementById("postTask").disabled = true;
    document.getElementById("consent").disabled = false;
    document.getElementById("demographics").disabled = false;

    //sets display text dependent on task order
    if (order[1] == "con") {
      document.getElementById("topInst").innerHTML = "Now, you will complete a slightly different version of the gender classification task.<br><br>This time, a text label will be presented on top of every face image.<br><br>Your task is to ignore the meaning of the word and still to categorize the gender of the face image.";
    }
    else if (order[1] == "cl") {
      document.getElementById("topInst").innerHTML = "Now, you will complete a slightly different version of the gender classification task.<br><br>This time, the word will no longer be shown on top of the images.<br><br>Your task is still to categorize the gender of the face image.";
    }

    document.getElementById("bottomInst").innerHTML = "Memorize that task rule and press on Task 2 when you are ready to run the task.";
  }
  else if (currentState == 4) {
    //post task needs to be completed, subject completed task 2
    document.getElementById("currLabel").innerHTML = "Post-Task Instructions:";
    document.getElementById("currentInst").innerHTML = "Current Instruction: Complete the Post-Task.";

    document.getElementById("pTask1").style.display = "block";
    document.getElementById("Task1").style.display = "block";
    document.getElementById("pTask2").style.display = "block";
    document.getElementById("Task2").style.display = "block";
    document.getElementById("postTask").style.display = "block";
    document.getElementById("consent").style.display = "none";
    document.getElementById("demographics").style.display = "none";

    document.getElementById("pTask1").disabled = true;
    document.getElementById("Task1").disabled = true;
    document.getElementById("pTask2").disabled = true;
    document.getElementById("Task2").disabled = true;
    document.getElementById("postTask").disabled = false;
    document.getElementById("consent").disabled = false;
    document.getElementById("demographics").disabled = false;

    //sets display text dependent on task order
    document.getElementById("topInst").innerHTML = "Now, you will complete the post task paradigm.<br><br>This time, two images will be shown side by side.<br><br>Your task is to select the image shown at the HIGHER frequency.";
    document.getElementById("midInst").innerHTML = "<br><br>Press <strong>M/m</strong> for the image on the right and <strong>Z/z</strong> for the image on the left.<br><br>";
    document.getElementById("bottomInst").innerHTML = "Memorize that task rule and press on Post Task when you are ready to run the task.";
  }
  else if (currentState == 5) {
    //demographics needs to be completed, subject completed post task
    document.getElementById("currLabel").innerHTML = "Demographics Form Instructions:";
    document.getElementById("currentInst").innerHTML = "Current Instruction: Complete the Demographics Form.";

    document.getElementById("pTask1").style.display = "none";
    document.getElementById("Task1").style.display = "none";
    document.getElementById("pTask2").style.display = "none";
    document.getElementById("Task2").style.display = "none";
    document.getElementById("postTask").style.display = "none";
    document.getElementById("consent").style.display = "none";
    document.getElementById("demographics").style.display = "block";

    document.getElementById("pTask1").disabled = true;
    document.getElementById("Task1").disabled = true;
    document.getElementById("pTask2").disabled = true;
    document.getElementById("Task2").disabled = true;
    document.getElementById("postTask").disabled = true;
    document.getElementById("consent").disabled = true;
    document.getElementById("demographics").disabled = false;

    //sets display text dependent on task order
    document.getElementById("topInst").innerHTML = "Now, you will complete the demographics form.";
    document.getElementById("midInst").innerHTML = "Please read through the demographics form and answer each question to the best of your ability.";
    document.getElementById("bottomInst").innerHTML = "Press on the demographics button to see the form. Once you submit this form, you are completed with the task.";
  }
  else if (currentState == 6){
    //subject has completed the experiment
    document.getElementById("currLabel").innerHTML = "You are done!";
    document.getElementById("currentInst").innerHTML = "You are done!";

    document.getElementById("pTask1").style.display = "none";
    document.getElementById("Task1").style.display = "none";
    document.getElementById("pTask2").style.display = "none";
    document.getElementById("Task2").style.display = "none";
    document.getElementById("postTask").style.display = "none";
    document.getElementById("consent").style.display = "none";
    document.getElementById("demographics").style.display = "none";

    document.getElementById("pTask1").disabled = true;
    document.getElementById("Task1").disabled = true;
    document.getElementById("pTask2").disabled = true;
    document.getElementById("Task2").disabled = true;
    document.getElementById("postTask").disabled = true;
    document.getElementById("consent").disabled = true;
    document.getElementById("demographics").disabled = true;

    document.getElementById("topInst").innerHTML = "";
    document.getElementById("midInst").innerHTML = "";
    document.getElementById("bottomInst").innerHTML = "";

    //assigning all values to send data to server
    document.getElementById("assignmentId").value = dataObj["netId"];
    document.getElementById("workerId").value = dataObj["netId"];
    document.getElementById("hitId").value = dataObj["netId"];
    document.getElementById("RTs").value = dataObj["postData"];
    document.getElementById("demos").value = dataObj["demoData"];

    postDataLeft = [];
    postDataRight = [];
    for (var i = 0; i < dataObj["postData"][0].length; i++) {
      postDataLeft[i] = dataObj["postData"][0][i][0];
      postDataRight[i] = dataObj["postData"][0][i][1];
    }

    document.getElementById("posttestLeft").value = postDataLeft;
    document.getElementById("posttestRight").value = postDataRight;
    document.getElementById("posttestRT").value = dataObj["postData"][1];
    document.getElementById("posttestResp").value = dataObj["postData"][2];
    document.getElementById("posttestCorr").value = dataObj["postData"][3];

    document.getElementById("clDataOrder").value = dataObj["clData"][0];
    document.getElementById("clDataRT").value = dataObj["clData"][1];
    document.getElementById("clDataResp").value = dataObj["clData"][2];
    document.getElementById("clDataCorr").value = dataObj["clData"][3];

    document.getElementById("conDataOrder").value = dataObj["conData"][0];
    document.getElementById("conDataConList").value = dataObj["conData"][1];
    document.getElementById("conDataRT").value = dataObj["conData"][2];
    document.getElementById("conDataResp").value = dataObj["conData"][3];
    document.getElementById("conDataCorr").value = dataObj["conData"][4];

    document.getElementById("conflictList").value = dataObj["conflictList"];
    document.getElementById("conflictKey").value = dataObj["conflictKey"];
    document.getElementById("keys").value = [dataObj["maleKey"], dataObj["femaleKey"]];

    document.getElementById("highFreq").value = dataObj["highFreq"];
    document.getElementById("medFreq").value = dataObj["medFreq"];
    document.getElementById("lowFreq").value = dataObj["lowFreq"];

    document.getElementById("myOrder").value = dataObj["myOrder"];
    document.getElementById("taskOrder").value = dataObj["order"];
    document.getElementById("postAnswers").value = dataObj["postAnswers"];
    document.getElementById("qAns").value = dataObj["qAns"];
	//this here would be the study-specific SONA url that you have - I have deleted it here, because it may contain sensitive information
    document.getElementById('SONAurl').value = ('').concat(dataObj['linkCode'][1]);

    document.getElementById("mturk_form").submit();

  }


}

//function that directs subject to proper task page dependent on function call
function currentTask(current, name) {
  if (current == 'p1') {
    if (order[0] == "cl") {
      window.location.href = "practiceCL.html";
      //var newWindow = window.open("practiceCL.html", name, "width=screen.availWidth, height=screen.availHeight");
    }
    else if (order[0] == "con") {
      window.location.href = "practiceCon.html";
      //var newWindow = window.open("practiceCon.html", name, "width=screen.availWidth, height=screen.availHeight");
    }
  }
  else if (current == 'p2'){
    if (order[1] == "cl") {
      window.location.href = "practiceCL.html";
      //var newWindow = window.open("practiceCL.html", name, "width=screen.availWidth, height=screen.availHeight");
    }
    else if (order[1] == "con") {
      window.location.href = "practiceCon.html";
      //var newWindow = window.open("practiceCon.html", name, "width=screen.availWidth, height=screen.availHeight");
    }
  }
  else if (current == 't1'){
    if (order[0] == "cl") {
      window.location.href = "clTask.html";
      //var newWindow = window.open("clTask.html", name, "width=screen.availWidth, height=screen.availHeight");
    }
    else if (order[0] == "con") {
      window.location.href = "conTask.html";
      //var newWindow = window.open("conTask.html", name, "width=screen.availWidth, height=screen.availHeight");
    }
  }
  else if (current == 't2'){
    if (order[1] == "cl") {
      window.location.href = "clTask.html";
      //var newWindow = window.open("clTask.html", name, "width=screen.availWidth, height=screen.availHeight");
    }
    else if (order[1] == "con") {
      window.location.href = "conTask.html";
      //var newWindow = window.open("conTask.html", name, "width=screen.availWidth, height=screen.availHeight");
    }
  }
  else if (current == 'post') {
    window.location.href = "postTask.html";
  }
  else if (current == 'consent') {
    window.location.href = "InformedConsent.html";
  }
  else if (current == 'demographics') {
    window.location.href = "demog.html";
  }
}

//selects high/medium/low frequency images and generates order of all images for each task
function generateOrder() {

  //randomly selects low frequency images
  var low_order = [];
  while(low_order.length < 40){
      var r = Math.floor(Math.random() * 52) + 1;
      if(low_order.indexOf(r) === -1) {
        low_order.push(r);
      }
  }
  console.log("low freq: " + low_order.length);

  //randomly selects medium frequency images from the remaining images
  var med_order = [];
  while(med_order.length < 8){
      var r = Math.floor(Math.random() * 52) + 1;
      if(low_order.indexOf(r) === -1 && med_order.indexOf(r) === -1) med_order.push(r);
  }
  console.log("med freq: " + med_order.length);

  //selects high frequency images from remaining images
  var high_order = [];
  for (var i = 0; i < 52; i++) {
    num = i + 1;
    if (low_order.indexOf(num) === -1 && med_order.indexOf(num) === -1) {
      high_order.push(num);
    }
  }
  console.log("high freq: " + high_order.length);

  //creates order of all images to be displayed to subject during tasks
  var total_male_order = [].concat(low_order, med_order, med_order, med_order, med_order, med_order, high_order, high_order, high_order, high_order, high_order, high_order, high_order, high_order, high_order, high_order);

  var total_female_order = [].concat(low_order, med_order, med_order, med_order, med_order, med_order, high_order, high_order, high_order, high_order, high_order, high_order, high_order, high_order, high_order, high_order);

  for (var i = 0; i < total_male_order.length; i++){
    total_male_order[i] = "m" + total_male_order[i];
    total_female_order[i] = "f" + total_female_order[i];
  }

  total_order = [].concat(total_male_order, total_female_order);
  shuffle(total_order);

  return [total_order, high_order, med_order, low_order];
}

//creates image order for post task
function createPostOrder(low_order, med_order, high_order) {

  var selected_low = [];
  while(selected_low.length < 15){
      var r = Math.floor(Math.random() * 52) + 1;
      var gender = Math.floor(Math.random() * 2);
      if(selected_low.indexOf(r) === -1 && low_order.indexOf(r) != -1) {
        if (gender === 1) {
          selected_low.push("f_" + r);
        }
        else {
          selected_low.push("m_" + r);
        }
      }
  }
  //console.log(selected_low);

  selected_med = [];
  var leaveOut = Math.floor(Math.random() * med_order.length);
  for (var i = 0; i < med_order.length; i++){
    var gender = Math.floor(Math.random() * 2);
    if (i != leaveOut) {
      if (gender === 1) {
        selected_med.push("f_" + med_order[i]);
      }
      else {
        selected_med.push("m_" + med_order[i]);
      }
    }
  }
  //console.log(selected_med);

  var selected_high = [];
  for (var i = 0; i < high_order.length; i++){
    selected_high.push("f_" + high_order[i]);
    selected_high.push("m_" + high_order[i]);
  }
  //console.log(selected_high);

  var totalPostList = [];
  var postAnswers = [];
  for (var i = 0; i < 15; i++){
    current = [];
    if (i < 7) {
      current.push(selected_low[i]);
      current.push(selected_med[i]);
      postAnswers.push(selected_med[i]);
    }
    else {
      current.push(selected_low[i]);
      current.push(selected_high[i-7]);
      postAnswers.push(selected_high[i-7]);
    }
    shuffle(current);
    totalPostList.push(current);
  }
  shuffle(totalPostList);

  spec_images = [];
  for (var i = 0; i < totalPostList.length; i++){
    curr1 = [];
    curr1.push("Set1/set1" + totalPostList[i][0] + ".jpg");
    curr1.push("Set1/set1" + totalPostList[i][1] + ".jpg");

    curr2 = [];
    curr2.push("Set2/set2" + totalPostList[i][0] + ".jpg");
    curr2.push("Set2/set2" + totalPostList[i][1] + ".jpg");

    spec_images.push(curr1);
    spec_images.push(curr2);
  }
  shuffle(spec_images);

  return [postAnswers, spec_images];

}


//creates order of images for conflict task
function giveConflictOrder(orderArray, high, med, low){
  var conflictO = [];
  for (var i = 0; i < 53; i++){
    conflictO[i] = "congruent";
  }
  conflictO[0] = "noUse";

  shuffle(high);
  shuffle(med);
  shuffle(low);
  var allOrders = [high, med, low];
  for (var i = 0; i < allOrders.length; i++){
    currList = allOrders[i];
    for (var k = 0; k < currList.length/2; k++){
      currNum = currList[k];
      conflictO[currNum] = "incongruent";
    }
  }

  var conList = [];
  var gender = '';
  for (var i = 0; i < orderArray.length; i++){
    gender = orderArray[i][0];
    orderVal = orderArray[i].substring(1);
    if (conflictO[orderVal] == "congruent") {
      if (gender == 'f'){
        conList[i] = "FEMALE";
      }
      else if (gender == 'm') {
        conList[i] = "MALE";
      }
    }
    else if (conflictO[orderVal] == "incongruent") {
      if (gender == 'f'){
        conList[i] = "MALE";
      }
      else if (gender == 'm') {
        conList[i] = "FEMALE";
      }
    }
  }

  return [conList, conflictO];
}

//goes to main page
function goToMain() {
  document.getElementById("netIdAsker").style.display = "none";
  document.getElementById("bigBox").style.display = "flex";
  document.getElementById("boxRight").style.display = "flex";

  var dataObj = JSON.parse(localStorage.getItem('dataObj'));
  dataObj['netId'] = document.getElementById("netId").value;
  localStorage.setItem('dataObj', JSON.stringify(dataObj));
  console.log(dataObj);
}

//loads all images to be displayed
function loadImages() {
  set1f[0] = "";
  set1m[0] = "";
  set2f[0] = "";
  set2m[0] = "";
  practiceImgs[0] = "";
  for (var i = 1; i < 53; i++){
    set1f[i] = new Image();
    set1m[i] = new Image();
    set2f[i] = new Image();
    set2m[i] = new Image();

    set1f[i].src = "Set1/set1f_" + i + ".jpg";
    set1m[i].src = "Set1/set1m_" + i + ".jpg";
    set2f[i].src = "Set2/set2f_" + i + ".jpg";
    set2m[i].src = "Set2/set2m_" + i + ".jpg";
  }
  practiceImgs[1] = new Image();
  practiceImgs[2] = new Image();
  practiceImgs[3] = new Image();
  practiceImgs[4] = new Image();

  practiceImgs[1].src = "Practice/g1.jpg";
  practiceImgs[2].src = "Practice/g2.jpg";
  practiceImgs[3].src = "Practice/m1.jpg";
  practiceImgs[4].src = "Practice/m2.jpg";
}





//autoRefresh(5000);

function autoRefresh( t ) {
  setTimeout("location.reload(true);", t);
}

document.getElementById("inc").style.display = "block";

//resets settings
function reset() {
  currentState = 0;
  console.log(currentState);

  //setting dataObj
  dataObj["currentState"] = currentState;
  console.log(dataObj["currentState"]);

  //storing dataObj
  localStorage.setItem('dataObj', JSON.stringify(dataObj));
  window.location.href = "index.html";
}

//shuffles all elements of an array
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
