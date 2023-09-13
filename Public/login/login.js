// function login(e) {
//     e.preventDefault();
//     console.log(e.target.name);
//     const form = new FormData(e.target);
  
//     const loginDetails = {
//         email: form.get("email"),
//         password: form.get("password")
  
//     }
//     console.log(loginDetails)
//     axios.post('http://localhost:3000/user/login',loginDetails).then(response => {
//             console.log(response.data.token);
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('email', response.data.email);
           
//             window.location.href = "../home/homepage.html"
        
//     }).catch(err => {
//         document.body.innerHTML += `<div style="color:red;">${err} <div>`;
//     })
//   }
  




async function login(e) {
    try {
        e.preventDefault();
        console.log(e.target.name);
        const form = new FormData(e.target);

        const loginDetails = {
            email: form.get("email"),
            password: form.get("password")
        };
        console.log(loginDetails);

        const response = await axios.post('http://localhost:3000/user/login', loginDetails);

        console.log(response);
        if(response.status == 201){
         localStorage.setItem('token', response.data.token);
         localStorage.setItem('email', response.data.email);
         window.location.href = "../home/homepage.html";
        }
    } catch (err) {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    }
}

//   function forgotpassword() {
//     window.location.href = "../html/forgetPassword.html"
//   }
  function signUpNew() {
      window.location.href = "../signup/signup.html"
  }
  