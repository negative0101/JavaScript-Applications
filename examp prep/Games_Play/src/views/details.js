import { deleteGame, getDetails } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (isOwner, game, onDelete) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>
        <p class="text">
            ${game.summary}
        </p>
        ${gameControlTemplate(isOwner, game, onDelete)}
    </div>
</section>`


const gameControlTemplate = (isOwner, game, onDelete) => {
    if (isOwner) {
        return html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>`
    } else {
        return null;
    }
}



export async function detailsPage(ctx) {
    const game = await getDetails(ctx.params.id)
    const userData = getUserData()
    const isOwner = userData && userData.id == game._ownerId;
    ctx.render(detailsTemplate(isOwner, game, onDelete))

    async function onDelete() {
        const choice = confirm(`Are you sure you would like to proceed with the deletion of your game?`)
        if (choice) {
            await deleteGame(ctx.params.id)
            ctx.page.redirect('/')
        }
    }

}