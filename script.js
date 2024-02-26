function calculator() {
  let previousText = document.querySelector(".previus");
  let currentText = document.querySelector(".current");
  let numButtons = document.querySelectorAll(".num");
  let operationButtons = document.querySelectorAll(".operation");
  let deleteButton = document.querySelector(".delete");
  let clearButton = document.querySelector(".clear");
  let equalButton = document.querySelector(".equel");

  let audioElement = document.getElementById("audioElement");
  let soundButton = document.querySelector("[data-sound]");
  let toggleButton = document.getElementById("toggleButton");

  toggleButton.addEventListener("click", () => {
    // change imagen
    const image = toggleButton.querySelector("img");

    if (audioElement.muted) {
      // Si está silenciado, activa el sonido y cambia la imagen a "alto-volumen.png"
      image.src = "/assets/img/alto-volumen.png";
      audioElement.muted = false;
    } else {
      // Si no está silenciado, desactiva el sonido y cambia la imagen a "silencio.png"
      image.src = "/assets/img/silencio.png";
      audioElement.muted = true;
    }
  });

  // Initializing variables to store operands and the current operation
  let currentOperand = "";
  let previousOperand = "";
  let operation = null;

  // Function to handle button clicks all of them
  function handleButtons() {
    // Adding click event listeners to number buttons
    numButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Check if the result is 0 and replace it with the button's text content
        if (currentOperand === "0" && btn.textContent !== ".") {
          currentOperand = btn.textContent;
        } else if (btn.textContent === "." && currentOperand.includes(".")) {
          return; // Do nothing if trying to add multiple dots
        } else {
          currentOperand += btn.textContent;
        }
        // Updating the display
        updateDisplay();

        playSoundWithTimeout(audioElement, 500);
      });
    });

    // Adding click event listeners to operation buttons
    operationButtons.forEach((btnCalc) => {
      btnCalc.addEventListener("click", () => {
        // Checking if there's a current operand before selecting an operation
        if (currentOperand === "") return;
        // Storing the selected operation
        operation = btnCalc.textContent;
        // Performing the operation and updating the display
        operate();
        updateDisplay();
        playSoundWithTimeout(audioElement, 500);
      });
    });

    // Adding click event listener to the clear button
    clearButton.addEventListener("click", () => {
      // Resetting all operands and operation
      currentOperand = "";
      previousOperand = "";
      operation = null;
      // Updating the display
      updateDisplay();
      playSoundWithTimeout(audioElement, 500);
    });

    // Adding click event listener to the delete button
    deleteButton.addEventListener("click", () => {
      // Handling deletion of digits or characters
      handleDelete();
      // Updating the display
      updateDisplay();
      console.log("handleDelete executed");
      playSoundWithTimeout(audioElement, 500);
    });

    // Adding click event listener to the equal button
    equalButton.addEventListener("click", () => {
      // Calculating the result and updating the display

      calculateResult();
      updateDisplay();
      playSoundWithTimeout(audioElement, 500);
    });
  }

  // Function to calculate the result based on the stored operation
  function calculateResult() {
    let curr = parseFloat(currentOperand);
    let prev = parseFloat(previousOperand);
    let result;

    // Checking if the operands are valid numbers
    if (isNaN(prev) || isNaN(curr)) return;

    // Performing the operation based on the selected operator
    switch (operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        // Handling division by zero
        if (curr === 0) {
          result = "You cannot divide by zero";
        }
        break;
      case "%":
        result = prev % curr;
        break;
      default:
        // Handling unexpected cases
        break;
    }

    // Updating the current operand with the result
    currentOperand = result.toString();
    operation = null;
    previousOperand = "";
  }

  currentText.classList.add("result");

  // Function to handle basic operation logic
  function operate() {
    if (currentOperand === "") return;

    // Checking if there was a previous operation
    if (previousOperand !== "") {
      // Performing the previous operation
      calculateResult();
    }

    // Storing the current operand and operation for display
    previousOperand = `${currentOperand} ${operation}`;
    currentOperand = "";
  }

  // Function to update the display with current and previous operands
  function updateDisplay() {
    currentText.textContent = currentOperand;
    previousText.textContent = previousOperand;
  }

  // Function to handle deletion of digits or characters
  // Function to handle deletion of digits or characters
  function handleDelete() {
    let temp;

    // Handling special case for division by zero error message
    if (currentOperand === "You cant divide by 0") {
      currentOperand = 0;
    } else {
      temp = currentOperand.substring(0, currentOperand.length - 1);
    }

    // Checking if the result is empty or zero after deletion
    if (temp === "" || temp === "0") {
      // If the result is 0 and a new number is being typed, replace the 0
      currentOperand = "";
    } else {
      currentOperand = temp;
    }
  }

  function playSoundWithTimeout(audioElement, duration) {
    audioElement.play();

    setTimeout(function () {
      audioElement.pause();
      audioElement.currentTime = 0;
    }, duration);
  }

  soundButton.addEventListener("click", function () {
    // Reproducir the song
    audioElement.play();

    // Ppause the music
    setTimeout(function () {
      audioElement.pause();
      audioElement.currentTime = 0; // Reiniciar la reproducción al principio
    }, 500);
  });

  // Initiating the button handling functionality
  handleButtons();
}

// Initializing the calculator functionality
calculator();
