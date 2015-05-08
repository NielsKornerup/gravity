var canvas = document.getElementById("grav-canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth*2/3-10;
canvas.height = window.innerHeight-10;
var width = canvas.width;
var height = canvas.height;
var Speed = 2;
var MaxSize= 30;
var numGrav = 5;
var allParticles=[];
var gravConstant = 2;
var PI = 3.141592;
var maxSpeed = 30;
var maxDist =900;
var collisions=true;

function initializeGrav() {
	document.getElementById('numparticles').value=numGrav;
	document.getElementById('gravstr').value=gravConstant*50;
	for (var i = 0; i < numGrav; i++) {
		var grav = new Object();
		grav.radius = Math.random() * MaxSize;
		grav.mass = Math.pow(grav.radius,2);
		grav.location = new Object();
		grav.velocity = new Object();
		grav.newLocation = new Object();
		grav.newVelocity = new Object();
		grav.location.x = (Math.random() * (width-5))+5;
		grav.location.y = (Math.random() * (height-grav.radius))+grav.radius;
		grav.velocity.x = Math.random() * 5;
		grav.velocity.y = Math.random() * 5;
		allParticles.push(grav);
		grav.newVelocity.y=grav.velocity.y;
		grav.newVelocity.x=grav.velocity.x;
		grav.newLocation.y=grav.location.y;
		grav.newLocation.x=grav.location.x;
	}
}

function bounce(allParticles){
	for (var a = 0; a < allParticles.length; a++) {
		allParticles[a].newVelocity.y=allParticles[a].velocity.y;
		allParticles[a].newVelocity.x=allParticles[a].velocity.x;
		allParticles[a].newLocation.x=allParticles[a].location.x;
		allParticles[a].newLocation.y=allParticles[a].location.y;
		for (var b = 0; b < allParticles.length; b++) {
			var difX = (allParticles[a].location.x-allParticles[b].location.x);
			var difY = (allParticles[a].location.y-allParticles[b].location.y);
			var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			var aAngle = 0;
			var bAngle = 0;
			var caAngle = 0;
			var difX2 = (allParticles[a].location.x-allParticles[b].location.x);
			var difY2 = (allParticles[a].location.y-allParticles[b].location.y);
			var dist2 =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			if(dist!=0&&dist<=(allParticles[a].radius+allParticles[b].radius)){
				var aSpeed = Math.sqrt(Math.pow(allParticles[a].velocity.x,2)+Math.pow(allParticles[a].velocity.y,2));
				var bSpeed = Math.sqrt(Math.pow(allParticles[b].velocity.x,2)+Math.pow(allParticles[b].velocity.y,2));
				while(bSpeed<=aSpeed&&dist2<(allParticles[a].radius+allParticles[b].radius)){
					difX2 = (allParticles[a].newLocation.x-allParticles[b].location.x);
					difY2 = (allParticles[a].newLocation.y-allParticles[b].location.y);
					dist2 =Math.sqrt((Math.pow(difX2,2)+Math.pow(difY2,2)));
					allParticles[a].newLocation.x=allParticles[a].newLocation.x-allParticles[a].velocity.x/10;
					allParticles[a].newLocation.y=allParticles[a].newLocation.y-allParticles[a].velocity.y/10;
				}
				aAngle = Math.atan2(allParticles[a].velocity.y,allParticles[a].velocity.x);
				bAngle = Math.atan2(allParticles[b].velocity.y,allParticles[b].velocity.x);
				caAngle = Math.atan2(difY,difX);
				caAngle += Math.PI/2;
				allParticles[a].newVelocity.y=(((allParticles[a].velocity.y*(allParticles[a].mass-allParticles[b].mass))+(2*allParticles[b].mass*allParticles[b].velocity.y))/(allParticles[a].mass+allParticles[b].mass));
				allParticles[a].newVelocity.x=(((allParticles[a].velocity.x*(allParticles[a].mass-allParticles[b].mass))+(2*allParticles[b].mass*allParticles[b].velocity.x))/(allParticles[a].mass+allParticles[b].mass));
			}
		}
	}
	for (var a = 0; a < allParticles.length; a++) {
		allParticles[a].location.x=allParticles[a].newLocation.x;
		allParticles[a].location.y=allParticles[a].newLocation.y;
		allParticles[a].velocity.x=allParticles[a].newVelocity.x;
		allParticles[a].velocity.y=allParticles[a].newVelocity.y;
	}
};

function moveGrav(){
	for (var x = 0; x < allParticles.length; x++) {
		for (var y = x; y < allParticles.length; y++) {
			var difX = (allParticles[x].location.x-allParticles[y].location.x);
			var difY = (allParticles[x].location.y-allParticles[y].location.y);
			var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			if(dist>allParticles[x].radius+allParticles[y].radius){
				allParticles[x].velocity.x-=(difX*allParticles[y].mass*gravConstant)/Math.pow(dist,3);
				allParticles[x].velocity.y-=(difY*allParticles[y].mass*gravConstant)/Math.pow(dist,3);
				allParticles[y].velocity.x+=(difX*allParticles[x].mass*gravConstant)/Math.pow(dist,3);
				allParticles[y].velocity.y+=(difY*allParticles[x].mass*gravConstant)/Math.pow(dist,3);
			}
		}
	}
	if(collisions){
		bounce(allParticles);
	}
	for (var x = 0; x < allParticles.length; x++) {
		if (Math.abs(allParticles[x].velocity.x) > maxSpeed){
			allParticles[x].velocity.x = Math.abs(allParticles[x].velocity.x)*maxSpeed/(allParticles[x].velocity.x);
		}
		if (Math.abs(allParticles[x].velocity.y) > maxSpeed){
			allParticles[x].velocity.y = Math.abs(allParticles[x].velocity.y)*maxSpeed/(allParticles[x].velocity.y);
		}
		if (allParticles[x].location.x >= canvas.width-(allParticles[x].radius/2)) {
			allParticles[x].velocity.x=-Math.abs(allParticles[x].velocity.x);
		}
		if(allParticles[x].location.x <= (allParticles[x].radius)){
			allParticles[x].velocity.x=Math.abs(allParticles[x].velocity.x);
		}
	        if (allParticles[x].location.y >= canvas.height-(allParticles[x].radius/2)) {
	        	allParticles[x].velocity.y = -Math.abs(allParticles[x].velocity.y);
		}
		if(allParticles[x].location.y <= (allParticles[x].radius)){
			allParticles[x].velocity.y = Math.abs(allParticles[x].velocity.y);
		}
		allParticles[x].location.x+=allParticles[x].velocity.x;
		allParticles[x].location.y+=allParticles[x].velocity.y;
	}
}

function drawGrav() {
	ctx.fillStyle = "rgba(255,255,255,.2)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < allParticles.length; i++) {
		gravity = allParticles[i];
		ctx.beginPath();
		var colorString = 'rgb(0,0,255)';
		//ctx.fillStyle = colorString;
		ctx.strokeStyle = colorString;
		ctx.arc(gravity.location.x /*- (charge.radius)*/, gravity.location.y /*- (charge.radius)*/, gravity.radius, 0, 2 * PI);
		ctx.fill();
		ctx.stroke();
	}
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

initializeGrav();

$("#controls-submit").click(function() {
	if($("#numparticles").val()>15||$("#numparticles").val()<0){
		alert("Please use between 0 and 15 particles");
	}
	else if($("#gravstr").val()>250||$("#gravstr").val()<-250){
		alert("Please make gravity's strength between -250 and 250");
	}
	else{
		numGrav = $("#numparticles").val();
		gravConstant = $("#gravstr").val()/50;
		collisions = $("#collisions").is(":checked");
		allParticles = [];
		initializeGrav();
	}
});

function main() {
	moveGrav();
	drawGrav();
	requestAnimationFrame(main);
};
requestAnimationFrame(main);
