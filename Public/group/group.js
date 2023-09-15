const createGroupBtn = document.getElementById("createGroup");
const addToGroupBtn = document.getElementById("addToGroup");
const groups = document.getElementById("groups");

const groupMembersBtn = document.getElementById("groupMembers");
const deleteFromGroupBtn = document.getElementById("deleteFromGroup");
const logoutBtn = document.getElementById("logout");

async function createGroup() {
  try {
    const groupName = prompt("Group Name");
    const members = [];
    let userInput;
    while (userInput !== "ok") {
      userInput = prompt(
        `Please Enter Valid Email Id Otherwise User will not get Added. Type "ok" when you finished!`
      );
      if (userInput !== "ok") {
        members.push(userInput);
      }
    }

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const res = await axios.post(
      "http://localhost:3000/group/createGroup",
      {
        groupName: groupName,
        members: members,
        email:email,
      },
      { headers: { Authorization: token } }
    );
    alert(`${groupName} Created Successfully!`);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function getGroups() {
  try {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    console.log(token, email, "41 get group");
    const res = await axios.get("http://localhost:3000/group/getGroups",
    //  {
    //     email1:email,
    //  }, 
     {
      headers: { Authorization: token , email:email},
     }
    );
    groups.innerHTML = "";
    res.data.groups.forEach((group) => {
      const li = document.createElement("li");
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const span = document.createElement("span");
      const p = document.createElement("p");

      div1.classList.add("d-flex", "bd-highlight");
      div2.className = "user_info";
      span.appendChild(document.createTextNode(group.name));
      p.appendChild(document.createTextNode(`${group.admin} is Admin`));

      div2.appendChild(span);
      div2.appendChild(p);

      div1.appendChild(div2);
      li.appendChild(div1);
      groups.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
}

async function addToGroup() {
  try {
    const groupName = prompt("Group Name");
    const members = [];
    let userInput;
    while (userInput !== "ok") {
      userInput = prompt(
        `Please Enter Valid Email Id Otherwise User will not get Added. Type "ok" when you finished!`
      );
      if (userInput !== "ok") {
        members.push(userInput);
      }
    }
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    console.log(email, "94 del group");
    const res = await axios.post(
      "http://localhost:3000/group/addToGroup",
      {
        groupName: groupName,
        members: members,
        email:email,
      },
      {
        headers: { Authorization: token },
      }
    );
    alert(res.data.message);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function deleteFromGroup() {
  try {
    const groupName = prompt("Group Name");
    const members = [];
    let userInput;
    while (userInput !== "ok") {
      userInput = prompt(
        ` Please Enter Valid Email Id Otherwise User will not get Added. Type "ok" when you finished!`
      );
      if (userInput !== "ok") {
        members.push(userInput);
      }
    }

    const email = localStorage.getItem("email");
    console.log(email, "125 del group");

    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:3000/group/deleteFromGroup",
      {
        groupName: groupName,
        members: members,
        email:email,
      },
      {
        headers: { Authorization: token },
      }
    );
    alert(res.data.message);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function groupMembers() {
  try {
    const chatBody = document.getElementById("chatBody");
    if (chatBody.querySelector(".groupMembersDiv")) {
      const members = chatBody.querySelectorAll(".groupMembersDiv");
      console.log(members);
      members.forEach((member) => {
        member.remove();

      });
    }
    const groupName = localStorage.getItem("groupName");
    if (!groupName || groupName == "") {
      return alert("Select the Group whose Members you wanna see!");
    }
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `http://localhost:3000/group/groupMembers/${groupName}`,
      { headers: { Authorization: token } }
    );
   
    res.data.users.forEach((user) => {
      const div = document.createElement("div");
      div.classList.add(
        "d-flex",
        "justify-content-center",
        "groupMembersDiv",
        "text-white",
      );
      const p = document.createElement("p");
      p.appendChild(document.createTextNode(`${user.name} is Member`));
      div.appendChild(p);
      chatBody.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}
//
function logout() {
  localStorage.clear();
  window.location.href = "../login/login.html";
}



createGroupBtn.addEventListener("click", createGroup);
addToGroupBtn.addEventListener("click", addToGroup);
document.addEventListener("DOMContentLoaded", getGroups);

deleteFromGroupBtn.addEventListener("click", deleteFromGroup);
logoutBtn.addEventListener("click", logout);
groupMembersBtn.addEventListener("click", groupMembers);