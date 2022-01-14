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

        <!-- <section class="create_req">
            <h6>Оформить заявку</h6>
            <div class="row">
                <form class="col s12">
                    <table>
                        <tr>
                            <td>
                                <p>Исполнитель</p>
                                <p>
                                    <label>
                                        <input name="group1" type="radio" checked  value="asutp"/>
                                        <span>АСУТП</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="group1" type="radio" value="kipia"/>
                                        <span>КИПиА</span>
                                    </label>
                                </p>

                                <p>
                                    <label>
                                        <input name="group1" type="radio" value="sysadmins"/>
                                        <span>Сисадмины</span>
                                    </label>
                                </p>
                            </td>

                            <td>
                                <p>Приоритет</p>
                                <p>
                                    <label>
                                        <input name="group2" type="radio" checked  value="low"/>
                                        <span>Низкий</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="group2" type="radio" value="middle"/>
                                        <span>Средний</span>
                                    </label>
                                </p>

                                <p>
                                    <label>
                                        <input name="group2" type="radio" value="high"/>
                                        <span>Высокий</span>
                                    </label>
                                </p>
                            </td>

                            <td>
                                <p>Срок</p>
                                <p>
                                    <input type="text" class="datepicker" placeholder="Change date">
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <div class="input-field col s12">
                                    <textarea id="textarea1" class="materialize-textarea"></textarea>
                                    <label for="textarea1">Описание</label>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <button class="btn waves-effect waves-light" type="submit" name="action">
                        Создать
                    </button>
                </form>
            </div>
        </section> -->

        <section class="c-table">
            <h5>Текущие заявки</h5>
            <table class="striped centered">
                <thead>
                <tr>
                    <th>Статус</th>
                    <th>Дата создания</th>
                    <th>Заголовок</th>
                    <th>Описание</th>
                    <th>Составитель</th>
                    <th>Приоритет</th>
                    <th>Срок</th>
                    <th>Исполнитель</th>
                </tr>
                </thead>

                <tbody>
                    <RequestDispatcher v-for="request in this.requests" :key="request.id" 
                        :status="request.status" :created_date="request.created_date" 
                        :title="request.title" :comment="request.comment" 
                        :user_compiler="request.user_compiler" :priority="request.priority" 
                        :completion_date="request.completion_date" :whom="request.whom" 
                        :id="request.id"/>
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
    import { dispatcherInfo } from '../helpers/fetch.js';
    import RequestDispatcher from '../components/RequestDispatcher.vue';

    export default {
        name: "UserPanel",
        data(){
            return {
                username: "",
                requests: []
            }
        },
        created() {
            dispatcherInfo(localStorage.getItem("token")).then(data => {
                this.username = data['fullname'];
                this.requests = data['requests'];
            });
        },
        components: {
          RequestDispatcher  
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
            }
        },
        mounted () {
            M.AutoInit()
        },
    }
</script>