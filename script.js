const firebaseConfig = {
    apiKey: "AIzaSyB7i1nha2fRAiuXpnw4aYc35NfzHWuWWo0",
    authDomain: "react-brasil-newsletter.firebaseapp.com",
    databaseURL: "https://react-brasil-newsletter.firebaseio.com",
    projectId: "react-brasil-newsletter",
    storageBucket: "react-brasil-newsletter.appspot.com",
    messagingSenderId: "356967590314"
};

const $email = document.getElementById('email');
const $name = document.getElementById('name');

const $wantReceive = document.getElementById('want-receive');
const $submit = document.getElementById('submit');
const $messageContent = document.getElementById('message-content');
const $additionalSection = document.getElementById('additional-section');

window.onload = function() {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    $email.focus();

    const toggleAdditionalSection = () => {
        return $additionalSection.classList.toggle('main__additional--opened'); 
    };

    const resetFields = () => {
        $name.value = '';
        $email.value = '';
    };

    const success = () => {
        resetFields();
        const name = $name.value;
        
        $messageContent.textContent = `Oba, ${name}. Que legal, recebemos sua assinatura com sucesso :)`;
    };

    const error = email => {

    };

    const addEmailToCollection = () => {
        const doc = {
            email: $email.value,
            name: $name.value
        }

        db
            .collection("emails")
            .doc(doc.email)
            .set(doc)
            .then(success)
            .catch(error => console.error(error))
    };

    const emailIsValid = email => {
        if (email === '') {
            return false;
        }

        return /^[\w\.\-_]{1,}@[\w\.\-]{6,}/.test(email);
    };

    const handleClickSubmit = () => {
        if ($name.value === '') {
            return false;
        }

        addEmailToCollection();
        toggleAdditionalSection();
    };

    const handleClickToReceive = () => {
        const email = $email.value;

        if (emailIsValid(email)) {
            return toggleAdditionalSection();
        }
    };

    const handleKeyupEmail = e => {
        const ENTER = 13;

        if (e.keyCode === ENTER) {
            return handleClickToReceive();
        }

        return e;
    }

    $wantReceive.addEventListener('click', handleClickToReceive);
    $submit.addEventListener('click', handleClickSubmit);
    $email.addEventListener('keyup', handleKeyupEmail);
}