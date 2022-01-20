<template>
    <div>
        <header>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">&nbsp;Система заявок. Панель администратора</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down nav-menu">
                        <li>
                            <div>Привет, {{ office_name }}</div>
                            <ul class="li-menu">
                                <li><a @click="onExit">Выйти</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <section class="user_info">
            <h5 id="user_text"></h5>
        </section>

        <section class="c-table" style="margin: 20px;">
            <table class="striped centered">
                <thead>
                <tr>
                    <th>Дата создания</th>
                    <th>Заголовок</th>
                    <th>Описание</th>
                    <th>Приоритет</th>
                    <th>Срок</th>
                    <th>Исполнитель</th>
                    <th>Управление</th> 
                </tr>
                </thead>

                <tbody>
                    <RequestAdmin v-for="request in this.requests" :key="request.id" 
                        :created_date="request.created_date" :title="request.title" 
                        :comment="request.comment" :priority="request.priority" 
                        :completion_date="request.completion_date" :id="request.id"
                        :changeRequest="changeRequest" :executor="request.executor"/>
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
    import RequestAdmin from '../components/RequestAdmin.vue';
    import { signout, adminInfo, requestChange } from '../helpers/fetch.js'
    export default {
        name: "AdminPanel",
        components: {
          RequestAdmin,
        },
        methods: {
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
            },
            changeRequest(e){
                e.preventDefault();
                requestChange(localStorage.getItem("token"), e.target.id).then(data => {
                    this.requests = data['requests'];
                });
            }
        },
        created() {
            adminInfo(localStorage.getItem("token")).then(data => {
                this.office_name = data['office'];
                this.requests = data['requests'];
            });
        },
        data(){
            return {
                office_name: "",
                requests: [],
            }
        },
        mounted () {
            M.AutoInit()
        },
    }
</script>