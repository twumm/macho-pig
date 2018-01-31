// View model to calculate the pig's weight
function PigWeightModel() {
    var self = this;
    heartGirth = ko.observable("");
    length = ko.observable("");
    fixedValue = 400;


    // Calculate pig weight
    totalPigWeight = ko.computed(function() {
        // totalWeight = 0;
        // girthSquared = self.heartGirth * 2;
        // totalWeight = (girthSquared * self.length) / self.fixedValue;
        return parseInt(heartGirth, 10);
    });
}

ko.applyBindings(new PigWeightModel());