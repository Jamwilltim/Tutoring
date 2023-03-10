introAnimation();

let count = 0;

const sectionIds = ["#home-button", "#about-us-button", "#contact-us-button", "#our-tutors-button"];

const mainSections = $(".main-section-item");
const descriptionSections = $(".description-section-item");

gsap.set(mainSections, { xPercent: 100 });
gsap.set(mainSections[0], { xPercent: 0 });
gsap.set(descriptionSections, { xPercent: 100 });
gsap.set(descriptionSections[0], { xPercent: 0 });

function introAnimation() {
	const timeline = gsap.timeline({
		onComplete: () => {
			clearInterval(blinkCaret);
			gsap.to(".typewriter-text", { borderColor: "transparent", duration: 1, ease: "power1.out" });
			gsap.to(".intro-fade-in", { opacity: 1, duration: 3, ease: "power3.in" });
		},
	});
	blinkCaret = setInterval(() => {
		gsap.fromTo(".typewriter-text", { borderColor: "transparent" }, { borderColor: "#e9e9e9", duration: 0.1, ease: "linear" });
	}, 500);
	timeline.fromTo(".typewriter-text", { width: 0 }, { width: "100%", duration: 2.5, ease: "steps(14)" });
}

$(".menu-item").click(function () {
	$(".menu-item").removeClass("active");
	$(this).addClass("active");
	let oldCount = count;
	count = compareIds();
	if (oldCount > count) {
		gsap.fromTo(mainSections[count], { xPercent: -100 }, { xPercent: 0, duration: 1.2, ease: "power1.out" });
		gsap.fromTo(mainSections[oldCount], { xPercent: 0 }, { duration: 1.2, xPercent: 100, ease: "power1.out" });
		gsap.fromTo(descriptionSections[oldCount], { xPercent: 0 }, { duration: 1.2, xPercent: 100, ease: "power1.out" });
		gsap.fromTo(descriptionSections[count], { xPercent: -100 }, { xPercent: 0, duration: 1.2, ease: "power1.out" });
	} else if (oldCount < count) {
		gsap.fromTo(mainSections[oldCount], { xPercent: 0 }, { duration: 1.2, xPercent: -100, ease: "power1.out" });
		gsap.fromTo(mainSections[count], { xPercent: 100 }, { duration: 1.2, xPercent: 0, ease: "power1.out" });
		gsap.fromTo(descriptionSections[count], { xPercent: 100 }, { duration: 1.2, xPercent: 0, ease: "power1.out" });
		gsap.fromTo(descriptionSections[oldCount], { xPercent: 0 }, { duration: 1.2, xPercent: -100, ease: "power1.out" });
	}
});

$(".right-arrow").click(function () {
	if (count < mainSections.length - 1) {
		animate("right");
		count++;
		$(".active").removeClass("active");
		$(sectionIds[count]).addClass("active");
	}
});

$(".left-arrow").click(function () {
	if (count > 0) {
		animate("left");
		count--;
		$(".active").removeClass("active");
		$(sectionIds[count]).addClass("active");
	}
});

function animate(dir) {
	if (dir == "left") {
		gsap.fromTo(mainSections[count - 1], { xPercent: -100 }, { xPercent: 0, duration: 1.2, ease: "power1.out" });
		gsap.fromTo(mainSections[count], { xPercent: 0 }, { duration: 1.2, xPercent: 100, ease: "power1.out" });
		gsap.fromTo(descriptionSections[count], { xPercent: 0 }, { duration: 1.2, xPercent: 100, ease: "power1.out" });
		gsap.fromTo(descriptionSections[count - 1], { xPercent: -100 }, { xPercent: 0, duration: 1.2, ease: "power1.out" });
	} else if (dir == "right") {
		gsap.fromTo(mainSections[count], { xPercent: 0 }, { duration: 1.2, xPercent: -100, ease: "power1.out" });
		gsap.fromTo(mainSections[count + 1], { xPercent: 100 }, { duration: 1.2, xPercent: 0, ease: "power1.out" });
		gsap.fromTo(descriptionSections[count + 1], { xPercent: 100 }, { duration: 1.2, xPercent: 0, ease: "power1.out" });
		gsap.fromTo(descriptionSections[count], { xPercent: 0 }, { duration: 1.2, xPercent: -100, ease: "power1.out" });
	}
}

function compareIds() {
	currentId = "#" + $(".active").attr("id");
	for (let i = 0; i < sectionIds.length; i++) {
		if (currentId == sectionIds[i]) {
			return i;
		}
	}
}

function sendEmail() {
	let body =
		"Name: " +
		$("#first-name").value +
		" " +
		$("#last-name").value +
		"<br> Email: " +
		$("#email").value +
		"<br> Telephone: " +
		$("#tel").value +
		"<br> Message: " +
		$("#text-area").value;

	Email.send({
		Host: "smtp.gmail.com",
		Username: "spam.jamesharvey@gmail.com",
		Password: "hauxley01",
		To: "james.harvey@h2consulting.co.uk",
		From: document.getElementById("email").value,
		Subject: "New Enquiry",
		Body: body,
	}).then((message) => alert(message));
}
