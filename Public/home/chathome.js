const messageTextArea = document.getElementById("messageTextArea");
const SendBtn = document.getElementById("messageSendBtn");

async function mesgSend() {

  try {
    
    const message = messageTextArea.value;
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    console.log(token);
    const res = await axios.post("http://localhost:3000/chat/sendMessage",{ message: message, email:email, },
      { headers: { Authorization: token } }
    );
  } catch (error) {
    console.log("something went wrong");
  }
}
SendBtn.addEventListener("click", mesgSend);