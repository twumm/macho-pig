// View model to calculate the pig's weight
function PigWeightModel() {
    var self = this;
    heartGirth = ko.observable("");
    length = ko.observable("");
    fixedValue = 400;
    kilogramFactor = 0.455;

    // Calculate pig weight
    totalPigWeight = ko.computed(function() {
        totalWeight = 0;
        girthSquared = heartGirth() * heartGirth();
        totalWeight = ((girthSquared * length()) / fixedValue) * kilogramFactor;
        // totalWeight = heartGirth + 2;
        return totalWeight;
    });
}

// If there an update for the service worker, show update modal.
let updateReady = () => {
    const updateNotification = document.getElementById('update-ready');
    updateNotification.classList.add('show');
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
                console.log('Update found function');
                trackInstalling(registration.installing);
            });
        }).catch(error => {
            // Registration failed.
            console.log('Registration failed with ' + error);
        });
}

ko.applyBindings(new PigWeightModel());
