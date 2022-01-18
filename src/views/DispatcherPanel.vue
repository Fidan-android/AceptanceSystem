<template>
    <div>
        <header>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">&nbsp;Система заявок. Панель диспетчера</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down nav-menu">
                        <li>
                            <div>Привет, {{ username }}</div>
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

        <ModalWindow v-if="this.showModal" :onCloseModal="this.onCloseModal" :onSaveModal="this.onSaveModal"/>

        <section class="c-table">
            <h5>Текущие заявки</h5>
            <table class="striped centered">
                <thead>
                <tr>
                    <th>Дата создания</th>
                    <th>Заголовок</th>
                    <th>Описание</th>
                    <th>Составитель</th>
                    <th>Приоритет</th>
                    <th>Управление</th>
                </tr>
                </thead>

                <tbody>
                    <RequestDispatcher v-for="request in this.requests" :key="request.id" 
                        :title="request.title" :comment="request.comment" 
                        :user_compiler="request.user_compiler" :priority="request.priority"
                        :id="request.id" :created_date="request.created_date" 
                        :showModalBox="onShowModalWindow" :cancelRequest="cancelRequest"/>
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
    import ModalWindow from '../components/ModalWindow.vue';

    export default {
        name: "DispatcherPanel",
        components: {
          RequestDispatcher,
          ModalWindow, 
        },
        created() {
            console.log(this.showModal);
            dispatcherInfo(localStorage.getItem("token")).then(data => {
                this.username = data['fullname'];
                this.requests = data['requests'];
            });
        },
        data(){
            return {
                username: "",
                requests: [],
                showModal: false,
            }
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
            onShowModalWindow(e){
                e.preventDefault();
                this.showModal = true;
            },
            cancelRequest(e) {
                e.preventDefault();

            },
            onCloseModal(e){
                e.preventDefault();
                this.showModal = false;
            },
            onSaveModal(e){
                e.preventDefault();
                console.log("Влад курва");
            }
        },
        mounted () {
            M.AutoInit()
        },
    }
</script>