//CLASS 11 Bus Mall Assignment add chart to display table info from class10
/* This is a class/object that stores image name/source and votes, built later */
var imgTrx = function(name, source) { //function #1
    this.name = name;
    this.imgSource = source;
    this.upVotes = 0;
    this.lifetimeUpVotes = 0;
};

//var imgUpVotes = 0;  //not used (would have tracked total votes for a signle image)
var totalUpVotes = 0; //total votes the user has cast.  stops at 15

//imgOptions, used to build imgTrx array
// each individual array entry is an imgTrx object, constructed with name & source
//then the upvotes is set to 0
var imgOptions = [                                      //fixed all pics show. but click event not working//
    new imgTrx('bag', 'BM-IMG/bag.jpg'),
    new imgTrx('banana', 'BM-IMG/banana.jpg'),
    new imgTrx('boots', 'BM-IMG/boots.jpg'),
    new imgTrx('chair', 'BM-IMG/chair.jpg'),
    new imgTrx('cthulhu', 'BM-IMG/cthulhu.jpg'),
    new imgTrx('dragon', 'BM-IMG/dragon.jpg'),
    new imgTrx('pen', 'BM-IMG/pen.jpg'),
    new imgTrx('scissors', 'BM-IMG/scissors.jpg'),
    new imgTrx('shark', 'BM-IMG/shark.jpg'),
    new imgTrx('sweep','BM-IMG/sweep.jpg'),
    new imgTrx('unicorn', 'BM-IMG/unicorn.jpg'),
    new imgTrx('usb','BM-IMG/usb.jpg'),
    new imgTrx('water_can', 'BM-IMG/water_can.jpg'),
    new imgTrx('wine_glass', 'BM-IMG/wine_glass.jpg')
];
/* imgOptions[2] refers to the boots image.  from there.... */
/* i can do imgOptions[2].name to get its name, or .upVotes to get its votes */

//3 images selected & showed to user will be stored here
var pickedImages = [];


var chart; // globalize chart variable
var resultsChart;

function initializeChart() { // object constructor
  var imgOptionsAsJson = [];
  for(var i=0;i<imgOptions.length; i++) {
    imgOptionsAsJson[i] = { label: imgOptions[i].name, y: imgOptions[i].upVotes };
  }


  var chartProperties = {
    title: {
      text: "Market Data Results"
    },
    data: [
    {
      // Change type to "doughnut", "line", "splineArea", etc.
      type: "column", // type of chart to render
      dataPoints: imgOptionsAsJson
    }
    ]
  };

  chart = new CanvasJS.Chart('chart-container', chartProperties);
  chart.render(); // draws chart
  document.getElementById('chart-container').style.height="400px";
}

/* gets 3 images and displays them to the user */
function getThreeImages() { //function #2


    pickedImageIndex = []; //clear the "selected images" array
    //this array will only hold numbers 0-13 to represent pictures

    //putting 3 images into ids "pic1" through 3 in the HTML
    //when imageID is 1, we are picking the image for "pic1"
    for (var imageID = 1; imageID <= 3; imageID++) {
      /* picks a random number 0 through 13, to pick which image to use */
        do {
          var index = Math.floor(Math.random() * 14); // 0-13
        }while(pickedImageIndex.indexOf(index)>=0);  //if that number is in array, go back
        /* go back & try again if the selected image is in "pickedImageIndex" array */

        //get the image file location from the array
        var source = imgOptions[index].imgSource;
        var divtag = document.getElementById('pic' + imageID); // get the div pic1 or pic2, etc
        var img = document.createElement('img'); //create a new image
        img.src = source; //set it up...
        img.height = 200;
        img.width = 200;
        divtag.innerHTML = ""; //clear the old picture
        divtag.appendChild(img); //add the new picture to the div
        pickedImageIndex.push(index); //put the index into the pickedImageIndex array so we dont get it again
    }

    document.getElementById("progress-meter").innerHTML = "Question #" + (1+totalUpVotes) + "/15<br>";
};

//resets the entire experience to prepare for a new user
function resetChart() {
  //collapse and hide both charts
  document.getElementById('chart-container').innerHTML = "";
  document.getElementById('chart-container').style.height="0px";

  document.getElementById('all-results').innerHTML = "";
  document.getElementById('all-results').style.height="0px";

  //turn on the images
  document.getElementById('image-container').style.display = "flex";

  //dump all the upvotes (in case user quit midway)
  for(var i=0; i<imgOptions.length; i++)
  {
          imgOptions[i].upVotes = 0;
  }
  totalUpVotes = 0;
  getThreeImages();
}

