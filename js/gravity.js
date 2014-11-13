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

function initializeGrav() {
    for (var i = 0; i < numGrav; i++) {
        var grav = new Object();
	grav.radius = Math.random() * MaxSize;
        grav.x = (Math.random() * (width-5))+5;
        grav.y = (Math.random() * (height-grav.radius))+grav.radius;
        grav.xSpeed = Math.random() * maxSpeed;
        grav.ySpeed = Math.random() * maxSpeed;
	allParticles.push(grav);
    }
}

function moveGrav(){
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
allParticles = [];
initializeGrav();
});

function main() {
moveGrav();
drawGrav();
requestAnimationFrame(main);
};
requestAnimationFrame(main);
