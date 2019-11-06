function showInput() {
    /* Follow this pattern for every form input. For example, "inputText" is the id of the input and "displayText" is the id of the element. */
    document.getElementById("displayText").innerHTML
        = document.getElementById("inputText").value;

    document.getElementById("displayRadio1").innerHTML
        = document.getElementById("inputRadio1").checked;
    document.getElementById("displayRadio2").innerHTML
        = document.getElementById("inputRadio2").checked;
    document.getElementById("displayRadio3").innerHTML
        = document.getElementById("inputRadio3").checked;

    document.getElementById("displayCheckbox1").innerHTML
        = document.getElementById("inputCheckbox1").checked;
    document.getElementById("displayCheckbox2").innerHTML
        = document.getElementById("inputCheckbox2").checked;
    document.getElementById("displayCheckbox3").innerHTML
        = document.getElementById("inputCheckbox3").checked;
}