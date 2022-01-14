<template>
    <div>
        <header>
            <nav>
                <div class="nav-wrapper">
                    <div><a href="#" class="brand-logo">&nbsp;Система заявок</a></div>
                    <div class="dropdown">
                        <div class="right dropbtn">Привет, {{ username }}</div>
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
                            <input name="title" id="input_title" type="text" data-length="30" required>
                            <label for="input_title">Заголовок</label>
                        </div>
                    </div>
                    <input type="hidden" name="created_date" :value="current_date"/>
                    <div class="row">
                        <div class="input-field col s6">
                            <textarea name="comment" required id="textarea_comment" class="materialize-textarea" data-length="120"></textarea>
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
                    <th>Управление</th>
                </tr>
                </thead>

                <tbody>
                    <Request v-for="request in this.requests" :key="request.id" 
                        :status="request.status" :created_date="request.created_date" 
                        :title="request.title" :comment="request.comment"
                        :priority="request.priority" :completion_date="request.completion_date"
                        :whom="request.whom" :id="request.id" :onDelete="onDelete"/>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style>
    nav {
        background-color: #51aaa1;
    }
    
    .right{
        margin-right: 20px;
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
    import { createRequest } from '../helpers/fetch.js';
    import { deleteRequest } from '../helpers/fetch.js';
    import Request from '../components/Request.vue';

    export default {
        name: "UserPanel",
        data(){
            return {
                username: "",
                current_date: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
                requests: []
            };
        },
        created() {
            userInfo(localStorage.getItem("token")).then(data => {
                this.username = data['fullname'];
                this.requests = data['requests'];
            });
        },
        components: {
          Request  
        },
        methods: {
            onRequest(e) {
                e.preventDefault();
                createRequest(localStorage.getItem("token"), e.target).then((data) => {
                    e.target.reset();
                    this.requests = data['requests'];
                });
            },
            onExit(e){
                e.preventDefault();
                var route = this.$router;
                signout(localStorage.getItem('token')).then(data => {
                    if (data['code'] == '200') {
                        setTimeout(() => {
                            localStorage.removeItem("token");
                            route.push('/login').catch(() => {});
                        }, 1500);
                    } else {
                        console.log(data);
                    }
                });
            },
            onDelete(e){
                e.preventDefault();
                if (confirm("Вы действительно хотите удалить свою заявку?")) {
                    deleteRequest(localStorage.getItem("token"), e.target.request_id.value).then(data => {
                        this.requests = data['requests'];
                    });
                }
            },
        },
        mounted () {
            M.AutoInit()
        },
    }
</script>