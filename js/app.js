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
        }).catch(error => {
            // Registration failed.
            console.log('Registration failed with ' + error);
        });
}

ko.applyBindings(new PigWeightModel());
