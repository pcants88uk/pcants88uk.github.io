//default
var activeTool = "pencil";
var currentOptions = ".pencil-options";
ctx.strokeStyle = "red";
ctx.lineWidth = 3;

var pencil = document.querySelector(".pencil");
var eraser = document.querySelector(".eraser");
var sticky = document.querySelector(".sticky");
var download = document.querySelector(".download");
var canvas = document.querySelector(".board");
var red = document.querySelector(".redo");

var uploadImage = document.querySelector(".uploadImage");
var pencilOptions = document.querySelector(".pencil-options")
var eraserOptions = document.querySelector(".eraser-options")
var fileInput = document.getElementById("fileInput");

// ctx.lineWidth = 5;
// ctx.strokeStyle = "red";

function handleToolChange(tool) {
    if (tool == "eraser") {
        sticky.classList.remove("active");
        pencil.classList.remove("active");
        uploadImage.classList.remove("active");
        download.classList.remove("active");

        if (activeTool == "eraser") {
            if (eraserOptions.classList[1] === "show") {
                pencilOptions.classList.remove("show");
                return;
            }
        } else {
            eraser.classList.add("active");
            // ctx.strokeStyle = "white";
            activeTool = "eraser";

        }
        ctx.globalCompositeOperation = "destination-out";

    } else if (tool == "pencil") {
        eraser.classList.remove("active");
        uploadImage.classList.remove("active");
        download.classList.remove("active");
        sticky.classList.remove("active");

        if (activeTool == "pencil") {
            if (pencilOptions.classList[1] === "show") {
                pencilOptions.classList.remove("show");
                return;
            }

            pencilOptions.classList.add("show"); //show drop down menu.
        } else {
            pencil.classList.add("active");
            activeTool = "pencil";
            // ctx.strokeStyle = "red";

        }
        ctx.globalCompositeOperation = "source-over";

    } else if (tool == "sticky") {

        sticky.classList.add("active");
        pencil.classList.remove("active");
        eraser.classList.remove("active");
        uploadImage.classList.remove("active");
        download.classList.remove("active");

        createSticky();

    } else if (tool == "uploadImage") {
        uploadImage.classList.add("active");
        pencil.classList.remove("active");
        eraser.classList.remove("active");
        sticky.classList.remove("active");
        download.classList.remove("active");

        fileInput.click();
        createImageSticky();

    } else if (tool == "downloadImage") {
        download.classList.add("active");
        sticky.classList.remove("active");
        pencil.classList.remove("active");
        eraser.classList.remove("active");
        uploadImage.classList.remove("active");

        const anchor = document.createElement("a");
        const download_img = function (anchor) {
            var image = canvas.toDataURL();
            anchor.href = image;
            anchor.download = "board.jpeg";
            anchor.click();

            // body.appendChild(anchor);
            // body.removeChild(anchor);
        };
        download_img(anchor);

    } else if (tool == "redoCanvas") {
        //  redoChanges();
    }
}

function changeSize(value) {
    ctx.lineWidth = value;
}

function handleColorChange(color) {
    ctx.strokeStyle = color;
}