angular.module("LD37App", []).controller('IncrementalCtrl', ['$scope', '$interval', function($scope, $interval) {
    // Basic variable declaration - keep track of how many of each
    // item we currently own, and how much the new ones should cost.
    $scope.unsortedPerSecond = 2;
    $scope.unsortedMail = 0;
    $scope.sortedMail = 0;
    $scope.numSorters = 0;
    $scope.numCarriers = 0;
    $scope.coin = 0;
    $scope.sorterCost = 10;
    $scope.carrierCost = 25;
    
    // Increase sortedMail every time produce-widget is clicked
    $scope.sortMail = function() {
        if ($scope.unsortedMail >= 1) {
            $scope.unsortedMail--;
            $scope.sortedMail++;
        }
    };

    $scope.deliverMail = function() {
        if ($scope.sortedMail >= 1) {
            $scope.sortedMail--;
            $scope.coin++;
        }
    };
    
    // Same for novice-widgeteer
    $scope.hireSorter = function() {

        $scope.numSorters++;

        // Deduct cost
        $scope.coin -= $scope.sorterCost;

        // Increase cost for the next one, using Math.ceil() to round up
        $scope.sorterCost = Math.ceil($scope.sorterCost * 1.1);

        // Increase unsortedPerSecond
        $scope.unsortedPerSecond = $scope.unsortedPerSecond * 1.05;
    };
    
    $scope.hireCarrier = function() {

        $scope.numCarriers++;

        // Deduct cost
        $scope.coin -= $scope.carrierCost;

        // Increase cost for the next one, using Math.ceil() to round up
        $scope.carrierCost = Math.ceil($scope.carrierCost * 1.1);

        // Increase unsortedPerSecond
        $scope.unsortedPerSecond = $scope.unsortedPerSecond * 1.15;
    };
    
    // Run UI update code every 10ms
    $interval(function() {
        $scope.unsortedMail += $scope.unsortedPerSecond / 100;

        // Sorters sort 1 per second (1/100 every 10ms)
        var numSorted = ($scope.numSorters * 1 / 100);
        if (numSorted > Math.floor($scope.unsortedMail)) {
            numSorted = Math.floor($scope.unsortedMail);
        }
        $scope.unsortedMail -= numSorted;
        $scope.sortedMail += numSorted;

        // Carriers deliver 1 per second (1/100 every 10ms)
        var numDelivered = ($scope.numCarriers * 1 / 100);
        if (numDelivered > Math.floor($scope.sortedMail)) {
            numDelivered = Math.floor($scope.sortedMail);
        }

        $scope.sortedMail -= numDelivered;
        $scope.coin += numDelivered;
    }, 10);
}]);