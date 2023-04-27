const backgrounds = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];


const body = document.querySelector("body");

const numImages = backgrounds.length;

const drawBackgroundImage = function () {
    const Index = Math.floor((Math.random() * numImages));
    const chosenImage = backgrounds[Index];
    body.style.backgroundImage = `url("public/images/background/${chosenImage}")`;
    console.log(body.style.backgroundImage);
}

drawBackgroundImage();