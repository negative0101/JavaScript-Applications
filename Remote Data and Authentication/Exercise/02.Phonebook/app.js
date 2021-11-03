function attachEvents() {
    displayPhonebook()
    document.querySelector("#btnLoad").addEventListener("click", displayPhonebook)
    document.querySelector("#btnCreate").addEventListener('click', createPhoneBook)

}
attachEvents();
const ulPhoneBook = document.querySelector("#phonebook")
const phoneEl = document.querySelector("#phone")
const personEl = document.querySelector("#person")

async function displayPhonebook() {
    //Questionable function -> you need to click 2 times on delete for it to happen.
    const allData = await getPhonebook()
    ulPhoneBook.replaceChildren()
    Object.values(allData).forEach(e => {
        const liElement = document.createElement('li');
        liElement.textContent = `${e.person}:${e.phone}`
        liElement.className = `${e._id}`
        const button = document.createElement('button');
        button.innerText = 'Delete';

        button.addEventListener('click', async (e) => {
            const currentTarget = e.target.parentNode.className
            await deletePhonebook(currentTarget)
            displayPhonebook()
        })
        liElement.appendChild(button);
        ulPhoneBook.appendChild(liElement);


    })
}
async function createPhoneBook() {
    const person = personEl.value;
    const phone = phoneEl.value
    const addPerson = await postPhonebook({ person, phone })
    personEl.value = ''
    phoneEl.value = ''
    displayPhonebook()
}

async function getPhonebook() {
    const url = `http://localhost:3030/jsonstore/phonebook`
    const res = await fetch(url);
    const data = await res.json();
    return data
}

async function postPhonebook(message) {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    const options = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(message)
    }

    const res = await fetch(url, options);
    const data = await res.json();

    return data
}

async function deletePhonebook(key) {
    const url = `http://localhost:3030/jsonstore/phonebook/` + key;
    const options = {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(key)
    }

    const res = await fetch(url, options);
    const data = await res.json();

    return data
}