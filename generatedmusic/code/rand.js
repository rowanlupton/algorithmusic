//ins and outs
inlets=3;
outlets=1;
//universal variables (always available)
var keySig=0;
var noteVal=0;
var countVal=0;
var noteHist=[];

//parses incoming messages into the right variables
function anything(x) { //takes all messages that aren't integers
	if (inlet==0) { //if it came in the left inlet, then set the keySig variable to it
		keySig = x;
	} else if (inlet==2) { //if it came in the right inlet, then it's the counter value (the beat number)
		countVal=x;
	} else { //otherwise, post that it came in the wrong inlet
		post("wrong inlet\n");
	};
};

function msg_int(x) { //takes all integers
	if (inlet==1) { //checks that it came in the middle inlet
		noteVal = x; //sets noteVal to the input number
		genStep();//generate the next harmony note!
	};
};

//here's where the magic happens
/*basic rundown is, it chooses a number between 1 and 100. depending on what
that number is, it adds or subtracts 1, 2, or 3, or stays the same relative 
to the previous harmonized note. After doing this, it checks whether the
resulting note creates a consonant interval. if it is, it continues; if not, it
generates a new next note. when it continues, it calls the function
progressArray() with the next value, and then function play().
this function has the potential for an infinite loop; when my program freezes
(uncommon, but it happens) this is why.*/
function genStep() {
	var nextNum=0;
	var nextNote=noteVal-4;//initializes nextNote as noteVal down a fourth in case there isn't a harmonization history
	if (noteHist.length >= 1) { //if there is a history of harmony
		var cont=true; //exit condition for while loop
		do {
			nextNum = Math.floor((Math.random()*100)+1); //number generator
			
			//weighted probabilities for intervals
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
			} else { //if something goes wrong with the random generation (should never happen)
				nextNote=noteVal-4;
			};
		
			cont=checkInterval(nextNote); //calls function to check whether note is a consonant interval
		} while (cont);
	};
	
	progressArray(nextNote); //sends nextNote to progress the harmony history array
	play(); //outputs the note
};

/*in this function, I check whether the proposed next note creates a consonant
interval with the note that I am harmonizing with*/
function checkInterval(nextNote) {
	if (nextNote%11<noteVal%11) { //equalizes all octaves with modulo
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

//sends to the console if somebody connects a button to this object
function bang() {
	post("I don't do anything on a bang");
};