//CLASS 12 Bus Mall Assignment tracking user info

//------------------- CLASSES -------------------
/* This is a class/object that stores image name/source and votes, built later */
var voteTracker = function(name, source) { //function #1
    this.name = name;
    this.imgSource = source;
    this.upVotes = 0;
    this.lifetimeUpVotes = 0;
    this.showVotes = function(){                                         //new function for class 12

    }
};

//------------------- GLOBAL VARIABLES -------------------
var totalUpVotes = 0; //total votes the user has cast.  stops at 15
var imgToTrx = []; //objects array of all the images & vote data
var pickedImages = []; //3 images selected & showed to user will be stored here
var chart; // globalize chart variable
var resultsChart; //marketing chart with sum of all results

//------------------- PAGE LOAD EVENTS -------------------
//greets the user on page load
function greetUser() {
//  localStorage.removeItem('username'); //clear user data for testing
  if(localStorage.getItem('username')==null){
    var username = prompt('Welcome to Bus Mall Vote Tracker!', 'Enter your name');
    localStorage.setItem('username', username);
    document.getElementById('greeting').innerText = 'Welcome ' + username;

  } else{
    var username = localStorage.getItem('username');
    document.getElementById('greeting').innerText = 'Welcome Back, ' + username;
  }
};

//set up the imgToTrx array with voteTracker objects
function initializeImagesToTrack() {

    //new function for class 12//

    //if found in local storage, retrieve it
    if(localStorage.getItem('marketData') != null)
    {
        var marketData = localStorage.getItem('marketData');
        imgToTrx = JSON.parse(marketData);
    }
    else { //otherwise load with blank data
      imgToTrx.push(new voteTracker('bag', 'BM-IMG/bag.jpg'));
      imgToTrx.push(new voteTracker('banana', 'BM-IMG/banana.jpg'));
      imgToTrx.push(new voteTracker('boots', 'BM-IMG/boots.jpg'));
      imgToTrx.push(new voteTracker('chair', 'BM-IMG/chair.jpg'));
      imgToTrx.push(new voteTracker('cthulhu', 'BM-IMG/cthulhu.jpg'));
      imgToTrx.push(new voteTracker('dragon', 'BM-IMG/dragon.jpg'));
      imgToTrx.push(new voteTracker('pen', 'BM-IMG/pen.jpg'));
      imgToTrx.push(new voteTracker('scissors', 'BM-IMG/scissors.jpg'));
      imgToTrx.push(new voteTracker('shark', 'BM-IMG/shark.jpg'));
      imgToTrx.push(new voteTracker('sweep','BM-IMG/sweep.jpg'));
      imgToTrx.push(new voteTracker('unicorn', 'BM-IMG/unicorn.jpg'));
      imgToTrx.push(new voteTracker('usb','BM-IMG/usb.jpg'));
      imgToTrx.push(new voteTracker('water_can', 'BM-IMG/water_can.jpg'));
      imgToTrx.push(new voteTracker('wine_glass', 'BM-IMG/wine_glass.jpg'));
    }
};


