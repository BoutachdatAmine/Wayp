'use strict';
document.getElementById('bye').addEventListener('click', () =>{
    localStorage.removeItem('loggedIn');
    window.location.href = "/logout";
    console.log('OK');
})
/*************************
 *      Hamburger        *
 *************************/
let humburger = document.querySelector('#hamburger');
humburger.addEventListener('click', () => {
    let mobileNav = document.querySelector('#mobileNavigation');
    mobileNav.classList.remove(`hide`);
});
let closeMobileNav = document.querySelector('#closeMobileNav');
closeMobileNav.addEventListener('click', () => {
    mobileNav.classList.add(`hide`);
});

/* ***********************
 *      Checkout
 *********************** */
if (document.querySelector('#checkout')) {
    let progressStatus = [`info`, `ship`, `pay`];
    let formPanel = [`form1`, `form2`, `form3`];
    let nextBtn = document.querySelector('.nextBtn');
    let headerStatus = document.querySelector('.disabledStatus');
    let current = 0;
    nextBtn.addEventListener('click', () => {
        //  Change status
        document.querySelector(`#${progressStatus[current]}`).classList.remove('currentStatus');
        document.querySelector(`#${formPanel[current]}`).classList.add('hide');
        current++;
        if (current === 1)
            nextBtn.innerHTML = "Payement";
        else if (current === 2)
            nextBtn.style.display = "none";
        document.querySelector(`#${progressStatus[current]}`).classList.add('currentStatus');
        document.querySelector(`#${formPanel[current]}`).classList.remove('hide');
    });
    //  Header progress status
    document.querySelector(`#${progressStatus[0]}`).addEventListener('click', () => { // Information
        //-- current > 0 ? console.log('Info') : console.log('not ok');
        //  Update progress Status bar
        document.querySelector(`#${progressStatus[0]}`).classList.add('currentStatus');
        document.querySelector(`#${progressStatus[1]}`).classList.remove('currentStatus');
        document.querySelector(`#${progressStatus[2]}`).classList.remove('currentStatus');
        //  Change form
        document.querySelector(`#${formPanel[0]}`).classList.remove('hide');
        document.querySelector(`#${formPanel[1]}`).classList.add('hide');
        document.querySelector(`#${formPanel[2]}`).classList.add('hide');
        // Update button value
        nextBtn.style.display = "block"
        nextBtn.innerHTML = "Shipping";
        current = 0;

    });
    document.querySelector(`#${progressStatus[1]}`).addEventListener('click', () => { // Shippint
        //--current >= 1 ? console.log('Shiping') : console.log('not ok');
        //  Update progress Status bar
        document.querySelector(`#${progressStatus[0]}`).classList.remove('currentStatus');
        document.querySelector(`#${progressStatus[1]}`).classList.add('currentStatus');
        document.querySelector(`#${progressStatus[2]}`).classList.remove('currentStatus');
        //  Change form
        document.querySelector(`#${formPanel[0]}`).classList.add('hide');
        document.querySelector(`#${formPanel[1]}`).classList.remove('hide');
        document.querySelector(`#${formPanel[2]}`).classList.add('hide');
        // Update button value
        nextBtn.style.display = "block"
        nextBtn.innerHTML = "Payement";
        current = 1;
    });
    document.querySelector(`#${progressStatus[2]}`).addEventListener('click', () => { // Pay
        //--current >= 2 ? console.log('Payement') : console.log('not ok');
        //  Update progress Status bar
        document.querySelector(`#${progressStatus[0]}`).classList.remove('currentStatus');
        document.querySelector(`#${progressStatus[1]}`).classList.remove('currentStatus');
        document.querySelector(`#${progressStatus[2]}`).classList.add('currentStatus');
        //  Change form
        document.querySelector(`#${formPanel[0]}`).classList.add('hide');
        document.querySelector(`#${formPanel[1]}`).classList.add('hide');
        document.querySelector(`#${formPanel[2]}`).classList.remove('hide');
        nextBtn.style.display = "none";
    });

}
/*************************
 *    Single Product     *
 *************************/
if (document.querySelector('#single_product')) {
    // Preview Image
    for (let i = 1; i < 4; i++) {
        let r = document.querySelector(`#imgPreview${i}`);
        r.addEventListener('click', () => {
            let src = document.querySelector(`.small_img${i}`).src;
            changeSrc(src);
        });
    }

    function changeSrc(src) {
        let a = document.querySelector('.mainImage');
        a.src = src;
    }
}