//signufp start
class Signup extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div class="container-signup" id="signup-box">
        <div class="col-left">
        <div class="login-text">
          <P>Already Have an Account?</p></div>
          <button class="login-redirect" onclick="signinPopup()">Signin now</button>
        </div>
        <div class="col-right">
        <form action="" onsubmit="signUpNow(event)">
          <h2>Sign Up</h2>
          <input type="text" placeholder="Enter Name" name="name" required id="signup-name">
          <input type="email" placeholder="Enter Email" name="email" required id="signup-email">
          <input type="password" placeholder="Enter Password" name="password" required id="signup-password" minlength="8" maxlength="16" pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters">
           <button type="submit" class="signup-btn" >Sign Up</button>
        </form>
        </div>
        
        </div>`;
    }
}

//signup end

//signin start
const signinData = document.createElement('template');
signinData.innerHTML = `
<div class="container-signin" id="signin-box">
<div class="col-left">
<div class="login-text">
  <P class="login-text-actual">Create Your Account.<br>For Free!</p></div>
  <button class="btn-signup" onclick="signupPopup()">Create new account</button>

</div>
<div class="col-right">
<form action="" onsubmit="signInNow(event)">
  <h2>Sign In</h2>
  <input type="email" placeholder="Enter Email" name="email" required id="email">
  <input type="password" placeholder="Enter Password" name="password" required id="password"
    minlength="8" maxlength="16">
  <button type="submit" class="btn">Sign In</button>
</form>
</div>

</div>`;
class Signin extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = signinData.innerHTML;
    }
}

//signin end

//single note start
class MyNote extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div class="note" id="${this.getAttribute('id')}">
      <div class="note-head">
      <img src="${this.getAttribute('imgSrc')}" alt="" class="user-image">
      <p class="posted-by">${this.getAttribute('name')}</p>
      <h3 id="topic-head">@${this.getAttribute('note-head')}</h3>
      </div>
      <p class="topic-content">${this.getAttribute('note-content')}</p>
      <div class="tools">
          <p class="like-count">${this.getAttribute('like')}</p>
          <button class="like" id="l${this.getAttribute('id')}"><img src="${this.getAttribute('like-btn')}" alt="" class="btn-image"></button>
          <p class="comment-count" >${this.getAttribute('comment-count')}</p>
          <button class="comment open-comment" id="c${this.getAttribute('id')}"><img src="images/comment.png" alt="" class="btn-image"></button>
          <button class="comment close-comment" id="ccs${this.getAttribute('id')}"><img src="images/comment.png" alt="" class="btn-image"></button>
         <p class="posted-on">posted on :${this.getAttribute('posted')}</p>
      </div>
      <hr>
      <div class="comment-section" id="cs${this.getAttribute('id')}">
      <div class="comment-content">
          <form role="form" id="form-add-post"  autocomplete="off" >
              <div class="all-comments" id="all-comm${this.getAttribute('id')}">
              </div>
              <img src=${this.getAttribute('user-comment')} class="comment-img">
              <label class="form-group">
                  <textarea id="post-comment${this.getAttribute('id')}" class="post-comment" name="content" oninvalid="this.setCustomValidity('')" oninput="setCustomValidity('')" rows="2" cols="4" maxlength="50"
                      placeholder="Write Your Comment......" required=""></textarea>
              </label>
              <button type="submit" class="submit-comment"><img src="images/send.png" alt="" class="btn-image"></button>
          </form>
      </div>
      </div>
      </div>`;
    }

}

//single note end



//add data
const addData = document.createElement('template');
addData.innerHTML = ` <div class="popup">
<div class="popup-content">
    <button id="close-popup" onclick="closePopup()"><img src='images/back.png' class="btn-image"></button>
    <form  role="form" id="form-add-post" autocomplete="off" onsubmit="noRefresh()">
        <label class="form-group">
            <input type="text" name="heading" id="post-heading" maxlength="15" placeholder="Your Topic"
                required>
        </label>
        <label class="form-group">
            <textarea id="post-content" name="content" rows="8" cols="15" placeholder="Write Something....."
                required></textarea>
        </label>
        <button type="submit" class="submit" onclick="addNewNote()">Add Post</button>
        <button type="submit" class="submit-update">Update</button>
    </form>
</div>
</div>`;

class AddData extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = addData.innerHTML;
    }
}
//add data end

//header start
const headerData = document.createElement('template');
headerData.innerHTML = `<div class="container-fluid">
<div class="row">
<div class="col col-lg-6 col-md-12 col-sm-auto">
<shadow-timer></shadow-timer>
</div>
<div class="col text-end col-lg-6 col-md-12 col-sm-auto">
<p id="current-user"></p>
    <img src="" alt="" class="profile-image" id="profile-img" onclick="openProfilePopup()">
    <a href="index.html" onClick=logout() class="logout">Log Out</a>
    </div>
</div>
<nav class="navbar navbar-expand-lg">
<a class="navbar-brand" href="#">Poster</a>

<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="navbar-nav">
        <li class="nav-item" id="home" onClick="allPosts()">All Posts </li>
        <li class="nav-item" id="add-note" onClick="openPopup()">Add Posts</li>
        <li class="nav-item" onClick="myPosts()" id="my-post">My Posts </li>     
  </ul>
</div> </nav> </div>`;

class Header extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = headerData.innerHTML;
        this.querySelector('#current-user').innerHTML = "Welcome " + this.getAttribute('name');
        this.querySelector('#profile-img').src = this.getAttribute('imgSrc');
    }
}
//header end

class Timer extends HTMLElement {
    constructor() {
        super();

        const shadowTimer = this.attachShadow({ mode: 'open' });
        this.showTime = document.createElement('p');
        this.loginTime = JSON.parse(sessionStorage.getItem('loginTime'));
        const styling = document.createElement('style');
        styling.textContent = this.timerStyle();
        setInterval(this.myTimer.bind(this), 1000);
        shadowTimer.append(styling);
        shadowTimer.append(this.showTime);
    }

    myTimer() {
        let now = new Date().getTime();
        let span = now - this.loginTime;
        let days = Math.floor(span / (1000 * 60 * 60 * 24));
        let hours = Math.floor((span % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((span % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((span % (1000 * 60)) / 1000);
        this.showTime.innerHTML = `Loggedin since : ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    timerStyle() {
        return `p{
                font-size:14px;
                font-weight:600;
                width:fit-content
            }`;
    }
}



customElements.define('single-note', MyNote);
customElements.define('sign-in', Signin);
customElements.define('sign-up', Signup);
customElements.define('add-data-popup', AddData);
customElements.define('my-header', Header);
customElements.define('shadow-timer', Timer);