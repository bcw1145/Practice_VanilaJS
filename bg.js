const body = document.querySelector("body");

const IMG_NUMBER=5;

function paintImage(imgNumber){
    const image= new Image();
    //const image= document.createElement("img");
    image.src=`/images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function getRandomNumber(){
    const number= Math.floor(Math.random()*IMG_NUMBER)+1;
    return number;
}

function init(){
    const randomNumber =getRandomNumber();
    paintImage(randomNumber)
}

init();