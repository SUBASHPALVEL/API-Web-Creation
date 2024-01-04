function createUser() {
    // Get form values
    let username = document.getElementById("username").value;
    let usermail = document.getElementById("usermail").value;
    let password = document.getElementById("password").value;

    // Create a JSON object with form data
    let userData = {
        username: username,
        usermail: usermail,
        password: password
    };

    // Convert JSON object to a string
    let jsonData = JSON.stringify(userData);

    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Define the request parameters
    xhr.open("POST", "http://localhost:8080/api/users", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Set up a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // Check if the request was successful
            if (xhr.status == 201) {
                // Handle the successful response
                console.log(xhr.responseText);

                // Display the response on the webpage
                document.getElementById("responseMessage").innerHTML = "User created successfully";
            } else {
                // Handle the error response
                console.error("Error creating user. Status code: " + xhr.status);
                document.getElementById("responseMessage").innerHTML = "Error creating user. Please try again.";
            }
        }
    };

    // Send the JSON data as the request payload
    xhr.send(jsonData);
}
