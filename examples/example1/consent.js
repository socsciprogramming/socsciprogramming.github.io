//consent form: receives consent answer from subject and stores in dataObj
var dataObj = JSON.parse(localStorage.getItem('dataObj'));

if (dataObj == null) {
  window.close();
}

var consent = dataObj["consent"];
var currentState = dataObj["currentState"];
var taskType = dataObj["taskType"];
console.log(taskType);

function continueConsent() {
  console.log("here");
  consent = true;
  dataObj["consent"] = consent;
  dataObj["currentState"] = dataObj["currentState"] + 1;
  localStorage.setItem('dataObj', JSON.stringify(dataObj));
  window.location.href = "index.html";
}
