// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/Affirmation_map/service-worker.js')
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
    console.log("Auth0 initialized:", auth0);
};

// Define handleRedirectCallback function
const handleRedirectCallback = async () => {
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/Affirmation_map/dashboard.html");
        window.location.href = "/Affirmation_map/dashboard.html";
    }
};

// Handle callbacks and page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log("Initializing Auth0");
    await initAuth0();
    console.log("Auth0 Initialized. Handling redirect callback...");
    await handleRedirectCallback();

    const isAuthenticated = await auth0.isAuthenticated();
    console.log("Is authenticated:", isAuthenticated);
    
    if (isAuthenticated) {
        console.log("Redirecting to dashboard...");
        window.location.href = 'https://yenorii.github.io/Affirmation_map/dashboard.html';
    } else {
        console.log("Redirecting to Auth0 login...");
        await auth0.loginWithRedirect({
            redirect_uri: 'https://yenorii.github.io/Affirmation_map'
        });
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

const affirmationElement = document.getElementById('affirmation');
if (affirmationElement) {
    const selectedAffirmations = affirmations
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .join(' ★ ');
    affirmationElement.textContent = selectedAffirmations + ' ★ ' + selectedAffirmations;
}

// Handle goal functions only if on the dashboard page
if (path.includes('dashboard.html')) {
    function handleGoalClick(goalName) {
        alert(goalName + " Goal Clicked!");
    }
    const workGoalElement = document.getElementById('workGoal');
    if (workGoalElement) {
        workGoalElement.addEventListener('click', function() {
            handleGoalClick("Work");
        });
    }

    const homeGoalElement = document.getElementById('homeGoal');
    if (homeGoalElement) {
        homeGoalElement.addEventListener('click', function() {
            handleGoalClick("Home");
        });
    }

    const moneyGoalElement = document.getElementById('moneyGoal');
    if (moneyGoalElement) {
        moneyGoalElement.addEventListener('click', function() {
            handleGoalClick("Money");
        });
    }

    const lifeGoalElement = document.getElementById('lifeGoal');
    if (lifeGoalElement) {
        lifeGoalElement.addEventListener('click', function() {
            handleGoalClick("Life");
        });
    }
}

});