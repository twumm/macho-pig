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



// Add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function(registration) {
            console.log('Service Worker Registered.');
            // registration.update();
            /*registration.addEventListener('updatefound', () => {
                registration.installing.addEventListener('statechange', () => {
                    if (this.state == 'installed') {
                        // There is an update ready so prompt user.
                    }
                })
            })*/
        }).catch(error => {
            // Registration failed.
            console.log('Registration failed with ' + error);
        });
}

ko.applyBindings(new PigWeightModel());
