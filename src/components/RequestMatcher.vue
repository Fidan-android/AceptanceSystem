<template>
    <tr>
        <td>{{ created_date }}</td>
        <td>
            <ul id="nav-mobile" class="hide-on-med-and-down nav-menu">
                <li>
                    <div>{{ title }}</div>
                    <ul class="li-menu">
                        <li>{{ comment }}</li>
                    </ul>
                </li>
            </ul>
        </td>
        <td>
            <ul id="nav-mobile" class="hide-on-med-and-down nav-menu">
                <li>
                    <div>{{ user_compiler }}</div>
                    <ul class="li-menu">
                        <li><a :href="`tel:${phone_user}`"> {{ phone_user }}</a></li>
                    </ul>
                </li>
            </ul>
        </td>
        <td>{{ priority }}</td>
        <td>
            <form @submit="showModalBox" :id="id">
                <button class="btn waves-effect green darken-3" type="submit" name="action">Согласовать</button>
            </form><br>
            <form @submit="cancelRequest" :id="id">
                <button class="btn waves-effect red darken-3" type="submit" name="cancel">Отказаться</button>
            </form>
        </td>
    </tr>
</template>

<script> 
    import M from 'materialize-css';

    export default {
        name: "RequestDispatcher",
        props: {
            id: String,
            created_date: String,
            title: String,
            comment: String,
            user_compiler: String,
            phone_user: String,
            priority: String,
            showModalBox: Function,
            cancelRequest: Function,
        },
        mounted(){
            M.AutoInit();
        },
        data(){
            return{
                offices: [],
            }
        }
    }
</script>