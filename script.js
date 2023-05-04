
function log(location) {
    fetch("https://maker.ifttt.com/trigger/stopymt/with/key/Llgpn-giSYVkj3wHI9fdR?value1=" + location, {
        mode: "no-cors",
    })
}

let textDiv = document.getElementById("text");
let pauseBtn = document.getElementById("pause_btn");
let scrollPosition = 0;
let scrollInterval;
let id = "text";

function resetScroll(step = 1) {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = undefined;
    }
    setTimeout(() => {
        scrollInterval = setInterval(() => {
            scrollText(step);
        }, 20);
    }, 500);

}

function switchButton(newId) {
    if (newId === "text") {
        pauseBtn.classList.remove("hidden");
        resetScroll();
    } else {
        pauseBtn.classList.add("hidden");
        clearInterval(scrollInterval);
        scrollInterval = undefined;
    }
    document.getElementById(id + "_btn").classList.remove("active");
    document.getElementById(id).classList.add("hidden");
    id = newId
    document.getElementById(id + "_btn").classList.add("active");
    document.getElementById(id).classList.remove("hidden");
}

function scrollText(step) {
    textDiv.scroll(0, scrollPosition);
    scrollPosition = scrollPosition + step;
    if (textDiv.scrollHeight < scrollPosition) {
        clearInterval(scrollInterval);
        scrollInterval = undefined;
    }
}

function toggleScroll() {
    if (scrollInterval) {
        pauseBtn.classList.remove("active");
        clearInterval(scrollInterval);
        scrollInterval = undefined;
    } else {
        pauseBtn.classList.add("active");
        resetScroll();
    }
}

resetScroll();