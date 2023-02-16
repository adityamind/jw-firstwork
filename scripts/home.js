//Direct access denied to homepage

if (sessionStorage.getItem('currentUser') === null) {
    alert('Please SignIn First');
    location.href = "index.html";
}

//logout 
function logout() {
    sessionStorage.clear();
    document.location.href = "index.html";
}

//add post popup start
function openPopup() {
    document.querySelector('.popup').style.display = 'flex';
}
function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.popup-profile').style.display = 'none';
}
//add post popup end

//comment box close 
function closeComment(id) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.height = '242px';
    document.getElementById(id).style.transition = '500ms';
    document.getElementById("cs" + id).style.display = 'none';  
    document.getElementById("c"+id).style.display='block';
    document.getElementById("ccs"+id).style.display='none';
}

//image edit btn hide
function hideImageEditBtn() {
    document.getElementById('img-edit').style.display = 'none';
    document.getElementById('file-img').style.display = 'block';
}

//general setup
const fullDate = new Date();
const date = fullDate.toLocaleDateString();
const time = fullDate.toLocaleTimeString();
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
const email = currentUser.email;
const currentUserName = currentUser.name;
const image = currentUser.image;
const Notes = JSON.parse(localStorage.getItem('Notes'));

//show user info
document.getElementById('custom-header').setAttribute('name', currentUserName);
document.getElementById('custom-header').setAttribute('imgSrc', image);
function openProfilePopup() {
    document.querySelector('.popup-profile').style.display = 'flex';
    document.getElementById('my-profile-id').innerHTML = "ID :" + currentUser.id;
    document.getElementById('my-profile-name').value = currentUser.name;
    document.getElementById('my-profile-email').value = currentUser.email;
    document.getElementById('img-edit').style.display = 'block';
    document.getElementById('file-img').style.display = 'none';
}

//create a note to be post or update
function makeNote(noteId, name, email, heading, content, like, likedBy, commentCount, comment, updatedDate, updatedTime, image) {
    let newNote = {
        id: noteId,
        name: name,
        email: email,
        heading: heading,
        content: content,
        like: like,
        likedBy: likedBy,
        commentCount: commentCount,
        comment: comment,
        date: updatedDate,
        time: updatedTime,
        image: image
    };
    return newNote;
}

//my profile

const profileImage = document.getElementById('file-img');
let imgViewer = document.querySelector('.my-profile-image');
imgViewer.setAttribute('src', image);
let url = "";
profileImage.addEventListener('change', () => {
    const fr = new FileReader();
    fr.readAsDataURL(profileImage.files[0]);
    fr.addEventListener('load', () => {
        url = fr.result;
        imgViewer.setAttribute('src', url);
    });
});
function profileSave() {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let updatedName = document.getElementById('my-profile-name').value.trim();
    let updatedEmail = document.getElementById('my-profile-email').value;
    if (updatedEmail.match(validRegex) && updatedName.length > 1) {
        let updatedUser = {
            id: currentUser.id,
            name: updatedName,
            email: updatedEmail,
            password: currentUser.password,
            image: url == "" ? currentUser.image : url
        };
        alert('saving');
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
        let Users = JSON.parse(localStorage.getItem('Users'));
        let index;
        Users.forEach((node, i) => {
            if (node.id == currentUser.id) index = i;
        });
        Users.splice(index, 1, updatedUser);
        localStorage.setItem('Users', JSON.stringify(Users));
    }
    else alert('Error on updating');
}


//Add New Note
function addNewNote() {
    document.querySelector(".submit").style.display = 'block';
    document.querySelector(".submit-update").style.display = 'none';
    const noteHeading = document.querySelector('#post-heading').value;
    let noteContent = document.querySelector('#post-content').value;
    if (noteContent.length > 201) {
        noteContent = noteContent.substring(0, 200);
    }
    let newNote = makeNote(fullDate.getTime(), currentUserName, email, noteHeading, noteContent, 0, [], 0, [], date, time, image);
    if (localStorage.getItem('Notes') === null) localStorage.setItem('Notes', JSON.stringify([newNote]));
    else {
        Notes.push(newNote);
        localStorage.setItem('Notes', JSON.stringify(Notes));
    }
}


