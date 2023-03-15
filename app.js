const sendButton = document.querySelector("#send-button");

sendButton.addEventListener("click", (e) => {
	e.preventDefault();

	//Get the message from input field and add it to the chat
	const message = document.querySelector("#chat-input").value;
	const messageElement = document.createElement("div");
	messageElement.classList.add("message");
	messageElement.classList.add("message--sent");
	messageElement.innerHTML = message;
	document.querySelector("#chat-messages").appendChild(messageElement);

	//Send the message to python flask server using fetch
	fetch("http://127.0.0.1:50002/get-response", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message: message }),
	})
		//Get the response from python flask server
		.then((response) => response.json())
		.then((data) => {
			const messageElement = document.createElement("div");
			messageElement.classList.add("message");
			messageElement.classList.add("message--received");
			messageElement.innerHTML = data.response;
			document.querySelector("#chat-messages").appendChild(messageElement);
		});
});
