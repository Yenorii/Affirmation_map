document.addEventListener('DOMContentLoaded', function() {
    // Example: Show a random affirmation
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
