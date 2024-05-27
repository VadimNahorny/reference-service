import { app } from "./app.js";

let showModalButton =
    '<button id="show-modal" class="btn" @click="buttonAction(mode.name)">{{mode.title}}</button>';


app.component('show-modal-button', {

    props: {
        mode: Object,
    },

    template: showModalButton,

    methods: {
        buttonAction(mode) {
            this.$emit('button-action-event', mode)
        }
    }
});