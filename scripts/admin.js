const Notes = JSON.parse(localStorage.getItem('Notes'));
const Users=JSON.parse(localStorage.getItem('Users'));
if(sessionStorage.getItem('admin@gmail.com')!==null){
    document.querySelector('.container-signin').style.display='none';
        document.querySelector('.container-fluid').style.display='block';
}
document.querySelector('.login-text-actual').innerHTML="Welcome to Admin Signin";
document.querySelector('.sidebar-btn').addEventListener('click',e=>{
   document.getElementById('menu').classList.toggle('menu-item');
})
function signInNow(e){
    let email = (document.getElementById("email").value);
  email = email.toLowerCase();
  let password = document.getElementById("password").value;
  if(email!=='admin@gmail.com' || password!=='Admin@123'){
    alert('Wrong credential');
  }
    else {
        document.querySelector('.container-signin').style.display='none';
        document.querySelector('.container-fluid').style.display='block';
        sessionStorage.setItem(email,password);
    }

    e.preventDefault();
}

function logout(){
    document.querySelector('.container-signin').style.display='flex';
        document.querySelector('.container-fluid').style.display='none';
        sessionStorage.clear();
}
function loadPosts() {
    document.getElementById('my-notes').style.display='block';
    document.getElementById('all-users').style.display='none';
    document.getElementById('post').style.backgroundColor='white';
    document.getElementById('users').style.backgroundColor='transparent';
    let html = '';
    Notes.forEach((note, index) => {
        if (note !== null){
    html+=`<div class="row bg-white border border-dark m-5 pb-4" id="${note.id}" style="box-shadow: inset 2px 2px 3px rgba(0,0,0,0.6),inset -2px -2px 3px rgba(0,0,0,0.6);">
    <div class="row row-cols-lg-3" style="height: 100px;">
        <div class="col col-lg-1 ">

        <img src=${note.image} alt=""
            class="rounded-circle mt-2" style="height: 60px;width: 60px;">
        </div>
        <p class="col col-lg-4 mt-2">${note.name}</p>
        <h3 class="col col-lg-4 mt-2">#${note.heading}</h3>
    </div>
    <div class="row"> <p class="topic-content">Hello
    ${note.content} </p></div>
    <div class="row">
        <button class="delete col col-lg-1 bg-danger border border-2 p-1 ms-2 rounded-3">delete</button>
        <p class="col col-lg-4">posted on :${note.date + " at: " + note.time}</p>
    </div>
</div>`;
            }
    });
    document.getElementById('my-notes').innerHTML = html;
}

//event listener on my-note (post)
document.getElementById('my-notes').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) deleteNote(e.target.parentElement.parentElement.id);
});

//get array index
function getIndex(id) {
    let i;
    Notes.forEach((note, index) => {
        if (note !== null)
            if (note.id == id) i = index;
    });
    return i;
}
//delete a Note
function deleteNote(id) {
    let user = Notes;
    let index = getIndex(id);
    user.splice(index, 1);
    localStorage.setItem('Notes', JSON.stringify(user));
    loadPosts();
}

function allUser(){
    document.getElementById('my-notes').style.display='none';
    document.getElementById('all-users').style.display='block';
    document.getElementById('post').style.backgroundColor='transparent';
    document.getElementById('users').style.backgroundColor='white';
   
    let html="";
    Users.forEach((user)=>{
        html+=` <div class="col col-lg-5 bg-white border border-dark m-5 pb-4" id="${user.id}"  style="box-shadow: inset 2px 2px 3px rgba(0,0,0,0.6),inset -2px -2px 3px rgba(0,0,0,0.6);">
        <div class="row row-cols-lg-3" style="height: 100px;">
            <div class="col col-lg-6 ">
            <img src=${user.image} alt=""
                class="rounded-circle mt-2" style="height: 60px;width: 60px;">
            </div>
            <div class="col col-lg-6 mt-2">
                <h6 class="row">${user.id}</h6>
                <p class="row">${user.name}</p>
                <p class="row">${user.email}</p>
            </div>
            
        </div>
        <div class="row">
            <button class="delete col col-lg-3 bg-danger border border-2 mt-4 ms-auto me-auto rounded-3 text-center">delete</button>
        </div>
    </div>`
    });
    document.getElementById('all-users').innerHTML = html;
}

document.getElementById('all-users').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) deleteUser(e.target.parentElement.parentElement.id);
});
//user index
function getUserIndex(id) {
    let i;
    Users.forEach((user, index) => {
        if (user !== null)
            if (user.id == id) i = index;
    });
    return i;
}

//delete user
function deleteUser(id) {
    let user = Users;
    let index = getUserIndex(id);
    user.splice(index, 1);
    localStorage.setItem('Users', JSON.stringify(user));
    allUser();
}