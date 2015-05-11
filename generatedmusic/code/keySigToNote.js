/*this object takes a note that is in the form of a scale degree and
converts it back into a midi note value*/

//number of inlets/outlets
inlets=2;
outlets=1;

//declares the keySig array
var keySig=[];

//takes input from a messagebox and fills keySig[]
function list(x) {
	if (inlet==1) {
		keySig = [];
		for (var i=0;i<arguments.length;i++) {
			keySig.push(arguments[i]%12);
		};
	} else {
		post("wrong input\n");
	};
};

/*takes an integer from the left inlet and converts it from a scale degree to
a midi value*/
function msg_int(x) {
	if (inlet==0) {
		var note = convert(x);
		outlet(0,note);
	} else {
		post("wrong input\n");
	};
};

function convert(note) {
	note%=keySig.length;
	/*if the note is larger than the length of the key signature (normally,
	if it was added to when it was a high scale degree to begin) brings
	it back into the basic range*/
	if (note<0) {
	/*if the note is less than 0 (normally, if it was subtracted from when it
	was a low scale degree to begin) brings it back into the basic range*/
		note+=keySig.length;
	};
	
	note=keySig[note]; //sets note variable to that degree of the key signature
	
	return(note);
};