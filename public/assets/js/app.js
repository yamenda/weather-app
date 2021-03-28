console.log("this is the client side js file");

const serverUrl = '/';

const goAddress = function() {

    const address = document.getElementById('address').value;
    const error = document.getElementById('error');
    const location = document.getElementById('location');
    const forecast = document.getElementById('forecast');

    console.log("address: ", address);

    fetch(serverUrl + 'weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                error.innerHTML = data.error;
                location.innerHTML = "";
                forecast.innerHTML = "";
            }else {
                console.log(data);
                error.innerHTML = "";
                location.innerHTML = data.location;
                forecast.innerHTML = data.forecast;
            }
        });
    });

}


