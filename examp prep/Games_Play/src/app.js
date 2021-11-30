import { getUserData } from "./util.js";
import { page, render } from "./lib.js";
import { registerPage } from "./views/register.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { logout } from "./api/data.js";
import { allGamesPage } from "./views/allGames.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

document.querySelector('#logoutBtn').addEventListener('click', onLogout)
const root = document.querySelector('main')

page(decorateContext)
page('/', homePage)
page('/login', loginPage)
page('/register', registerPage)
page('/all-games', allGamesPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)

updateUserNav()
page.start()

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav

    next();
}

function updateUserNav() {
    const userData = getUserData()
    if (userData) {
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';

    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

function onLogout() {
    logout()
    updateUserNav()
    page.redirect('/')

}