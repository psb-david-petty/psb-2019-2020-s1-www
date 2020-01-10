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
      document.getElementById("gender").innerHTML = input.value;
    }
  }
  var selects = document.getElementsByTagName("select");
  for (let selected of selects) {
    if (selected.name == "birthday"){
      birthday += selected.options[selected.selectedIndex].text + ' '; //can use text for the visible field, or value for the value field
    }
  }
  document.getElementById("birthday").innerHTML = birthday;
  return false;
}
