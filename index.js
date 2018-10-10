var todoLists=[];
var listId = 0;
var taskId=0;
var doc = document;
var click = "click";

(function() {

  addEventListener(getElementsByClassName("new-list"),click, getNewList);
  addEventListener(getElementsByClassName("menu"),click, showsidemenuvalue);
  addEventListener(getElementsByClassName("list-input"),"keydown", function e(e) {
    if (e.keyCode == 13) {
        addNewList(e);
    }
  });
  addEventListener(getElementsByClassName("list-input"),"blur", function e(e) {
    getElementsByClassName("list-input").classList.replace("display-inlineblock","display-none");
    getElementsByClassName("new-list-value").classList.remove("display-none");  
    if(e.currentTarget.value != '') {
      addNewList(e);
    }
  });
  addEventListener(getElementsByClassName("add-new-task"),click, showtaskcontent);

  addEventListener(getElementsByClassName("task-value"),"keydown", function e(e) {
    if (e.keyCode == 13) {
        addtask();
    }
  });

  addEventListener(getElementsByClassName("fa-chevron-right"),click, closetaskcontent);
  addEventListener(getElementsByClassName('fa fa-trash-o float-r pointer'),click,deleteTask);

  addEventListener(getElementsByClassName("task-value"),"blur", function hideInput(e){
  getElementsByClassName("add-new-task").classList.remove('display-none');
  getElementsByClassName("add-task").classList.replace("display-block","display-none");
  if(e.currentTarget.value != '') {
    addtask();
  }   
  });
})();

function addEventListener(element,event,method) {
  element.addEventListener(event,method);
}

//generic create Element method
function createElement(element) {
  var elementObj = doc.createElement(element.name);
  if (element.attribute) {
      if (element.attribute.class) {
          elementObj.className = element.attribute.class;
      }
      if (element.attribute.data) {
          elementObj.innerText = element.attribute.data;
      }
      if (element.attribute.id) {
          elementObj.id = element.attribute.id;
      }
  }
  if (element.style) {
      if (element.style.cursor) {
          elementObj.style.cursor = element.style.cursor;
      }
  }
  return elementObj;
}

//generic create text node method
function createTextNode(element){
  return doc.createTextNode(element);
}

//get element by class name
function getElementsByClassName(className) {
  return doc.getElementsByClassName(className)[0];
}

function getNewList(){
  getElementsByClassName("side-nav-bar").classList.remove('small-side-nav');
  getElementsByClassName("page-content").classList.remove('big-page-content');
  getElementsByClassName("list-input").classList.replace("display-none","display-inlineblock");
  getElementsByClassName("list-input").focus();
  getElementsByClassName("new-list-value").classList.add("display-none");
}

function addNewList(evnt){
  console.log(evnt);
  var list={
    name: evnt.target.value,
    id: "list" + ++listId,
    tasks:[]
  };  
  var myList= getElementsByClassName("my-list");
  getElementsByClassName("list-input").value='';
  todoLists.push(list);
  var newListValue = createElement({name:'li',attribute:{class:'mylist',id:list.id}});
  addEventListener(newListValue,click,showList);
  var newListIcon = createElement({name:'i',attribute:{class:'fa fa-list-ul'}});
  var newListName = createElement({name:'span',attribute:{class:'nav-values'}});
  newListName.appendChild(createTextNode(list.name));
  newListValue.appendChild(newListIcon);
  newListValue.appendChild(newListName);
  myList.appendChild(newListValue);
  getElementsByClassName("list-input").classList.replace("display-inlineblock","display-none");
  getElementsByClassName("new-list-value").classList.remove("display-none");  
}

function showsidemenuvalue() {
  getElementsByClassName("side-nav-bar").classList.toggle('small-side-nav');
  getElementsByClassName("page-content").classList.toggle('big-page-content');
}

function getListById(listId) {
  for (let index = 0; index < todoLists.length; index++) { 
    if (listId == todoLists[index].id ) {
      list = (todoLists[index]);
    }
  }
  return list;
}

function getTaskById(taskId,list) {
  var task;
  for (index = 0; index < list.tasks.length; index++) { 
    if (taskId == list.tasks[index].id) {
      task = list.tasks[index];
    }
  }

  return task;
}
function showList(e){
  var target = e.target.className === "mylist" ? e.target : e.target.parentNode;
  console.log(target);
  showListTasks(getListById(target.id));
}

