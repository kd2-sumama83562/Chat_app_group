const messageTextArea = document.getElementById("messageTextArea");
const SendBtn = document.getElementById("messageSendBtn");
const chatBody = document.getElementById("chatBody");
const uiGroup = document.getElementById("groups");
const groupNameHeading = document.getElementById("groupNameHeading");

const socket = io("http://localhost:5000");
socket.on("data", (data) => {
  console.log(data);
});
console.log(socket);

async function activeGroup(e) {
  chatBody.innerHTML = "";
  localStorage.setItem("chats", JSON.stringify([]));
  groupNameHeading.innerHTML = "";
  const activeLi = document.getElementsByClassName("active");
  if (activeLi.length != 0) {
    activeLi[0].removeAttribute("class", "active");
  }
  let li = e.target;
  while (li.tagName !== "LI") {
    li = li.parentElement;
  }
  li.setAttribute("class", "active");
  const groupName = li.querySelector("span").textContent;
  localStorage.setItem("groupName", groupName);
  const span = document.createElement("span");
  span.appendChild(document.createTextNode(groupName));
  groupNameHeading.appendChild(span);
  getMessages();
}

async function mesgSend() {
  try {

    if (chatBody.querySelector(".groupMembersDiv")) {
      const members = chatBody.querySelectorAll(".groupMembersDiv");
      members.forEach((member) => {
        member.remove();
      });
    }
    
    const message = messageTextArea.value;
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    console.log(token);

    const groupName = localStorage.getItem("groupName");
    if (!groupName || groupName == "") {
      return alert("Select group to send the message");
    }
    const res = await axios.post("http://localhost:3000/chat/sendMessage",{ 
      message: message, email:email, groupName: groupName,},
      { headers: { Authorization: token } }
    );
    messageTextArea.value = "";
    getMessages();
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
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const userId = decodedToken.userId;
  const groupName = localStorage.getItem("groupName");

  socket.emit("getMessages", groupName);
    socket.on("messages", (messages) => {
    chatBody.innerHTML = "";
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
  });
}

uiGroup.addEventListener("click", activeGroup);
document.addEventListener("DOMContentLoaded", getMessages);

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("groupName", "");
  localStorage.setItem("chats", JSON.stringify([]));
});