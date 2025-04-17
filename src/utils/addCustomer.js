import { addCustomer } from '../utils/api.js'

export const addNewCustomer = async () => {
    const username = document.querySelector('.username').value
    const password = document.querySelector('.password').value
    const confirmPassword = document.querySelector('.confirm-password').value
    let newCustomer = {
        username: '',
        password: ''
    }
    if(username === '' || password === ''){
      alert('Fyll i alla fält!')
      return
    }
    if(password !== confirmPassword) {
        alert('Lösenorden matchar inte!')
        return
    }else{
        newCustomer = {
            username: username,
            password: password
        }
    }
    try {
        const result = await addCustomer(newCustomer);
        if (result) {

            alert('Kontot har skapats!')
            // Clear form on success
            document.querySelector('.username').value = '';
            document.querySelector('.password').value = '';
            document.querySelector('.confirm-password').value = '';
        }
    } catch (error) {
        console.error("Error in addNewCustomer:", error);
        alert('Ett fel uppstod när kunden skulle läggas till.');
    }
  }