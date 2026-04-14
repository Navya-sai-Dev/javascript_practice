let input = document.getElementById("numberInput");
let button = document.getElementById("checkBtn");
let result = document.getElementById("result");

button.addEventListener("click", function() {

    let number = Number(input.value);

    if (input.value === "") {
        result.innerText = "Please enter a number 😅";
    }
    
    else if (number % 2 === 0) {
        result.innerText = "It's Even 🎉";
    } 
    
    else {
        result.innerText = "It's Odd 🔥";
    }

});
