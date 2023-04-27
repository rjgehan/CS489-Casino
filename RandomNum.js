function RandomNum(){

    // Prompt user for a number between 1-50
    let userNumber = parseInt(prompt("Choose a number between 1 and 50:"));

    // Generate a random number between 1-50
    let randomNumber = Math.floor(Math.random() * 50) + 1;

    // Check if user number matches the random number
    if (userNumber === randomNumber) {
    // If the numbers match, the user wins the amount of money equal to the random number
    console.log("Congratulations! You won $" + randomNumber + "!");
    } else {
    // If the numbers don't match, the user doesn't win anything
    console.log("Sorry, the random number was " + randomNumber + ". Better luck next time!");
    }

}
