// selectors
const mainSection = document.querySelector(".main-section")
const cards = document.querySelectorAll(".card")
const image = document.querySelector(".people-img")
const imageContainer = document.querySelector(".img-container-inner")
const duty = document.querySelector(".pictures h2")
const duties = ['Front-end Developer', "Designer", "Back-end Developer", "Product Manager"]
const pictures = ["pic0.jpg", "pic1.jpg", "pic2.jpg", "pic3.jpg"]

//initialize scroll trigger
gsap.registerPlugin(ScrollTrigger)

// variables
let repeat;
let repeatValue = 0
let imageIndex = 0
let cardIndex = 0
let dutyIndex = 0


//checks the progress is repeating and sets the repeat to either true or false
const checkRepeat = (prg, min, max) => {
    if(repeatValue === prg || repeatValue > min && repeatValue <= max){
        repeat = true
    }
    else{
        repeat = false
    }
    repeatValue = prg
    return
}

//handles the animation 
const hideShowImage = (imageIndex, cardIndex, dutyIndex) => {
    const activeParagraph = document.querySelector(".card.active p")

    imageContainer.style.clipPath = "inset(100% 0% 0% 0%)"
    setTimeout(()=> {
        image.src = `./img/${pictures[imageIndex]}`
        imageContainer.style.clipPath = "inset(0% 0% 0% 0%)"
    }, 700)
    cards.forEach(card => {
        if(card.classList.contains("active")){
            card.classList.remove("active")
            activeParagraph.remove()
        }
    })
    duty.textContent = duties[dutyIndex]
    cards[cardIndex].classList.add("active")
    const paragraph = document.createElement("p")
    const text = document.createTextNode("Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, maxime? Temporibus corporis sit quis ipsum!")
    paragraph.appendChild(text)
    cards[cardIndex].appendChild(paragraph)
}


const pictureTween = gsap.timeline({
    scrollTrigger: {
        trigger: mainSection,
        start: "0% 0%",
        pin:true,
        onUpdate: e => {
            const progress = e.progress.toFixed(2)
            if(progress >= 0 && progress <= 0.25){
                console.log(repeatValue)
                if(repeatValue === 0) {
                    return
                }
                checkRepeat(progress, 0, 0.25)
                if(repeat) return 
                hideShowImage(imageIndex = 0, cardIndex = 0 , dutyIndex = 0)
            }

            if(progress >= 0.25 && progress <= 0.5){
                checkRepeat(progress, 0.25, 0.5)
                if(repeat) return
                hideShowImage(imageIndex = 1, cardIndex = 1 , dutyIndex = 1)
            }

            if(progress >= 0.5 && progress <= 0.75){
                checkRepeat(progress, 0.5, 0.75)
                if(repeat) return
                hideShowImage(imageIndex = 2, cardIndex = 2 , dutyIndex = 2)
            }

            if(progress >= 0.75 && progress <= 1){
                checkRepeat(progress, 0.75, 1)
                if(repeat) return
                hideShowImage(imageIndex = 3, cardIndex = 3 , dutyIndex = 3)
            }
        },
        onLeaveBack: () => {
            repeatValue = 0
        }
    }
})

//handles the click event for all the cards
cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        hideShowImage(index, index, index)
    })
})