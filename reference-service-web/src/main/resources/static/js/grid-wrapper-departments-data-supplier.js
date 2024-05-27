import { app } from "./app.js";

let template =
    `<grid-wrapper 
        :gridColumnsProps="gridColumns"
        :gridDataProps="gridData"
        :itemSaveServerPathProps="itemSaveServerPath"
        :itemRemoveServerPathProps="itemRemoveServerPath">
        </grid-wrapper>`;

app.component('grid-wrapper-departments-data-supplier', {

    props: {
        mode: Object,
    },

    template: template,

    data() {

        let departments;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/refService/departments', false);
        xhr.onload = function () {
            let response = xhr.response;
            departments = JSON.parse(response);
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
                {
                    fieldName: 'parentDepartment',
                    columnName: 'Родитеский департамент',
                    type:'object',
                    representation: 'name',
                    referenceType:'same',
                    dataGettingPath:"http://localhost:8080/refService/departments"
                }
            ],
            gridData: departments,
            itemSaveServerPath:'http://localhost:8080/refService/department/save',
            itemRemoveServerPath:'http://localhost:8080/refService/department/remove'


        }
    },

});