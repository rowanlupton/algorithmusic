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
		post("got key signature\n");
		keySig = x;
	} else if (inlet==2) {
		post("got count\n");
		countVal=x;
	} else {
		post("no inlet\n");
	};
};

function msg_int(x) {
	if (inlet==1) {
		post("got note:",x,"\n");
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
			//post("random:",nextNum,"\n");
			
			//7 numbers
			/*
			*5 10 28 14 28 10 5
			*
			*
			*/
			if(nextNum<=5) {
				post("+3\n");
				nextNote=noteHist[0]+3;
			} else if(nextNum<=15) {
				post("+2\n");
				nextNote=noteHist[0]+2;
			} else if(nextNum<=43) {
				post("+1\n");
				nextNote=noteHist[0]+1;
			} else if (nextNum<=57) {
				post("+0\n");
				nextNote=noteHist[0]+0;
			} else if (nextNum<=85) {
				post("-1\n");
				nextNote=noteHist[0]-1;
			} else if (nextNum<=95) {
				post("-2\n");
				nextNote=noteHist[0]-2;
			} else if (nextNum<=100) {
				post("-3\n");
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
	//post("((nextNote+2)%11)",((nextNote+2)%11),"\n");
	//post("(noteVal%11)",(noteVal%11),"\n");
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
	post("noteHist.length:",noteHist.length,"\n");
	noteHist.unshift(nextNote);
	if(noteHist.length > 6) noteHist.pop();
};

//sends note information out after generation
function play() {
	outlet(0,noteHist[0]);
	post("noteHist:");
	for (var i=0;i<noteHist.length;i++) {
		post(noteHist[i]);
	};
	post();
	post("------\n");
};

//test
function bang() {
	post("noteHist:",noteHist,"\n");
	genStep();
};