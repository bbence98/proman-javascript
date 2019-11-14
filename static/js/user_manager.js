import {post_fetch} from "./post_fetch.js";


export let user_manager = {
    main :function () {
        function _login() {
            async function check_form() {
                let form = new FormData(document.getElementById('login_form'));
                return await post_fetch.fetch_it('/login', Object.fromEntries(form.entries()));
            }
            function logout() {
                login_button.removeEventListener('click', logout);
                login_button.addEventListener('click', show);
                login_button.innerText = 'Log in';
                register_button.setAttribute('class', '');
                user.innerText = ''
            }
            async function submit() {
                let form_data = await check_form();
                if (form_data['password_legit']) {
                    login_button.removeEventListener('click', show);
                    login_button.addEventListener('click', logout);
                    login_button.innerText = 'Log out';
                    user.innerText = 'Welcome ' + form_data['name'];
                    hide();
                    register_button.setAttribute('class', 'hide')
                } else {
                    login_error.innerText = 'Invalid username or password'
                }
            }
            function show() {
                login_form.setAttribute('class', '');
                $('.modal').modal('show');

            }
            function hide() {
                login_form.reset();
                login_error.innerText = '';
                $('.modal').modal('hide');
                login_form.setAttribute('class', 'hide');
            }
            let login_form = document.getElementById('login_form');
            let login_button = document.getElementById('login_button');
            let login_submit = document.getElementById('login_submit');
            let login_error = document.getElementById('login_error');
            let close = document.getElementById('close_modal');
            let user = document.getElementById('user');
            let register_button = document.getElementById('register_button');
            login_submit.addEventListener('click', submit);
            login_button.addEventListener('click', show);
            close.addEventListener('click', hide);
        }
        function _register() {
            async function check_registration() {
                let reg_form = new FormData(document.getElementById('register_form'));
                return await post_fetch.fetch_it('/registration', Object.fromEntries(reg_form.entries()));
            }
            async function submit() {
                let form_data = await check_registration();
                console.log(form_data);
                if (form_data['registration_legit']) {
                    hide();
                register_form.setAttribute('class', 'hide')
                } else {
                    register_error.innerText = 'Username already in use'
                }
            }
            function show() {
                register_form.setAttribute('class', '');
                $('.modal').modal('show')
            }
            function hide() {
                register_form.reset();
                register_form.setAttribute('class', 'hide');
                register_error.innerText = '';
                $('.modal').modal('hide');
            }

            let register_form = document.getElementById('register_form');
            let register_button = document.getElementById('register_button');
            let register_submit = document.getElementById('register_submit');
            let register_error = document.getElementById('register_error');
            let close = document.getElementById('close_modal');
            close.addEventListener('click', hide);
            register_button.addEventListener('click', show);
            register_submit.addEventListener('click', submit)

        }
        _login();
        _register();
    }


};