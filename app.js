const scoreDisplay = document.querySelector('#score')
const timerDisplay = document.querySelector('#timer')
const btnOnOff = document.querySelector('#on_off')
const allBlocks = document.querySelectorAll('.froggy div')
const logsLeft = document.querySelectorAll('.log_left')
const logsRight = document.querySelectorAll('.log_right')
const carsLeft = document.querySelectorAll('.car_left')
const carsRight = document.querySelectorAll('.car_right')
let currenPosition = 76
const width = 9
let timerId = null
let timer = 10

//Move Frog Function
function moveFrogg(e) {
    allBlocks[currenPosition].classList.remove('frogg')

    switch(e.key) {
       case 'ArrowLeft':
          currenPosition % width !== 0 ? currenPosition -= 1 : null
       break
       case 'ArrowRight':
          currenPosition % width < width - 1 ? currenPosition += 1 : null
       break
       case 'ArrowUp':
          currenPosition - width >= 0 ? currenPosition -= width : null
       break
       case 'ArrowDown':
          currenPosition + width < width * width ? currenPosition += width : null
       break
       default:
        null
    }

    allBlocks[currenPosition].classList.add('frogg')
}

//Move Log Left Right Function UP
function moveElements() {
    timer--
    timerDisplay.textContent = timer + 's'
    logsLeft.forEach(logLeft => autoMoveLogLeft(logLeft))
    logsRight.forEach(logRight => autoMoveLogRight(logRight))
    carsLeft.forEach(carLeft => autoMoveCarLeft(carLeft))
    carsRight.forEach(carRight => autoMoveCarRight(carRight))
    loseGame()
    winGame()
}

function autoMoveLogLeft(logLeft) {
    switch(true) {
       case logLeft.classList.contains('l1'):
        logLeft.classList.remove('l1')
        logLeft.classList.add('l2')
        break
       case logLeft.classList.contains('l2'):
        logLeft.classList.remove('l2')
        logLeft.classList.add('l3')
        break
       case logLeft.classList.contains('l3'):
        logLeft.classList.remove('l3')
        logLeft.classList.add('l4')
        break
       case logLeft.classList.contains('l4'):
        logLeft.classList.remove('l4')
        logLeft.classList.add('l5')
        break
       case logLeft.classList.contains('l5'):
        logLeft.classList.remove('l5')
        logLeft.classList.add('l1')
        break
    }
}

function autoMoveLogRight(logRight) {
    switch(true) {
       case logRight.classList.contains('l1'):
        logRight.classList.remove('l1')
        logRight.classList.add('l5')
        break
       case logRight.classList.contains('l2'):
        logRight.classList.remove('l2')
        logRight.classList.add('l1')
        break
       case logRight.classList.contains('l3'):
        logRight.classList.remove('l3')
        logRight.classList.add('l2')
        break
       case logRight.classList.contains('l4'):
        logRight.classList.remove('l4')
        logRight.classList.add('l3')
        break
       case logRight.classList.contains('l5'):
        logRight.classList.remove('l5')
        logRight.classList.add('l4')
        break
    }
}

////Move Car Left Right Function DOWN
function autoMoveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function autoMoveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function loseGame() {
        if(allBlocks[currenPosition].classList.contains('c1')
        || allBlocks[currenPosition].classList.contains('l1')
        || allBlocks[currenPosition].classList.contains('l2')
        || allBlocks[currenPosition].classList.contains('l3')
        || timer === 0) {
         clearInterval(timerId)
         scoreDisplay.textContent = 'GAME OVER!'
         allBlocks[currenPosition].classList.remove('frogg')
         document.removeEventListener('keyup', moveFrogg)
      } 
}

function winGame() {
    if(allBlocks[currenPosition].classList.contains('frogg_red')) {
      clearInterval(timerId)
      scoreDisplay.textContent = 'YOU WIN!'
      document.addEventListener('keyup', moveFrogg)
    }
}

btnOnOff.addEventListener('click', () => {
    if(timerId) {
        clearInterval(timerId)
        timerId = null
        document.removeEventListener('keyup', moveFrogg)
        btnOnOff.innerHTML = 'Play <i class="fa-solid fa-play"></i>'
    } else {
        timerId = setInterval(moveElements, 1000)
        document.addEventListener('keyup', moveFrogg)
        btnOnOff.innerHTML = 'Pause <i class="fa-solid fa-pause"></i>'
    }
})







