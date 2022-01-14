<template>
    <tr>
        <td :class="statusClass">{{ status }}</td>
        <td>{{ created_date }}</td>
        <td>{{ title }}</td>
        <td>{{ comment }}</td>
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
        name: "Request",
        props: {
            status: String,
            created_date: String,
            title: String,
            comment: String,
            priority: String,
            completion_date: String,
            whom: String,
        },
        data: {
            color: "black"
        },
        computed: {
            statusClass: function() {
                switch(this.status){
                    case "В ожидании": return "statusYellowColor";
                    case "Отменено": return "statusRedColor";
                    default: return "statusBlackColor";
                }
            }
        },
    }
</script>