if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  }

document.addEventListener('DOMContentLoaded', function() {
    // Affirmation bank (public)
    const affirmations = [
        "You are capable of amazing things",
        "Today is a fresh start",
        "You bring something special to this world",
        "Believe in your dreams",
        "Your potential is limitless",
        "Take it one step at a time",
        "You are stronger than you think",
        "Positivity is a choice",
        "Your mind is powerful",
        "You are worthy of good things"
    ];

    // Display multiple affirmations into one scrolling text
    const selectedAffirmations = affirmations
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .join(' ★ ');
    document.getElementById('affirmation').textContent = selectedAffirmations + ' ★ ' + selectedAffirmations;
    
    // Remember me
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedTimestamp = parseInt(localStorage.getItem('timestamp'), 10);
        const currentTime = Date.now();
        const FOUR_HOURS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
        
        if (currentTime - savedTimestamp < FOUR_HOURS) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('timestamp');
        }
    }
    
    // Password check
    function submitPassword() {
        const correctPassword = "Coco_petals365";
        let userPassword = document.getElementById('passwordInput').value;
        if (userPassword === correctPassword) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('timestamp', Date.now().toString());
            document.getElementById('login').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        } else {
            alert("Sorry, access denied.");
        }
    }

    // Add event listener to submit button
    document.getElementById('submitPassword').addEventListener('click', submitPassword);
    document.getElementById('passwordInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            submitPassword();
        }
    });

    // Define the goal functions
    function handleGoalClick(goalName) {
        alert(goalName + " Goal Clicked!");
    }
    document.getElementById('workGoal').addEventListener('click', function() {
        handleGoalClick("Work");
    });
    document.getElementById('homeGoal').addEventListener('click', function() {
        handleGoalClick("Home");
    });
    document.getElementById('moneyGoal').addEventListener('click', function() {
        handleGoalClick("Money");
    });
    document.getElementById('lifeGoal').addEventListener('click', function() {
        handleGoalClick("Life");
    });

    function updateProgress(goalElement, progressPercentage) {
        const progressCircle = goalElement.querySelector('.goal-progress');
        const angle = (progressPercentage / 100) * 360;
        progressCircle.style.borderColor = `conic-gradient(#4bb34f ${angle}deg, #ccc 0deg)`;
    }
});