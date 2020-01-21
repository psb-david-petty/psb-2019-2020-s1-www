//Submit function
function onSubmit() {
  var date = new Date();
  if (document.getElementById('selectYear').value < 18) {
    ejectChildren();
  } else if (document.getElementById('selectYear').value == 18){
    if (document.getElementById('selectMonth').value > date.getMonth()+1) {
      ejectChildren();
    } else if (document.getElementById('selectMonth').value == date.getMonth()+1) {
      if (document.getElementById('selectDay').value > date.getDate()) {
        ejectChildren();
      } else {
        allowAdult();
      }
    } else {
      allowAdult();
    }
  } else {
    allowAdult();
  }
  return false;
}

//Eject underaged users or accept adults
function ejectChildren() {
  // Simulate a mouse click: window.location.href = "http://www.w3schools.com";
  // Simulate an HTTP redirect: window.location.replace("http://www.w3schools.com");
  window.location.replace("https://crayola.com");
}

function allowAdult() {
  window.location.replace("./mainPage/downloadMemory.html");
}

//When month is changed
function monthChange(){
  var monthValue = document.getElementById("selectMonth").value;

  //Erase options and add "Select Day" blank option
  document.getElementById('selectDay').innerHTML = "";
  opt = document.createElement('option');
  opt.appendChild(document.createTextNode('Select Day'));
  opt.value = '';
  document.getElementById("selectDay").appendChild(opt);

  //Erase options and add "Select Day First" blank option
  document.getElementById('selectYear').innerHTML = "";
  opt = document.createElement('option');
  opt.appendChild(document.createTextNode('Select Day First'));
  opt.value = '';
  document.getElementById("selectYear").appendChild(opt);

  //Generate days
  if (monthValue == 1 || monthValue == 3 || monthValue == 5 || monthValue == 7 || monthValue == 8 || monthValue == 10 || monthValue == 12){ //31 Days
    for (i = 1; i <= 31; i++){
      opt = document.createElement('option');
      opt.appendChild(document.createTextNode(i));
      opt.value = i;
      document.getElementById("selectDay").appendChild(opt);
    }
  } else if (monthValue == 4 || monthValue == 6 || monthValue == 9 || monthValue == 11){ //30 Days
    for (i = 1; i <= 30; i++){
      opt = document.createElement('option');
      opt.appendChild(document.createTextNode(i));
      opt.value = i;
      document.getElementById("selectDay").appendChild(opt);
    }
  } else if (monthValue == 2){ //29 Days
    for (i = 1; i <= 29; i++){
      opt = document.createElement('option');
      opt.appendChild(document.createTextNode(i));
      opt.value = i;
      document.getElementById("selectDay").appendChild(opt);
    }
  } else {
    return;
  }

}

//When day is changed
function dayChange () {
  var date = new Date();
  var monthValue = document.getElementById("selectMonth").value;
  var dayValue = document.getElementById("selectDay").value;

  //Erase options and add "Select Year" blank option
  document.getElementById('selectYear').innerHTML = "";
  opt = document.createElement('option');
  opt.appendChild(document.createTextNode('Select Year'));
  opt.value = '';
  document.getElementById("selectYear").appendChild(opt);

  if (monthValue == 2 && dayValue == 29){
    for (i = 0; i <= 25; i++){
      opt = document.createElement('option');
      opt.appendChild(document.createTextNode(date.getFullYear() - i*4));
      opt.value = i;
      document.getElementById("selectYear").appendChild(opt);
    }
  } else {
    for (i = 0; i <= 100; i++){
      opt = document.createElement('option');
      opt.appendChild(document.createTextNode(date.getFullYear() - i));
      opt.value = i;
      document.getElementById("selectYear").appendChild(opt);
    }
  }
}
