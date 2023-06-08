/*============= menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*============= sticky navbar ==========*/
let header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    /*============= remove menu icon navbar when click navbar link(scroll)==========*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

/*============= adaptive navbar ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.id;

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            });
        }
    })
});
/*============= swiper ==========*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
/*============= dark light mode  ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');
function setLightMode(state) {
    if (state === 'off') {
        // its dark mode!
        darkModeIcon.classList.remove('bx-sun');
        darkModeIcon.classList.add('bx-moon');
        document.body.classList.add('dark-mode');
    } else {
        // its light mode!
        darkModeIcon.classList.remove('bx-moon');
        darkModeIcon.classList.add('bx-sun');
        document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('isLightModeOn', state);
}

let currentMode = localStorage.getItem('isLightModeOn', 'on');
setLightMode(currentMode);

darkModeIcon.onclick = () => {
   currentMode = currentMode === 'on' ? 'off' : 'on';
   setLightMode(currentMode);
};
/*============= scroll reveal  ==========*/
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200,

});
ScrollReveal().reveal('.home-content,.heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
/*============= form validation  ==========*/
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

function displayError(errMsg) {
    errorMessage.innerText = errMsg;
}

function displaySuccessMessage(msg) {
    successMessage.innerText = msg;
}

function validateName(){
    var name = document.getElementById('contact-name').value;

    if(name.length == 0){
        return 'Name is required';
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        return 'Write full name';
    }
    return true;
}
function validatePhone() {
    var phone = document.getElementById('contact-phone').value;

    if(phone.length == 0){
        return 'Phone no is required.';
    }
    if(phone.length !==10){
        return 'Phone no should be 10 digits.';

    }
    if(!phone.match(/^[0-9]{10}$/)){
        return 'Only digits please.';
    }
    //phoneError.innerHTML = '<i class="bx bx-check"></i>';
    return true;
}
function validateEmail() {
    var email = document.getElementById('contact-email').value;
    if(email.length == 0){
       return 'Email is required';
    }
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        return 'Email invalid.';
    }
    //emailError.innerHTML = '<i class="bx bx-check"></i>';
    return true;
}
function validateSubject(){
    var subject = document.getElementById('contact-subject').value;
    var required = 10;
    var left = required - subject.length;

    if(left > 0){
        return `${left} more characters required for subject.`
    }
    //subjectError.innerHTML = '<i class="bx bx-check"></i>';
    return true;

}
function validateMessage(){
    var message = document.getElementById('contact-message').value;
    var required = 30;
    var left = required - message.length;

    if(left > 0){
        return `${left} more characters required for message.`;
    }
    //messageError.innerHTML = '<i class="bx bx-check"></i>';
    return true;
}

$("#submit-form").submit((e)=>{
    e.preventDefault();

    let nameValidation = validateName();
    if (nameValidation !== true) {
        return displayError(nameValidation);
    }
    let emailValidation = validateEmail();
    if (emailValidation !== true) {
        return displayError(emailValidation);
    }
    let phoneValidation = validatePhone();
    if (phoneValidation !== true) {
        return displayError(phoneValidation);
    }
    let subjectValidation = validateSubject();
    if (subjectValidation !== true) {
        return displayError(subjectValidation);
    }
    let messageValidation = validateMessage();
    if (messageValidation !== true) {
        return displayError(messageValidation);
    }

    displayError('');
    displaySuccessMessage('Sending....');

    $.ajax({
        url:"https://script.google.com/macros/s/AKfycby4xKCZ1a2q2b9WJ8ewcqCU-tnIwFhF4LjFNp5LNUHFTPISNL-uvY2SVbrIWF5fZt81/exec",
        data:$("#submit-form").serialize(),
        method:"post",
        success:function (response){
            document.getElementById('submit-form').reset();
            displaySuccessMessage("Form submitted successfully.");
        },
        error:function (err){
            displayError("An error occured.");
        }
    })
})