//load all posts function
function allPosts() {
    document.getElementById('main-notes').style.display = 'block';
    document.getElementById('my-notes').style.display = 'none';
    document.getElementById('my-post').style.backgroundColor = 'rgb(234 235 243)';
    document.getElementById('home').style.backgroundColor = 'rgb(206, 96, 96)';
    let html = '';
    Notes.forEach((note, index) => {
        if (note !== null) {
            let imageSrc = "images/like_before.png";
            if (isLiked(note, email) === 1)
                imageSrc = "images/like_after.png";
            html += `<single-note id=${note.id} imgSrc=${note.image}
            name=${note.name} note-head=${note.heading} note-content="${note.content}" like=${note.like} like-btn=${imageSrc}
            comment-count=${note.commentCount} posted=${note.date + " at: " + note.time} user-comment=${image}
            ></single-note>`;
        }
    });
    document.getElementById('main-notes').innerHTML = html;
}

//load all comments
function loadComment(user, id) {
    let Comments = user.comment;
    let html = '';
    Comments.forEach((item, index) => {
        if (item.commentEmail === currentUser.email) {
            html += ` <div class="single-comment">
            <div class="commenter-image"><img src=${currentUser.image} alt="user-image"></div>
            <div class="comment-detail">
            <span class="comment-head"><strong>You</strong></span>
            <p class="actual-comment">${item.commentContent}</p>
           </div>
        </div>`;
        }
        else {
            html += ` <div class="single-comment">
            <div class="commenter-image"><img src=${item.image} alt="no-image"></div>
            <div class="comment-detail">
            <span class="comment-head"><strong>${item.commentBy}</strong></span>
            <p class="actual-comment">${item.commentContent}</p>
           </div>
        </div>`;
        }
    });
    document.getElementById("all-comm" + id).innerHTML = html;
}

//event listener on note
document.getElementById('main-notes').addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('like')) liker(e.target.parentElement.parentElement.parentElement.id);
    if (e.target.parentElement.classList.contains('open-comment')) addNewComment(e.target.parentElement.parentElement.parentElement.id);
    if (e.target.parentElement.classList.contains('close-comment')) closeComment(e.target.parentElement.parentElement.parentElement.id);
    if (e.target.classList.contains('submit-comment')) submitComment(e.target.parentElement.parentElement.parentElement.parentElement.id);
    if (e.target.parentElement.classList.contains('submit-comment')) submitComment(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);

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


//open comment box
function addNewComment(id) {
    document.getElementById(id).style.display = 'block'
    document.getElementById(id).style.height = '512px';
    document.getElementById("cs" + id).style.display = 'block';
    
    let anotherUser = Notes[getIndex(id)];
    loadComment(anotherUser, id);
    document.getElementById("c"+id).style.display='none';
    document.getElementById("ccs"+id).style.display='block';
}

//submit comment
function submitComment(id) {
    const commentContent = document.getElementById('post-comment' + id).value;
    if (commentContent.trim().length > 0) {
        let newComment = {
            commentEmail: email,
            commentBy: currentUserName,
            commentContent: commentContent,
            commentTime: time,
            commentDate: date,
            image:image
        };
        let i = getIndex(id);
        let anotherUser = Notes[i];
        const allComments = anotherUser.comment;
        allComments.push(newComment);
        let updatedNote = makeNote(anotherUser.id, anotherUser.name, anotherUser.email, anotherUser.heading, anotherUser.content, anotherUser.like, anotherUser.likedBy, anotherUser.commentCount + 1, allComments, anotherUser.date, anotherUser.time, anotherUser.image);
        let updatedAllNote = Notes;
        updatedAllNote.splice(i, 1, updatedNote);
        localStorage.setItem('Notes', JSON.stringify(updatedAllNote));
        document.getElementById('post-comment' + id).value = "";
        loadComment(anotherUser, id);
    }


}


//add like

//already liked or not
function isLiked(anotherUser, likeEmail) {
    let previousLikeBy = 0;
    let likedBy = anotherUser.likedBy;
    for (let j = 0; j < likedBy.length; j++) {
        if (likedBy[j] === likeEmail) {
            previousLikeBy = 1;
            break;
        }
    }
    return previousLikeBy;
}
//like increase or decrease

