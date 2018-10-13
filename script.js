document.getElementsByClassName("fa-chevron-right")[0].addEventListener("click", closetaskcontent);
document.getElementsByClassName("add-new-task")[0].addEventListener("click", addtaskcontent);
document.getElementsByClassName("menu")[0].addEventListener("click", showsidemenuvalue);
document.getElementsByClassName("starred")[0].addEventListener("click", addtask);

var selectTasks = document.getElementsByClassName("fa fa-circle-o pointer");
var importantTasks = document.getElementsByClassName("fa fa-star-o float-r pointer");
for(var index=0;index<selectTasks.length-1;index++) {
 selectTasks[index].addEventListener("click",selectTask);
 importantTasks[index].addEventListener("click",important);
}

var tasks = document.getElementsByClassName("tasks-value");
for(var index=0;index<tasks.length-1;index++) {
 tasks[index].addEventListener("click",opentaskcontent);
}

var add = document.getElementsByClassName("task-value")[0];
add.addEventListener("keydown", function e(e) {
    if (e.keyCode == 13) {
        addtask();
    }
});

add.addEventListener("focusout", function hideInput(){
  if(add.value != '') {
    addtask();
    document.getElementsByClassName("add-new-task")[0].style.display="none";
    document.getElementsByClassName("add-task")[0].style.display="block";
  } else {
    document.getElementsByClassName("add-new-task")[0].style.display="block";
    document.getElementsByClassName("add-task")[0].style.display="none";
  }
});
function opentaskcontent(){
  document.getElementsByClassName("task-content")[0].style.display="block";
}

function closetaskcontent(){
  document.getElementsByClassName("task-content")[0].style.display="none";
}

function addtaskcontent(){
  document.getElementsByClassName("add-new-task")[0].style.display="none";
  document.getElementsByClassName("add-task")[0].style.display="block";
  document.getElementsByClassName("task-value")[0].focus();
}

function showsidemenuvalue() {
  var x =document.getElementsByClassName("side-nav-bar")[0];
  if (x.style.width == "20%") {
  for(index=0;index<6;index++) {
    document.getElementsByClassName("nav-values")[index].style.display="none";
  }
    x.style.width="4%";
    document.getElementsByClassName("page-content")[0].style.width="96%";
  } else {
    for(index=0;index<6;index++) {
      document.getElementsByClassName("nav-values")[index].style.display="inline";
    }
      x.style.width="20%";
      document.getElementsByClassName("page-content")[0].style.width="80%";
  }
}

function addtask() {
   var taskValue = document.getElementsByClassName("task-value")[0].value;
   var task= document.getElementsByClassName("new-tasks")[0];
   var newtask = document.createElement('div');
   var select =document.createElement('i');
   var taskContent= document.createElement('span');
   var important= document.createElement('i');
   important.addEventListener("click",important);
   var node = document.createTextNode(taskValue);

   select.className="fa fa-circle-o pointer select-icon";
   newtask.className = "task box-shadow";
   important.className="fa fa-star-o float-r pointer";
   taskContent.className="tasks-value";
   taskContent.appendChild(node);
   newtask.appendChild(select);
   newtask.appendChild(taskContent);
   newtask.appendChild(important);
   task.appendChild(newtask);
   document.getElementsByClassName("task-value")[0].value = '';
   document.getElementsByClassName("task-value")[0].focus();
   taskContent.addEventListener("click",opentaskcontent);
   select.addEventListener("click",selectTask);
}

function selectTask(e){
  if(  e.currentTarget.classList.contains("fa-circle-o")) {
      e.currentTarget.classList.replace("fa-circle-o","fa-check-circle");
  } else {
    e.currentTarget.classList.replace("fa-check-circle","fa-circle-o");
  }
}

function important(e){
  if( e.currentTarget.classList.contains("fa-star-o")) {
      e.currentTarget.classList.replace("fa-star-o","fa-star");
  } else {
    e.currentTarget.classList.replace("fa-star","fa-star-o");
  }
}
