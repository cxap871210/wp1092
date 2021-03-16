let urls = ["https://www.ghibli.jp/gallery/totoro025.jpg",
            "https://www.ghibli.jp/gallery/totoro022.jpg",
            "https://www.ghibli.jp/gallery/totoro042.jpg",
            "https://www.ghibli.jp/gallery/totoro043.jpg",
            "https://www.ghibli.jp/gallery/totoro030.jpg"]
let now = 0;
let main_image = document.getElementById("display"), source = document.getElementById("source");
let left = document.getElementById("left"), right = document.getElementById("right");

let update = function() {
    main_image.src = "images/loading.gif";
    if (now == 0) {
        left.classList.add("disabled");
    }
    else if (now  == urls.length - 1) {
        right.classList.add("disabled");
    }
    else {
        left.classList.remove("disabled");
        right.classList.remove("disabled");
    }
    let hide = new Image();
    hide.onload = function () {
        main_image.src = urls[now];
    }
    hide.src = urls[now];
    source.href = urls[now];
    source.textContent = urls[now];
}
update();
left.addEventListener(
    "click",
    function () {
        if (now > 0) {
            now = now - 1;
            update();
        }
    }
)

right.addEventListener(
    "click",
    function () {
        if (now < urls.length - 1) {
            now = now + 1;
            update();
        }
    }
)