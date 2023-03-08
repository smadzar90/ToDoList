
var addButton = document.getElementById("add-button");
var clearCompletedButton = document.getElementById("clear-completed-button");
var emptyListButton = document.getElementById("empty-button");
var saveListButton = document.getElementById("save-button");
var sortButton = document.getElementById("sort-button");

getLiveLocalTime();
addButton.addEventListener("click", addToDoItem);
clearCompletedButton.addEventListener("click", clearCompletedToDoItems);
emptyListButton.addEventListener("click", emptyList);
saveListButton.addEventListener("click", saveList);
sortButton.addEventListener("click", sortList);

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");


function getLiveLocalTime() {

    var dtFormat1 = new Intl.DateTimeFormat('en-US', {
           weekday: 'short'
    });
    var dtFormat2 = new Intl.DateTimeFormat('en-US', {
        month: 'short'
    });
    var dtFormat3 = new Intl.DateTimeFormat('en-US', {
        day: 'numeric'
    });
    var dtFormat4 = new Intl.DateTimeFormat('en-US', {
        year: 'numeric'
    });
    var dtFormat5 = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    var date = new Date();
    var date2 = dtFormat1.format(date) + ", " + dtFormat2.format(date) + ". " +
                dtFormat3.format(date) + ", " + dtFormat4.format(date) + ", " +
                dtFormat5.format(date);
    var dateNow = document.getElementById("current-date");
    dateNow.innerHTML = date2;
    setTimeout(getLiveLocalTime, 1000);
}


function getDate() {
    const date = new Date();
    var datenow = date.toLocaleDateString();
    var timenow = date.toLocaleTimeString();
    return ",  " + datenow + " " + timenow;
}

function addToDoItem() {
    var itemText = toDoEntryBox.value;
    
    if(itemText != "") {
    var dd = getDate();
    itemText += dd;
    newToDoItem(itemText, false);
    }
    else {
        window.alert("Please enter an item name");
    }
}

function sortList() {
    var elem, run, stop, li;
    run = true;
    li = toDoList.getElementsByTagName("LI");

    while(run) {
       run = false;
       stop = false;

       for(var i = 0; i < (li.length - 1); ++i) {
           
          if(li[i].innerHTML.toLowerCase() > li[i + 1].innerHTML.toLowerCase()) {
            stop = true;
            run = true;
            break;
          }
       }
       if(stop) {
          li[i].parentNode.insertBefore(li[i + 1], li[i]);
       }
    }
}

function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);
    
    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
    toDoEntryBox.value = "";
}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }  
}

function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }   
}

function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
    saveList();
}

function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();
setTimeout(saveList, 120000);
