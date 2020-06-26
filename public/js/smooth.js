//Applies smooth scroll to anchors
document.querySelectorAll('#dropdowncontent *').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        //Block the default behavior
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
});
