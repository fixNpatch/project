function createDiv(className) {
    let obj = document.createElement("div");
    obj.className = className;
    return obj;
}

function createTextarea(className) {
    let obj = document.createElement("textarea");
    obj.className = className;
    return obj;
}

function createImage(className) {
    let obj = document.createElement("img");
    obj.className = className;
    return obj;
}

function createButton(className) {
    let obj = document.createElement("button");
    obj.className = className;
    return obj;
}

function createInput(className, type) {
    let obj = document.createElement("input");
    obj.type = type;
    obj.className = className;
    return obj;
}

function destroyDOM(object) {
    while (object.firstChild) {
        object.removeChild(object.firstChild);
    }
}
