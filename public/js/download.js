// const download1 = document.querySelector(".download");
download.addEventListener("click",function(event){
    event.preventDefault();
    const body = document.createElement("body");
    const anchor = document.createElement("a");
    var image = canvas.toDataURL("image/jpg");
    anchor.href = image;
    anchor.click();
    body.appendChild(anchor);
    body.removeChild(anchor);

})
