let key = "something";

//signup function
function signUpNow(e) {
  let Users=[];
  let userExists=0;
 if(localStorage.getItem('Users')!==null) Users=JSON.parse(localStorage.getItem('Users'));
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value.toLowerCase();
  let pass = document.getElementById("signup-password").value;
  let encrypted = CryptoJS.AES.encrypt(pass, key);

  let id = new Date().getTime();
  const image = "";
  let user = {
    id: id,
    name: name,
    email: email,
    password: encrypted.toString(),
    image: image
  };

  Users.forEach((node)=>{
    if (node.email==email) {
      userExists=1;
      window.alert("Account Already Exists");
      location.href="index.html";
      
    }
  });
  if(userExists==0){
    // storing input from register-form
    Users.push(user);
    let json = JSON.stringify(Users);
    localStorage.setItem('Users', json);
    window.alert("Account Created Successfully");
    let currentUser = {
      email: email,
      id: id,
      password: encrypted.toString(),
      name: name,
      image: image
    }
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    sessionStorage.setItem('loginTime', JSON.stringify(new Date().getTime()));
    location.href= "home.html";
   
  }
  e.preventDefault();
}
