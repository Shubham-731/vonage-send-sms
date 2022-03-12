// Getting the DOM
const phoneNo = document.querySelector("#phoneNo").value;
const msgText = document.querySelector("#msgText").value;
const sendSms = document.querySelector("#sendSms");

sendSms.addEventListener("click", send, false);

function send() {
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNo, msgText }),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
