console.log("inside stickyScript");
let flag = false;
let parent = null;

function createSticky() {

  //Html Elemnts are created
  const body = document.querySelector("body");
  const stickyPad = document.createElement("div");
  const nav = document.createElement("div");
  const minimize = document.createElement("div");
  const close = document.createElement("div");
  const textarea = document.createElement("textarea");

  // attributes
  stickyPad.setAttribute("class", "sticky-pad");
  nav.setAttribute("class", "nav");
  minimize.setAttribute("class", "minimize");
  close.setAttribute("class", "close");
  textarea.setAttribute("class", "writing-pad");

  // added to DOM
  nav.appendChild(minimize);
  nav.appendChild(close);
  stickyPad.appendChild(nav);
  stickyPad.appendChild(textarea);
  body.appendChild(stickyPad);

  // textarea.textContent="something"
  close.addEventListener("click", onclose);
  minimize.addEventListener("click", onminmize);

  // move a sticky
  stickyPad.addEventListener("mousedown", onmouseDown);
  stickyPad.addEventListener("mousemove", onmousemove);
  stickyPad.addEventListener("mouseup", onmouseEnd);
  parent = stickyPad;

}

function onclose(event) {
  // console.log(event);
  const stickyPad = event.target.parentElement.parentElement;
  const body = event.target.parentElement.parentElement.parentElement;
  //  stickyPad = event.target.parentElement.parentElement;
  body.removeChild(stickyPad);
  // console.log(stickyPad);
}
function onminmize(event) {
  if (flag === false) {
    event.target.parentElement.parentElement.children[1].style.display = "none";
    flag = true;
  } else if (flag) {
    event.target.parentElement.parentElement.children[1].style.display = "block";
    flag = false;
  }
}

let isStickyDown = false;
let myclientX = null;
let myclientY = null;
let prevTop = null;
let prevleft = null;

function onmouseDown(event) {
  console.log(event.target);
  isStickyDown = true;
  // console.log(event);
  myclientX = event.clientX;
  myclientY = event.clientY;
  // const { top, left } = event.target.getBoundingClientRect();
  // prevTop = top;
  // prevleft = left;
}

function onmousemove(event) {
  if (!isStickyDown) { return };
  let clientX = event.clientX;
  let clientY = event.clientY;
  
  offsetX = clientX - myclientX;
  offsetY = clientY - myclientY;

  let { top, left, size } = event.currentTarget.getBoundingClientRect();
  
  //   parent.style.transform = `translate(${offsetX}px,${offsetY})`;
  event.currentTarget.style.top = top + offsetY + "px";
  event.currentTarget.style.left = left + offsetX + "px";
  myclientX = clientX;
  myclientY = clientY;

}

function onmouseEnd(event) {
  isStickyDown = false;
}

