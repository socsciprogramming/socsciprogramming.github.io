//demographics form: receives demographics answers from subject and stores in dataObj
var dataObj = JSON.parse(localStorage.getItem('dataObj'));

var submitter = document.getElementById('demoSubmit');

var genInput = document.getElementById('gender');
var ageInput = document.getElementById('age');
var ethInput = document.getElementById('ethnicity');
var raceInput = document.getElementById('race');

if (dataObj == null) {
  window.close();
}

function continuer() {
  if (genInput.value == "" || ageInput.value == "" || ethInput.value == "" || raceInput.value == ""){
    window.alert("Please complete all fields before submitting");
  }
  else {
    var demodata = [genInput.value, ageInput.value, ethInput.value, raceInput.value];
    dataObj["demoData"] = demodata;
    dataObj["currentState"] = dataObj["currentState"] + 1;
    localStorage.setItem('dataObj', JSON.stringify(dataObj));
    window.location.href = "index.html";
  }
}
