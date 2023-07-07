document.addEventListener('DOMContentLoaded', function () {
    // Get the sign-up form and sign-up button elements
    const signUpForm = document.querySelector('.form.signup');
    const signUpButton = signUpForm.querySelector('#signupButton');

    // Add event listener to the sign-up button
    signUpButton.addEventListener('click', handleSignUp);
});

// Function to handle the sign-up button click event
function handleSignUp(event) {
    event.preventDefault(); // Prevent form submission

    // Get the input values
    const username = signUpForm.querySelector('#username').value;
    const email = signUpForm.querySelector('#email').value;
    const password = signUpForm.querySelector('#password').value;
    const confirmPassword = signUpForm.querySelector('#confirmPassword').value;
    const termsAccepted = signUpForm.querySelector('#termCon').checked;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        // Show error message in an alert
        alert('Password and confirm password do not match');
        return; // Stop further execution
    }

    // Create an object to store the input values
    const signUpData = {
        username,
        email,
        password,
        confirmPassword,
        termsAccepted
    };

    // Save the sign-up data in local storage
    // localStorage.setItem('signUpData', JSON.stringify(signUpData));


    console.log(signUpData);
    // Show success message in an alert
    alert('Sign up successful');

    // Clear the input fields
    signUpForm.querySelector('#username').value = '';
    signUpForm.querySelector('#email').value = '';
    signUpForm.querySelector('#password').value = '';
    signUpForm.querySelector('#confirmPassword').value = '';
    signUpForm.querySelector('#termCon').checked = false;
}