// get the search element
const search_location=document.querySelector('#search')
const weather_description=document.querySelector("#weather_description")
const result=document.querySelector('#result')
const days=document.querySelector("#days")

const address=document.querySelector('#address')
const cords=document.querySelector('#cords')
const switch_button=document.querySelector("#switch_unit")

let is_celcius= true

    //when the switch unit button is clicked, call the switch_unit function to handle the logic

switch_button.addEventListener('click',(e)=>{
    e.preventDefault();
    switch_unit()
})





//when search is clicked
search_location.addEventListener('click',(e)=>{
    e.preventDefault()

    // get the user input(location)
    const user_input=document.querySelector('#location').value.trim()
    // genereate the url to fetch the date from the api. hardcoded the api key for now
    const unit= is_celcius? 'metric': 'us'
    const weather_data= fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${user_input}?unitGroup=${unit}&key=W6XK5DBSA9GYF2PUDDPFEM6G9&contentType=json`)
    .then((data)=>{

        //since .catch will not catch an error as log as an http reqest is received, we will throw an error if the ok status of the request is faul
        if(!data.ok)
            //thow a new error if the ok status of the response is negative
            throw new Error('Location not found')
        return data.json()}) 
    // if fetch returns a success http response, call weatheUPdate function
    .then((response)=>{weatherUpdate(response)})
    // if fetch returns an unsuccessful response
    .catch(()=>{
        document.querySelector('.main_panel').innerHTML=""
        document.getElementById("error").innerText='Location not found'
    })

})

function weatherUpdate(data){
    // to clean the previous results before adding new ones.
    days.innerHTML=''
    
    address.textContent= `Address: ${JSON.stringify(data.resolvedAddress)}`
    cords.textContent=`Longitude:${data.longitude}     Latitude: ${data.latitude}`
    weather_description.textContent=data.description

    data.days.forEach(day_data => 
        {
        const icon=get_weather_ion(day_data.icon.toLowerCase()) // convert the weather to lowercase cause we will do string comparison
        const day = document.createElement("div");
        day.classList.add("box");

        day.innerHTML = `
        <img  height=72px width=72px src="${icon}">
        <div class='mini-box'>
        <h3>${day_data.datetime}</h3>
        <p>Temp: ${day_data.temp} ${(is_celcius)? '°C':'F'} Min:${day_data.tempmin} ${(is_celcius)? '°C':'F'} Max:${day_data.tempmax} ${(is_celcius)? '°C':'F'}</p>
        
        </div>
      `
        ;
    
        days.appendChild(day)
        });
} 

function switch_unit(){
        is_celcius=!is_celcius
        if(is_celcius)
           { document.querySelector('#current_unit').textContent="Celcius"}
        else
            {document.querySelector('#current_unit').textContent="Fahrenheit"}


}

function get_weather_ion(weather_condition){
    if (weather_condition.includes('cloudy'))
        return './cloudy.png'
    else if(weather_condition.includes('clear'))
        return './sunny.pgn'
    return './rainy.png'
}

