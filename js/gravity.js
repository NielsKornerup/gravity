var canvas = document.getElementById("grav-canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var Speed = 2;
var MaxSize= 30;
var numGrav = 5;
var allParticles=[];
var gravConstant = 50;
var PI = 3.141592;
var maxSpeed = 10;
var maxDist =900;
var collisions=false;

function initializeGrav() {
    for (var i = 0; i < numGrav; i++) {
        var grav = new Object();
	grav.radius = Math.random() * MaxSize;
	grav.mass = Math.pow(grav.radius,2);
        grav.x = (Math.random() * (width-5))+5;
        grav.y = (Math.random() * (height-grav.radius))+grav.radius;
        grav.xSpeed = Math.random() * maxSpeed;
        grav.ySpeed = Math.random() * maxSpeed;
	allParticles.push(grav);
	grav.newYSpeed=grav.ySpeed;
	grav.newXSpeed=grav.xSpeed;
	grav.newY=grav.y;
	grav.newX=grav.x;
    }
}

function bounce(allParticles){
	for (var a = 0; a < allParticles.length; a++) {
		allParticles[a].newYSpeed=allParticles[a].ySpeed;
		allParticles[a].newXSpeed=allParticles[a].xSpeed;
		allParticles[a].newX=allParticles[a].x;
		allParticles[a].newY=allParticles[a].y;
		for (var b = 0; b < allParticles.length; b++) {
			var difX = (allParticles[a].x-allParticles[b].x);
			var difY = (allParticles[a].y-allParticles[b].y);
			var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			var aAngle = 0;
			var bAngle = 0;
			var caAngle = 0;
			var difX2 = (allParticles[a].x-allParticles[b].x);
			var difY2 = (allParticles[a].y-allParticles[b].y);
			var dist2 =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			if(dist!=0&&dist<=(allParticles[a].radius+allParticles[b].radius)){
				var aSpeed = Math.sqrt(Math.pow(allParticles[a].xSpeed,2)+Math.pow(allParticles[a].ySpeed,2));
				var bSpeed = Math.sqrt(Math.pow(allParticles[b].xSpeed,2)+Math.pow(allParticles[b].ySpeed,2));
				while(bSpeed<=aSpeed&&dist2<(allParticles[a].radius+allParticles[b].radius)){
					difX2 = (allParticles[a].newX-allParticles[b].x);
					difY2 = (allParticles[a].newY-allParticles[b].y);
					dist2 =Math.sqrt((Math.pow(difX2,2)+Math.pow(difY2,2)));
					allParticles[a].newX=allParticles[a].newX-allParticles[a].xSpeed/10;
					allParticles[a].newY=allParticles[a].newY-allParticles[a].ySpeed/10;
				}
				aAngle = Math.atan2(allParticles[a].ySpeed,allParticles[a].xSpeed);
				bAngle = Math.atan2(allParticles[b].ySpeed,allParticles[b].xSpeed);
				caAngle = Math.atan2(difY,difX);
				caAngle += Math.PI/2;
				allParticles[a].newYSpeed=(((allParticles[a].ySpeed*(allParticles[a].mass-allParticles[b].mass))+(2*allParticles[b].mass*allParticles[b].ySpeed))/(allParticles[a].mass+allParticles[b].mass));
				allParticles[a].newXSpeed=(((allParticles[a].xSpeed*(allParticles[a].mass-allParticles[b].mass))+(2*allParticles[b].mass*allParticles[b].xSpeed))/(allParticles[a].mass+allParticles[b].mass));
			}
		}
	}
	for (var a = 0; a < allParticles.length; a++) {
		allParticles[a].x=allParticles[a].newX;
		allParticles[a].y=allParticles[a].newY;
		allParticles[a].xSpeed=allParticles[a].newXSpeed;
		allParticles[a].ySpeed=allParticles[a].newYSpeed;
	}
};

function moveGrav(){
	if(collisions){
		bounce(allParticles);
	}
	for (var x = 0; x < allParticles.length; x++) {
		for (var y = x; y < allParticles.length; y++) {
			var difX = (allParticles[x].x-allParticles[y].x);
			var difY = (allParticles[x].y-allParticles[y].y);
			var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			if(dist>5&&dist<maxDist){
				allParticles[x].xSpeed-=(difX*allParticles[y].radius*gravConstant)/Math.pow(dist,3);
				allParticles[x].ySpeed-=(difY*allParticles[y].radius*gravConstant)/Math.pow(dist,3);
				allParticles[y].xSpeed+=(difX*allParticles[x].radius*gravConstant)/Math.pow(dist,3);
				allParticles[y].ySpeed+=(difY*allParticles[x].radius*gravConstant)/Math.pow(dist,3);
			}
		}
	}
	for (var x = 0; x < allParticles.length; x++) {
		if(allParticles[x].xSpeed>maxSpeed){
			allParticles[x].xSpeed=maxSpeed;
		}
		if(allParticles[x].ySpeed>maxSpeed){
			allParticles[x].ySpeed=maxSpeed;
		}
		allParticles[x].x+=allParticles[x].xSpeed;
		allParticles[x].y+=allParticles[x].ySpeed;
		if (allParticles[x].x >= canvas.width-(allParticles[x].radius/2)) {
			allParticles[x].xSpeed=-Math.abs(allParticles[x].xSpeed);
		}
		if(allParticles[x].x <= (allParticles[x].radius)){
			allParticles[x].xSpeed=Math.abs(allParticles[x].xSpeed);
		}
	        if (allParticles[x].y >= canvas.height-(allParticles[x].radius/2)) {
	        	allParticles[x].ySpeed = -Math.abs(allParticles[x].ySpeed);
		}
		if(allParticles[x].y <= (allParticles[x].radius)){
			allParticles[x].ySpeed = Math.abs(allParticles[x].ySpeed);
		}
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
        ctx.arc(gravity.x /*- (charge.radius)*/, gravity.y /*- (charge.radius)*/, gravity.radius, 0, 2 * PI);
        ctx.fill();
        ctx.stroke();
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
initializeGrav();

$("#controls-submit").click(function() {
numGrav = $("#numparticles").val();
gravConstant = $("#gravstr").val();
collisions = $("#collisions").is(":checked");
allParticles = [];
initializeGrav();
});

function main() {
moveGrav();
drawGrav();
requestAnimationFrame(main);
};
requestAnimationFrame(main);
