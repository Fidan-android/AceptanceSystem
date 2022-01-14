<template>
    <div>
        <header>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">&nbsp;Техническая панель</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a @click="onExit">Выйти из аккаунта</a></li>
                    </ul>
                </div>
            </nav>
        </header>
        <section class="user_info">
            <h5 id="user_text"></h5>
        </section>

        <section style="margin: 20px;">
            <center>
            <nav>
                <div>
                    <ul class="hide-on-med-and-down">
                        <li><a href="#">Все заявки</a></li>
                        <li><a href="#">В работе</a></li>
                        <li><a href="#">Отклонены</a></li>
                        <li><a href="#">Закрыты</a></li>
                    </ul>
                </div>
            </nav>
            </center>
        </section>

        <section class="c-table" style="margin: 20px;">
            <table class="striped centered">
                <thead>
                <tr>
                    <th>Статус</th>
                    <th>Дата создания</th>
                    <th>Составитель</th>
                    <th>Описание</th>
                    <th>Приоритет</th>
                    <th>Срок</th>
                    <th>Исполнитель</th>
                    <th>Управление</th>
                    <th>Перенаправить</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Отклонено</td>
                    <td>20.20.2021</td>
                    <td>Пользователь</td>
                    <td>Установка антивируса</td>
                    <td>Высокий</td>
                    <td>2 дня</td>
                    <td>АСУТП</td>
                    <td>Недоступно</td>
                    <td>Недоступно</td>
                </tr>

                <tr>
                    <td>Перенаправлено</td>
                    <td>20.20.2021</td>
                    <td>Пользователь</td>
                    <td>Переустановка ОС</td>
                    <td>Высокий</td>
                    <td>2 дня</td>
                    <td>АСУТП</td>
                    <td>
                        Недоступно
                    </td>
                    <td>
                        КИПиА
                    </td>
                </tr>

                <tr>
                    <td>Ожидание</td>
                    <td>03.12.2021</td>
                    <td>Отдел АСУТП</td>
                    <td>Переустановка ОС</td>
                    <td>Средний</td>
                    <td>2 дня</td>
                    <td>Сисадмины</td>
                    <td>
                        <div class="buttons_div">
                            <button class="btn waves-effect waves-light" type="submit" name="action">
                                Принять
                            </button>
                            <button class="btn waves-effect waves-light" type="submit" name="action" style="background-color: #b50000;">
                                Отклонить
                            </button>
                        </div>
                    </td>
                    <td>
                        <div class="buttons_div">
                            <button class="btn waves-effect waves-light" type="submit" name="action" style="background-color: #ffcc00">
                                КИПиА
                            </button>

                            <button class="btn waves-effect waves-light" type="submit" name="action" style="background-color: #ffcc00">
                                Сисадмины
                            </button>
                        </div>
                    </td>
                </tr>
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
    import { signout } from '../helpers/fetch.js'
    export default {
        name: "AdminPanel",
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