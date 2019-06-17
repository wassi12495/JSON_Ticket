 <template>
  <v-container class="fluid grid-list-md blue-grey darken-4 trade-ticket-container">
    <v-btn color="primary" dark @click.stop="dialog2 = true">Open Dialog 2</v-btn>
    <v-btn color="primary" dark @click.stop="dialog3 = true">Open Dialog 3</v-btn>
    <v-dialog v-model="dialog2" max-width="1050px">
      <v-layout row wrap>
        <Details-Groups :buttonConfig="symbolButtons" :onSymbolUpdate="onSymbolKey" :selectBlotter="testBlotter" :tradeExecuted="showTradeExecuted"/>
      </v-layout>







    <v-layout row wrap>
      <!-- break off into component -->
        <v-flex xs2 style="margin-top:10px">
          <!-- <v-card class="blue-grey darken-4"> -->
          <v-layout row wrap>
            <v-btn flat small :class="button.type" v-for="button in mainButtons" @click.stop.prevent="onTradingAction" :key="button.id" style="margin-right:-7px; min-width:40px; max-width:40px; font-size:10px; color: black; border:1px solid #ccc !important;  height:25px">{{ button.name }}</v-btn>
          </v-layout>
          <v-layout row wrap>
            <v-btn outline small class="blue-grey lighten-2" v-for="item in quantityButtons"  @click.stop.prevent="onHotKey" style="margin-right:-7px; min-width:40px; max-width:40px; margin-top:-3px; font-size:12px" :key="item.id">{{ item.value }}</v-btn>
          </v-layout>
            <v-btn color="green darken-1" dark  @click.stop="tradeConfirmDialog = true" style="min-width:80px; max-width:80px; margin-right:-8px; width:30%; font-size:12px; color:black; border:1px solid #ccc !important; margin-top:-3px; height:25px">{{tradeActions.send}}</v-btn>
            <v-btn color="red darken-4" dark @click="resetTradeTicket" style="min-width:80px; max-width:80px; margin-right:-8px; width:30%; font-size:12px; color:black; border:1px solid #ccc !important; margin-top:-3px; height:25px">{{tradeActions.clear}}</v-btn>
          <!-- </v-card> -->
        </v-flex>
        <v-flex xs10>
            <Details-Form-Fields :quantityData="quantHotKey" :tradeData="tradeMap" :tradeOpts="tradeOptions"/>
            <Details-Position :launchAllocation="launchAllocationRatio"/>
        </v-flex>

        <!-- break off into component -->
        <v-dialog v-model="tradeConfirmDialog" max-width="500px">
         <v-card style="background:#FFFFFF">
           <v-card-title>
             <span style="color:black">Are you sure you want to buy {{ quantHotKey }} {{ tradeMap.symbol }} at (TradeType)?</span>
             <v-spacer></v-spacer>
             <v-menu bottom left>
               <v-btn slot="activator" icon>
                 <v-icon>more_vert</v-icon>
               </v-btn>
               <v-list>

               </v-list>
             </v-menu>
           </v-card-title>
           <v-card-actions>
             <v-btn color="primary" flat @click.stop.prevent="tradeConfirmation">Yes</v-btn>
             <v-btn color="primary" flat @click.stop.prevent="tradeConfirmDialog=false">No</v-btn>
           </v-card-actions>
         </v-card>
       </v-dialog>
      </v-layout>
      </v-dialog>
  </v-container>
</template>

<script>
import DetailsPosition from "./DetailsPosition.vue";
import DetailsFormFields from "./DetailsFormFields.vue";
import DetailsGroups from "./DetailsGroups.vue";
// import UserSettingsDialog from '../UserSettings/UserSettingsDialog.vue';
import _ from "lodash";

