(function (angular, _) {
    'use strict';
    var app = angular.module('app', ['angucomplete-alt']);
    app.controller('FlexboxCtrl', ['$scope', '$document', function ($scope, $document) {
        $scope.parentClasses = ['idd-flex-hz'];
        var styleSheet = $document[0].getElementById('idd-style');
        var rules = styleSheet.sheet.cssRules;
        $scope.flexClasses = _.chain(rules)
            .pluck('selectorText')
            .uniq()
            .filter(function (r) {
                return /flex-(hz|vt)/.test(r);
            })
            .reduce(function (memo, r) {
                return memo.concat(r.split(', '));
            }, [])
            .uniq()
            .sort()
            .map(function (r) {
                return {name: r.substr(1)};
            })
            .value();
        $scope.selectedClass = null;
        $scope.$watch('selectedClass', function (val) {
            if (val) {
                $scope.parentClasses[0] = val.title || val.originalObject;
            }
        });
        $scope.modifier = 'None';
        $scope.$watch('modifier', function (val) {
            $scope.parentClasses = [$scope.parentClasses.shift()];
            if (val !== 'None') {
                $scope.parentClasses.push(val);
            }
        });
    }]);
    app.controller('DimensionsCtrl', ['$scope', '$document', function ($scope, $document) {
        $scope.parentClasses = ['idd-flex-hz'];
        var styleSheet = $document[0].getElementById('idd-style');
        var rules = styleSheet.sheet.cssRules;
        $scope.heightClasses = _.chain(rules)
            .pluck('selectorText')
            .uniq()
            .filter(function (r) {
                return /-h-\d/.test(r);
            })
            .reduce(function (memo, r) {
                return memo.concat(r.split(', '));
            }, [])
            .uniq()
            .map(function (r) {
                return {name: r.substr(1)};
            })
            .value();
        $scope.widthClasses = _.chain(rules)
            .pluck('selectorText')
            .uniq()
            .filter(function (r) {
                return /-w-\d/.test(r);
            })
            .reduce(function (memo, r) {
                return memo.concat(r.split(', '));
            }, [])
            .uniq()
            .map(function (r) {
                return {name: r.substr(1)};
            })
            .value();
        $scope.childClasses = ['idd-h-1_4', 'idd-w-1_4'];
        $scope.selectedHeightClass = null;
        $scope.selectedWidthClass = null;
        $scope.$watch('selectedHeightClass', function (val) {
            if (val) {
                $scope.childClasses[0] = val.title || val.originalObject;
            }
        });
        $scope.$watch('selectedWidthClass', function (val) {
            if (val) {
                $scope.childClasses[1] = val.title || val.originalObject;
            }
        });
    }]);
}(angular, _));
