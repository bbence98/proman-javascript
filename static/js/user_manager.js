import {post_fetch} from "./post_fetch.js";


export let user_manager = {
    main: function () {
        function check_login() {
            let form = new FormData(document.getElementById('login_form'));
            console.log(post_fetch.fetch_it('/login', Object.fromEntries(form.entries())))
        }
        let login = document.getElementById('login_submit');
        login.addEventListener('click', check_login);
    }
};