const createGroupBtn = document.getElementById("createGroup");
const addToGroupBtn = document.getElementById("addToGroup");
const groups = document.getElementById("groups");

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
    const res = await axios.post(
      "http://localhost:3000/group/addToGroup",
      {
        groupName: groupName,
        members: members,
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

createGroupBtn.addEventListener("click", createGroup);
addToGroupBtn.addEventListener("click", addToGroup);
document.addEventListener("DOMContentLoaded", getGroups);