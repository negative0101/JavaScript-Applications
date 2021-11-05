const tbody = document.querySelector("#results > tbody")
const submitBtn = document.querySelector("#submit")

submitBtn.addEventListener("click", onSubmit)
displayTemplate()

async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target.parentNode)
    const firstName = form.get('firstName')
    const lastName = form.get('lastName')
    const facultyNumber = form.get('facultyNumber');
    const grade = form.get('grade')

    if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        alert('Please check if all fields are filled')
        return
    }
    await postStudents({ firstName, lastName, facultyNumber, grade })
    displayTemplate()
}


async function displayTemplate() {
    const allData = await getStudents()
    tbody.replaceChildren()
    Object.values(allData).forEach(e => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th>${e.firstName}</th>
        <th>${e.lastName}</th>
        <th>${e.facultyNumber}</th>
        <th>${e.grade}</th>`
        tbody.appendChild(tr)
    })
}



async function getStudents() {
    const url = `http://localhost:3030/jsonstore/collections/students`
    const res = await fetch(url);
    const data = res.json();

    return (data)
}


async function postStudents(student) {
    const url = `http://localhost:3030/jsonstore/collections/students`
    const options = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }
    const res = await fetch(url, options);
    return res
}


