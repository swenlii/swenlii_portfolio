//let _lt = res.locals._lt; // to fix bugs in web storm (useless string)
AOS.init();

// карусель отзывов

let slidePosition = 1;
SlideShow(slidePosition);

// forward/Back controls
function plusSlides(n) {
    if(!slidePosition) slidePosition = 1;
    SlideShow(slidePosition += n);
}

//  images controls
function currentSlide(n) {
    if(!slidePosition) slidePosition = 1;
    SlideShow(slidePosition = n);
}


function SlideShow(n) {
    let i;
    let slides = document.getElementsByClassName("Containers");
    if (n > slides.length) {slidePosition = 1}
    if (n < 1) {slidePosition = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slidePosition-1].style.display = "block";
}

//подсказки
let tooltips = document.getElementsByClassName('tooltip');
let blockTool = document.getElementById('what-can-i-do');
let timeout;
for(let i = 0; i < tooltips.length; i++){
    tooltips[i].addEventListener('click', () => {
        if (timeout) clearTimeout(timeout);
        let t = tooltips[i].getAttribute('tooltip');
        console.log(t);
        blockTool.classList.add("add-tooltip");
        blockTool.innerText = t;
        timeout = setTimeout("time_tooltip()", 7000);
    });
}

function time_tooltip () {
    blockTool.classList.remove("add-tooltip");
    blockTool.innerText = 'What can I do?';
}

//карточки работы
let cards = document.getElementsByClassName('one-work');
let nextButton = document.getElementsByClassName('next-button');
let currCard = 0;
nextClick = () => {
    console.log(currCard);
    cards[currCard].classList.remove("card-current");
    cards[currCard].classList.add('card-anim');
    currCard++;
    if (currCard >= cards.length) currCard = 0;
    cards[currCard].classList.add("card-current");

    window.requestAnimationFrame(function(time) {
        window.requestAnimationFrame(function(time) {
            cards[currCard].classList.remove('card-anim');
        });
    });
};

for(let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', nextClick);
    nextButton[0].addEventListener('click', nextClick);
}

function handleClick(myRadio) {
    document.cookie = 'lang = ' + myRadio.value;
    window.location.reload();
}

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('submit!');
    console.log(event.target[0].value);
    let data = new FormData(document.getElementById('contact-form'));
    let output = "{";
    for (const entry of data) {
        output += "\"" + entry[0] + "\":\"" + encodeURIComponent(entry[1]) + "\",";
    }
    output = output.slice(0, -1);
    output += '}'
    console.log(output);
    let post = JSON.parse(output);
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
        alert('answer');
    };
    httpRequest.open('POST', '/send', true);
    httpRequest.send(JSON.stringify(post));
});