document.getElementsByClassName("fa-chevron-right")[0].addEventListener("click", closetaskcontent);
document.getElementsByClassName("task")[0].addEventListener("click", opentaskcontent);
document.getElementsByClassName("add-new-task")[0].addEventListener("click", addtaskcontent);
document.getElementsByClassName("menu")[0].addEventListener("click", showsidemenuvalue);


function opentaskcontent(){
  document.getElementsByClassName("task-content")[0].style.display="block";
}

function closetaskcontent(){
  document.getElementsByClassName("task-content")[0].style.display="none";
}

function addtaskcontent(){
  document.getElementsByClassName("add-new-task")[0].style.display="none";
  document.getElementsByClassName("add-task")[0].style.display="block";
}

function showsidemenuvalue() {
  var x =document.getElementsByClassName("side-nav-bar")[0];
  if (x.style.width == "20%") {
  for(index=0;index<6;index++) {
    document.getElementsByClassName("nav-values")[index].style.display="none";
  }
    x.style.width="3%";
    document.getElementsByClassName("page-content")[0].style.width="97%";
  } else {
    for(index=0;index<6;index++) {
      document.getElementsByClassName("nav-values")[index].style.display="inline";
    }
      x.style.width="20%";
      document.getElementsByClassName("page-content")[0].style.width="80%";
  }
}
