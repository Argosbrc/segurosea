/* =====================================================
   S.E.A. SEGUROS
   MAIN.JS
===================================================== */



/* ================= MENU MOBILE ================= */


const menuButton = document.getElementById("menu-button");

const nav = document.getElementById("nav");



if(menuButton){


    menuButton.addEventListener("click",()=>{


        nav.classList.toggle("active");


    });


}





/* Cerrar menú cuando se toca un enlace */


const navLinks = document.querySelectorAll(".nav a");


navLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        nav.classList.remove("active");


    });


});






/* ================= ANIMACIONES SCROLL ================= */


const elements = document.querySelectorAll(

    ".card, .service-card, .about-image, .about-text, .methodology"

);



const observer = new IntersectionObserver(

(entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("show");


        }


    });



},

{

    threshold:0.15

}

);




elements.forEach(element=>{


    element.classList.add("hidden");

    observer.observe(element);



});






/* ================= AÑO FOOTER ================= */


const year = new Date().getFullYear();


const footerText = document.querySelector("footer p");


if(footerText){


    footerText.innerHTML =

    `S.E.A. Seguros © ${year} - Todos los derechos reservados`;


}