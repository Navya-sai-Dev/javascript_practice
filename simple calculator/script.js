let output = "";
let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");

buttons.forEach(function(btn) {
    btn.addEventListener("click", function() {
        
        let value = btn.innerText;

        // Clear
        if (value === "C") {
            output = "";
            display.innerText = "0";
        }

        // Equals (calculate)
        else if (value === "=") {

            // Replace symbols for JS understanding
            let expression = output.replace(/×/g, "*").replace(/÷/g, "/");

            let result = eval(expression); // evaluates the expression

            display.innerText = result;
            output = result.toString();
        }

        // Normal buttons
        else {
            output = output + value;
            display.innerText = output;
        }

    });
});
