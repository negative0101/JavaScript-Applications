import { register } from '../api/data.js';
import { html } from '../lib.js';

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repassword = formData.get('conf-pass')
        if (password == '' || email == '' || repassword == '') {
            return alert('Please fill all the fields to login!')
        }
        if (password != repassword) {
            return alert('Passwords must match')
        }
        await register(email, password)
        ctx.page.redirect('/')
    }
}