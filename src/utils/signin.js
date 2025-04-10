import { signIn } from "../utils/api.js";
import { closePopup } from "../../script.js";
import { isUserAdmin } from '../utils/isUserAdmin.js'
import { renderAdminLink } from "../scripts/index.js";
import { renderUsername } from "../scripts/index.js";


export const signInUser = async () => {
    const inputUsername = document.querySelector(".signin-username").value;
    const inputPassword = document.querySelector(".signin-password").value;

    if(inputUsername === '' || inputPassword === ''){
        alert('Fyll i alla fält!')
        return
    } else {
        const userData = {
            username: inputUsername,
            password: inputPassword,
        };
        
        document.querySelector(".signin-username").value = ''
        document.querySelector(".signin-password").value = '';
        
        try {
            const success = await signIn(userData);
            
            // Om inloggningen misslyckades, avbryt här
            if (!success) {
                return; 
            }
            // Om vi kom hit lyckades inloggningen
            renderUsername();
            renderAdminLink();
            closePopup();
            
            if (sessionStorage.getItem('redirectToCheckout') === 'true') {
                sessionStorage.removeItem('redirectToCheckout');
                
                setTimeout(() => {
                    window.location.href = "/pages/checkout.html";
                }, 200);
            }
        } catch (error) {
            // Hantera oväntade fel
            console.error('Inloggningsfel:', error);
            
        }
    }
};