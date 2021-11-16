import { render, html } from './node_modules/lit-html/lit-html.js';
const root = document.querySelector('#root')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const towns = document.getElementById('towns').value.split(',').map(t => t.trim());
    render(listTemplate(towns), root)
})

const listTemplate = (towns) => html`
<ul>${towns.map(t => html`<li>${t}</li>`)}
</ul>`

