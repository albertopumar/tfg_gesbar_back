var React = require("react");
var ReactDOM = require("react-dom");
var SchoolsList = require("./components/SchoolsList.jsx");
var _schools = [];

var getSchoolsCallback = function(schools){
    _schools = schools;
    render();
};

var $ = require("jquery");
var promise = require("es6-promise");

let login = {
    "grant_type": "password",
    "client_id": "mobileV1",
    "client_secret": "abc123456",
    "username": "andrey",
    "password": "simplepassword"
};

$.ajax({
    url: 'http://localhost:7777/oauth/token',
    data: JSON.stringify(login),
    method: "POST",
    contentType: "application/json",
    success: function (val) {
        console.log(val);
    },
    error: function (err) {
        console.log(err);
    }
});

function render(){
    ReactDOM.render(<SchoolsList schools={_schools} />, document.getElementById("container"));
}