export default {
  name: "trade-ticket-dialog",
  components: {
    // "User-Settings-Dialog": UserSettingsDialog,
    "Details-Form-Fields": DetailsFormFields,
    "Details-Position": DetailsPosition,
    "Details-Groups": DetailsGroups
  },
  data() {
    return {
      dialog2: false,
      dialog3: false,
      text: "left",
      showTradeExecuted: false,
      tradeConfirmDialog: false,
      tradeOptions: {
        tradeType: null
      },
      tradeMap: {},
      quantHotKey: "",
      quantityButtons: [
        { name: "Buy", type: "blue lighten-1", id: 5, value: 150 },
        { name: "Cover", type: "green darken-1", id: 6, value: 250 },
        { name: "Sell", type: "red darken-4", id: 7, value: 550 },
        { name: "Short", type: "yellow darken-2", id: 8, value: 1500 },
        { name: "Buy", type: "blue lighten-1", id: 9, value: 2500 },
        { name: "Cover", type: "green darken-1", id: 10, value: 5500 },
        { name: "Sell", type: "red darken-4", id: 11, value: 50000 },
        { name: "Short", type: "yellow darken-2", id: 12, value: "" },
        { name: "Buy", type: "blue lighten-1", id: 13, value: "" },
        { name: "Cover", type: "green darken-1", id: 14, value: "" },
        { name: "Sell", type: "red darken-4", id: 15, value: "" },
        { name: "Short", type: "yellow darken-2", id: 16, value: "" }
      ],
      mainButtons: [
        { name: "Buy", type: "blue lighten-1", id: 1 },
        { name: "Cover", type: "green darken-1", id: 3 },
        { name: "Sell", type: "red darken-4", id: 2 },
        { name: "Short", type: "yellow darken-2", id: 4 }
      ],
      tradeActions: {
        send: "Send <F9>",
        clear: "Clear <Esc>"
      },
      symbolButtons: [
        {
          symbol: "AAPL",
          type: "info",
          bps: "0.00",
          quantity: 2,
          notional: 1,
          orderType: "LMT",
          price: 0,
          gtc: "no",
          isSwap: "yes",
          portfolio: "ASIA_FOCUS"
        },
        {
          symbol: "AAPL",
          type: "info",
          bps: "0.00",
          quantity: 2,
          notional: 1,
          orderType: "LMT",
          price: 0,
          gtc: "no",
          isSwap: "yes",
          portfolio: "ASIA_FOCUS"
        },
        {
          symbol: "INTC",
          type: "red",
          bps: "0.01",
          quantity: 2,
          notional: 1,
          orderType: "MKT",
          price: 0,
          gtc: "no",
          isSwap: "yes",
          portfolio: "ASIA_FOCUS"
        },
        // { symbol: 'INTC', type:'red', bps:'0.01', quantity:2, notional:1, orderType:'MKT', price:0, gtc:'no', isSwap:'yes', portfolio:'ASIA_FOCUS'},
        {
          symbol: "FB",
          type: "success",
          bps: "0.00",
          quantity: 9,
          notional: 1,
          orderType: "LMT",
          price: 0,
          gtc: "no",
          isSwap: "yes",
          portfolio: "ASIA_FOCUS"
        },
        {
          symbol: "GOOG",
          type: "warning",
          bps: "0.01",
          quantity: 150,
          notional: 1,
          orderType: "MKT",
          price: 0,
          gtc: "no",
          isSwap: "no",
          portfolio: "ASIA_FOCUS"
        },
        {
          symbol: "NXPI US EQUITY",
          type: "warning",
          bps: "0.00",
          quantity: 2,
          notional: 1,
          orderType: "MKT",
          price: 0,
          gtc: "no",
          isSwap: "yes",
          portfolio: "ASIA_FOCUS"
        },
        {
          symbol: "NXPI",
          type: "warning",
          bps: "0.00",
          quantity: 100,
          notional: 1,
          orderType: "MKT",
          price: 0,
          gtc: "no",
          isSwap: "yes",
          portfolio: "ASIA_FOCUS"
        },
        {
          symbol: "UL NA SWAP",
          type: "warning",
          bps: "0.01",
          quantity: 2,
          notional: 1,
          orderType: "LMT",
          price: 0,
          gtc: "no",
          isSwap: "no",
          portfolio: "ASIA_FOCUS"
        },
        {
          symbol: "UL NA SWAP",
          type: "warning",
          bps: "0.01",
          quantity: 2,
          notional: 1,
          orderType: "LMT",
          price: 0,
          gtc: "no",
          isSwap: "no",
          portfolio: "ASIA_FOCUS"
        },
        {
          symbol: "UL NA SWAP",
          type: "warning",
          bps: "0.01",
          quantity: 2,
          notional: 1,
          orderType: "LMT",
          price: 0,
          gtc: "no",
          isSwap: "no",
          portfolio: "ASIA_FOCUS"
        }
      ]
    };
  },
  computed: {},
  methods: {
    testBlotter(evt) {
      this.selectedBlotter = evt.target.innerText;
      if (this.selectedBlotter === "PM Blotter") {
        this.launchChildApp();
      } else if (this.selectedBlotter === "Desk Blotter") {
        this.launchDesk();
      }
      console.log("Select Blotter", evt, this.selectedBlotter);
    },
    launchDesk() {
      //TODO refactor to one open fin func
      this.initNewFinApp("deskblotter", "Desk Blotter").then(function(res) {
        console.log("child res");
      });
    },
    launchChildApp() {
      //TODO refactor to one open fin func
      this.initNewFinApp("pmblotter", "PM Blotter").then(function(res) {
        console.log("child res");
      });
    },
    tradeConfirmation() {
      this.tradeConfirmDialog = false;
      this.showTradeExecuted = true;
      this.resetTradeTicket();
      this.showTradeExecuted = false;
    },
    onHotKey(evt) {
      this.quantHotKey = evt.target.innerText;
    },
    onTradingAction(evt) {
      // console.log("Trading Info", this.tradeMap)
      // this.tradeMap['tradeType'] = ''
      this.tradeOptions["tradeType"] = evt.target.innerText;
    },
    onSymbolKey(evt) {
      let symbol = evt.target.innerText.toUpperCase();
      let symbolObj = _.find(this.symbolButtons, obj => obj.symbol === symbol);
      this.tradeMap = Object.assign(symbolObj);
    },
    formValidate() {},
    resetTradeTicket() {
      this.quantHotKey = "";
      this.tradeMap = Object.assign({});
      this.tradeOptions = { tradeType: null };
    },
    initNewFinApp(path, name) {
      this.selectLoading = true;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fin.desktop.main(function() {
            new fin.desktop.Window({
              backgroundColor: "#fff",
              alwaysOnTop: true,
              autoShow: true,
              defaultCentered: false,
              defaultWidth: 1130,
              defaultHeight: 300,
              maxWidth: 1130,
              maxHeight: 300,
              url: window.location.origin + "/" + path,
              name: name
            });
          });
          resolve();
        }, 500);
      });
    },
    launchAllocationRatio() {
      //TODO refactor to one open fin func
      console.log("Launch Ratio");
      this.initNewFinApp("allocationratio", "Allocation based on Ratio").then(
        function(res) {
          console.log("child res", res);
        }
      );
    }
  },
  created() {
    fin.desktop.InterApplicationBus.subscribe(
      "main-dash",
      "trade ticket row",
      (message, uuid, name) => {
        console.log("Trade Loaded", message, uuid, name);
      }
    );
    // console.log("Fin", fin.desktop)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.trade-ticket-container {
  padding: 0px;
}
/* .trading-action-btns
    margin-right -7px
    min-width 45px
    max-width 45px
    font-size 10px
    color black
    border 1px solid #ccc !important
    height 25px */
</style>
