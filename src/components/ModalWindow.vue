<template>
    <div class="modal-window">
        <div class="modal__content">
            <div class="m-header">
                <h4 class="title">Management</h4>
                <a class="close_btn" id="close" @click="this.onCloseModal"></a>
            </div>
            <div class="m-section" align="center">
                <form @submit="onSaveModal">
                    <label v-for="(office, key) in offices" :key="key" class="f-item">
                        <input name="offices" class="with-gap" type="radio" checked required/>
                        <span>{{ office.name }}</span>
                    </label>
                    <input type="text" class="datepicker" placeholder="Выберите дату срока" required>
                    <input type="submit" class="m-white_btn" value="save" style="width: 100%;">
                </form>
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
        mounted () {
            M.AutoInit()
        },
    }
</script>