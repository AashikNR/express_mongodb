
async function dataAsync() {
    let response = await fetch('http://127.0.0.1:3000/todo/list',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let data = await response.json();
    insertdataAsyn(data);
}
function insertdataAsyn(data) {
    var text = document.createElement("div")
    text.setAttribute("id" , "text");
    document.getElementById("api").appendChild(text)
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      var btn = document.createElement("BUTTON");
      btn.setAttribute("id" , data[i]._id);
      btn.setAttribute("onClick" ,"deleteValue();");
      btn.innerHTML = "DELETE";
      var btnedit = document.createElement("BUTTON");
      btnedit.setAttribute("id" , data[i]._id);
      btnedit.setAttribute("value" , data[i].value);
      btnedit.setAttribute("onClick" ,"editValue();");
      btnedit.innerHTML = "EDIT";
      div.innerHTML = 'UserId: ' + data[i]._id +' Title: ' + data[i].value + '<hr>';
      document.getElementById("api").appendChild(btn);
      document.getElementById("api").appendChild(btnedit);
      document.getElementById("api").appendChild(div);
    }
}
dataAsync();

function getInputValue(){
    let inputVal = document.getElementById("myInput").value;
    fetch('http://127.0.0.1:3000/todo/add',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                value: inputVal
            }
        })
    });
    document.location.reload();
}

function deleteValue(){
    fetch('http://127.0.0.1:3000/todo/delete',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                id: event.srcElement.id
            }
        })
    });
    document.location.reload();
}

var old_id
function editValue(){
    document.getElementById("myBtn_edit").style.display = "block";
    document.getElementById("myBtn").style.display = "none";
    old_id = event.srcElement.id;
    document.getElementById("myInput").value = event.srcElement.value;
}

function geteditedValue(){
    let new_value = document.getElementById("myInput").value
    fetch('http://127.0.0.1:3000/todo/edit',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                old: old_id,
                new: new_value
            }
        })
    });
    document.getElementById("myBtn").style.display = "block";
    document.getElementById("myBtn_edit").style.display = "none";
    document.getElementById("myInput").value = ""
    document.location.reload();
}