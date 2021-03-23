const express=require("express");

const bodyParser= require("body-parser");

const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");


});

app.post("/",function(req,res){

    var city= req.body.city;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=b7d7ae253455e6640baaae98a163a901&units=metric";
    
    https.get(url,function(response){

        console.log(response.statusCode);

            response.on("data",function(data){
                
                const weatherData=JSON.parse(data);

                const temp=weatherData.main.temp;  
                
                const weatherDes=weatherData.weather[0].description;
                const feelsLike=weatherData.main.feels_like;


                const icon=weatherData.weather[0].icon;
                
                res.set("Content-Type", "text/html");

                res.write("<h2> The weather in "+city+" is currently " + weatherDes+ ".</h2>");

                res.write("<h2>Today's temp in " +city+" is " + temp+" degrees Celcius.</h2>");

                res.write("<h2>But feels like " +feelsLike+" degrees Celcius.</h2>");
                
                const url2="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            
                res.write("<img src="+url2+ ">");
            
                res.send();
            });
    });


});


app.listen(3000,function(){

    console.log("server started listening to 3000");
});