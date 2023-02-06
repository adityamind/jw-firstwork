
//signin popup
function signinPopup() {
  document.getElementById('signin-box').style.display = 'flex';
  document.getElementById('signup-box').style.display = 'none';
}

//signup popup
function signupPopup() {

  document.getElementById('signin-box').style.display = 'none';
  document.getElementById('signup-box').style.display = 'flex';
}

//signin function
function signInNow(e) {
  let email = (document.getElementById("email").value);
  email = email.toLowerCase();
  let password = document.getElementById("password").value;
  let Users=[];
  if(localStorage.getItem('Users')!==null) Users=JSON.parse(localStorage.getItem('Users'));
  let user="";
 Users.forEach(element => {
  if(element.email==email) user=element;
 });
 if(user==""){
  alert('please signup first');

 }
  else {
    let pass = user.password;
    let decrypted = CryptoJS.AES.decrypt(pass, key).toString(CryptoJS.enc.Utf8);
    if (decrypted !== password)
      window.alert("Wrong Password");
    else {
      let name = user.name;
      let image = user.image;
      let id = user.id;
      let currentUser = {
        email: email,
        id: id,
        password: pass,
        name: name,
        image: image
      }
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      sessionStorage.setItem('loginTime', JSON.stringify(new Date().getTime()));
      location.href = "/home.html";
    }
  }
  e.preventDefault();
}