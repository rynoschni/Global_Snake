function get(url) {
    //Step1: fetch data
    return fetch(url)
        //Step2: Run the json() method from the server response
        .then(function(response) {
            return response.json();
        })
        //Step3: Return the data from the response.json() method
        .then(function(data) {
        return data;
        })
}