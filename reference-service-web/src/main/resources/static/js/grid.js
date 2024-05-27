import { app } from "./app.js";

let table = `<table  @click="onTableClick">
            <thead>
            <tr>
                <th v-for="key in columns"
                    @click="sortBy(key.fieldName)"
                    :class="{ active: sortKey == key.fieldName }">
                    {{ capitalize(key.columnName) }}
                    <span class="arrow" :class="sortOrders[key.fieldName] > 0 ? 'asc' : 'dsc'">
              </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr  v-for="entry in filteredItems" @click="onRowClick(entry)">
                <td v-for="key in columns">
                    {{ getEntryRepresentation(entry, key) }}
                </td>
            </tr>
            </tbody>
        </table>`;


app.component('grid', {
    template: table,
    props: {
        items: Array,
        columns: Array,
        filterKey: String,
        selectedItemInGrid: Array

    },
    data() {
        const sortOrders = {};
        this.columns.forEach(function (key) {
            sortOrders[key.fieldName] = 1;
        });
        return {
            sortKey: '',
            sortOrders: sortOrders,
        }
    },
    computed: {
        filteredItems() {
            const sortKey = this.sortKey
            const filterKey = this.filterKey && this.filterKey.toLowerCase()
            const order = this.sortOrders[sortKey] || 1
            let items = this.items
            if (filterKey) {
                items = items.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return (
                            String(row[key])
                                .toLowerCase()
                                .indexOf(filterKey) > -1
                        )
                    })
                })
            }
            if (sortKey) {
                items = items.slice().sort(function (a, b) {
                    a = a[sortKey]
                    b = b[sortKey]
                    return (a === b ? 0 : a > b ? 1 : -1) * order
                })
            }
            return items
        },
        sortOrders() {
            const columnSortOrders = {}

            this.columns.forEach(function (key) {
                columnSortOrders[key.fieldName] = 1
            })

            return columnSortOrders;
        }
    },

    methods: {

        getEntryRepresentation(entry, key) {
            if (key.type === 'simple') {
                return  entry[key.fieldName];
            } else {
                if (entry[key.fieldName] && entry[key.fieldName].hasOwnProperty(key.representation)) {
                    return entry[key.fieldName][key.representation];
                }
                return '';
            }
        },

        onRowClick(item) {
            this.selectedItemInGrid[0] = item;
        },

        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        },
        sortBy(key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        },

        onTableClick(event) {
            let target = event.target;
            let table = target.closest("table");
            if (target.tagName.toLocaleLowerCase() === 'td' || target.tagName.toLocaleLowerCase() === 'tr') {
                let currentSelectedRow = table.querySelector('tr.selected-row');
                let selectedRow = target.tagName.toLocaleLowerCase() === 'td' ? target.parentElement : target;
                if (currentSelectedRow !== selectedRow) {
                    selectedRow.classList.add('selected-row');
                    selectedRow.querySelectorAll('td').forEach(td => td.classList.add('selected-row'));
                    if (currentSelectedRow) {
                        currentSelectedRow.classList.remove('selected-row');
                        currentSelectedRow.querySelectorAll('td').forEach(td => td.classList.remove('selected-row'));
                    }
                }
            }
        }
    }
});