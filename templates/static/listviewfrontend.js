function alertbox() {
    alert("i am working");
}

function viewLists() {
    const tablerow = [];
    $.ajax({
        url: 'http://localhost:4000/viewLists',
        type: "GET",
        success: function (data) {
            data.forEach(function (element) {
                tablerow.push("<tr><td>" + element.listName + "</td><td>" + element.listContent + "</td><td><button onclick='viewSingleTask(" + JSON.stringify(element._id) + ")' class='btn btn-warning' '>Update</button></td><td><a onclick='deletelist(" + JSON.stringify(element._id) + ")'><button class='btn btn-danger'>Delete</button></td></tr>")

            });
            document.getElementById("tabledata").innerHTML = tablerow
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}
viewLists();

function addNewTask() {
    $.ajax({
        url: 'http://localhost:4000/createList',
        type: "POST",
        data: {
            "listName": document.getElementById("listname").value,
            "listContent": document.getElementById("listcontent").value
        },
        success: function (data) {
            console.log(data);
            window.location.href = 'http://127.0.0.1:5500/templates/homepage.html';
            alert("Successfully added")
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function viewSingleTask(id) {
    $.ajax({
        url: 'http://localhost:4000/viewList/' + id,
        type: "GET",
        success: function (data) {
            document.getElementById('updatelistname').value = data.listName
            document.getElementById('updatelistcontent').value = data.listContent
            document.getElementById('listid').value = data._id
            window.location.href = 'http://127.0.0.1:5500/templates/homepage.html#divTwo';
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}


function updateTask() {
    $.ajax({
        url: 'http://localhost:4000/updateList/' + document.getElementById("listid").value,
        type: "PUT",
        data: {
            "listName": document.getElementById("updatelistname").value,
            "listContent": document.getElementById("updatelistcontent").value
        },
        success: function (data) {
            console.log(data);
            window.location.href = 'http://127.0.0.1:5500/templates/homepage.html';
            alert("Updated successfully")
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function deletelist(id) {
    console.log('http://localhost:4000/deleteList/' + id)
    $.ajax({
        url: 'http://localhost:4000/deleteList/' + id,
        type: "PUT",
        success: function (data) {
            console.log("Item is deleted")
            alert('list was deleted');
            location.reload();

        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}
