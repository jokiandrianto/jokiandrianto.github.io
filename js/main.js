/*==== show menu ====*/
const showMenu = (toggleId,navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==== remove menu mobile ====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*====
$('.page-scroll').on('click', function(e){

    //ambil isi href
    var tujuan = $(this).attr('href');
    //tangkap elemen ybs
    var elemenTujuan = $(tujuan);

    //pindahkan scroll
    $('body').animate({
        scrollTop: elemenTujuan.offset().top - 50
    }, 1250, 'swing');

    e.preventDefault();
    })
    ===*/

/*==== scroll sections active link ====*/
/*=== const sentions = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY =window.pageXOffset

    sentions.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        } 
    })
}
window.addEventListener('scroll', scrollActive)
===*/

/*==== change background header ====*/
/*=== 

function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >= 200) header.classList.add(scroll-header); else header.classList.remove(scroll-header)
}
window.addEventListener('scroll', scrollHeader)
===*/


/*==== show scroll top ====*/
/*===
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top')
    if(this.scrollY >= 560) scrollTop.classList.add(show-scroll); else scrollTop.classList.remove(show-scroll)
}
window.addEventListener('scroll', scrollTop)
===*/



// loading
/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resize(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
addEventListener('resize',resize);

let particles = [];
function createParticles(count){
    particles=[];
    for(let i=0;i<count;i++){
        particles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            r:Math.random()*2+1,
            vx:(Math.random()-.5)*0.7,
            vy:(Math.random()-.5)*0.7
        });
    }
}

createParticles(60);

function drawParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='rgba(14,165,233,.7)';
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.x+=p.vx;
        p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===== LOADING LOGIC ===== */
const percentEl = document.getElementById('percent');
const statusEl  = document.getElementById('status');
const cube      = document.getElementById('cube');
const loader    = document.getElementById('loader3d');
const content   = document.getElementById('content');

let percent = 0;
let pageReady = false;

/* FAKE 0–90 */
const fake = setInterval(()=>{
    if(percent < 90 && !pageReady){
        percent += Math.random()*3;
        if(percent>90) percent=90;
        updateStage();
    }
},120);

/* REAL 100 */
window.addEventListener('load',()=>{
    pageReady = true;
    percent = 100;
    updateStage();
    finish();
});

function updateStage(){
    percentEl.innerText = Math.floor(percent)+'%';

    if(percent < 40){
        cube.style.animation = 'spinSlow 6s linear infinite';
        statusEl.innerText = 'Preparing assets...';
        createParticles(60);

    }else if(percent < 70){
        cube.style.animation = 'spinFast 3s linear infinite';
        statusEl.innerText = 'Loading resources...';
        createParticles(120);

    }else{
        cube.style.animation = 'spinSlow 8s linear infinite';
        statusEl.innerText = 'Finalizing...';
        createParticles(180);
    }
}

function finish(){
    clearInterval(fake);

    setTimeout(()=>{
        loader.style.opacity='0';
        loader.style.pointerEvents='none';

        setTimeout(()=>{
            loader.remove();
            content.style.visibility='visible';
            document.body.classList.remove('loading');
            document.body.style.overflow='auto';
            document.documentElement.style.overflow='auto';
        },600);
    },300);
}
