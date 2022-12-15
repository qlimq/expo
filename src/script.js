// todo: исправить говнокод
// drag to scroll
let primaryMouseButtonDown = false;
let isMouseHover = false
let scrollable = document.getElementById("scrollable");
let mousePosX = 0;
let oldMousePosX = 0;

scrollable.addEventListener("mouseleave", function () {
    isMouseHover = false;
}, false);

scrollable.addEventListener("mouseover", function () {
    isMouseHover = true;
}, false);

function setPrimaryButtonState(e) {
    var flags = e.buttons !== undefined ? e.buttons : e.which;
    primaryMouseButtonDown = (flags & 1) === 1;
    if (primaryMouseButtonDown) {oldMousePosX = mousePosX + scrollable.scrollLeft; scrollable.classList.remove('snap-x','snap-mandatory','scroll-smooth')};
    if (!primaryMouseButtonDown) {scrollable.classList.add('snap-x','snap-mandatory','scroll-smooth')};
}

function logKey(e) {
    mousePosX = e.clientX;
    if (primaryMouseButtonDown){
        let diff = (oldMousePosX - mousePosX);
        scrollable.scrollTo(diff,0)
    }
}

document.addEventListener('mousemove', logKey);
document.addEventListener("mousedown", setPrimaryButtonState);
document.addEventListener("mouseup", setPrimaryButtonState);
scrollable.innerHTML = '';

// reviews + avatar gen
let data = null;
let avatarLetter = '';

function set(data){
    for (let i = 0; i < data.reviews.length; i++) {
        data.reviews[i].user.photo_preview_urls["64x64"].length == 0 ? avatarLetter = data.reviews[i].user.name[0] : avatarLetter = '';
        scrollable.innerHTML += `<div class="flex flex-col flex-grow-0 h-[293px] min-w-[486px] rounded-[12px] border border-solid border-indigo-500 overflow-hidden max-md:min-w-full snap-center"><div class="p-[25px] pl-[34px] box-border top-[0] flex flex-row w-full max-h-[103px] bg-indigo-500 font-semibold text-[16px] items-center leading-tight gap-[15px]"><div class="w-[54px] h-[54px] rounded-[50%] flex justify-center items-center text-white" style='background-color: hsl(${Math.floor(Math.pow(String(data.reviews[i].user.name)[0].charCodeAt(0), 1.03))}, 75%, 40%'>${avatarLetter}<img src='${data.reviews[i].user.photo_preview_urls["64x64"]}' class='rounded-[50%]'></div>${data.reviews[i].user.name}</div><p class="font-medium text-[14px] leading-4 mx-[35px] mt-[44px] mb-[52.08px]">${data.reviews[i].text}</p></div>`
    }
}

fetch("/stuff/reviews.json")
.then(res => res.json())
.then(out => set(out))
.catch(err => { throw err });


// help animation
const help = document.getElementById('help');
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    console.log(scroll)
    if (scroll > 700 && scroll < 2800) {
        console.log('in')
        help.style.animation = 'opacityIn 0.3s ease-in';
        help.style.opacity = '1';
    } else {
        console.log('out')
        if (help.style.opacity == 1) {
            help.style.animation = 'opacityOut 0.3s ease-out';
        }
        help.style.opacity = '0';
    }
});

