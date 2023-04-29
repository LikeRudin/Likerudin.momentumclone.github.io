window.drawBackgroundImage = function () {
    const bodyTag = document.querySelector("body");
    const backgrounds = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];
    const numImages = backgrounds.length;

    const Index = Math.floor((Math.random() * numImages));
    const chosenImage = backgrounds[Index];
    bodyTag.style.backgroundImage = `url("public/images/background/${chosenImage}")`;
}
window.initBackgroundImage = function () {
    const bodyTag = document.querySelector("body");
    bodyTag.style.backgroundImage ="none";
}


drawBackgroundImage();

