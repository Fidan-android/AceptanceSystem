<template>
    <tr>
        <td :class="statusClass">{{ status }}</td>
        <td>{{ created_date }}</td>
        <td>{{ title }}</td>
        <td>{{ comment }}</td>
        <td>{{ priority }}</td>
        <td>{{ completion_date }}</td>
        <td>{{ whom }}</td>
        <td>
            <div class="buttons_div">
                <form @submit="this.onDelete" :class="deleteElement">
                    <button class="btn waves-effect red accent-4" type="submit" name="action">Удалить</button>
                    <input type="hidden" name="request_id" :value="id">
                </form>
                
                <form @submit="this.onDelete" :class="cancelElement">
                    <button class="btn waves-effect orange darken-3" type="submit" name="action">Отменить</button>
                    <input type="hidden" name="request_id" :value="id">
                </form>
            </div>
        </td>
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

    .hideCssClass {
        display: none;
    }

    .showCssClass {
        display: block;
    }
</style>

<script>
    export default {
        name: "Request",
        props: {
            id: String,
            status: String,
            created_date: String,
            title: String,
            comment: String,
            priority: String,
            completion_date: String,
            whom: String,
            onDelete: Function,
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
            },
            deleteElement: function(){
                if(this.status.toLowerCase() === "отказано" || this.status.toLowerCase() === "выполнено") {
                    return "showCssClass";
                } else {
                    return "hideCssClass";
                }
            },
            cancelElement: function(){
                if(this.status.toLowerCase() === "отказано" || this.status.toLowerCase() === "выполнено") {
                    return "hideCssClass";
                } else {
                    return "showCssClass";
                }
            }
        },
    }
</script>