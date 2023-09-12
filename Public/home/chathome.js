const messageTextArea = document.getElementById("messageTextArea");
const SendBtn = document.getElementById("messageSendBtn");
const chatBody = document.getElementById("chatBody");

async function mesgSend() {

  try {
    
    const message = messageTextArea.value;
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    console.log(token);
    const res = await axios.post("http://localhost:3000/chat/sendMessage",{ message: message, email:email, },
      { headers: { Authorization: token } }
    );
    messageTextArea.value = "";
  } catch (error) {
    console.log("something went wrong");
  }
}
SendBtn.addEventListener("click", mesgSend);


function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

async function getMessages() {
  try {
    // const res = await axios.get("http://localhost:3000/chat/getMessages");

    let param;
    const localStorageChats = JSON.parse(localStorage.getItem("chats"));
    if (localStorageChats) {
      let array = JSON.parse(localStorage.getItem("chats"));
      let length = JSON.parse(localStorage.getItem("chats")).length;
      param = array[length - 1].id;
    }
    const res = await axios.get(
      `http://localhost:3000/chat/getMessages/${param}`
    );

    const token = localStorage.getItem("token");
    const decodedToken =  decodeToken(token);
    const userId = decodedToken.userId;

    const chats = JSON.parse(localStorage.getItem("chats"));
    if (!chats) {
      localStorage.setItem("chats", JSON.stringify(res.data.messages));
    } else {
      res.data.messages.forEach((message) => {
        chats.push(message);
      });
      localStorage.setItem("chats", JSON.stringify(chats));
    }
    res.data.messages.forEach((message) => {
      if (message.userId == userId) {
        const div = document.createElement("div");
        chatBody.appendChild(div);

        const messageSendby = document.createElement("span");
        messageSendby.classList.add("d-flex","justify-content-end","px-2","mb-1","text-uppercase","small",
          "text-white"
        );
        messageSendby.appendChild(document.createTextNode("You"));
        div.appendChild(messageSendby);

        const messageBox = document.createElement("div");
        const messageText = document.createElement("div");

        messageBox.classList.add("d-flex", "justify-content-end", "mb-4");

        messageText.classList.add("msg_cotainer_send");
        messageText.appendChild(document.createTextNode(message.message));

        messageBox.appendChild(messageText);
        div.appendChild(messageBox);
      } else {
        const div = document.createElement("div");
        chatBody.appendChild(div);

        const messageSendby = document.createElement("span");
        messageSendby.classList.add("d-flex","justify-content-start", "px-2","mb-1","text-uppercase","small","text-white"
        );
        messageSendby.appendChild(document.createTextNode(message.name));
        div.appendChild(messageSendby);

        const messageBox = document.createElement("div");
        const messageText = document.createElement("div");

        messageBox.classList.add("d-flex", "justify-content-start", "mb-4");

        messageText.classList.add("msg_cotainer");
        messageText.appendChild(document.createTextNode(message.message));

        messageBox.appendChild(messageText);
        div.appendChild(messageBox);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
setInterval(() => {
  getMessages();
}, 4000);
document.addEventListener("DOMContentLoaded", getMessages);




// get message from local storage
async function messagesFromLocalStorage() {
  const messages = JSON.parse(localStorage.getItem("chats"));

  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const userId = decodedToken.userId;
  chatBody.innerHTML = "";

  if (messages) {
    messages.forEach((message) => {
      if (message.userId == userId) {
        const div = document.createElement("div");
        chatBody.appendChild(div);

        const messageSendby = document.createElement("span");
        messageSendby.classList.add(
          "d-flex",
          "justify-content-end",
          "px-3",
          "mb-1",
          "text-uppercase",
          "small",
          "text-white"
        );
        messageSendby.appendChild(document.createTextNode("You"));
        div.appendChild(messageSendby);

        const messageBox = document.createElement("div");
        const messageText = document.createElement("div");

        messageBox.classList.add("d-flex", "justify-content-end", "mb-4");

        messageText.classList.add("msg_cotainer_send");
        messageText.appendChild(document.createTextNode(message.message));

        messageBox.appendChild(messageText);
        div.appendChild(messageBox);
      } else {
        const div = document.createElement("div");
        chatBody.appendChild(div);

        const messageSendby = document.createElement("span");
        messageSendby.classList.add(
          "d-flex",
          "justify-content-start",
          "px-3",
          "mb-1",
          "text-uppercase",
          "small",
          "text-white"
        );
        messageSendby.appendChild(document.createTextNode(message.name));
        div.appendChild(messageSendby);

        const messageBox = document.createElement("div");
        const messageText = document.createElement("div");

        messageBox.classList.add("d-flex", "justify-content-start", "mb-4");

        messageText.classList.add("msg_cotainer");
        messageText.appendChild(document.createTextNode(message.message));

        messageBox.appendChild(messageText);
        div.appendChild(messageBox);
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", messagesFromLocalStorage);