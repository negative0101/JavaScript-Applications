import { getAllGames } from '../api/data.js';
import { html } from '../lib.js';

const allGamesTemplate = (allGames) => html`
<section id="catalog-page">
    <h1>All Games</h1>
    <!-- Display div: with information about every game (if any) -->
    ${allGames==0 
    ? html`<h3 class="no-articles">No articles yet</h3>`
    : allGames.map(gameCard)}    
</section>`

const gameCard = (games) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${games.imageUrl}>
        <h6>${games.category}</h6>
        <h2>${games.title}</h2>
        <a href="/details/${games._id}" class="details-button">Details</a>
    </div>
`

export async function allGamesPage(ctx) {
    const allGames = await getAllGames()
    ctx.render(allGamesTemplate(allGames))
}