function showListTasks(list){
  console.log(list);
  getElementsByClassName("list-name").innerHTML=list.name;
  var listTasks = getElementsByClassName("new-tasks");
  listTasks.id=list.id;
  var taskContent = doc.getElementsByClassName("task");
  var taskSelect = null;
  var taskImportant = null;
  for (index = 0; index < taskContent.length; index++) {
    if(taskContent[index].parentElement.className == "new-tasks") {
      listTasks.removeChild(taskContent[index]);
      index--;
    }
  }
  console.time('adsasd');
    list.tasks.forEach(task => {
      if(!task.isCompleted){
        taskSelect = 'fa fa-circle-o task-select';
      } else {
        taskSelect='fa fa-check-circle task-select';
      }
      if(!task.isImportant) {
        taskImportant = 'fa fa-star-o float-r pointer task-important';
      } else {
        taskImportant = 'fa fa-star float-r pointer task-important';
      }    
      getElementsByClassName("new-tasks").innerHTML +="<div class='task box-shadow' id="+task.id+"><i class='"+taskSelect+"'></i><span class='tasks-value'>"+ task.content+"</span><i class='"+taskImportant+"'></i></div>"; 
    });
    console.timeEnd('asdasdasd');
  addEventListeners();
}
function addEventListeners() {
  var tasks = doc.getElementsByClassName('task box-shadow');
  for(index =0; index<tasks.length;index++) {
    console.log("making event");
    addEventListener(tasks[index],click,opentaskcontent);
    addEventListener(doc.getElementsByClassName('task-select')[index],click,selectTask);
    addEventListener(doc.getElementsByClassName('task-important')[index],click,makeTaskImportant);
  }
}
function showtaskcontent(){
  getElementsByClassName("add-new-task").classList.add('display-none');
  getElementsByClassName("add-task").classList.replace('display-none','display-block');
  getElementsByClassName("task-value").focus();
}

function addtask() {
  var task={
    isCompleted:false,
    content:null,
    id:"task"+ ++taskId,
    isImportant:false
  };

  var newtasks = getElementsByClassName("new-tasks");
  task.content = getElementsByClassName("task-value").value;
  getListById(newtasks.id).tasks.push(task);
  var newtask = createElement({name:'div',attribute:{class:'task box-shadow',id:task.id}});
  var select = createElement({name:'i',attribute:{class:'fa fa-circle-o pointer select-icon'}}); 
  var taskContent= createElement({name:'span',attribute:{class:'tasks-value'}});
  var important= createElement({name:'i',attribute:{class:'fa fa-star-o float-r pointer'}});
  addEventListener(select,click,selectTask);
  addEventListener(important,click,makeTaskImportant);
  addEventListener(newtask,click,opentaskcontent);
  taskContent.appendChild(createTextNode(task.content));
  newtask.appendChild(select);
  newtask.appendChild(taskContent);
  newtask.appendChild(important);
  newtasks.appendChild(newtask);
  getElementsByClassName("task-value").value = '';
  getElementsByClassName("task-value").focus();
}

function opentaskcontent(e){
  console.log('opentask');
  var taskContent = getElementsByClassName("task-content");
  taskContent.classList.add('display-block');
  var list = getListById(e.currentTarget.parentElement.id);
  var task;
  var taskId = e.currentTarget.id;
  list.tasks.forEach(listTask => {
    if(taskId == listTask.id) {
      task = listTask;
    }
  });
  taskContent.id = task.id;
  var taskSelect = null;
  var taskImportant = null;
  if(task.isCompleted == false){
    taskSelect = 'fa fa-circle-o task-select';
  } else {
    taskSelect='fa fa-check-circle task-select';
  }
  if(task.isImportant == false) {
    taskImportant = 'fa fa-star-o float-r pointer task-important';
  } else {
    taskImportant = 'fa fa-star float-r pointer task-important';
  }
  getElementsByClassName('task-name box-shadow-all').innerHTML="<i class='"+taskSelect+"'></i><span>"+task.content +"</span><i class='"+taskImportant+"'></i>";
}

function closetaskcontent(){
  getElementsByClassName("task-content").classList.remove('display-block');
}

function deleteTask(e){
  console.log(getElementsByClassName("new-tasks"));
  var taskId = getElementsByClassName("task-content").id;
  var list = getListById(getElementsByClassName("new-tasks").id);
  for(index = 0; index<list.tasks.length;index++) {
    if(taskId == list.tasks[index].id){
      list.tasks.splice(index,1);
      break;
    }
  }
  showListTasks(list);
  closetaskcontent();
}

function selectTask(e){
  console.log('selectTask');
  var list = getListById(getElementsByClassName("new-tasks").id);
  var task = getTaskById(e.currentTarget.parentElement.id,list);
  if(e.currentTarget.classList.contains("fa-circle-o")) {
      task.isCompleted = true;

      e.currentTarget.classList.replace("fa-circle-o","fa-check-circle");
  } else {
    task.isCompleted = false;
    e.currentTarget.classList.replace("fa-check-circle","fa-circle-o");
  }
}

function makeTaskImportant(e){
  console.log('sadfsadas');
  var list = getListById(getElementsByClassName("new-tasks").id);
  var task = getTaskById(e.currentTarget.parentElement.id,list);
  if(e.currentTarget.classList.contains("fa-star-o")) {
    task.isImportant = true;
    e.currentTarget.classList.replace("fa-star-o","fa-star");
  } else {
    task.isImportant= false;
    e.currentTarget.classList.replace("fa-star","fa-star-o");
  }
}