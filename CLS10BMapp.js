//CLS10-BMapp.js
var imgTrckr = function (name, source) {
  this.imageSource = source;
  this.upVotes = 0;
  this.name = name;
  // this.y = this.forVotes;
  // this.label = name;
};

var imgUpVotes = 0;
var totalUpVotes = 0;

var bmImgOpt = [
   new imgTrckr('Cthulhu', 'BM-IMG/cthulhu.jpg'),
   new imgTrckr('wine_glass', 'BM-IMG/wine_glass.jpg'),
   new imgTrckr('bag', 'BM-IMG/bag.jpg'),
   new imgTrckr('banana', 'BM-IMG/banana.jpg'),
   new imgTrckr('boots', 'BM-IMG/boots.jpg'),
   new imgTrckr('chair', 'BM-IMG/chair.jpg'),
   new imgTrckr('dragon', 'BM-IMG/dragon.jpg'),
   new imgTrckr('pen', 'BM-IMG/pen.jpg'),
   new imgTrckr('scissors', 'BM-IMG/scissors.jpg'),
   new imgTrckr('shark', 'BM-IMG/shark.jpg'),
   new imgTrckr('sweep', 'BM-IMG/sweep.jpg'),
   new imgTrckr('unicorn' 'BM-IMG/unicorn.jpg'),
   new imgTrckr('usb', 'BM-IMG/usb.jpg'),
   new imgTrckr('water_can', 'BM-IMG/water_can.jpg')
];