//------------------- CHART FUNCTIONS -------------------
//builds the chart to show the user their own personal result
function initializeChart() { // object constructor
  var imgOptionsAsJson = [];
  for(var i=0;i<imgToTrx.length; i++) {
    imgOptionsAsJson[i] = { label: imgToTrx[i].name, y: imgToTrx[i].upVotes };
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

//resets the entire experience to prepare for a new user
function resetChart() {
  localStorage.removeItem('username');

  //collapse and hide both charts
  document.getElementById('chart-container').innerHTML = "";
  document.getElementById('chart-container').style.height="0px";

  document.getElementById('all-results').innerHTML = "";
  document.getElementById('all-results').style.height="0px";

  //turn on the images
  document.getElementById('image-container').style.display = "flex";

  //dump all the upvotes (in case user quit midway)
  for(var i=0; i<imgToTrx.length; i++)
  {
          imgToTrx[i].upVotes = 0;
  }
  totalUpVotes = 0;

  greetUser();
  showImages();
}

//shows the marketer the sum of ALL historic data from all users, combined
function showAllResults() {
  //blank out/reset stuff
  document.getElementById('image-container').style.display = "none";
  document.getElementById('chart-container').innerHTML = "";
  document.getElementById('chart-container').style.height="0px"; //collaps the chart
  document.getElementById('all-results').innerHTML = "";

  var imgOptionsAsJson = []; //build JSON data here, from imgOptions

  for(var i=0;i<imgToTrx.length; i++) {
    //each element here represents one bar
    imgOptionsAsJson[i] = { label: imgToTrx[i].name, y: imgToTrx[i].lifetimeUpVotes };
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


//------------------- HELPER FUNCTIONS -------------------
//picks 3 images & shows to the user
function showImages(){
    pickedImages = [];
    //this array will only hold numbers 0-13 to represent pictures
    var imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = "";
    //putting 3 images into ids "pic1" through 3 in the HTML
    //when imageID is 1, we are picking the image for "pic1"
    for (var imageID = 1; imageID <= 3; imageID++) {
      /* picks a random number 0 through 13, to pick which image to use */
        do {
          var index = Math.floor(Math.random() * 14); // 0-13
        }while(pickedImages.indexOf(index)>=0);  //if that number is in array, go back
        /* go back & try again if the selected image is in "pickedImageIndex" array */

        //get the image file location from the array
        //var source = imgOptions[index].imgSource;
        var source = imgToTrx[index].imgSource;                       //new info for class 12
        var imageElement = document.createElement('img');
        imageElement.src = source;
        imageContainer.appendChild(imageElement);
        pickedImages.push(index);
        /*var divtag = document.getElementById('pic' + imageID); // get the div pic1 or pic2, etc
        var img = document.createElement('img'); //create a new image
        img.src = source; //set it up...
        img.height = 200;
        img.width = 200;
        divtag.innerHTML = ""; //clear the old picture
        divtag.appendChild(img); //add the new picture to the div
        pickedImageIndex.push(index); //put the index into the pickedImageIndex array so we dont get it again
        */

      }

    document.getElementById("progress-meter").innerHTML = "Question #" + (1+totalUpVotes) + "/15<br>";

};


/* when any image is clicked */
function recordClick(event) {                                                  //UPTD function -class12
  var clickedImage = event.target;
  var clickedImageSource = clickedImage.src;

  for (var index = 0; index < imgToTrx.length; index++) {
    if (clickedImageSource.indexOf(imgToTrx[index].imageSource) >=0) {
      imgToTrx[index].upVotes++;
    }
  }
//  showImages();
  if(totalUpVotes >= 15) { /*don't accept the click if already has 15 votes */
      return;
  }

  var clickedImage = event.target; /* get the image object from DOM that was cliked */
  var clickedImageSource = clickedImage.src; /* link to file on harddrive c:\wherever\dog.jpg */
    //console.log('clicked SRC: '+clikcedImageSource:
    /* go through ALL the images in our "database" array */
  for (var index = 0; index < imgToTrx.length; index++) {

        /* check to see if the "keyword" is found in the file name */
        /* example: if "pen1.jpg" is in c:\files\whatever\pen1.jpg */
        if (clickedImageSource.indexOf(imgToTrx[index].imgSource) >= 0) {
          /* found the item clicked that was in the array */
            imgToTrx[index].upVotes++; //record the votes (add 1 to upvotes)
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
      for(var i=0; i<imgToTrx.length; i++)
      {
              imgToTrx[i].lifetimeUpVotes = imgToTrx[i].lifetimeUpVotes + imgToTrx[i].upVotes;
              imgToTrx[i].upVotes = 0;
      }


      localStorage.setItem('marketData', JSON.stringify(imgToTrx));


//hide the images
      document.getElementById('image-container').style.display = "none";

      var username = localStorage.getItem('username');
      document.getElementById('greeting').innerText = 'Thanks for participating, ' + username;
      localStorage.removeItem('username'); //clear the old user name
  }
  else { /* this is not the 15th vote, then we have more voting to do */
      showImages();
  }
};

//------------------- LOAD EVENTS -------------------
//when the page first loads, start everything up (only happens once)
window.addEventListener("load", greetUser);
window.addEventListener("load", initializeImagesToTrack);
window.addEventListener("load", showImages); //starts the game automatically

//------------------- ACTION EVENTS -------------------
document.getElementById("image-container").addEventListener("click", recordClick);


//end
