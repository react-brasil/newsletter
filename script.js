const firebaseConfig = {
  apiKey: "AIzaSyB7i1nha2fRAiuXpnw4aYc35NfzHWuWWo0",
  authDomain: "react-brasil-newsletter.firebaseapp.com",
  projectId: "react-brasil-newsletter"
};

const $email = document.getElementById("email");
const $name = document.getElementById("name");
const $wantReceive = document.getElementById("want-receive");
const $submit = document.getElementById("submit");
const $messageSucssesContent = document.getElementById(
  "message-sucsses-content"
);
const $messageErrorContent = document.getElementById("message-error-content");
const $additionalSection = document.getElementById("additional-section");

window.onload = function() {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  $name.focus();

  const toggleAdditionalSection = () => {
    return $additionalSection.classList.toggle("main__additional--opened");
  };

  const resetFields = () => {
    $name.value = "";
    $email.value = "";
  };

  const success = () => {
    resetFields();
    const name = $name.value;

    $messageErrorContent.textContent = "";

    $messageSucssesContent.textContent =
      "Que legal, recebemos sua assinatura com sucesso :)";
    $name.focus();
  };

  const error = email => {};

  const addEmailToCollection = () => {
    const doc = {
      email: $email.value,
      name: $name.value
    };

    db
      .collection("emails")
      .doc(doc.email)
      .set(doc)
      .then(success)
      .catch(error => console.error(error));
  };

  const emailIsValid = email => {
    if (email === "") {
      return false;
    }

    return /^[\w\.\-_]{1,}@[\w\.\-]{6,}/.test(email);
  };

  const handleClickSubmit = () => {
    const email = $email.value;

    if ($name.value === "") {
      $messageErrorContent.textContent = "Por favor, infome o seu nome!";
      $name.focus();
      return false;
    }

    if (emailIsValid(email)) {
      addEmailToCollection();
    } else {
      $messageErrorContent.textContent = "Tivemos problemas com seu e-mail :(";
      $email.focus();
      return false;
    }
  };

  const handleKeyupEmail = e => {
    const ENTER = 13;

    if (e.keyCode === ENTER) {
      return handleClickToReceive();
    }

    return e;
  };

  $submit.addEventListener("click", handleClickSubmit);
  $email.addEventListener("keyup", handleKeyupEmail);
};
