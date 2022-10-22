const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    tryAgainBtn = document.querySelector(".try");

// CREATING VARIABLES
let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

// RANDOMIZING THE PARAGRAPHS SHOWED
function randomParagraph() {
    typingText.innerHTML = "";
    //getting a random number and it will always be less than the paragraph length
    let randIndex = Math.floor(Math.random() * paragraphs.length);

    // getting random item from the paragraph array,splitting all the characters,adding each character inside a span and then adding the span inside the p tag
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    // focusing input field on the keydown press or on click
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}


function initTyping() {

    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    // this prevents the user for typing if the timer is 0 or if typing characters are completed
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        // FIXING TIMER BUG
        // fixing the bug that the timer increments during each key press
        if (!isTyping) {
            // once timer starts, it wont restart again on every key press
            timer = setInterval(initTimer, 1000);
            isTyping = true;

        }

        // MAKING THE BACKSPACE FUNCTIONAL
        // this "if" statement will remove both the "correct" and "incorrect" classes
        // if no keys or backspace is pressed,by decrementing the charIndex
        if (typedChar == null) {
            charIndex--;

            // decrement only if the charIndex span contains the "incorrect" class
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            // if the "if"statement is true, it will remove both incorrect and correct classes
            characters[charIndex].classList.remove("correct", "incorrect");

        } else {

            if (characters[charIndex].innerText === typedChar) {
                // if the user typed character and shown character matches then add the "correct"
                characters[charIndex].classList.add("correct");
            }
            else {
                // if the user typed character and shown character doesnt match then add the "incorrect" class and increment the mistakes
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        // increment charindex either user typed correct or incorrect character
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        // CALCULATING THE WPM
        // subtracts total mistakes from the total typed characters
        // divides it by 5
        // dviding the output by the subtraction of the timeLeft from maxTime
        // then multiplying the output by 60
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;

        // CALCULATING THE CPM
        cpmTag.innerText = charIndex - mistakes;
    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}

// CREATING THE TIMER
function initTimer() {
    // if the value of the timeLeft > 0 decrement it and make the change on the text
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        // set the timer to zero
        clearInterval(timer);
    }
}
function resetGame() {
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);