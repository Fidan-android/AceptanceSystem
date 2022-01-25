<template>
    <div class="modal-window">
        <div class="modal__content">
            <div class="m-header">
                <h4 class="title">Отказ</h4>
                <a class="close_btn" id="close" @click="this.onCloseModal"></a>
            </div>
            <div class="m-section" align="center">     
                <div class="row">
                    <form @submit="onSaveModal">
                        <input type="hidden" name="id" :value="id"/>
                        <div class="row">
                            <div class="input-field">
                                <textarea name="comment" required id="textarea_comment" class="materialize-textarea" data-length="120"></textarea>
                                <label for="textarea_comment">Описание отказа</label><br>
                            </div>
                        </div>
                        <input type="submit" class="m-white_btn" value="Сохранить" style="width: 100%;">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import M from 'materialize-css';
    
    export default {
        name: 'CancelWindow',
        data(){
            return{
                offices: [],
                key: 0,
            }
        },
        props: {
            id: String,
            onCloseModal: Function,
            onSaveModal: Function,
        },
        mounted () {
            M.AutoInit()
        },
    }
</script>