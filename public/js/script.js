let interval = null;
let isDown = false;

var tools = document.querySelector(".tools");
var undo = document.querySelector(".undo");
var redo = document.querySelector(".redo");
var rect = tools.getBoundingClientRect();
var h = (rect.height);
var undoStack = [];
var redoStack = [];

const undoUP = (received) => {
    clearInterval(interval);
    interval = null;

    const point = {
        type: "undo up"
    }

    if (received === "unreceived") {
        socket.emit("message", point);
    }
}

const undoDOWN = (received) => {
        interval = window.setInterval(function () {
            if (undoStack.length <= 0) return;
            redoStack.push(undoStack.pop());
            redrawAll();
    
        }, 50);

    const point = {
        type: "undo down",
        interval
    }

    if (received === "unreceived") {
        socket.emit("message", point);
    }
};

const redoUP = (received) => {
    clearInterval(interval);
    interval = null;

    const point = {
        type: "redo up"
    }
    console.log(received);
    if (received === "unreceived") {
        socket.emit("message", point);
    }
};

const redoDOWN = (received) => {
    interval = window.setInterval(function () {
        if (redoStack.length <= 0) return;
        undoStack.push(redoStack.pop());
        redrawAll();
    }, 50)

    const point = {
        type: "redo down"
    }

    if (received === "unreceived") {
        socket.emit("message", point);
    }
};

//socket-io :-
var socket = io();
socket.on("notice", function (message) {
    console.log(message);
    if (message.type === "begin") {
        const { x, Y } = message;
        ctx.beginPath();
        ctx.moveTo(x, Y);
        isDown = true;
        const point = {
            x, Y,
            effect: ctx.globalCompositeOperation,
            color: ctx.strokeStyle,
            width: ctx.lineWidth,
            type: "begin"
        }

        undoStack.push(point);

    } else if (message.type === "end") {
        const { x, Y } = message;

        ctx.lineTo(x, Y);
        ctx.stroke();
        const point = {
            x, Y,
            effect: ctx.globalCompositeOperation,
            color: ctx.strokeStyle,
            width: ctx.lineWidth,
            type: "end"
        };

        undoStack.push(point);

    } else if (message.type === "undo down") {
        undoDOWN("received");

    } else if (message.type === "undo up") {
        undoUP("received");

    } else if (message.type === "redo down") {
        redoDOWN("received");

    } else if (message.type === "redo up") {
        redoUP("received");
    }
});

board.addEventListener("mousedown", function (event) {
    var x = (event.clientX);
    var y = (event.clientY);
    ctx.beginPath();
    ctx.moveTo(x, y - h);
    isDown = true;
    var Y = y - h;
    const point = {
        x, Y,
        effect: ctx.globalCompositeOperation,
        color: ctx.strokeStyle,
        width: ctx.lineWidth,
        type: "begin"
    }

    undoStack.push(point);

    socket.emit("message", point);
});

board.addEventListener("mousemove", function (event) {
    if (isDown) {
        var x = (event.clientX);
        var y = (event.clientY);
        ctx.lineTo(x, y - h);
        ctx.stroke();
        var Y = y - h;
        const point = {
            x, Y,
            effect: ctx.globalCompositeOperation,
            color: ctx.strokeStyle,
            width: ctx.lineWidth,
            type: "end"
        };

        undoStack.push(point);

        socket.emit("message", point);
    }
});

board.addEventListener("mouseup", function (event) {
    isDown = false;

    const point = {
        isDown
    }
    socket.emit("message", point);


});

function getLocation(event) {
    console.log(board.getBoundingClientRect());
    console.log(event.clientY);
    return {
        x: event.clientX - board.getBoundingClientRect().left,

        y: event.clientY - board.getBoundingClientRect().top
    };
}

undo.addEventListener("mousedown", () => {
    undoDOWN("unreceived");
});

undo.addEventListener("mouseup", () => {
    undoUP("unreceived");
});

redo.addEventListener("mouseup", () => {
    redoUP("unreceived");
})

redo.addEventListener("mousedown", () => {
    redoDOWN("unreceived");
});

function redrawAll() {
    ctx.clearRect(0, 0, board.width, board.height);

    for (var i = 0; i < undoStack.length; i++) {
        let { x, Y, effect, color, width, type } = undoStack[i];
        if (type === "begin") {
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.globalCompositeOperation = effect;
            ctx.beginPath();
            ctx.moveTo(x, Y);

        } else if (type === "end") {
            ctx.strokeStyle = color;
            ctx.globalCompositeOperation = effect;
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.lineTo(x, Y);
            ctx.stroke();

        }
    }
}





