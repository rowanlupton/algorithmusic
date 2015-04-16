inlets=2;
outlets=1;

var keySig=[];

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
	if (note<0) {
		note+=keySig.length;
	};
	note=keySig[note];
	
	return(note);
};