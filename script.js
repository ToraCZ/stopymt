
function log(location) {
    fetch("https://maker.ifttt.com/trigger/stopymt/with/key/Llgpn-giSYVkj3wHI9fdR?value1=" + location, {
        mode: "no-cors",
    })
}

let scrollPosition = 0;
let scrollInterval;
let id = "text";

function resetScroll(step = 1) {
    if (scrollInterval) {
        clearInterval(scrollInterval);
    }
    setTimeout(() => {
        scrollInterval = setInterval(() => {
            scrollText(step);
        }, 20);
    }, 500);

}

function switchButton(newId) {
    if (newId === "text") {
        resetScroll();
    } else {
        clearInterval(scrollInterval);
    }
    document.getElementById(id + "_btn").classList.remove("active");
    document.getElementById(id).classList.add("hidden");
    id = newId
    document.getElementById(id + "_btn").classList.add("active");
    document.getElementById(id).classList.remove("hidden");
}

function scrollText(step) {
    document.getElementById("text").scroll(0, scrollPosition);
    scrollPosition = scrollPosition + step;
    if (document.getElementById("text").scrollHeight < scrollPosition) {
        clearInterval(scrollInterval);
    }
}

function pauseScroll(){
    clearInterval(scrollInterval);
}

resetScroll();