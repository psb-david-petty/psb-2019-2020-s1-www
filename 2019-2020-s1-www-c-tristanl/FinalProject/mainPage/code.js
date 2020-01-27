function download() {
  var blurElements = ["img", "nav", "p", "button", "div"]
  for (i=0;i<blurElements.length;i++){
    document.getElementsByTagName(blurElements[i])[0].style.WebkitFilter = 'blur(4px)';
    document.getElementsByTagName(blurElements[i])[0].style.filter= 'blur(4px)';
  }


  //TODO finish popup
  document.getElementById("popup").style.display = "block";
}
