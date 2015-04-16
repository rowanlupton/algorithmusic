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
		var index = convert(x);
		outlet(0,index);
	} else {
		post("wrong input\n");
	};
};

function convert(note) {
	note%=12;
	post("%note:",note,"\n");
	var cont=true;
	var i=0;
	do {
		if (keySig[i]==note) {
			post("keySig = note at:",i,"\n");
			cont=false;
		} else if (i>keySig.length) {
			post("note out of key\n");
			cont=false;
		};
		post("exit if\n");
		i++;
	} while (cont);
	
	return (i-1);
};