<template>
    <tr>
        <td :class="statusClass">{{ status }}</td>
        <td>{{ created_date }}</td>
        <td>{{ title }}</td>
        <td>{{ comment }}</td>
        <td>{{ user_compiler }}</td>
        <td>{{ priority }}</td>
        <td>{{ completion_date }}</td>
        <td>{{ whom }}</td>
    </tr>
</template>

<style>
    .statusYellowColor{
        color: rgb(230, 143, 71);
    }

    .statusRedColor {
        color: red;
    }

    .statusBlackColor {
        color: black;
    }
</style>

<script>
    export default {
        name: "RequestDispatcher",
        props: {
            id: String,
            status: String,
            created_date: String,
            title: String,
            comment: String,
            user_compiler: String,
            priority: String,
            completion_date: String,
            whom: String,
            onChange: Function,
        },
        data(){
            return {
                color: "black"
            };
        },
        computed: {
            statusClass: function() {
                switch(this.status.toLowerCase()){
                    case "в ожидании": return "statusYellowColor";
                    case "отказано": return "statusRedColor";
                    default: return "statusBlackColor";
                }
            }
        },
    }
</script>