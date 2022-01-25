<template>
    <div class="modal-window">
        <div class="modal__content">
            <div class="m-header">
                <h4 class="title">Управление</h4>
                <a class="close_btn" id="close" @click="this.onCloseModal"></a>
            </div>
            <div class="m-section" align="center">
                <div class="row">
                    <form @submit="onSaveModal">
                        <div class="left"> 
                            Направить в отдел:
                            <label v-for="office in offices" :key="office.id" class="f-item">
                                <input name="offices" :id="office.id" class="with-gap" 
                                            v-on:change="onChange" type="radio" required change=""/>
                                <span>{{ office.name }} </span>
                            </label>
                        </div><br><br>
                        <div class="left" style="color: red;">
                            При согласовании : 
                            <span v-if="showSM">С начальником цеха; </span>
                            <span v-if="showIS">С отделом ИБ; </span>
                        </div>
                        <input type="text" class="datepicker" 
                                        name="end_date" placeholder="Выберите дату срока" required><br><br>
                        Приоритет:
                        <label v-for="priority in priorities" :key="priority" class="f-item">
                            <input name="priorities" :id="priority" class="with-gap" type="radio" required/>
                            <span>{{ priority }}</span>
                        </label><br><br>
                        <input type="submit" class="m-white_btn" value="Сохранить" style="width: 100%;">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import M from 'materialize-css';
    import { getOffices } from '../helpers/fetch.js';
    export default {
        name: 'ModalWindow',
        data(){
            return{
                offices: [],
                key: 0,
                priorities: ['Высокий', 'Низкий'],
                showSM: false,
                showIS: false,
                picked: "",
            }
        },
        created(){
            getOffices().then(data => {
                this.offices = data['offices'];
            });  
        },
        props: {
            onCloseModal: Function,
            onSaveModal: Function,
        },
        methods: {
            onChange(e) {
                e.preventDefault();
                if (this.offices[e.target.id - 1].name === "ИБ") {
                    this.showIS = true;
                    this.showSM = true;
                } else {
                    this.showSM = true;
                    this.showIS = false;
                }
            }
        },
        mounted () {
            M.AutoInit()
        },
    }
</script>