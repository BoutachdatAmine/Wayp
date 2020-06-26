'use strict';


window.onload = () =>{
    console.log('Loaded');
    let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    console.log(loggedIn);
    
    form.fname.value = loggedIn.name.split(',')[0];
    form.lname.value = loggedIn.name.split(',')[1];
    form.mail.value = loggedIn.mail;
    form.phone.value = loggedIn.phone;
    form.adr1.value = loggedIn.adress1;
    form.adr2.value = loggedIn.adress2;
    // form.housenum.value = loggedIn.housenumber; ---> HouseNumber doesn't exist in database.
    form.zipCode.value = loggedIn.zipCode;
    form.city.value = loggedIn.city;

    document.getElementById('update').addEventListener('click', (e) =>{
        console.log('clicked');

        //Prevent default behaviour 
        e.preventDefault(); 

        //Updated user object. Use the attribute name for getting the POST values
        let updatedUser = {
            fname: document.querySelector("input[name=fname]").value,
            lname: document.querySelector("input[name=lname]").value,
            email: document.querySelector("input[name=mail]").value,
            phone: document.querySelector("input[name=phone]").value,
            adr1: document.querySelector("input[name=adr1]").value,
            adr2: document.querySelector("input[name=adr2]").value,
            city: document.querySelector("input[name=city]").value,
            country: document.querySelector("input[name=country]").value,
            zipCode: document.querySelector("input[name=zipCode]").value,
        }
       

        fetch("/updateProfile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        }).then(data => {
            console.log("User updated: ", data);
        }).catch(err => {
            console.error("User not updated: ", err);
        });
    });
}
