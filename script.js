const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
let timeout;

function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration:1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem",{
            y: 0,
            duration:1.5,
            delay: -1,
            stagger: .2,
            ease: Expo.easeInOut
        })
        .from("#landingfooter",{
            y: '-10',
            opacity: 0,
            duration:1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}
function circleSkew(){
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        let xdiff = dets.clientX - xprev;
        let ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(.8,1.2,xdiff);
        yscale = gsap.utils.clamp(.8,1.2,ydiff);

        xprev= dets.clientX;
        yprev= dets.clientY;

        circlemousefollower(xscale,yscale);
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        },100);

    })
}
function circlemousefollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
circlemousefollower();
firstPageAnim();
circleSkew();

// const menuBtn = document.getElementById("menu-btn");
// const navbar = document.getElementById("navbar");


// menuBtn.addEventListener("click", () => {
//     navbar.classList.toggle("open");
// });

document.querySelectorAll(".elem").forEach(function(elem){
    let rotate = 0;
    let diffrot = 0;
    elem.addEventListener("mousemove",function(dets){
        let diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate; 
        rotate = dets.clientX;
        
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot * 0.5)
        });
    });
    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })});
})
