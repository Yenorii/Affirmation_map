document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = "coco_petal365"
    let userPassword = prompt("Welcome! Please enter the passworrd here:");
    if (userPassword !== correctPassword) {
        document.body.innerhtml = "<h1>Sorry! Access denied.</h1>";
    } else {
        
    const affirmations = [
        "I am strong and capable.",
        "I believe in myself.",
        "Today is a new opportunity to grow.",
        "I am loveable.",
        "I deserve to be chosen."
    ];

    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    document.getElementById('affirmations').innerHTML = `<p>${randomAffirmation}</p>`;
});
