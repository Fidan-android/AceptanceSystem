<template>
    <tr>
        <td>{{ created_date }}</td>
        <td>{{ title }}</td>
        <td>{{ comment }}</td>
        <td>{{ priority }}</td>
        <td>{{ completion_date }}</td>
        <td>{{ executor }}</td>
        <td>
            <form @submit="changeRequest" :id="id" :class="noExecutor">
                <button class="btn waves-effect green light-3" type="submit" name="change">Выбрать</button>
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