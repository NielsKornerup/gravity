var canvas = document.getElementById("charge-canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var chargeSpeed = 2;
var chargeMaxSize= 30;
var numCharges = 5;
var allParticles=[];
var gravConstant = .1;
var PI = 3.141592;
var maxSpeed = 10;
var maxDist =900;

function initializeCharge() {
    for (var i = 0; i < numCharges; i++) {
        var charge = new Object();
	charge.radius = Math.random() * chargeMaxSize;
        charge.x = (Math.random() * (width-5))+5;
        charge.y = (Math.random() * (height-5))+5;
        charge.xSpeed = Math.random() * chargeSpeed;
        charge.ySpeed = Math.random() * chargeSpeed;
	allParticles.push(charge);
    }
}

function moveCharges(){
for (var x = 0; x < allParticles.length; x++) {
for (var y = 0; y < allParticles.length; y++) {
var difX = (allParticles[x].x-allParticles[y].x);
var difY = (allParticles[x].y-allParticles[y].y);
var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
if(dist>5&&dist<maxDist){
allParticles[x].xSpeed-=(difX*allParticles[y].radius*gravConstant)/Math.pow(dist,2);
allParticles[x].ySpeed-=(difY*allParticles[y].radius*gravConstant)/Math.pow(dist,2);
allParticles[y].xSpeed+=(difX*allParticles[x].radius*gravConstant)/Math.pow(dist,2);
allParticles[y].ySpeed+=(difY*allParticles[x].radius*gravConstant)/Math.pow(dist,2);
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

function drawCharges() {
    ctx.fillStyle = "rgba(255,255,255,.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < allParticles.length; i++) {
        charge = allParticles[i];
        ctx.beginPath();
        var colorString = 'rgb(255,0,0)';
        //ctx.fillStyle = colorString;
        ctx.strokeStyle = colorString;
        ctx.arc(charge.x - (charge.radius), charge.y - (charge.radius), charge.radius, 0, 2 * PI);
        ctx.fill();
        ctx.stroke();
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < allParticles.length; i++) {
        charge = allParticles[i];
        ctx.beginPath();
        var colorString = 'rgb(0,0,255)';
       //ctx.fillStyle = colorString;
        ctx.strokeStyle = colorString;
        ctx.arc(charge.x - (charge.radius), charge.y - (charge.radius), charge.radius, 0, 2 * PI);
        ctx.fill();
        ctx.stroke();
    }
}
initializeCharge();

$("#controls-submit").click(function() {
numCharges = $("#numparticles").val();
gravConstant = $("#gravstr").val();
allParticles = [];
initializeCharge();
});

function main() {
moveCharges();
drawCharges();
requestAnimationFrame(main);
};
requestAnimationFrame(main);
