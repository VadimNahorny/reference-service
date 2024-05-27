import { app } from "./app.js";

let template =
    `<grid-wrapper 
        :gridColumnsProps="gridColumns"
        :gridDataProps="gridData"
        :itemSaveServerPathProps="itemSaveServerPath"
        :itemRemoveServerPathProps="itemRemoveServerPath">
        </grid-wrapper>`;

app.component('grid-wrapper-employees-data-supplier', {

    props: {
        mode: Object,
    },

    template: template,

    data() {

        let departments;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/refService/employees', false);
        xhr.onload = function () {
            let response = xhr.response;
            departments = JSON.parse(response);
        };
        xhr.send();

        return {
            gridColumns: [
                {
                    fieldName: 'fullName',
                    columnName: 'ФИО',
                    type:'simple'

                },
                {
                    fieldName: 'note',
                    columnName: 'Примечание',
                    type:'simple'
                },
                {
                    fieldName: 'department',
                    columnName: 'Департамент',
                    type:'object',
                    representation: 'name',
                    referenceType:'other',
                    dataGettingPath:"http://localhost:8080/refService/departments"
                },
                {
                    fieldName: 'profession',
                    columnName: 'Профессия',
                    type:'object',
                    representation: 'name',
                    referenceType:'other',
                    dataGettingPath:"http://localhost:8080/refService/professions"
                }
            ],
            gridData: departments,
            itemSaveServerPath:'http://localhost:8080/refService/employee/save',
            itemRemoveServerPath:'http://localhost:8080/refService/employee/remove'


        }
    },

});