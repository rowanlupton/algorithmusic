/*this object takes an input midi note and turns it into a scale degree within
the currently-chosen key signature*/

inlets=2; //sets number of inlets
outlets=1; //sets number of outlets

var keySig=[]; //declares the keySig array for use later
/*I declare this outside of functions that it will always stay,
instead of being re-made every time a function is called*/

function list(x) { //will be called when the js object receives a list (messagebox)
	if (inlet==1) { //checks that input is coming from the right inlet
		keySig = []; //initializes keySig[] to be empty (resets it)
		for (var i=0;i<arguments.length;i++) { 
		/*creates a variable, runs as long as that variable is smaller than
		the number of arguments sent by the messagebox, increments each time*/
			keySig.push(arguments[i]%12);//adds each argument to keySig[]
		};
	} else { //if it got a list not from the right inlet
		post("wrong input\n"); //write to the Max console that it was the wrong input
	};
};

function msg_int(x) { //if it receives an integer
	if (inlet==0) { //checks that input is coming from the left inlet
		var index = convert(x);
		/*calls function convert, sending it the input. sets index equal to
		the returned value*/
		outlet(0,index);//sends index out of the outlet, to the rand.js object
	} else { //if it got a list not from the left inlet
		post("wrong input\n"); //write to the Max console that it was the wrong input
	};
};

function convert(note) { //takes the variable that is sent to it, calls it note
	note%=12; //takes modulo 12 of note
	var cont=true; //initializes cont as true
	var i=0; //initializes i as 0
	do { //does everything inside curly braces as long as while condition is met
	/* this loop checks each number inside of keySig to see if it matches
	the note that was sen to convert. it starts at keySig[0], then 
	keySig[1], etc*/
		if (keySig[i]==note) {
			cont=false; //sets cont to be false (leaves loop)
		} else if (i>keySig.length) {
			post("note out of key\n"); //tells the console that the note was out of key
			cont=false; //leaves loop
		};
		i++; //increments i by 1
	} while (cont); //while cont is true
	
	return (i-1); //sends back the index value that matched note
	/* I subtract one because the loop increments i by one after I check the
	note, whether or not it matches.*/
};