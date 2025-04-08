import { signIn } from "../utils/api.js";

export const signInUser = async () => {
    const inputUsername = document.querySelector(".signin-username").value;
    const inputPassword = document.querySelector(".signin-password").value;
    const adminButton = document.querySelector('.admin-page-link')

    

    
    if(inputUsername === '' || inputPassword === ''){
        alert('Fyll i alla fält!')
        return
    }else{
        const userData = {
            username: inputUsername,
            password: inputPassword,
        };
        document.querySelector(".signin-username").value = ''
        document.querySelector(".signin-password").value = '';
        await signIn(userData)
    }
  };

