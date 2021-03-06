
$(document).ready(function() {

    let date = []

    let stockValue = []

    var myChart;

    var clicked = true;

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB7FoClUg_vFWCfyZLegDveIwcnbr3WIcs",
        authDomain: "stocks4hire-488ef.firebaseapp.com",
        databaseURL: "https://stocks4hire-488ef.firebaseio.com",
        projectId: "stocks4hire-488ef",
        storageBucket: "stocks4hire-488ef.appspot.com",
        messagingSenderId: "233038305491"
    };
    firebase.initializeApp(config);
    

    $("#add-button").on("click", function(event){
        event.preventDefault();

        var first;
        var last;

        date = []

        stockValue = []

        var input = $("#user-input").val().trim()

        console.log(input);

        input = input.toUpperCase();

        var queryURL = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + input + "&types=quote,chart&range=1m&last=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response){

        getNews(response[input].quote.companyName);

        console.log(response);
        
        for(var i = 0; i < response[input].chart.length; i++){

            stockValue.push(response[input].chart[i].close);
            date.push(response[input].chart[i].date);

        }

        first = stockValue[0];
        last = stockValue[20];

        var color;

            if (first > last){
                color = 'rgba(200, 0, 0, 1)'
                $("#my-data").css("color", "red");
            }
            else if(first < last){
                color = 'rgba(0, 200, 0, 1)'
                $("#my-data").css("color", "green");
            }

        var tbody = $("#stockslisted");
        
        var name = $("<td>").text(response[input].quote.companyName);
        var close = $("<td>").text("$" + response[input].chart[20].close);
        var canvas = $("<canvas>");

        canvas.attr("id", input);

        var table = $("<tr>").append(name, close, "<br>").attr("val", input).addClass("chart");

        var newRow = $("<tr>").append(canvas);


        tbody.append(table, newRow);

            var ctx = document.getElementById(input).getContext('2d');
            myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,

                datasets: [{
                    label: input,
                    data: stockValue,
                    backgroundColor:[
                        'rgba(0, 0, 0, 0)'
                    ],
                    borderColor: [
                        color
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: color
                    }
                },
                responsive:true,
                maintainAspectRatio:true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:false
                        }
                    }]
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDfQP6TQSTiLKBpE16fqOd_JDx-xfCS55g",
    authDomain: "stocks-eeae4.firebaseapp.com",
    databaseURL: "https://stocks-eeae4.firebaseio.com",
    projectId: "stocks-eeae4",
    storageBucket: "stocks-eeae4.appspot.com",
    messagingSenderId: "623424739833"
  };
  firebase.initializeApp(config);

let database = firebase.database();
let auth = firebase.auth()
// $("#signIn").on("click", function(event) {
//     event.preventDefault()
//     const email = $("#email").val().trim()
//     const pass = $("#password").val().trim()
//     const signIn = auth.signInWithEmailAndPassword(email,pass)
//     signIn.catch(e => console.log(e.message))
// })
console.log('running')
$("#signUp").on("click", function(event) {
    console.log("test")
    event.preventDefault();
    email = $("#email").val().trim()
    pass = $("#password").val().trim()
    console.log("email")
    const signUp = auth.createUserWithEmailAndPassword(email,pass)
    signUp.catch(e => console.log(e.message))
})

auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(`user logged in`)
    } else {
        console.log(`user logged out`)
    }
})


let API = "https://api.iextrading.com/1.0"
let query = "/stock/aapl/chart"
let date = 5
// let yAxesMin;
// let yAxesMax;
let stockValue = []
function getURL() {
url = API + query
$.get(url).then(function(obj) {

    console.log(obj);

    for (let i = 0; i < 20; i++) {
    date.push(obj[i].date)
    stockValue.push(obj[i].vwap)
    // yAxesMin = Math.min(...stockValue) - 10
    console.log(stockValue)
    }
}).catch( error => console.log(error))
} 
getURL()
// chart need to make it so that it changes based on different click functions
setTimeout(function() {
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: date,
        datasets: [{
            label: 'stock price',
            data: stockValue,
            backgroundColor: [
                'rgba(0, 0, 0, 0.5)'
            ],
            borderColor: [
                'rgba(0, 255, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
        maintainAspectRatio:true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:false
                }
            }
    
            });
        }, 1);

        
            var click = $(this).attr("val");

            $("#" + click).hide();

            console.log(click);
        });

        console.log("Made chart");

    $(document).on("click", ".chart", function(){

        console.log("hey")
        
        var click = $(this).attr("val");

        if(!clicked){

            $("#" + click).show();

            console.log(clicked);

            clicked = true;
        }
        else if(clicked){

            $("#" + click).hide();
            
            clicked = false;
        }
    });

function getNews(item){

    var URL = 'https://newsapi.org/v2/everything?q=' + item + 's&apiKey=d53b18e6f2bb4408bb4b79dd3dfb406b'

    $.ajax({
        url: URL,
        method: "GET"
      })
      .then(function(response){
        
        for(i = 0; i < 5; i++){
            var newsURL = response.articles[i].url;
            var title = response.articles[i].title;
            var date = response.articles[i].publishedAt.substr(0,10);
            var author = response.articles[i].author;
            
            $("#news" + i).append('<a href="'+newsURL+'" target="blank">'+title+' (Date: '+date+') '+'Author: '+author+'</a><br>');
        
      };
    });
}

});
// when you click on a stock it dropsdown below(using bootstrap) and shows a graph with one month of stock data

// when clicking the star icon next to the stock it will add it to the users favorites firebase

// basic login page that will push user data to firebase or retrieve if already there

// have a moment clock that lists the time until market closes update this every 60000ms(1min)

// pull top 5 news stories from financial times when document loads and put in news div

// when you click on stock it will change the news to search for that company name and show the top five results

// when you type in a company to search it will show results and then prepend them to the stock div where you can click to show graph and news stories and will add it to the users firebase to show at the div recent searches

// if error on search pull up modal that states error company cannot be found

// when clicking home button will show the main page with the top 5 stocks again

// add buttons above graph that will change timeframe

