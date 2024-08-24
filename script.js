// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
}

// Authenticate the user with auth0
let auth0 = null;
const initAuth0 = async () => {
    auth0 = await createAuth0Client({
        domain: 'dev-met2gpq01cgrdesz.us.auth0.com',
        client_id: 'FqxFlFOSVweSgXV95LXclmlMZdTYRgpo'
    });
};

const handleRedirectCallback = async () => {
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/Affirmation_map/dashboard.html");
        window.location.href = "/Affirmation_map/dashboard.html";
    }
};

document.addEventListener('DOMContentLoaded', async function() {
    await initAuth0();
    await handleRedirectCallback();

    // Check if the user is authenticated
    const isAuthenticated = await auth0.isAuthenticated();
    const path = window.location.pathname;    
    if (path.includes('dashboard.html')) {
        if (isAuthenticated) {
            document.getElementById('content').style.display = 'block';
            const user = await auth0.getUser();
            console.log('User:', user);
            // Any other dashboard-specific logic here
        } else {
            await auth0.loginWithRedirect({
                redirect_uri: 'https://yenorii.github.io/Affirmation_map/dashboard.html/'
            });
        }
    } else {
        if (isAuthenticated) {
            window.location.href = 'https://yenorii.github.io/Affirmation_map/dashboard.html/';
        }
    }

    // Affirmation bank
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

    const selectedAffirmations = affirmations
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .join(' ★ ');
    document.getElementById('affirmation').textContent = selectedAffirmations + ' ★ ' + selectedAffirmations;
    
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