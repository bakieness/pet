'use strict';

/* Controllers */
var controllers = angular.module('controllers', ['firebase'])
    .constant('FIREBASE_URL', 'https://ipet.firebaseio.com/');;

controllers.controller('RegistrationCtrl', ['$scope', 'Authentication', function ($scope, Authentication) {
    $scope.login = function () {
        Authentication.login($scope.user);
    };

    $scope.logout = function () {
        Authentication.logout();
    };
    
    $scope.register = function () {
        Authentication.register($scope.user);
    };
}]);

controllers.controller('ReminderCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL',
    function ($scope, $location, $rootScope, $routeParams, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL) {
        $scope.whichpet = $routeParams.pId;
        $scope.whichreminder = $routeParams.rId;
        var petsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/');
        var petsInfo = $firebaseArray(petsRef);

        $scope.pets = petsInfo;

        if ($scope.whichreminder) {
            var reminderRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/' + $scope.whichpet + '/Reminders/');
            var reminderInfo = $firebaseObject(reminderRef.child($scope.whichreminder));
        }

        $scope.reminder = reminderInfo;
        
        var dateRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/' + $scope.whichpet + '/Reminders/' + $scope.whichreminder + '/date');
        var dateInfo = $firebaseObject(dateRef);

        dateInfo.$loaded().then(function () {
            $scope.reminder.date = new Date(dateInfo.$value);
        });
    
        $scope.addReminder = function () {
            var reminderRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/' + $scope.pet + '/Reminders/');
            var ReminderInfo = $firebaseArray(reminderRef);

            $scope.dateof = document.getElementById("dateinput").value;

            ReminderInfo.$add({
                note: $scope.note,
                date: $scope.dateof.toString(),
            });

            $location.path('/dates');
        };

        $scope.editReminder = function (id) {
            var reminderRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/' + $scope.whichpet + '/Reminders/' + id);

            $scope.reminder.date = document.getElementById("dateinput").value;
            
            reminderRef.update({
                note: $scope.reminder.note,
                date: $scope.reminder.date.toString()
            });
        };
}]);

controllers.controller('PetCtrl', ['$scope', '$rootScope', '$routeParams', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL',
    function ($scope, $rootScope, $routeParams, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL) {
        $scope.whichpet = $routeParams.pId;
        $scope.whichuser = $routeParams.uId;
        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if (authUser) {
                var petsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/');
                var petsInfo = $firebaseArray(petsRef);
                

                $scope.pets = petsInfo;

                $scope.addPet = function () {
                    petsInfo.$add({
                        name: $scope.petName,
                        age: $scope.petAge,
                        weight: $scope.petWeight,
                        animal: $scope.petAnimal,
                        gender: $scope.petGender,
                        notes: $scope.petNote
                    }).then(function () {

                    });
                };

                $scope.deletePet = function (id) {
                    var refDel = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/' + id);
                    refDel.remove();
                };
            }
        });
    }]);

controllers.controller('DetailCtrl', ['$scope', '$rootScope', '$routeParams', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL',
    function ($scope, $rootScope, $routeParams, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL) {
        $scope.whichpet = $routeParams.pId;
        $scope.whichuser = $routeParams.uId;

        var petsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/');
        var petInfo = $firebaseObject(petsRef.child($scope.whichpet));
        $scope.pet = petInfo;

        $scope.editPet = function (id) {
            var petRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/' + id);

            petRef.update({
                name: $scope.pet.name,
                age: $scope.pet.age,
                weight: $scope.pet.weight,
                animal: $scope.pet.animal,
                gender: $scope.pet.gender,
                notes: $scope.pet.notes
            });
        }

        var reminderRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/' + $scope.whichpet + '/Reminders/');
        var reminderInfo = $firebaseArray(reminderRef);
        $scope.reminders = reminderInfo;

        $scope.deleteReminder = function (id) {
            var refDel = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pets/' + $scope.whichpet + '/Reminders/' + id);
            refDel.remove();
        };
}]);
