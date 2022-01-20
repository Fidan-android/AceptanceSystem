<template>
    <tr>
        <td>{{ created_date }}</td>
        <td>{{ title }}</td>
        <td>{{ comment }}</td>
        <td>{{ user_compiler }}</td>
        <td>{{ priority }}</td>
        <td>
            <form @submit="showModalBox" :id="id">
                <button class="btn waves-effect orange darken-3" type="submit" name="action">Управление</button>
            </form><br>
            <form @submit="cancelRequest" :id="id">
                <button class="btn waves-effect red darken-3" type="submit" name="cancel">Отклонить</button>
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