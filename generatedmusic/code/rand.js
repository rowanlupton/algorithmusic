//ins and outs
inlets=3;
outlets=1;
//universal variables! woo hoo!
var keySig=0;
var noteVal=0;
var countVal=0;
var noteHist=[];

//parses incoming messages into the right variables
function anything(x) {
	if (inlet==0) {
		keySig = x;
	} else if (inlet==2) {
		countVal=x;
	} else {
		post("no inlet\n");
	};
};

function msg_int(x) {
	if (inlet==1) {
		noteVal = x;
		genStep();//generate the next harmony note!
	};
};

//HERE'S WHERE THE MAGIC HAPPENS
function genStep() {
	var cont=true;
	var nextNum=0;
	var nextNote=noteVal-4;
	if (noteHist.length >= 1) {
		do {
			nextNum = Math.floor((Math.random()*100)+1);
			
			if(nextNum<=5) {
				nextNote=noteHist[0]+3;
			} else if(nextNum<=15) {
				nextNote=noteHist[0]+2;
			} else if(nextNum<=43) {
				nextNote=noteHist[0]+1;
			} else if (nextNum<=57) {
				nextNote=noteHist[0]+0;
			} else if (nextNum<=85) {
				nextNote=noteHist[0]-1;
			} else if (nextNum<=95) {
				nextNote=noteHist[0]-2;
			} else if (nextNum<=100) {
				nextNote=noteHist[0]-3;
			} else {
				nextNote=noteVal-4;
			};
		
			cont=checkInterval(nextNote);
		} while (cont);
	};
	
	progressArray(nextNote);
	play();
};

function checkInterval(nextNote) {
	if (nextNote%11<noteVal%11) {
		 if (((nextNote+2)%11)==(noteVal%11)) {
			return false;
		} else if (((nextNote+4)%11)==(noteVal%11)) {
			return false;
		} else if (((nextNote+5)%11)==(noteVal%11)) {
			return false;
		} else if (((nextNote+7)%11)==(noteVal%11)) {
			return false;
 		} else {
			return true;
		};
	};
};

//here, I push everything in the noteHist array back an index, and add the new note value at the beginning
function progressArray(nextNote) {
	noteHist.unshift(nextNote);
	if(noteHist.length > 6) noteHist.pop();
};

//sends note information out after generation
function play() {
	outlet(0,noteHist[0]);
};

function bang() {
	post("I don't do anything on a bang");
};