//Check If There's Local Storage Color Option
let mainCoolors = localStorage.getItem("color_option");
// If There's Color Item In Local Storage
if (mainCoolors !== null) {   

    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"))

    //remove Active class From All Olors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        // Add Active Class Elemnt With Data Color === Local storage Item
    if (element.dataset.color === mainCoolors) {

        //Add Active Class
        element.classList.add("active");

    }    
    
    });


}

//Random Background Option
let backgroundOption = true;

//Varibale To Control the BackgroundInterval
let backgroundInterval;

//Check If There's Settings Gear
let backgroundLocalItem = localStorage.getItem("background_option");

//Chech If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
    
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    }else {
        
        backgroundOption = false;
        
    }
    
    //Remove Active Class From All Spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true') {

        document.querySelector(".random-backgrounds .yes").classList.add("active");
        
    }else {
        
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    
    //Toggle Class Fa-spin Four Rotate On Self
    this.classList.toggle("fa-spin");
    
    
    //Toggle Class Open Om Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

//Loop On All List Items
colorsLi.forEach(li => {

    //Click On Every List Items
    li.addEventListener("click", (e) => {
        

        //Set Color On Root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
        //Set Color On Loacal Storage
        localStorage.setItem("color_option", e.target.dataset.color);
        
        // Active Class Function 
        handleActive(e);

    });
});

//Switch Random Backgrounds Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

//Loop On All Spans
randomBackEl.forEach(span => {

//Click On Every Span
span.addEventListener("click", (e) => {
    

    // Active Class Function 
    handleActive(e);

    if (e.target.dataset.background === 'yes') {
        
        backgroundOption = true;

        randomizeImgs();

        localStorage.setItem("background_option", true)
    
    }else {
        
        backgroundOption = false;
        
        clearInterval(backgroundInterval);
        localStorage.setItem("background_option", false)
    }
});


});



//Select Landing Page Elemnt
let landingPage = document.querySelector(".landing-page");

//Get Array Of Imgs
let imgsArray = ["img-1.jpg","img-2.jpg","img-3.jpg","img-4.jpg","img-5.jpg"];


//Function To Randomize Imgs
function randomizeImgs() {

    if (backgroundOption === true){
        
       backgroundInterval = setInterval(() => {
            
        // GEt Random Number
        let randomNumber = Math.floor(Math.random() * imgsArray.length);
            
        //Change Background Image Url
        landingPage.style.backgroundImage ='url("imgs/'+imgsArray[randomNumber] + '")';
            
        }, 10000);
        
        }
}

randomizeImgs();


//Select Skills Selector
let ourSkills =document.querySelector(".skills");
window.onscroll = function () {


    //Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // This.console.log(skillsOffsetTop);
    
    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    
    //Window Height
    let windowHeight = this.innerHeight;
   
    //Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        // this.console.log('skills section');
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });

    }

};

// Creat Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click',(e) => {
        //Creat Overlay Elemnt
        let overlay = document.createElement("div");
        
        //Add Class To Overlay
        overlay.className ='popup-overlay';

        // Append The Overlay To Body
        document.body.appendChild(overlay)

        //Creat The Popup
        let popupBox = document.createElement("div");


        //Add Class To Popup Box
        popupBox.className ='popup-box';
        
        if (img.alt !== null) {

            //Create Heading
            let imgHeading = document.createElement("h3");

            //Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            //Append The Text To The Heading
            imgHeading.appendChild(imgText);
            //Append The Heading To the Popup Box
            popupBox.appendChild(imgHeading);
        }
        
        //create The Image
        let popupImage = document.createElement("img");

        //Set img Source
        popupImage.src = img.src;

        //add Image To Popup Box
        popupBox.appendChild(popupImage);

        //Append The Popup Box To Body
        document.body.appendChild(popupBox);

        //Creae The Close Span
        let closeButton = document.createElement("span");

        //Create The Close Bytton Text
        let closeButtonText = document.createTextNode("X");

        //Append Text To Button
        closeButton.appendChild(closeButtonText);

        //Add Class To Close Button
        closeButton.className = 'close-button';
        
        //Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);

    });
});

// Close Popup
document.addEventListener('click',function (e) {

    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();

        // Remove Overly
        document.querySelector(".popup-overlay").remove();
    }

});

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");


//Select All Links
const allLinks = document.querySelectorAll(".links a");


function scrollToSomewhere(elements) {
    
    elements.forEach(ele => {
        
        ele.addEventListener("click", (e) => {
    
            e.preventDefault();
          
            document.querySelector(e.target.dataset.section).scrollIntoView({
          
                behavior:'smooth'
            });
        });
    });
}


scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);


//Handle Active State
function handleActive(ev) {

    //remove Active class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        
        element.classList.remove("active");
        
    });
    //Add Active Class On Self
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer =document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem("bullets_option");

if (bulletsLocalItem !== null) {
    
    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletsLocalItem === 'block') {

        bulletsContainer.style.display = 'block';
        
        document.querySelector(".bullets-option .yes").classList.add("active");
        
        
    }else {
        
        bulletsContainer.style.display = 'none';
        
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {
        
        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';
           
            localStorage.setItem("bullets_option","block");
        }else {
            
            bulletsContainer.style.display = 'none';
           
            localStorage.setItem("bullets_option","none");
        }
        handleActive(e);
    });
});

//Reset Settings Box
document.querySelector(".reset-option").onclick = function () {
   //Clear Local Storage
    localStorage.clear()
    window.location.reload();

};

//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    
    //Stop Propagation
    e.stopPropagation();
    // Toggle Class "menu-active"
    this.classList.toggle("menu-active");
    
    // Toggle Class "open"
    tLinks.classList.toggle("open");
    
}

// Click Anyywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    
    
    if(e.target !== toggleBtn && e.target !== tLinks) {
        
        //Check If Menu is Opend
        if (tLinks.classList.contains("open")) {
            
        // Toggle Class "menu-active"
         toggleBtn.classList.toggle("menu-active");
    
        // Toggle Class "open"
        tLinks.classList.toggle("open");
    
        }
    }
});



tLinks.onclick = function (e) {

    //Stop Propagation
    e.stopPropagation();
}