function liker(id) {
    let i = getIndex(id);
    let anotherUser = Notes[i];
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const likeEmail = currentUser.email;
    let previousLike = anotherUser.like;
    let updatedLikedBy = [];
    let previousLikeBy = 0;
    let likedBy = anotherUser.likedBy;
    for (let j = 0; j < likedBy.length; j++) {
        if (likedBy[j] === likeEmail) {
            previousLikeBy = 1;
            continue;
        }
        else updatedLikedBy.push(likedBy[j]);
    }
    if (previousLikeBy === 1) {
        previousLike -= 1;
    }
    else {
        previousLike += 1;
        updatedLikedBy.push(likeEmail);
    }
    let updatedNote = makeNote(anotherUser.id, anotherUser.name, anotherUser.email, anotherUser.heading, anotherUser.content, previousLike, updatedLikedBy, anotherUser.commentCount, anotherUser.comment, anotherUser.date, anotherUser.time, anotherUser.image);
    let updatedAllNote = Notes;
    updatedAllNote.splice(i, 1, updatedNote);
    localStorage.setItem('Notes', JSON.stringify(updatedAllNote));
    allPosts();
    location.reload();
}
function noRefresh(e) {
   
    e.preventDefault();
}

// my post filter
function myPosts() {
    document.getElementById('main-notes').style.display = 'none';
    document.getElementById('my-notes').style.display = 'block';
    document.getElementById('home').style.backgroundColor = 'rgb(234 235 243)';
    document.getElementById('my-post').style.backgroundColor = 'rgb(206, 96, 96)';
    let html = '';
    Notes.forEach((note, index) => {
        if (note !== null)
            if (note.email == email) {
                html += `<div class="note" id="${note.id}">
    <div class="note-head">
    <img src=${note.image} alt="" class="user-image">
    <p class="posted-by">${note.name}</p>
    <h3 id="topic-head">@${note.heading}</h3>
    </div>
    <p class="topic-content">${note.content}</p>
    <div class="tools">
        <button class="edit" ><img src="images/edit.png" alt="" class="btn-image"> </button>
        <button class="delete" ><img src="images/delete.png" alt="" class="btn-image"></button>
        <p class="posted-on">posted on :${note.date + " at: " + note.time}</p>
    </div>
    <hr>
    </div>`;
            }
    });
    document.getElementById('my-notes').innerHTML = html;
}

//event listener on my-note (post)
document.getElementById('my-notes').addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('edit')) loadContent(e.target.parentElement.parentElement.parentElement.id);
    if (e.target.parentElement.classList.contains('delete')) deleteNote(e.target.parentElement.parentElement.parentElement.id);
});

//delete a Note
function deleteNote(id) {
    let user = Notes;
    let index = getIndex(id);
    user.splice(index, 1);
    localStorage.setItem('Notes', JSON.stringify(user));
    myPosts();
}

// //existing data load in edit box
function loadContent(id) {
    openPopup();
    let i = getIndex(id);
    document.querySelector(".submit").style.display = 'none';
    let btn = document.querySelector(".submit-update");
    btn.style.display = 'block';
    document.getElementById('post-heading').value = Notes[i].heading;
    document.getElementById('post-content').value = Notes[i].content;
    btn.addEventListener("click", () => {
        updateNote(i);
    });
}

//update note
function updateNote(index) {
    const noteHeading = document.querySelector('#post-heading').value;
    let noteContent = document.querySelector('#post-content').value;
    if (noteContent.length > 201) {
        noteContent = noteContent.substring(0, 200);
    }
    let anotherUser = Notes[index];
    let updatedNote = makeNote(anotherUser.id, anotherUser.name, anotherUser.email, noteHeading, noteContent, anotherUser.like, anotherUser.likedBy, anotherUser.commentCount, anotherUser.comment, anotherUser.date, anotherUser.time, anotherUser.image);
    let allNotes = Notes;
    allNotes.splice(index, 1, updatedNote);
    localStorage.setItem('Notes', JSON.stringify(allNotes));
    myPosts();
}



