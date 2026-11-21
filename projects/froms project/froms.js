const form = document.getElementById("signup-form");
const statusMessage = document.getElementById("status-message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value;
    const birthday = document.getElementById("birthday").value;
    const year = document.getElementById("year").value;
    const reason = document.getElementById("reason").value.trim();

    const interests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach(function(item) {
        interests.push(item.value);
    });

    const meeting = document.querySelector('input[name="meeting"]:checked');
    const meetingTime = meeting ? meeting.value : "";
    const agree = document.getElementById("agree").checked;

    if (fullname === "") {
        alert("Please enter your full name.");
        return;
    }

    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    if (phone === "") {
        alert("Please enter your phone number.");
        return;
    }

    if (age === "" || Number(age) < 1 || Number(age) > 100) {
        alert("Please enter an age between 1 and 100.");
        return;
    }

    if (interests.length === 0) {
        alert("Please choose at least one interest.");
        return;
    }

    if (meetingTime === "") {
        alert("Please choose a meeting time.");
        return;
    }

    if (!agree) {
        alert("Please agree to the club rules.");
        return;
    }

    const formData = {
        fullname: fullname,
        email: email,
        phone: phone,
        age: age,
        birthday: birthday,
        year: year,
        interests: interests,
        meeting: meetingTime,
        reason: reason,
        agree: agree
    };

    console.log(formData);

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "response.json", true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            statusMessage.textContent = response.message;
            form.reset();
        } else {
            alert("Something went wrong. Please try again.");
        }
    };

    xhr.onerror = function() {
        alert("Could not connect to the server.");
    };

    xhr.send();
});