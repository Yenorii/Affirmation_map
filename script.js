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
    await initAuth0();
    await handleRedirectCallback();

    const isAuthenticated = await auth0.isAuthenticated();
    console.log("Is authenticated:", isAuthenticated);
    
    if (isAuthenticated) {
        window.location.href = 'https://yenorii.github.io/Affirmation_map/dashboard.html';
    } else {
        console.log("Redirecting to Auth0 login...");
        await auth0.loginWithRedirect({
            redirect_uri: 'https://yenorii.github.io/Affirmation_map/dashboard.html'
        });
    }
});