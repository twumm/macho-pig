// View model to calculate the pig's weight
function PigWeightModel() {
    var self = this;
    heartGirth = ko.observable("");
    length = ko.observable("");
    fixedValue = 400;
    kilogramFactor = 0.455;

    // Calculate pig weight
    totalPigWeightInKilos = ko.computed(function() {
        totalWeight = 0;
        girthSquared = heartGirth() * heartGirth();
        totalWeight = ((girthSquared * length()) / fixedValue) * kilogramFactor;
        return totalWeight;
    });

    totalPigWeightInPounds = ko.computed(function() {
        totalWeight = 0;
        girthSquared = heartGirth() * heartGirth();
        totalWeight = ((girthSquared * length()) / fixedValue);
        return totalWeight;
    });
}

// If there an update for the service worker, show update modal.
let updateReady = (worker) => {
    const updateNotification = document.getElementById('update-ready');
    updateNotification.classList.add('show');
}

// Check status of service worker install state.
let trackInstalling = (worker) => {
    worker.addEventListener('statechange', () => {
        if (worker.state == 'installed') {
            updateReady();
        }
    });

    // Get the click event from the update-ready toast and 
    // post the skipWaiting message to the serviceWorker when
    // the user clicks to update page.
    const getUpdate = document.getElementById('get-update');
    getUpdate.addEventListener('click', () => {
        worker.postMessage({action: 'skipWaiting'});
    });
}

// Add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function(registration) {
            console.log('Service Worker Registered.');
            // If the serviceWorker control is false, do nothing.
            if (!navigator.serviceWorker.controller) {
                return;
            }
            
            // If there an updated worker already waiting, trigger the update dialog
            if (registration.waiting) {
                updateReady();
                return;
            }
            
            // If there is an updated worker installing, track it's progress.
            // If it becomes 'installed', call the update.
            if (registration.installing) {
                console.log('sw installing function');
                trackInstalling(registration.installing);
                return;
            }
            
            // Otherwise, listen for new installing workers arriving.
            // If one arrives, track it's progress and show notification when it is installed.
            registration.addEventListener('updatefound', () => {
                trackInstalling(registration.installing);
            });

            // Listen for controlling service worker changing and reload the page.
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            })
        }).catch(error => {
            // Registration failed.
            console.log('Registration failed with ' + error);
        });
}

ko.applyBindings(new PigWeightModel());
