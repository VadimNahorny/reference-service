import { app } from "./app.js";


let modalWindow =

    `<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <slot name="header">
                       Диалог редактирования
                    </slot>
                </div>

                <div class="modal-body">
                    <div  v-if="renderModal()"  v-for="column in columns" class="form-item">
                        <div v-if="column.type==='simple'">
                        <label :for="column.fieldName">{{ column.columnName }}: </label>
                        <input
                                :id="column.fieldName"
                                :name="column.fieldName"
                                v-model="editedItem[0][column.fieldName]"/>
                        </div>   
                         <div v-if="column.type === 'object'">
                            <label :for="column.fieldName">{{ column.columnName }}: </label>
                            <selectVue 
                            
                            :editedItem="editedItem"
                            :column="column"
                            :objects="getOptions(column)"
                            :isModalVisible="isModalVisible"
                            :objectsList="objectsMap.get(column.fieldName)"> 
                            </selectVue>
                            </div>                                              
                    </div>

                    <div class="modal-footer">
                            <button class="modal-default-button" @click="saveOrUpdateItem()"> Сохранить </button>
                            <button class="modal-default-button" @click="$emit('close')"> Отмена </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</transition>`;


let select =
    `<select :id="column.fieldName"
        ref="select"
        :name="column.fieldName"
        @change="itemChange(column)"
        v-model="selectedItem">
  <option v-text=""></option>
  <option v-for="object in objects"
          v-text="object[column.representation]"
          v-bind:value="object">
  </option>
</select>`;

app.component('selectVue', {
    template: select,

    props: {
        editedItem: Array,
        column: Object,
        objects:Array,
        isModalVisible:Boolean,
        objectsList:Array
    },

    mounted: function() {
        console.log(this)
    },

    methods: {
        itemChange(column) {
            let index= event.target.selectedIndex;
            if (index === 0) {
                this.editedItem[0][column.fieldName] = null;
                this.selectedItem = {};
            } else {
                this.editedItem[0][column.fieldName] = this.objectsList[index - 1];
                this.selectedItem = this.objectsList[index - 1];
            }
        },

    },

    data() {
        let selectedItem = {};
        if (this.editedItem[0][this.column.fieldName] && this.editedItem[0][this.column.fieldName].id) {
            let id = this.editedItem[0][this.column.fieldName].id;
            selectedItem = this.objects.find(function (ob) {
                return ob.id === id;
            });

        }
        return {
            selectedItem: selectedItem
        }
    }

});

app.component('modal-window', {
    template: modalWindow,

    props: {
        editedItem: Array,
        columns: Array,
        mode: Object,
        isModalVisible:Boolean
    },

    methods: {
        saveOrUpdateItem() {
            this.$emit('saveOrUpdateItemEvent', this.mode.name)
        },

        renderModal() {
            return this.editedItem[0].hasOwnProperty('id')
        },


        getOptions(column) {
            return this.objectsMap.get(column.fieldName)
        },

    },

    data() {

        let objectsMap = new Map();
        return {
            objectsMap: objectsMap,
            isModalVisible: this.isModalVisible,
            editedItem: this.editedItem,
        }
    },
    watch: {
        isModalVisible: {
            handler(val) {
               if (val) {
                   this.objectsMap.clear()
                   let objectColumns = this.columns.filter(function (column) {
                       return column.type === 'object'
                   });
                   for (let objectColumn of objectColumns) {
                       let xhr = new XMLHttpRequest();
                       xhr.open('GET', objectColumn.dataGettingPath, false,);
                       let itemsFromServer;
                       xhr.onload = function () {
                           itemsFromServer = JSON.parse(xhr.response);
                       };
                       xhr.send();
                       if (this.mode.name === "edit" && objectColumn.referenceType === 'same' && this.renderModal()) {
                           let editedItemId = this.editedItem[0].id;
                           itemsFromServer = itemsFromServer.filter(function (item) {
                               return item.id !== editedItemId;
                           })
                       }
                       this.objectsMap.set(objectColumn.fieldName, itemsFromServer);
                   }
               }
            },
            immediate: true
        }
    }
});




