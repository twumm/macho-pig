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
        .register('/sw.js')
        .then(function() {
            console.log('Service Worker Registered.');
        });
}

ko.applyBindings(new PigWeightModel());
