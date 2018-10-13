var listId:number = 1;
var taskId:number = 0;
var todoLists:List[] = [];

class List{
    private id : string;
    private name: string;
    private tasks:Task[] = [];

    public getId():string {
        return this.id;
    }
    public setId(id:string) {
        this.id = id;
    }
    public getName():string {
        return this.name;
    }
    public setName(name:string) {
        this.name = name;
    }
    public getTasks():Task[] {
        return this.tasks;
    }
    public setTasks(tasks:Task[]) {
        this.tasks = tasks;
    }
}
class Task{
    
    id:string;
    isCompleted:boolean = false;
    content:string;
    isImportant:boolean = false;
    note:string;
    isAddedToMyDay:boolean = false;
    remindDate:string;
    dueDate:string;
    repeat:string;

    public getId():string {
        return this.id;
    }
    public setId(id:string) {
        this.id = id;
    }
    public getCompleted():boolean {
        return this.isCompleted;
    }
    public setCompleted(isCompleted:boolean) {
        this.isCompleted = isCompleted;
    }
    public getContent():string {
        return this.content;
    }
    public setContent(content:string) {
        this.content = content;
    }
    public getImportant():boolean {
        return this.isImportant;
    }
    public setImportant(isImportant:boolean) {
        this.isImportant = isImportant;
    }
    public getNote():string {
        return this.note;
    }
    public setNote(note:string) {
        this.note = note;
    }
    public getAddedToMyDate():boolean {
        return this.isAddedToMyDay;
    }
    public setAddedToMyDate(isAddedToMyDay:boolean) {
        this.isAddedToMyDay = isAddedToMyDay;
    }
    public getRemindDate():string {
        return this.remindDate;
    }
    public setRemindDate(remindDate:string) {
        this.remindDate = remindDate;
    }
    public getDueDate():string {
        return this.dueDate;
    }
    public setDueDate(dueDate:string) {
        this.dueDate = dueDate;
    }
    public getRepeat():string {
        return this.repeat;
    }
    public setRepeat(repeat:string) {
        this.repeat = repeat;
    }
}

const doc:Document = document;
const click:string = 'click';
const defaultList:List = new List();

(function():void {
  defaultList.setId('list1');
  defaultList.setName('My List');
  todoLists.push(defaultList);

  let blur:string = 'blur';
  let keydown:string = 'keydown';
  addEventListener(getElementsByClassName("new-list"),click, getNewList);
  addEventListener(getElementsByClassName("menu"),click, showsidemenuvalue);
  addEventListener(getElementsByClassName("list-input"),keydown, function e(e:KeyboardEvent):void {
    if (e.keyCode === 13) {
        addNewList(e);
    }
  });
  addEventListener(getElementsByClassName("list-input"),blur, function e(e:any):void {
    getElementsByClassName("list-input").classList.replace("display-inlineblock","display-none");
    getElementsByClassName("new-list-value").classList.remove("display-none");  
    if(e.currentTarget.value != '') {
      addNewList(e);
    }
  });
  addEventListener(getElementsByClassName("add-new-task"),click, showtaskcontent);

  addEventListener(getElementsByClassName("task-value"),keydown, function e(e:KeyboardEvent):void {
    if (e.keyCode === 13) {
        addtask();
    }
  });

  addEventListener(getElementsByClassName("fa-chevron-right"),click, closetaskcontent);
  addEventListener(getElementsByClassName('fa fa-trash-o float-r pointer'),click,deleteTask);

  addEventListener(getElementsByClassName("task-value"),blur, function hideInput():void{
  getElementsByClassName("add-new-task").classList.remove('display-none');
  getElementsByClassName("add-task").classList.replace("display-block","display-none");
  if((<HTMLInputElement>getElementsByClassName("task-value")).value != '') {
    addtask();
  }   
  });

  addEventListener(getElementsByClassName('remind-me-date-picker'),blur,function e(e:any):void {
    if (e.currentTarget.value != '') {
      addRemindMe(e);
  } 
  });

  addEventListener(getElementsByClassName('due-date-picker'),blur,function e(e:any):void {
    if (e.currentTarget.value != '') {
      setDueDate(e);
  } 
  });
 
  addEventListener(getElementsByClassName('task-note'),blur,function e(e:any):void {
    if (e.currentTarget.value != '') {
        addTaskNote(e);
    }
  });
})();