//shows the marketer the sum of ALL historic data from all users, combined
function showAllResults() {
  //blank out/reset stuff
  document.getElementById('image-container').style.display = "none";
  document.getElementById('chart-container').innerHTML = "";
  document.getElementById('chart-container').style.height="0px"; //collaps the chart
  document.getElementById('all-results').innerHTML = "";

  var imgOptionsAsJson = []; //build JSON data here, from imgOptions

  for(var i=0;i<imgOptions.length; i++) {
    //each element here represents one bar
    imgOptionsAsJson[i] = { label: imgOptions[i].name, y: imgOptions[i].lifetimeUpVotes };
  }


  //mostly defaults
  var chartProperties = {
    title: { text: "All Data Results" },
    data: [
    {
      // Change type to "doughnut", "line", "splineArea", etc.
      type: "column", // type of chart to render
      dataPoints: imgOptionsAsJson //use our data here!
    }
    ]
  };

  chart = new CanvasJS.Chart('all-results', chartProperties);
  chart.render(); // draws chart

  //expand the div that the chart is in, so it takes up physical space
  document.getElementById('all-results').style.height="400px";

}

/* when any image is clicked */
function recordClick(event) { //function #3-
    if(totalUpVotes >= 15) { /*don't accept the click if already has 15 votes */
      return;
    }

    var clickedImage = event.target; /* get the image object from DOM that was cliked */
    var clickedImageSource = clickedImage.src; /* link to file on harddrive c:\wherever\dog.jpg */
    //console.log('clicked SRC: '+clikcedImageSource:
    /* go through ALL the images in our "database" array */
    for (var index = 0; index < imgOptions.length; index++) {

        /* check to see if the "keyword" is found in the file name */
        /* example: if "pen1.jpg" is in c:\files\whatever\pen1.jpg */
        if (clickedImageSource.indexOf(imgOptions[index].imgSource) >= 0) {
          /* found the item clicked that was in the array */
            imgOptions[index].upVotes++; //record the votes (add 1 to upvotes)
            totalUpVotes++; //add one to total votes
        }
    }

//    if (totalUpVotes > 3 && totalUpVotes < 15) {
    if(totalUpVotes == 15) { //survey over
      document.getElementById('Survey Results').innerHTML = 'Voting finished ' + totalUpVotes + ' votes in this survey.';

      //display the user's chart
      initializeChart();

      //log upon completion, all upvotes get added to lifetime votes & upvotes clear
      //this must be done AFTER chart displays
      for(var i=0; i<imgOptions.length; i++)
      {
              imgOptions[i].lifetimeUpVotes = imgOptions[i].lifetimeUpVotes + imgOptions[i].upVotes;
              imgOptions[i].upVotes = 0;
      }

//hide the images
      document.getElementById('image-container').style.display = "none";
/*
      var chart = imgOptions;
      function initializeChart(){
        var chartProperties = {
          title:{
            text:'Bus Mall Product Survey'
          },
          data : [
            {
              type: 'column',
              dataPoints:imgOptions
            }
          ]
        };
        chart = new CanvasJS.Chart('chart-container', chartProperties);
        chart.render();
      }
*/

      //window.addEventListener('load', initializeChart);
        //var table = document.getElementById('product-votes'); //build a table
        /* go through ALL the imgOptions database array objects */
      //for (var index = 0; index < imgOptions.length; index++) {
            /*var currentImage = imgOptions[index]; //get the next object
            var imageRow = document.createElement('tr'); //build a row with the data

            //name cell
            var imageNameCell = document.createElement('td');
            imageNameCell.innerText = currentImage.name;
            imageRow.appendChild(imageNameCell);

            //votes cell
            var totalUpVotesCell = document.createElement('td');
            totalUpVotesCell.innerText = currentImage.upVotes;
            imageRow.appendChild(totalUpVotesCell);
            //console.log(totalUpVotesCell.innerText);

            //total of all historic votes?
            var summaryCell = document.createElement('td');
            summaryCell.innerText = currentImage.upVotes;
            imageRow.appendChild(summaryCell);

            table.appendChild(imageRow); //add that row to the table
            */
        //}
    }
    else { /* this is not the 15th vote, then we have more voting to do */
      getThreeImages();
    }
};

//when the page first loads, start everything up (only happens once)
getThreeImages();
document.getElementById('pic1').addEventListener('click', recordClick);
document.getElementById('pic2').addEventListener('click', recordClick);
document.getElementById('pic3').addEventListener('click', recordClick);
