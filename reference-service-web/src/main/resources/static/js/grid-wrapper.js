import { app } from "./app.js";


let gridWrapper =
    `<div><form id="search">
        Search <input name="query" v-model="searchQuery"/>
    </form>

    <show-modal-button :mode="editMode" @button-action-event="buttonActionInWrapper"></show-modal-button>
    <show-modal-button :mode="createMode" @button-action-event="buttonActionInWrapper"></show-modal-button>
    <show-modal-button :mode="deleteMode" @button-action-event="buttonActionInWrapper"></show-modal-button>

    <grid
            :items="gridData"
            :columns="gridColumns"
            :filter-key="searchQuery"
            :selectedItemInGrid="selectedItem">    </grid>


    <modal-window 
    :editedItem="editedItemFromWrapper"
    :columns="gridColumns"
    :mode="currentMode"
    v-show="isModalVisible"
    :isModalVisible="isModalVisible"
    @close="closeModal"
    @deleteItem="deleteItem"
    @saveOrUpdateItemEvent="saveOrUpdateItemInWrapper">
        <h3 slot="header">custom header</h3>
    </modal-window></div>`;


app.component('grid-wrapper', {

    props: {
        gridColumnsProps: Array,
        gridDataProps: Array,
        itemSaveServerPathProps: String,
        itemRemoveServerPathProps: String
    },

    template: gridWrapper,

    data() {

        return {
            searchQuery: '',
            gridColumns: this.gridColumnsProps,
            gridData: this.gridDataProps,
            isModalVisible: false,
            selectedItem: [],
            editedItemFromWrapper: [{}],
            createMode: {
                name: 'edit',
                title: 'Редактировать'
            },
            editMode: {
                name: 'create',
                title: 'Создать',
            },
            deleteMode: {
                name: 'delete',
                title: 'Удалить'
            },
            currentMode: {
                modeName: ''
            }
        }
    },

    methods: {
        buttonActionInWrapper(mode) {
            if (mode === 'delete') {
                if (this.selectedItem[0]) {
                    let status = this.saveOrUpdateOrRemoveItemOnServer(this.selectedItem[0], this.itemRemoveServerPathProps, mode)
                    if (status === 200) {
                        let index = this.gridData.indexOf(this.selectedItem[0]);
                        this.gridData.splice(index, 1);
                        this.selectedItem.splice(0, 1);
                    }
                }
                return;
            }
            this.currentMode.name = mode;
            if (mode === 'create') {
                this.editedItemFromWrapper[0] = {}
                this.editedItemFromWrapper[0].id = null;
                for (let column of this.gridColumns) {
                    if (column.type === 'simple') {
                        this.editedItemFromWrapper[0][column.fieldName] = null;
                    } else {
                        this.editedItemFromWrapper[0][column.fieldName] = {};
                        this.editedItemFromWrapper[0][column.fieldName].id = null;
                        this.editedItemFromWrapper[0][column.fieldName][column.representation] = null;
                    }
                }

                this.isModalVisible = true;
            } else if (mode === 'edit') {
                if (this.selectedItem[0]) {
                    let dest = {};
                    Object.assign(dest, this.selectedItem[0])
                    this.editedItemFromWrapper[0] = dest;
                    this.isModalVisible = true;
                }
            }
        },
        closeModal(mode) {
            this.currentMode.name = '';
            this.editedItemFromWrapper[0] = {};
            this.isModalVisible = false;
        },

        saveOrUpdateItemInWrapper(mode) {
            if (mode === 'create') {
                this.editedItemFromWrapper[0].id = null;
                let id = Number(this.saveOrUpdateOrRemoveItemOnServer(this.editedItemFromWrapper[0],
                    this.itemSaveServerPathProps, mode));
                if (id) {
                    this.editedItemFromWrapper[0].id = id;
                    let dest = {};
                    Object.assign(dest, this.editedItemFromWrapper[0]);
                    this.gridData.push(dest);
                }
            } else if (mode === 'edit') {
                let status = this.saveOrUpdateOrRemoveItemOnServer(this.editedItemFromWrapper[0],
                    this.itemSaveServerPathProps, mode)
                if (status === 200) {
                    let index = this.gridData.findIndex(item => item.id === this.editedItemFromWrapper[0].id);
                    let dest = {};
                    Object.assign(dest, this.editedItemFromWrapper[0]);
                    this.gridData[index] = dest;
                    this.selectedItem[0] = dest;
                }
            }
            this.editedItemFromWrapper[0] = {};
            this.currentMode.name = '';
            this.isModalVisible = false;
        },

        saveOrUpdateOrRemoveItemOnServer(item, path, mode) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', path, false,);
            xhr.setRequestHeader('Content-Type', 'application/json');
            let id;
            xhr.onload = function () {
                id = xhr.response;
            };
            let objectColumns = this.gridColumns.filter(function (column) {
                return column.type === 'object'
            });

            objectColumns.forEach(function (column) {
                if (item[column.fieldName] && !item[column.fieldName].id) {
                    item[column.fieldName] = null;
                }
            });

            xhr.send(JSON.stringify(item));
            if (mode === 'create') {
                return id;
            } else {
                return xhr.status;
            }
        },
    },
});
