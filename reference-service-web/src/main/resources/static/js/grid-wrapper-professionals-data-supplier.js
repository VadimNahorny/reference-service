import { app } from "./app.js";

let template =
    `<grid-wrapper 
        :gridColumnsProps="gridColumns"
        :gridDataProps="gridData"
        :itemSaveServerPathProps="itemSaveServerPath"
        :itemRemoveServerPathProps="itemRemoveServerPath">
        </grid-wrapper>`;

app.component('grid-wrapper-professionals-data-supplier', {

    props: {
        mode: Object,
    },

    template: template,

    data() {

        let professionals;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/refService/professions', false);
        xhr.onload = function () {
            let response = xhr.response;
            professionals = JSON.parse(response);
        };
        xhr.send();

        return {
            gridColumns: [
                {
                    fieldName: 'name',
                    columnName: 'Наименование',
                    type:'simple'
                },
                {
                    fieldName: 'note',
                    columnName: 'Примечание',
                    type:'simple'
                },
            ],
            gridData: professionals,
            itemSaveServerPath:'http://localhost:8080/refService/profession/save',
            itemRemoveServerPath:'http://localhost:8080/refService/profession/remove'
        }
    },

});