function addEventListener(element:Element,event,method:any):void {
  element.addEventListener(event,method);
}

//generic create Element method
function createElement(element):Element {
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
function createTextNode(element):Text{
  return doc.createTextNode(element);
}

//get element by class name
function getElementsByClassName(className:string):Element {
  return doc.getElementsByClassName(className)[0];
}

function getNewList():void{
  getElementsByClassName("side-nav-bar").classList.remove('small-side-nav');
  getElementsByClassName("page-content").classList.remove('big-page-content');
  getElementsByClassName("list-input").classList.replace("display-none","display-inlineblock");
  (<HTMLInputElement>getElementsByClassName("list-input")).focus();
  getElementsByClassName("new-list-value").classList.add("display-none");
}

function addNewList(evnt):void{
  var list= new List();
  list.setId("list"+ ++listId);
  list.setName(evnt.target.value);
  var myList= getElementsByClassName("my-list");
  (<HTMLInputElement> getElementsByClassName("list-input")).value='';
  todoLists.push(list);
  var newListValue = createElement({name:'li',attribute:{class:'mylist',id:list.getId()}});
  addEventListener(newListValue,click,showList);
  var newListIcon = createElement({name:'i',attribute:{class:'fa fa-list-ul'}});
  var newListName = createElement({name:'span',attribute:{class:'nav-values'}});
  newListName.appendChild(createTextNode(list.getName()));
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
  var list;
  for (let index = 0; index < todoLists.length; index++) { 
    if (listId === todoLists[index].getId() ) {
      list = (todoLists[index]);
    }
  }
  return list;
}

function getTaskById(taskId,list) {
  var task;
  for (let index = 0; index < list.tasks.length; index++) { 
    if (taskId === list.tasks[index].id) {
      task = list.tasks[index];
    }
  }
  return task;
}
function showList(e){
  var target = e.target.className === "mylist" ? e.target : e.target.parentNode;
  showListTasks(getListById(target.id));
  getElementsByClassName('task-content').classList.remove('display-block');
}
 function deleteList(){
   var list = getListById(getElementsByClassName('new-tasks').id);
   for(let index = 0; index<todoLists.length;index++) {
    if(list.id === todoLists[index].getId){
      todoLists.splice(index,1);
      break;
    }
  }
  var myList = doc.getElementById(list.id);
  myList.parentElement.removeChild(myList);
  closetaskcontent();
  showListTasks(defaultList);
 }

function showListTasks(list){
  var listDelete = getElementsByClassName('list-delete');
  if (list.id != 'list1') {
    listDelete.classList.remove('display-none');
    addEventListener(getElementsByClassName('list-delete'),click,deleteList);
  } else {
    listDelete.classList.add('display-none');
  } 
  getElementsByClassName("list-name").innerHTML=list.name;
  var listTasks = getElementsByClassName("new-tasks");
  listTasks.id=list.id;
  var taskContent = doc.getElementsByClassName("task");
  for (let index = 0; index < taskContent.length; index++) {
    if(taskContent[index].parentElement.className === "new-tasks") {
      listTasks.removeChild(taskContent[index]);
      index--;
    }
  }
  list.tasks.forEach(task => {
    var taskSelect = task.isCompleted === false ? 'fa fa-circle-o task-select' : 'fa fa-check-circle task-select';
    var taskImportant = task.isImportant === false ? 'fa fa-star-o float-r pointer task-important' : 'fa fa-star float-r pointer task-important';
    getElementsByClassName("new-tasks").innerHTML +="<div class='task box-shadow' id="+task.id+"><i class='"+taskSelect+"'></i><span class='tasks-value'>"+ task.content+"</span><i class='"+taskImportant+"'></i></div>"; 
  });
  addEventListeners();
}

function addEventListeners() {
  var taskSelect = doc.getElementsByClassName('task-select');
  for(let index =0; index<taskSelect.length;index++) {
    addEventListener(doc.getElementsByClassName('task-select')[index],click,selectTask);
    addEventListener(doc.getElementsByClassName('task-important')[index],click,makeTaskImportant);
  }
  addEventListener(getElementsByClassName('remind-me'),click,pickshowRemindDateToSelectDate);
  addEventListener(getElementsByClassName('due-date'),click,pickshowDueDateToSelectDate);
  var tasks =doc.getElementsByClassName('task box-shadow');
  for(let index=0;index<tasks.length;index++) {
    addEventListener(tasks[index],click,opentaskcontent);
  }
}

function showtaskcontent(){
  getElementsByClassName("add-new-task").classList.add('display-none');
  getElementsByClassName("add-task").classList.replace('display-none','display-block');
  (<HTMLInputElement>getElementsByClassName("task-value")).focus();
}

function addtask() {
  var task= new Task();
  task.setId('task'+ ++taskId);
  task.setContent((<HTMLInputElement>getElementsByClassName("task-value")).value);
  var newtasks = getElementsByClassName("new-tasks");
  getListById(newtasks.id).tasks.push(task);
  var newtask = createElement({name:'div',attribute:{class:'task box-shadow',id:task.id}});
  var select = createElement({name:'i',attribute:{class:'fa fa-circle-o pointer task-select'}}); 
  var taskContent= createElement({name:'span',attribute:{class:'tasks-value'}});
  var important= createElement({name:'i',attribute:{class:'fa fa-star-o float-r pointer task-important'}});
  addEventListener(select,click,selectTask);
  addEventListener(important,click,makeTaskImportant);
  addEventListener(newtask,click,opentaskcontent);
  taskContent.appendChild(createTextNode(task.content));
  newtask.appendChild(select);
  newtask.appendChild(taskContent);
  newtask.appendChild(important);
  newtasks.appendChild(newtask);
  (<HTMLInputElement>getElementsByClassName("task-value")).value = '';
  (<HTMLInputElement>getElementsByClassName("task-value")).focus();
}

function opentaskcontent(e){
  var taskContent = getElementsByClassName("task-content");
  taskContent.classList.add('display-block');
  var list = getListById(e.currentTarget.parentElement.id);
  var task;
  var taskId = e.currentTarget.id;
  list.tasks.forEach(listTask => {
    if(taskId === listTask.id) {
      task = listTask;
    }
  });
  taskContent.id = task.id;
  setTaskNote(task);
  var taskSelect = task.getCompleted() === false ? 'fa fa-circle-o task-select' : 'fa fa-check-circle task-select';
  var taskImportant = task.getImportant() === false ? 'fa fa-star-o float-r pointer task-important' : 'fa fa-star float-r pointer task-important';
  if(task.isAddedToMyDay === false) {
    getElementsByClassName('add-to-day box-shadow-all').classList.remove('added-to-day');
  } else {
    getElementsByClassName('add-to-day box-shadow-all').classList.add('added-to-day');
  }
  if(task.remindDate != null) {
    getElementsByClassName('show-remind').innerHTML=task.remindDate;
  } else {
    getElementsByClassName('show-remind').innerHTML='Remind Me';
  }
  if(task.dueDate != null) {
    getElementsByClassName('show-due').innerHTML=task.dueDate;
  } else {
    getElementsByClassName('show-due').innerHTML='Add Due Date';
  }
  getElementsByClassName('task-name box-shadow-all').innerHTML="<i class='"+taskSelect+"'></i><span>"+task.content +"</span><i class='"+taskImportant+"'></i>";
  addEventListeners();
  addEventListener(getElementsByClassName('add-to-day box-shadow-all'),click,addToDay);
}

function closetaskcontent(){
  getElementsByClassName("task-content").classList.remove('display-block');
}

function deleteTask(e){
  console.log(getElementsByClassName("new-tasks"));
  var taskId = getElementsByClassName("task-content").id;
  var list = getListById(getElementsByClassName("new-tasks").id);
  for(let index = 0; index<list.tasks.length;index++) {
    if(taskId === list.tasks[index].id){
      list.tasks.splice(index,1);
      break;
    }
  }
  showListTasks(list);
  closetaskcontent();
}

function selectTask(e){
  var taskId = null;
  if (e.currentTarget.parentElement.classList.contains('task-name')){
    taskId = getElementsByClassName('task-content').id;
  } else {
    taskId = e.currentTarget.parentElement.id;
  }
  var list = getListById(getElementsByClassName("new-tasks").id);
  var task = getTaskById(taskId,list);
  var taskSelect = doc.getElementById(taskId).firstChild; 
  if(e.currentTarget.classList.contains("fa-circle-o")) {
      task.isCompleted = true;
      (<HTMLIFrameElement>taskSelect).classList.replace("fa-circle-o","fa-check-circle");
      e.currentTarget.classList.replace("fa-circle-o","fa-check-circle");
  } else {
    task.isCompleted = false;
    (<HTMLIFrameElement>taskSelect).classList.replace("fa-check-circle","fa-circle-o");
    e.currentTarget.classList.replace("fa-check-circle","fa-circle-o");
  }
}

function makeTaskImportant(e){
  var taskId = e.currentTarget.parentElement.classList.contains('task-name')? getElementsByClassName('task-content').id :e.currentTarget.parentElement.id;
  var task = getTaskById(taskId,getListById(getElementsByClassName('new-tasks').id));
  var taskImportant = doc.getElementById(taskId).lastChild; 
  if(e.currentTarget.classList.contains("fa-star-o")) {
    task.isImportant = true;
    (<HTMLIFrameElement>taskImportant).classList.replace("fa-star-o","fa-star");
    e.currentTarget.classList.replace("fa-star-o","fa-star");
  } else {
    task.isImportant= false;
    (<HTMLIFrameElement>taskImportant).classList.replace("fa-star","fa-star-o");
    e.currentTarget.classList.replace("fa-star","fa-star-o");
  }
}

function addTaskNote(e) {
  console.log('value:'+e.currentTarget.value);
  var task = getTaskById(getElementsByClassName('task-content').id,getListById(getElementsByClassName('new-tasks').id));
  console.log("Task:"+task);
  task.note = e.currentTarget.value;

}

function setTaskNote(task) {
  var content = getElementsByClassName("task-note");
  if (null != task.note) {
    (<HTMLInputElement>content).value = task.note;
  } else {
    (<HTMLInputElement>content).value = "";
  }
}

function addToDay() {
  var task = getTaskById(getElementsByClassName('task-content').id,getListById(
    getElementsByClassName('new-tasks').id));
  if(!task.isAddedToMyDay){
    task.isAddedToMyDay = true;
  }else{
    task.isAddedToMyDay = false;
  } 
  getElementsByClassName('add-to-day box-shadow-all').classList.toggle('added-to-day');
}

/**
* show the date picker to select the remind date.
*/
function pickshowRemindDateToSelectDate() {
  var date = getElementsByClassName("input-add-remind");
  date.classList.add('display-inline-block');
  var today = new Date();
  (<HTMLInputElement>date).min = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  }

  function pickshowDueDateToSelectDate() {
    var date = getElementsByClassName("input-add-due");
    date.classList.add('display-inline-block');
    var today = new Date();
    (<HTMLInputElement>date).min = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    }

  /**
  * set the reminder date.
  * @param {task object} task 
  */
  function setDueDate(e) {
    if(e.target.value != null) {
      var task = getTaskById(getElementsByClassName('task-content').id,
        getListById(getElementsByClassName('new-tasks').id));
      task.dueDate = e.currentTarget.value;
      getElementsByClassName('show-due').innerHTML=task.dueDate;
    }
    getElementsByClassName('input-add-due').classList.remove('display-inline-block');
  }

  /**
  * add the due date to the task.
  * @param {event} e 
  */
  function addRemindMe(e) {
    if(e.target.value != null) {
      var task = getTaskById(getElementsByClassName('task-content').id,
      getListById(getElementsByClassName('new-tasks').id));
      task.remindDate = e.currentTarget.value;
      getElementsByClassName('show-remind').innerHTML=task.remindDate;
    }
    getElementsByClassName('input-add-remind').classList.remove('display-inline-block');
  }