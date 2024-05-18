let arr = JSON.parse(localStorage.getItem("todo")) || [];
let currentUpdateIndex = -1;
viewdata();

function save() {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;

    if (title === "" || desc === "") {
        alert("You must add something");
        return false;
    }

    let data = {
        title: title,
        desc: desc,
    };

    arr.push(data);
    localStorage.setItem("todo", JSON.stringify(arr));
    alert("Record Successfully added");

    document.getElementById('title').value = "";
    document.getElementById('desc').value = "";
    viewdata();
}

function viewdata() {
    let tbl = "";
    arr.map((val, index) => {
        tbl += `
            <li>
                <b>${val.title}</b>&nbsp;&nbsp;&nbsp;&nbsp;${val.desc}
                <button class="delete" onclick="deletedata(${index})"><img src="delete.png"></button>
                <button class="update" onclick="openModal(${index})">Update</button>
            </li>
        `;
    });

    document.getElementById('list').innerHTML = tbl;
}

function deletedata(index) {
    arr.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(arr));
    viewdata();
}

function openModal(index) {
    let val = arr[index];
    document.getElementById('updateTitle').value = val.title;
    document.getElementById('updateDesc').value = val.desc;
    currentUpdateIndex = index;

    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

function Update() {
    let title = document.getElementById('updateTitle').value;
    let desc = document.getElementById('updateDesc').value;

    if (title === "" || desc === "") {
        alert("You must add something");
        return false;
    }

    let data = {
        title: title,
        desc: desc,
    };

   
    arr = arr.map((item, index) => {
        if (index === currentUpdateIndex) {
            return data;
        }
        return item;
    });

    localStorage.setItem("todo", JSON.stringify(arr));
    closeModal();
    viewdata();
}

function deleteAll() {
        localStorage.removeItem('todo');
        location.reload();
    }
