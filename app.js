//jshint esversion:6
const express = require("express");
const app = express();
app.set("view engine","ejs");

const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){
    //putting https:// infront of api is very very imp
    const place = req.body.city;
    const ApiKey = "76b2aaa82e09b6436041d2b93b21dbc8"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+place+"&units=metric&appid="+ApiKey
    https.get(url,function(response){
        // response.on("data",function(data){
        //     const weatherData = JSON.parse(data)
        //     // console.log(weatherData);
        //     const temperature = weatherData.main.temp;
        //     const pres = weatherData.main.pressure;
        //     const humid = weatherData.main.humidity;
        //     const windSpeed = weatherData.wind.speed;
        //     const cityName = weatherData.name;
        //     const descrp = weatherData.weather[0].description;
        //     const icon = weatherData.weather[0].icon;
        //     let today = new Date();
        //     let options = {
        //         weekday: "long",
        //         day: "numeric",
        //         month: "long"
        //     }
        //     dayName = today.toLocaleDateString("en-US",options);
        //     console.log(temperature+"  "+pres+"  "+humid+"   "+windSpeed+"  "+cityName+"   "+descrp+"  "+icon+"  "+dayName);
        //     const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        //     res.write("<img src="+imageURL+">");
        //     res.write("<h3>The temp is "+temperature+"</h3>")
        //     res.send()
        // })
        // console.log(response);
        // console.log(response.statusCode)
        if( response.statusCode===404){
            res.render("failure")            
        }
        else{
            response.on("data",function(data){
                const weatherData = JSON.parse(data)
                // console.log(weatherData);
                const temperature = weatherData.main.temp;
                const pres = weatherData.main.pressure;
                const humid = weatherData.main.humidity;
                const windSpeed = weatherData.wind.speed;
                const cityName = weatherData.name;
                const descrp = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                let today = new Date();
                let options = {
                    weekday: "long",
                    day: "numeric",
                    month: "long"
                }
                let hrs = today.getHours();
                let mins = today.getMinutes();
                if (mins<10){
                    mins = "0"+mins
                }
                let curTime = hrs + ":" + mins;
                // dayName
                const day_arr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
                const Months = ["Jan","Feb","March","April","June","July","Aug","Sep","Oct","Nov","Dec"]
                var current_day =  today.getDay();
                var curDay = day_arr[current_day];
                var day = day_arr[current_day];
                var month = today.getMonth();
                var MonthName = Months[month-1]
                var CurDate = today.getDate();
                const dayName = curDay+", "+MonthName+" "+CurDate
                // console.log(temperature+"  "+pres+"  "+humid+"   "+windSpeed+"  "+cityName+"   "+descrp+"  "+icon+"  "+dayName);
                const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
                // res.write("<img src="+imageURL+">");
                // res.write("<h3>The temp is "+temperature+"</h3>")
                res.render("weatherDetails",{tmp:temperature,city:cityName,description:descrp,humidPercent:humid,Speed:windSpeed,date:dayName,time:curTime,weatherImg:imageURL})
            })
        }
        
    })
    // res.sendFile(__dirname+"/index.html");
});

app.post("/weatherDetails",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/failure",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.listen(3000,function(){
    console.log("Server started on port 3000");
});







// app.post("/",function(req,res){
//     var n1 = req.body.num1;
//     var n2 = req.body.num2;
//     var ans = Number(n1) + Number(n2)
//     res.send("ans: "+ans);  //gives numeric result with string not with only numeric value
// })
// app.get("/",function(req,res){
//     res.send("<h3>Helllo Duniya</h3>");
// });
