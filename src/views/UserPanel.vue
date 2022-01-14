<template>
    <div>
        <header>
            <nav>
                <div class="nav-wrapper">
                    <div><a href="#" class="brand-logo">&nbsp;Система заявок</a></div>
                    <div class="dropdown">
                        <ul id="nav-mobile" class="right hide-on-med-and-down dropbtn">
                            <li>Привет, {{ username }}</li>
                        </ul>
                        <div class="dropdown-content">
                            <a @click="onExit">Выйти</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        <section class="user_info">
            <h5 id="user_text"></h5>
        </section>

        <section class="create_req">
            <h6>Оформить заявку</h6>
            <div class="row">
                <form @submit="onRequest" class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="input_title" type="text" data-length="30">
                            <label for="input_title">Заголовок</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s6">
                            <textarea id="textarea_comment" class="materialize-textarea" data-length="120"></textarea>
                            <label for="textarea_comment">Описание</label><br>
                        </div>
                    </div>
                    
                    <input class="btn waves-effect waves-light" type="submit" name="action" value="Создать">
                </form>
            </div>
        </section>
        <br><br>
        <section class="c-table">
            <h5>Ваши заявки</h5>
            <table class="striped centered">
                <thead>
                <tr>
                    <th>Статус</th>
                    <th>Дата создания</th>
                    <th>Заголовок</th>
                    <th>Описание</th>
                    <th>Приоритет</th>
                    <th>Срок</th>
                    <th>Исполнитель</th>
                </tr>
                </thead>

                <tbody>
                    <Request v-for="request in this.requests" :key="request.id" 
                        :status="request.status" :created_date="request.created_date" 
                        :title="request.title" :comment="request.comment"
                        :priority="request.priority" :completion_date="request.completion_date"
                        :whom="request.whom"/>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style>
    nav {
        background-color: #51aaa1;
    }

    .user_info, .create_req, .c-table h5 {
        margin: 20px;
    }

    .create_req {
        width: 50%;
    }

    .create_req table td{
        vertical-align: top;
    }
</style>

<script>
    import M from 'materialize-css';
    import { signout } from '../helpers/fetch.js';
    import { userInfo } from '../helpers/fetch.js';
    import Request from '../components/Request.vue';

    export default {
        name: "UserPanel",
        created() {
            userInfo(localStorage.getItem("token")).then(data => {
                this.user_id = data['id'];
                this.username = data['fullname'];
                this.requests = data['requests'];
            });
        },
        data(){
            return {
                user_id: 0,
                username: "",
                requests: [],
            }
        },
        components: {
          Request  
        },
        methods: {
            onRequest(e) {
                e.preventDefault();
            },
            onExit(e){
                e.preventDefault();
                var route = this.$router;
                signout(localStorage.getItem('token')).then(data => {
                    if (data['code'] == '200') {
                        setTimeout(() => {
                            localStorage.removeItem("token");
                            route.push('/login').catch(() => {});
                        }, 3000);
                    } else {
                        console.log(data);
                    }
                });
            }
        },
        mounted () {
            M.AutoInit()
        },
    }
</script>