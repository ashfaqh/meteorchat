pad = "";
remotepad = "";
color = "";
padFn = "draw";

if(!Meteor.isClient) return;

Pad = function Pad(id) {

	this.id = id;

	var blackboard = document.getElementById('board-canvas');
	var boardCanvas = $('#board-canvas');
	blackboard.width = $('.black-board').innerWidth();
	blackboard.height = $('.black-board').innerHeight();

 	var ctx = blackboard.getContext('2d');
 	var drawing = false;
	var from;
 	var skipCount = 0;
 	var ColorId;

 	setColorId(localStorage.getItem('ColorId') || Random.id());

	var pad = Hammer(blackboard);
	pad.get('pan').set({direction: Hammer.DIRECTION_ALL});

 //hammer.js touch events
	pad.on('panstart', onDragStart);
	pad.on('panend', onDragEnd);
	pad.on('pan', onDrag);

	setPadFn('draw');
	wipe();

	function onDrag(event) {
		var to = getPosition(event);
 		drawLine(from, to, color, padFn);
 		LineStream.emit(id + ':drag', Meteor.user(), to);
		from = to;
		skipCount = 0;
 	}

	function onDragStart(event) {
		drawing = true;
		from = getPosition(event);
		LineStream.emit(id + ':dragstart', Meteor.user(), from, color);
	}

	function onDragEnd(event) {
		drawing = false;
		LineStream.emit(id + ':dragend', Meteor.user());
 	}

	function getPosition(event) {
		if (event) {		
	 		return {
	 			x: event.center.x - event.target.offsetLeft + window.scrollX,
	 			y: event.center.y - event.target.offsetTop + window.scrollY
	 		};
		}
 	}

	function drawLine(from, to, color, func) {
		ctx.strokeStyle = (func == 'draw') ? color : '#ECECEC';
		if (func == 'erase') {
			ctx.lineWidth = 20;
		} else {
			ctx.lineWidth = 1;
		}
		ctx.beginPath();
		ctx.moveTo(from.x, from.y);
		ctx.lineTo(to.x, to.y);
		ctx.closePath();
		ctx.stroke();
	}

	function setColorId(Id) {
		ColorId = Id;
 		localStorage.setItem('ColorId', ColorId);
 		if (!color) {
 			color = localStorage.getItem('color-' + ColorId);
 		} else {
 			localStorage.setItem('color-' + ColorId, color);
 		}
		 
		if(!color) {
 			color = '#000000';
			localStorage.setItem('color-' + ColorId, color);
		}
	}

	function wipe(emitAlso) {
		ctx.fillStyle = '#ECECEC';
		ctx.fillRect(2, 2, blackboard.width - 4, blackboard.height - 4);

		ctx.strokeStyle = color;
		ctx.lineCap = 'round';
		ctx.lineWidth = 10;	
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 20;
		ctx.fillStyle = '#ECECEC';	
		ctx.shadowColor = '#000000';
		ctx.fill();

		ctx.shadowBlur = 0;
		if (emitAlso) {
			LineStream.emit(id + ':wipe', Meteor.user());
		}
	}

	function setPadFn(func) {
		padFn = func;
		LineStream.emit(id + ':func', Meteor.user(), func);	
	}

	function getPadFn() {
		return padFn;
	}

/*	ctx.strokeStyle = color;
	ctx.fillStyle = '#ECECEC';
	ctx.lineCap = 'round';
	ctx.lineWidth = 1;
	ctx.fillRect(0, 0, blackboard.width, blackboard.height); */

// Stop iOS from doing the bounce thing with the screen
	document.ontouchmove = function(event){
 		event.preventDefault();
 	}

 //expose API
	this.drawLine = drawLine;
	this.wipe = wipe;
	this.setColorId = setColorId;
	this.setPadFn = setPadFn;
	this.getPadFn = getPadFn;

	this.close = function() {
 		pad.remove('pan');
	}
}