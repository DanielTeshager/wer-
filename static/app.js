const sendButton = document.querySelector("#send-button");
const viewport = document.getElementById("viewport");
viewport.setAttribute(
	"content",
	"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no"
);

sendButton.addEventListener("click", (e) => {
	e.preventDefault();

	const message = document.querySelector("#chat-input").value;
	const messageElement = document.createElement("div");
	messageElement.classList.add("message");
	messageElement.classList.add("message--sent");
	messageElement.innerHTML = message;
	document.querySelector("#chat-messages").appendChild(messageElement);

	fetch("http://127.0.0.1:50002/get-response", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message: message }),
	})
		.then((response) => response.json())
		.then((data) => {
			const messageElement = document.createElement("div");
			messageElement.classList.add("message");
			messageElement.classList.add("message--received");
			messageElement.innerHTML = data.response;
			document.querySelector("#chat-messages").appendChild(messageElement);

			const viewport = document.getElementById("viewport");
			viewport.setAttribute(
				"content",
				"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no"
			);
		});
});

const chatMessages = document.getElementById("chat-messages");
const scrollDown = document.querySelector("#scroll-bottom-btn");

scrollDown.addEventListener("click", () => {
	// scroll to the bottom of the chat smoothly
	chatMessages.scrollTo({
		top: chatMessages.scrollHeight,
		behavior: "smooth",
	});
});
