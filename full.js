// check if there is color in localstorage
let maincolors = localStorage.getItem("color-option");

if (maincolors !== null) {

    document.documentElement.style.setProperty("--main-color", maincolors);

    // check for active class
    // remove active class from all colors list items
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

    // add active class on elements with datacolor = local item
        if (element.dataset.color === maincolors) {
            
            element.classList.add("active")
        };
    });
};


// toggle spin class on icon

document.querySelector(".toggle .icon").onclick = function () {
    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open")
}

// switch colors
const colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach(li => {

    li.addEventListener("click", (e) => {

        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // set color-option into localstorage
        localStorage.setItem("color-option", e.target.dataset.color);

        handleactive(e)

    });

});



// select landing elements
let land = document.querySelector(".landing");

// get array of imgs
let imgsarray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];

let bgoption = true;

let bginterval;

if (localStorage.background !== null) {

    if (localStorage.background === "true") {
        bgoption = true;
    } else {
        bgoption = false;
    }

    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if (localStorage.background === "true") {
        document.querySelector(".yes").classList.add("active");
    } else {
        document.querySelector(".no").classList.add("active");
    };

};




// function to randomize imgs

function randomize() {

    if (bgoption === true) {
        bginterval = setInterval(() => {
    // get random number
    let randomnumber = Math.floor(Math.random() * imgsarray.length);
    // change background img url
    land.style.backgroundImage = 'url("imgs/' + imgsarray[randomnumber]+' ")';
}, 5000);
    }else{}
}
randomize()



// random background options
const randback = document.querySelectorAll(".random-backgrounds span");

randback.forEach(span => {

    span.addEventListener("click", (e) => {
        
        handleactive(e)

        if (e.currentTarget.dataset.bg === "yes") {
            bgoption = true;
            randomize()
            localStorage.setItem("background", true)
        } else {
            bgoption = false;
            clearInterval(bginterval)
            localStorage.setItem("background", false)
        }
    });
});





let ourskills = document.querySelector(".skills");

window.onscroll = function () {

    let skillsofsettop = ourskills.offsetTop;

    let skillsouterheight = ourskills.offsetHeight

    let windowheight = this.innerHeight;

    let windowscrolltop = this.pageYOffset;



    if (windowscrolltop > skillsofsettop + skillsouterheight - windowheight) {

        let skills = document.querySelectorAll(".skill-box .skill-progress span")

        skills.forEach(skill => {

            skill.style.width = skill.dataset.prog;

        })

    }

};

//create popup with the image
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach(img => {

    img.addEventListener("click", (e) => {

        //create overlay element
        let overlay = document.createElement("div");

        // add class to overlay
        overlay.className = "popup-overlay";

        //append overlay to the body
        document.body.appendChild(overlay);

        //create popup box
        let popupbox = document.createElement("div");

        //add class to popupbox
        popupbox.className = "popup-box";

        if (img.alt !== null) {

            //create heading
            let imgheading = document.createElement("h3");

            //create text
            let imgtext = document.createTextNode(img.alt);

            // add text to heading
            imgheading.appendChild(imgtext);

            //add heading to popup
            popupbox.appendChild(imgheading)
        }

        //create the img
        let popupimg = document.createElement("img");

        //set image source
        popupimg.src = img.src;

        //add img to popup bo
        popupbox.appendChild(popupimg);

        // add popup box to body
        document.body.appendChild(popupbox);

        // create close span
        let closebutton = document.createElement("span");

        //create the close span text
        let closebuttontext = document.createTextNode("x");

        //add class to span
        closebutton.className = "close-button";

        //add text to span
        closebutton.appendChild(closebuttontext);

        //add close button to popup

        popupbox.appendChild(closebutton);

    });
});

// close popup
document.addEventListener("click", function (e) {

    if (e.target.className === "close-button") {

        //remove the current popup
        e.target.parentNode.remove();

        //remove the overlay
        document.querySelector(".popup-overlay").remove();
    };
});


const allbullets = document.querySelectorAll(".nav-bullets");

const alllinks = document.querySelectorAll(".links a")

function scrolltosomewhere(elements) {

    elements.forEach(ele => {


    ele.addEventListener("click", (e) => {
    
        e.preventDefault();

        document.querySelector(e.target.dataset.section).scrollIntoView({
        
            behavior: 'smooth'

        });

    });

});

};
scrolltosomewhere(allbullets)
scrolltosomewhere(alllinks)


function handleactive(ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    
        element.classList.remove("active");

    });

    ev.target.classList.add("active");

}


let bulletsspan = document.querySelectorAll(".bullets-option span");

let bulletscontainer = document.querySelector(".nav-bullets");

let bullrtlocalitem = localStorage.getItem("bullets-option");

if (bullrtlocalitem !== null) {
    
    bulletsspan.forEach(span => {

        span.classList.remove("active");

    });

    if (bullrtlocalitem === "block") {
        
        bulletscontainer.style.display = "block"
        
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {
        
        bulletscontainer.style.display = "none"
        
        document.querySelector(".bullets-option .no").classList.add("active");

    }

}

bulletsspan.forEach(span => {

    span.addEventListener("click", (e) => {

        handleactive(e)

        if (span.dataset.display === "show") {
        
            bulletscontainer.style.display = "block"

            localStorage.setItem("bullets-option", "block");

        } else {
        
            bulletscontainer.style.display = "none"

            localStorage.setItem("bullets-option", "none");

        };

        handleactive(e)

    });

});

// reset button
document.querySelector(".reset-options").onclick = function () {
    
    localStorage.removeItem("bgoption");
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color-option");

    window.location.reload();

}

let togglebtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

togglebtn.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    tlinks.classList.toggle("open");

};

document.addEventListener("click", (e) => {

    if (e.target !== togglebtn && e.target !== tlinks) {

        if (tlinks.classList.contains("open")) {

            togglebtn.classList.toggle("menu-active");

            tlinks.classList.toggle("open");

        }

    }

});

tlinks.onclick = function (e) {

    e.styopPropagation();

}