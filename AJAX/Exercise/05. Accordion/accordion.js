function template({ _id, title, content }) {

    const div = document.createElement('div');
    div.className = 'accordion'
    div.innerHTML = `<div class="head">
    <span>${title}</span>
    <button class="button" id=${_id}>More</button>
    </div>
<div class="extra">
    <p>${content}</p>
    </div>`


    const button = div.querySelector('.button')
    button.addEventListener('click', (e) => {
        if (button.textContent == 'More') {
            div.querySelector(`.extra`).style.display = 'block'
            button.innerText = 'Less'
        } else {
            div.querySelector(`.extra`).style.display = 'none'
            button.innerText = 'More'
        }
    })

    return div
}
async function solution() {
    const main = document.querySelector('#main');

    const url = `http://localhost:3030/jsonstore/advanced/articles/details/`
    const response = await fetch(url)
    const data = await response.json()


    Object.values(data).forEach((e) => main.appendChild(template(e)))
}
solution()