//Submit button function
function show() {
  var birthday = '';
  var inputs = document.getElementsByTagName("input"); //console.log(inputs); //debug
  for (let input of inputs) {
    if (input.name == "firstname") {
      document.getElementById("firstname").innerHTML = input.value;
      //console.log(input, formData); //debug
    }
    if (input.name == "lastname") {
      document.getElementById("lastname").innerHTML = input.value;
    }
    if (input.name == "gender" && input.checked == true){
      if (input.value == 'other'){
        document.getElementById("gender").innerHTML = document.getElementById("genderInput").value;
      } else {
        document.getElementById("gender").innerHTML = input.value;
      }
    }
    if (input.name == "telephone"){
      document.getElementById("telephone").innerHTML = input.value;
    }
  }
  var selects = document.getElementsByTagName("select");
  var i = 0;
  for (let selected of selects) {
    if (selected.name == "birthday"){
      i++;
      birthday += selected.options[selected.selectedIndex].text; //can use text for the visible field, or value for the value field
      if (i == 2){
        birthday += ', ';
      } else {
        birthday += ' ';
      }
    }
  }
  document.getElementById("birthday").innerHTML = birthday;
  return false;
}

//When 'other' is clicked for gender, require specification
function genderClicked() {
  var inputs = document.getElementsByTagName("input"); //console.log(inputs); //debug
  for (let input of inputs) {
    if (input.name == "gender" && input.checked == true && input.value == 'other'){
      document.getElementById("genderInput").disabled = false;
      document.getElementById("genderInput").required = true;
    } else if (input.name == "gender" && input.checked == true && input.value != 'other') {
      document.getElementById("genderInput").disabled = true;
      document.getElementById("genderInput").required = false;
    }
  }
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
  var monthValue = document.getElementById("selectMonth").value;
  var dayValue = document.getElementById("selectDay").value;

  //Erase options and add "Select Day" blank option
  document.getElementById('selectYear').innerHTML = "";
  opt = document.createElement('option');
  opt.appendChild(document.createTextNode('Select Year'));
  opt.value = '';
  document.getElementById("selectYear").appendChild(opt);

  //Erase options and add "Select Year" blank option
  document.getElementById('selectYear').innerHTML = "";
  opt = document.createElement('option');
  opt.appendChild(document.createTextNode('Select Year'));
  opt.value = '';
  document.getElementById("selectYear").appendChild(opt);

  if (monthValue == 2 && dayValue == 29){
    for (i = 0; i <= 25; i++){
      opt = document.createElement('option');
      opt.appendChild(document.createTextNode(2020 - i*4));
      opt.value = i;
      document.getElementById("selectYear").appendChild(opt);
    }
  } else {
    for (i = 0; i <= 100; i++){
      opt = document.createElement('option');
      opt.appendChild(document.createTextNode(2020 - i));
      opt.value = i;
      document.getElementById("selectYear").appendChild(opt);
    }
  }
}
