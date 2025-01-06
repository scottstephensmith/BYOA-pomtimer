let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');
const statusText = document.getElementById('status-text');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function toggleMode() {
    isWorkTime = !isWorkTime;
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    document.body.classList.toggle('break-mode');
    document.title = isWorkTime ? 'Currently Working' : 'On Break';
    updateTimer();
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                toggleMode();
                alert(isWorkTime ? 'Work Time!' : 'Break Time!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    if (!isWorkTime) {
        toggleMode();
    } else {
        timeLeft = 25 * 60;
        updateTimer();
    }
}

// Initialize
timeLeft = 25 * 60;
updateTimer();
document.title = 'Currently Working'; // Set initial title

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);

// Special buttons functionality
const michelleButton = document.getElementById('michelle-button');
const elliottButton = document.getElementById('elliott-button');
const animationContainer = document.getElementById('animation-container');

function createUnicorns() {
    // Clear any existing animations
    animationContainer.innerHTML = '';
    
    // Create 10 unicorns
    for (let i = 0; i < 10; i++) {
        const unicorn = document.createElement('div');
        unicorn.className = 'unicorn';
        unicorn.textContent = '🦄';
        
        // Set random start and end positions
        const startY = Math.random() * window.innerHeight;
        const endY = Math.random() * window.innerHeight;
        unicorn.style.setProperty('--start-y', `${startY}px`);
        unicorn.style.setProperty('--end-y', `${endY}px`);
        
        animationContainer.appendChild(unicorn);
        
        // Remove unicorn after animation
        setTimeout(() => unicorn.remove(), 2000);
    }
}

function createFingers() {
    // Clear any existing animations
    animationContainer.innerHTML = '';
    
    // Create fingers that move across the screen
    const numFingers = 12; // 3 fingers from each side
    
    for (let i = 0; i < numFingers; i++) {
        const finger = document.createElement('div');
        finger.className = 'finger';
        finger.textContent = '👆';
        
        // Calculate start and end positions based on which side the finger starts from
        const side = Math.floor(i / 3); // 0: top, 1: right, 2: bottom, 3: left
        let startX, startY, midX, midY, endX, endY;
        
        switch(side) {
            case 0: // top
                startX = (i % 3) * (window.innerWidth / 2);
                startY = -50;
                midX = window.innerWidth / 2;
                midY = window.innerHeight / 2;
                endX = window.innerWidth - startX;
                endY = window.innerHeight + 50;
                finger.style.transform = 'rotate(180deg)';
                break;
            case 1: // right
                startX = window.innerWidth + 50;
                startY = (i % 3) * (window.innerHeight / 2);
                midX = window.innerWidth / 2;
                midY = window.innerHeight / 2;
                endX = -50;
                endY = window.innerHeight - startY;
                finger.style.transform = 'rotate(-90deg)';
                break;
            case 2: // bottom
                startX = window.innerWidth - (i % 3) * (window.innerWidth / 2);
                startY = window.innerHeight + 50;
                midX = window.innerWidth / 2;
                midY = window.innerHeight / 2;
                endX = window.innerWidth - startX;
                endY = -50;
                break;
            case 3: // left
                startX = -50;
                startY = window.innerHeight - (i % 3) * (window.innerHeight / 2);
                midX = window.innerWidth / 2;
                midY = window.innerHeight / 2;
                endX = window.innerWidth + 50;
                endY = window.innerHeight - startY;
                finger.style.transform = 'rotate(90deg)';
                break;
        }
        
        // Set the CSS variables for the animation
        finger.style.setProperty('--start-x', `${startX}px`);
        finger.style.setProperty('--start-y', `${startY}px`);
        finger.style.setProperty('--mid-x', `${midX}px`);
        finger.style.setProperty('--mid-y', `${midY}px`);
        finger.style.setProperty('--end-x', `${endX}px`);
        finger.style.setProperty('--end-y', `${endY}px`);
        
        animationContainer.appendChild(finger);
        
        // Remove finger after animation
        setTimeout(() => finger.remove(), 1000);
    }
}

michelleButton.addEventListener('click', () => {
    createUnicorns();
    michelleButton.disabled = true;
    setTimeout(() => michelleButton.disabled = false, 2000);
});

elliottButton.addEventListener('click', () => {
    createFingers();
    elliottButton.disabled = true;
    setTimeout(() => elliottButton.disabled = false, 1000);
}); 