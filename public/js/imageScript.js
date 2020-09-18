function createImageSticky() {
    fileInput.addEventListener("change", function(event){
        var fileInput = document.getElementById("fileInput");

        const body = document.querySelector("body");
        console.log(event.currentTarget.files);
        const file = event.currentTarget.files[0];
        var img = document.createElement("img");

        img.src = window.URL.createObjectURL(file);
        img.height = 200;
        img.width = 200;
        img.style.position = "absolute";
        img.style.top = "10rem";
        img.style.left = "10rem";

        body.appendChild(img);

    })
}