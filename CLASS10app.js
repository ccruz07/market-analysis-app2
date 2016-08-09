
/* This is a class/object that stores image name/source and votes, built later */
var imgTrx = function(name, source) { //function #1
    this.name = name;
    this.imgSource = source;
    this.upVotes = 0;
};

//var imgUpVotes = 0;  //not used (would have tracked total votes for a signle image)
var totalUpVotes = 0; //total votes the user has cast.  stops at 15

//imgOptions, used to build imgTrx array
// each individual array entry is an imgTrx object, constructed wiht name & source
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

/* gets 3 images and displays them to the user */
function getThreeImages() { //function #2


    pickedImageIndex = []; //clear the "selected images" array
    //this array will only hold numbers 0-13 to represent pictures

    //putting 3 images into ids "pic1" through 3 in the HTML
    //when imageID is 1, we are picking the image for "pic1"
    for (var imageID = 1; imageID <= 3; imageID++) {
      /* picks a random number 0 through 13, to pick which image to use */
        do {
          //var index = Math.floor(Math.random() * imgOptions.length);
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
};

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
            //console.log('totalUpVotes: '+totalUpVotes);
            //console.log('clicked item: '+imgOptions[index].name);
            //console.lot('imgOptions[index]:' +imgOptions[index]);
            //imgUpVotes += imgOptions[index].upVotes;
            //console.log('imgUpVotes: '+imgUpVotes);
        }
    }

    //if (totalUpVotes > 3 && totalUpVotes < 15) {
    if(totalUpVotes == 15) { //survey over
      document.getElementById('Survey Results').innerHTML = 'Voting finished ' + totalUpVotes + ' votes in this survey.';
        var table = document.getElementById('product-votes'); //build a table
        /* go through ALL the imgOptions database array objects */
        for (var index = 0; index < imgOptions.length; index++) {
            var currentImage = imgOptions[index]; //get the next object
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
        }
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
