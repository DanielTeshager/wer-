const sendButton = document.querySelector("#send-button");

sendButton.addEventListener("click", (e) => {
	e.preventDefault();
	document.querySelector(".loading-dots").style.display = "none";
	// Get the message from the input field and add it to the chat
	const message = document.querySelector("#chat-input").value;
	const messageElement = document.createElement("div");
	messageElement.classList.add("message");
	messageElement.classList.add("message--sent");
	messageElement.innerHTML = message;
	document.querySelector("#chat-messages").appendChild(messageElement);

	// show loading... text on the input field
	// disable the message input field
	document.querySelector("#chat-input").value = "Loading...";
	document.querySelector("#chat-input").disabled = true;

	// Send the message to the Python Flask server using fetch
	fetch("http://127.0.0.1:50002/get-response", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message: message }),
	})
		// Get the response from the Python Flask server
		.then((response) => response.json())
		.then((data) => {
			// Hide the loading animation
			// disable the message input field
			document.querySelector("#chat-input").value = "";
			document.querySelector("#chat-input").disabled = false;

			const messageElement = document.createElement("div");
			messageElement.classList.add("message");
			messageElement.classList.add("message--received");
			messageElement.innerHTML = data.response;
			document.querySelector("#chat-messages").appendChild(messageElement);
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
