document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = "coco_petal365";

    document.getElementById('submitPassword').addEventListener('click', function() {
        let userPassword = document.getElementById('passwordInput').value;

        if (userPassword !== correctPassword) {
            document.body.innerHTML = "<h1>Sorry! Access denied.</h1>";
        } else {
            document.getElementById('login').style.display = 'none'; // Hide the login form
            document.getElementById('content').style.display = 'block'; // Show the content

            const affirmations = [
                "I am strong and capable.",
                "I believe in myself.",
                "Today is a new opportunity to grow.",
                "I am loveable.",
                "I deserve to be chosen."
            ];

            const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
            document.getElementById('affirmations').innerHTML += `<p>${randomAffirmation}</p>`;
        }
    });
});