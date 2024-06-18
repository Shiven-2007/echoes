import { animate, timeline } from "motion";



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
const currDate = new Date();
const day = currDate.getDay();
const month = currDate.getMonth();
const date = currDate.getDate();
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
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
const minutes = currDate.getMinutes();
const hours = currDate.toLocaleString("en-US", {
	hour: "numeric",
	hour12: true,
});
document.querySelectorAll("#time")[0].innerHTML = `${hours.split(" ")[0]}:${
	minutes < 10 ? "0" : ""
}${minutes}`;
setInterval(() => {
	const currDate = new Date();
	const hours = currDate.toLocaleString("en-US", {
		hour: "numeric",
		hour12: true,
	});
	const minutes = currDate.getMinutes();
	document.querySelectorAll("#time")[0].innerHTML = `${hours.split(" ")[0]}:${
		minutes < 10 ? "0" : ""
	}${minutes}`;
}, 1000);

const socket = io();
const roomid = window.location.pathname.split("/")[2];
socket.emit("create", roomid);

socket.on("triggerPhotoNotification", (row) => {
	console.log(row);
	document
		.querySelector(`.notification${row}`)
		.animate(
			[
				{ transform: "translateX(-50%) translateY(-200%)" },
				{ transform: "translateX(-50%) translateY(0)" },
			],
			{
				duration: 500,
				iterations: 1,
				fill: "forwards",
				easing: "ease-in-out",
			}
		);
});

document.querySelectorAll(".backButton").forEach((button) => {
	button.addEventListener("click", () => {
		hidePage(button.closest(".page"));
	});
});

document.querySelectorAll(".hotbar")[0].addEventListener("click", () => {
	showPage(document.querySelector(".allChats"));
});
document.querySelectorAll(".notification")[0].addEventListener("click", () => {
	showMomChats();
	document.querySelectorAll(".notification")[0].classList.add("hidden");
});
document.querySelectorAll(".notification")[1].addEventListener("click", () => {
	showRockGirlChats();
	document.querySelectorAll(".notification")[1].classList.add("hidden");
});
document.querySelectorAll(".notification")[2].addEventListener("click", () => {
	console.log("clicked");
	showKevinChats();
	document.querySelectorAll(".notification")[2].classList.add("hidden");
});

function showMomChats() {
	showPage(document.querySelector(".momChat"));
	startMomChats();
}

function showRockGirlChats() {
	showPage(document.querySelector(".rockGirlChat"));
	startRockGirlChats();
}
function showKevinChats() {
	showPage(document.querySelector(".kevinChat"));
	startKevinChats();
}


document.querySelectorAll(".chatBody .chatContact").forEach((contact, i) => {
	if (i == 0) {
		contact.addEventListener("click", () => {
			showPage(document.querySelector(".momChat"));
		});
	}
	if (i == 1) {
		contact.addEventListener("click", () => {
			showPage(document.querySelector(".rockGirlChat"));
		});
	}
	if (i == 2) {
		contact.addEventListener("click", () => {
			showPage(document.querySelector(".kevinChat"));
		});
	}
});

function startMomChats() {
	const chatpage = document.querySelector(".momChat .chatMessages");
	const messages = [
		"The echoes are louder now. Walls don't usually talk, right?",
		"if walls could talk, they'd tell a thousand stories. Some too heavy to carry.",
		"Like stories that end before the book does?",
		"Yes, unfinished chapters. Sometimes the pen runs out of ink too soon.",
		"Is it my pen that's broken?",
		"We all write with the same pen here. Sometimes it's just the paper that's flawed.",
		"Who's paper? Yours? Mine?",
		"A mix of all, perhaps. A cocktail no one intended to mix.",
		" So, they're separating the pages?",
		"Might be. Some words need fresh air, space between them to make sense.",
		"It's because of the scribbles I made, isn't it?",
	];
	const m1 = "Every place has its ghosts. Why do you ask?";
	startChats(chatpage, messages, m1);
}

function startRockGirlChats() {
	const chatpage = document.querySelector(".rockGirlChat .chatMessages");
	const messages = [
		"I think my shadow's been stretching. Maybe reaching for something gone.",
		"Shadows can play tricks. Or maybe they're just reflections, stretched and distorted.",
		"Like reflections in water that's too deep?",
		"Exactly. Sometimes, deep water hides more than it shows.",
		"What if it's not just hiding but also changing what's underneath?",
		"Change can be deceptive. Are we talking about us?",
		"Maybe us is just a reflection of something else. Something broken.",
		"You mean like your home? That mirror has been cracked a while.",
		"Cracks spread, don't they? All the way through the glass.",
	];
	const m1 = "Sometimes shadows are all that's left at the end of the day. Why?";
	startChats(chatpage, messages, m1);
}

function startKevinChats() {
	const chatpage = document.querySelector(".kevinChat .chatMessages");
	const messages = [
		"Missed the views, the quiet moments. Maybe some peace.",
		"Peace is a road less traveled these days. But you reached your destination, right?",
		"But it's lonelier than I thought up here.",
		"Yeah",
		"Yeah, but the kid inside didn't want this zip code. He wanted a home.",
		"That kid still around? Thought he might've moved out by now.",
		"No, he's here. Hides in the corners of big empty rooms. Still scared of the dark.",
		"Can't outrun what's inside. Got to face it, sooner or later.",
		"I thought if I ran fast enough, far enough, I'd be someone new.",
	];
	
	const m1="Efficiency over experience. But what did you miss along the way?";
	startChats(chatpage, messages, m1);
}
	


function startChats(chatpage, messages, message1) {
	const m1 = document.createElement("div");
	m1.classList.add("theirMessage");
	m1.innerHTML = message1;
	chatpage.appendChild(m1);
	let i = 0;
	let interval = setInterval(() => {
		if (i < messages.length) {
			let message = document.createElement("div");
			if (i % 2 == 0) {
				message.classList.add("yourMessage");
			} else {
				message.classList.add("theirMessage");
			}
			message.innerHTML = messages[i];
			chatpage.appendChild(message);
			animateMessage(chatpage.lastChild);
			chatpage.scrollTo({ top: chatpage.scrollHeight, behavior: "smooth" })
			i++;
		} else {
			addReadReceipt(chatpage);
			clearInterval(interval);
		}
	}, 3000);
}




function addReadReceipt(chatpage) {
	const readReceipt = document.createElement("div");
	readReceipt.classList.add("readReceipt");
	readReceipt.innerHTML = "Read 9:41 PM";
	chatpage.appendChild(readReceipt);
	animateMessage(chatpage.lastChild);
	chatpage.scrollTo({ top: chatpage.scrollHeight, behavior: "smooth" })
}



function showPage(targetPage, currentPage) {
	animate(targetPage,{
		x: ["100%", "0%"],
	},{
		duration: 0.4,
		easing: [0.16, 1, 0.3, 1],
	})
	if(currentPage){
		animate(currentPage,{
			x: ["0%", "-50%"],
		},{
			duration: 0.4,
			easing: [0.16, 1, 0.3, 1],
		})
	}
}

function hidePage(page) {
	animate(page,{
		x: ["0%", "100%"],
	},{
		duration: 0.5,
		easing: [0.16, 1, 0.3, 1],
	})
}


function animateMessage(message){
	animate(message,{
		opacity: [0, 1],
		y: [20, 0],
	},{
		duration: 0.5,
		easing: [0.16, 1, 0.3, 1],
	})
}