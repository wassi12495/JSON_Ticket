<template>
  <div class="container">
    <div v-if="this.tickets !== null">
      <ag-grid-vue
        style="width: auto; height: 1000px;"
        class="grid ag-theme-material"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :filter="true"
        :sortable="true"
        rowSelection="single"
      ></ag-grid-vue>
    </div>
    <div v-else>
      no tickets
    </div>

  </div>

  
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";
import { AgGridVue } from "ag-grid-vue";

@Component({
  components: {
    AgGridVue
  }
})
export default class Home extends Vue {
  @Action("getTickets") getTickets: any;
  @State("tickets") tickets: any;

  mounted() {
    console.log("Home Page mounted");
    this.getTickets();
  }

  @Watch("tickets")
  ticketsRecieved() {
    console.log("Home Page: Tickets Recieved", this.tickets);
  }

  data() {
    return {
      columnDefs: [
        { headerName: "Symbol", field: "symbol" },
        { headerName: "Basis Points", field: "bps" },
        { headerName: "Target Basis Points", field: "targetBps" },
        { headerName: "Quantity", field: "quantity" },
        { headerName: "Notional", field: "notional" },
        { headerName: "Order Type", field: "orderType" },
        { headerName: "Price", field: "price" },
        { headerName: "Strategy 1", field: "strategy1" },
        { headerName: "Strategy 2", field: "strategy2" },
        { headerName: "Swap?", field: "isSwap" },
        { headerName: "Trade Type", field: "tradeType" }
      ]
    };
  }
  get rowData() {
    // User data formatted for ag_grid
    console.log(this.tickets);
    let formattedData = [];
    for (let i in this.tickets) {
      // console.log("id ", i);
      let p = this.tickets[i];
      // console.log(p);
      formattedData.push(p);
    }
    console.log(formattedData);
    return formattedData;
  }
}
</script>

<style>
</style>
