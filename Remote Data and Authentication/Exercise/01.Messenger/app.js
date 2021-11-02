function attachEvents() {
    document.getElementById('refresh').addEventListener('click', loadMessages);
    document.getElementById('submit').addEventListener('click', onSubmit);
    loadMessages();
}

attachEvents();

const list = document.getElementById('messages');
const contentInput = document.querySelector('[name="content"]');
const authorInput = document.querySelector('[name="author"]');

async function onSubmit() {
    const author = authorInput.value;
    const content = contentInput.value;

    const result = await postMessage({ author, content })
    contentInput.value = '';
    list.value += '\n' + `${author}: ${content}`;
}

async function loadMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const res = await fetch(url);
    const data = await res.json();

    const messages = Object.values(data);
    list.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');
}

async function postMessage(message) {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }
    const res = await fetch(url, options);
    const data = await res.json();

    return data
}