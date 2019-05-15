var app = angular.module('angularjsNodejsTutorial', []);

app.controller('userController', function($scope, $http) {
  $scope.users = [];
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/dashboard',
      method: "POST"
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        $scope.users = response.users;
        console.log($scope.users)
        console.log("works")
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
});

app.controller('q1Controller', function($scope, $http) {
  $scope.users = [];
  // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

  var request = $http({
    url: '/getState',
    method: "POST"
  })

  request.success(function(response) {
    // success
    console.log(response);
    if (response.result === "success") {
      $scope.stateList = response.rows;
      console.log($scope.rows)
      console.log("works")
    }
  });
  request.error(function(err) {
    // failed
    console.log("error: ", err);
  });

  $scope.q1 = function(state) {

    var request = $http.post('/q1/' + state);

    request.success(function(data, status_code) {
      // success
      $scope.rows = data.rows;
      $scope.most_safe = data.rows[0];
      $scope.second_safe = data.rows[1];
      $scope.third_safe = data.rows[2];
      //console.log($scope.rows)
      //console.log(transportationPreference)
      //console.log(price)
      console.log(data.query)
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  }
});

app.controller('q2Controller', function($scope, $http) {
  $scope.users = [];
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/q2',
      method: "POST"
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        $scope.regionData = response.regionData;
        console.log($scope.regionData)
        console.log("works")
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
});

app.controller('q3Controller', function($scope, $http) {
  
  $scope.ans = []

  var request = $http({
      url: '/getQ3',
      method: "POST"
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        $scope.ans = response.ans;
        console.log($scope.ans);
        console.log("works");
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
});

app.controller('q4Controller', function($scope, $http) {
  $scope.users = [];
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/q4',
      method: "POST"
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        $scope.rows = response.rows;
        console.log($scope.rows)
        console.log("works")
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
});

app.controller('q5Controller', function($scope, $http) {
  $scope.users = [];
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/q5',
      method: "POST"
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        $scope.rows = response.rows;
        console.log($scope.rows)
        console.log("works")
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
});

app.controller('q6Controller', function($scope, $http) {
  $scope.transportationOptions = ["Driving", "Carpool", "Bus", "Walk", "Other"];
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);
    var request = $http({
      url: '/getState',
      method: "POST"
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        $scope.stateList = response.rows;
        console.log($scope.rows)
        console.log("works")
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

    $scope.q6 = function(transportationPreference, price, state) {
    var request = $http.post('/q6/' + transportationPreference + "/" + price + "/" + state);
    request.success(function(data, status_code) {
      // success
      $scope.rows = data.rows;
      //console.log($scope.rows)
      //console.log(transportationPreference)
      //console.log(price)
      console.log(data.query)
    });
    request.error(function(data) {
      // failed
      console.log("error");
    });
  }
});

app.controller('q7Controller', function($scope, $http) {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);
    var request = $http({
      url: '/getState',
      method: "POST"
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        $scope.stateList = response.rows;
        console.log($scope.rows)
        console.log("works")
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

    $scope.q7 = function(state) {
    var request = $http.post('/q7/' + state);
    request.success(function(data, status_code) {
      // success
      $scope.rows = data.rows;
      //console.log($scope.rows)
      //console.log(transportationPreference)
      //console.log(price)
      console.log(data.query)
    });
    request.error(function(data) {
      // failed
      console.log("error");
    });
  }
});

app.controller('q8Controller', function($scope, $http) {
  $scope.users = [];
  // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/q8',
      method: "POST"
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        $scope.rows = response.rows;
        console.log($scope.rows)
        console.log("works")
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
});

app.controller('gmapController', function($scope, $http) {
  $scope.users = [];
  // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/g_map',
      method: "POST"
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        $scope.rows = response.rows;
        console.log($scope.rows)
        console.log("works")
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
});
