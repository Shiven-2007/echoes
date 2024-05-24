import { animate, timeline } from "motion";

const currDate = new Date();
const day = currDate.getDay();
const month = currDate.getMonth();
const date = currDate.getDate();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

document.getElementById(
	"date"
).innerHTML = `${days[day]} ${months[month]} ${date}`;

const hours = currDate.toLocaleString("en-US", {
	hour: "numeric",
	hour12: true,
});
const minutes = currDate.getMinutes();
document.getElementById("time").innerHTML = `${
	hours.split(" ")[0]
}:${minutes} ${hours.split(" ")[1]}`;
setInterval(() => {
	const currDate = new Date();
	const hours = currDate.toLocaleString("en-US", {
		hour: "numeric",
		hour12: true,
	});
	const minutes = currDate.getMinutes();
	document.getElementById("time").innerHTML = `${hours.split(" ")[0]}:${
		minutes < 10 ? "0" : ""
	}${minutes} ${hours.split(" ")[1]}`;
}, 1000);

function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	document.getElementById("photoWindowTitle").onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top =
			Math.min(Math.max(elmnt.offsetTop - pos2, -15), windowHeight - 50) + "px";
		elmnt.style.left =
			Math.min(Math.max(elmnt.offsetLeft - pos1, -100), windowWidth - 100) +
			"px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

dragElement(document.getElementById("photoWindow"));

document.getElementById("photoIcon").addEventListener("click", () => {
	document.querySelector("#photoWindow>img").src =
		document.querySelector("#photoIcon img").src;
	document.getElementById("photoWindow").classList.remove("hidden");
});

document.querySelectorAll(".close").forEach((element) => {
	element.addEventListener("click", () => {
		element.closest(".parent").classList.add("hidden");
	});
});

setTimeout(() => {
	console.log("flicker");
	const element = document.querySelector("#photos");
	console.log(element.clicked);
	if (!element.clicked){
		animate(
			element,
			{ filter: ["saturate(1)", "saturate(0)"]},
			{
				repeat: Infinity,
				duration: 0.5,
				easing:"steps(2)",
				direction: "alternate",
			}
		);
	}
}, 3000);


document.querySelector("#photos").addEventListener("click", function(){
	this.clicked = true;
	this.getAnimations()
		.forEach((animation) => {
			animation.cancel();
		});
	document.querySelector("#photos").style.filter = "saturate(1)";
	document.querySelector(".photosApp").classList.remove("hidden");
});
window.mobileCheck = function () {
	let check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};
const socket = io();
const roomid = window.location.pathname.split("/")[2];
socket.emit("create", roomid);
let currentPlaying = null;
document.querySelectorAll(".photos>div>img").forEach((photo) => {
	photo.addEventListener("click", () => {
		console.log(photo.dataset.row);
		document.querySelector("#photoWindow .mainImg").src = photo.src;
		document.querySelector("#photoWindow").classList.remove("hidden");
		socket.emit("photoNotification", photo.dataset.row, roomid);
		if (currentPlaying) {
			document.querySelector(`#music${currentPlaying}`).pause();
		}
		document.querySelector(`#music${photo.dataset.row}`).play();
		currentPlaying = photo.dataset.row;
	});
});

