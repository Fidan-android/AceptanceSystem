<template>
    <tr>
        <td>Начальник цеха - согласовано <br> ИБ - согласовано</td>
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
        <td>{{ priority }}</td>
        <td>{{ completion_date }}</td>
        <td>{{ executor }}</td>
        <td>
            <form @submit="changeRequest" :id="id" :class="noExecutor">
                <button class="btn waves-effect green light-3" type="submit" name="change">Принять</button>
            </form><br>
             <form @submit="cancelRequest" :id="id">
                <button class="btn waves-effect red darken-3" type="submit" name="cancel">Отказаться</button>
            </form>
        </td>
    </tr>
</template>
<style scoped>
    .hideButton{
        display: none;
    }

    .showButton{
        display: block;
    }
</style>
<script> 
    import M from 'materialize-css';

    export default {
        name: "RequestAdmin",
        props: {
            id: String,
            created_date: String,
            title: String,
            comment: String,
            priority: String,
            executor: String,
            completion_date: String,
            changeRequest: Function,
            cancelRequest: Function,
        },
        mounted(){
            M.AutoInit();
        },
        data(){
            return{
                offices: [],
            }
        },
        computed: {
            noExecutor: function() {
                if(this.executor == undefined) {
                    return "showButton";
                } else {
                    return "hideButton";
                }
            },
        }
    }
</script>