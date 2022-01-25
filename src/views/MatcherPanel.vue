<template>
    <div>
        <header>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">&nbsp;Система заявок. Панель согласующего ({{ matcher_name }})</a>
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
        <CancelWindow v-if="this.showCancelModal" :onCloseModal="this.onCloseCancelModal" :onSaveModal="this.onSaveCancelModal"/>
    
        <section class="c-table" v-if="loaded">
            <h5>Заявки на согласование</h5>
            <table class="striped centered" >
                <thead>
                <tr>
                    <th>Дата создания</th>
                    <th>Заголовок</th>
                    <th>Составитель</th>
                    <th>Приоритет</th>
                    <th>Управление</th>
                </tr>
                </thead>

                <tbody>
                    <RequestMatcher v-for="request in this.requests" :key="request.id" 
                        :title="request.title" :comment="request.comment" 
                        :user_compiler="request.user_compiler" :phone_user="request.phone_user" :priority="request.priority"
                        :id="request.id" :created_date="request.created_date" 
                        :showModalBox="onShowModalWindow" :cancelRequest="cancelRequest"/>
                </tbody>
            </table>
        </section>
        <section v-if="!loaded">
                Текущих заявок пока нет
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
    import { signout, matcherInfo } from '../helpers/fetch.js';
    import RequestMatcher from '../components/RequestMatcher.vue';
    import ModalWindow from '../components/ModalWindow.vue';
    import CancelWindow from '../components/CancelWindow.vue';

    export default {
        name: "MatcherPanel",
        components: {
          RequestMatcher,
          ModalWindow,
          CancelWindow,
        },
        created() {
            matcherInfo(localStorage.getItem("token")).then(data => {
                this.username = data['fullname'];
                this.matcher_name = data['matcher_name'];
                this.requests = data['requests'];
            });
        },
        computed: {
            loaded() {
                return this.requests?.length > 0
            }
        },
        data(){
            return {
                username: "",
                matcher_name: "",
                requests: [],
                showModal: false,
                showCancelModal: false,
                idRequest: 0,
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
                            route.go();
                        }, 300);
                    } else {
                        console.log(data);
                    }
                });
            },
            onShowModalWindow(e){
                e.preventDefault();
                this.showModal = true;
                this.idRequest = e.target.id;
            },
            cancelRequest(e) {
                e.preventDefault();
                this.showCancelModal = true;
            },
            onCloseModal(e){
                e.preventDefault();
                this.showModal = false;
            },
            onSaveModal(e){
                e.preventDefault();
                var office = Array.from(e.target.offices).filter(item => item.checked)[0].id;
                var date_end = (new Date(e.target.end_date.value)).toJSON().slice(0,10).replace(/-/g,'-');
                console.log(date_end);
                redirectToOffice(this.idRequest, office, date_end).then(data => {
                    this.requests = data['requests'];
                    this.showModal = false;
                });
            },
            onCloseCancelModal(e){
                e.preventDefault();
                this.showCancelModal = false;
            },
            onSaveCancelModal(e){
                e.preventDefault();
                
            }
        },
        mounted () {
            M.AutoInit()
        },
    }
</script>