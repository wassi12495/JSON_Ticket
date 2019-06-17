 <template>
  <v-container class="fluid grid-list-md blue-grey darken-4 trade-ticket-container">
    <v-dialog v-model="launchTicketDialog" max-width="1050px" persistent>
      <v-card class="blue-grey darken-4">
        <v-layout row wrap>
          <Details-Groups
            :buttonConfig="symbolItems"
            :onSymbolUpdate="getSymbolData"
            :selectBlotter="detailGroupSelect"
            :tradeExecuted="showTradeExecuted"
            :closeTradeTicket="tradeClosed"
            :blotterDialog="launchBlotter"/>
        </v-layout>

        <v-layout row wrap>
          <!-- break off into component -->
            <v-flex xs2 style="margin-top:10px">
              <!-- <v-card class="blue-grey darken-4"> -->
              <v-layout row wrap>
                <v-btn flat small
                  id="trade-ticket-actions"
                  :class="button.type" v-for="button in primaryButtons" @click.stop.prevent="onTradingAction"
                  :key="button.id" >{{ button.name }}</v-btn>
              </v-layout>

              <v-layout row wrap>
                <v-btn outline small
                  class="blue-grey lighten-2 trade-ticket-quantity-btn"
                  v-for="item in secondaryButtons"
                  @click.stop.prevent="onHotKey"
                  :key="item.id">{{ item.value }}</v-btn>
              </v-layout>
                <v-btn color="green darken-1 trade-confirmations" dark
                      @click.stop="tradeDialogConfirm">{{tradeActions.send}}</v-btn>
                <v-btn color="red darken-4 trade-confirmations" dark
                      @click="tradeDialogReset">{{tradeActions.clear}}</v-btn>

            </v-flex>
            <v-flex xs10>
                <Details-Form-Fields
                  :quantityData="quantHotKey"
                  :tradeData="tradeMap"
                  :tradeOpts="tradeOptions"/>
                <Details-Position
                  :launchAllocation="launchAllocationRatio"/>
            </v-flex>

            <v-dialog v-model="launchDeskBlotter" max-width="1200px" persistent>
              <!-- refactor blotters to one -->
              <desk-blotter
                :gridData="tradeSubmissionData"
                :closeDeskBlotter="deskBlotterClosed"
                :deskBlotterReady="onDeskBlotterGrid"
                :selectBlotterApp="onSelectBlotterApp"
              />
            </v-dialog>

            <!-- <v-dialog v-model="launchPMBlotter" max-width="1200px" persistent>
              <desk-blotter
                :gridData="tradeSubmissionData"
                :closeDeskBlotter="deskBlotterClosed"
                :deskBlotterReady="onDeskBlotterGrid"
                :selectBlotterApp="onSelectBlotterApp"
              />

            </v-dialog> -->

            <!-- break off into component -->
            <v-dialog v-model="confirmationModel" max-width="500px">
             <v-card style="background:#FFFFFF">
               <v-card-title>
                 <span style="color:black">Are you sure you want to buy {{ quantHotKey }} {{ tradeMap.symbol }} ?</span>
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
                 <v-btn color="primary" flat @click.stop.prevent="tradeDialogConfirm">Yes</v-btn>
                 <v-btn color="primary" flat @click.stop.prevent="tradeDialogConfirm">No</v-btn>
               </v-card-actions>
             </v-card>
           </v-dialog>
          </v-layout>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import DetailsPosition from './DetailsPosition.vue';
import DetailsFormFields from './DetailsFormFields.vue';
import DetailsGroups from './DetailsGroups.vue';
import UserSettingsDialog from '../UserSettings/UserSettingsDialog.vue';
import DeskBlotter from '../DeskBlotter/DeskBlotterDialog.vue';
import PMBlotter from '../PMBlotter/PMBlotterDialog.vue';
import _ from 'lodash';

export default {
  name: 'trade-ticket-dialog',
  props:['launchTicketDialog', 'tradeClosed', 'primaryButtons',
  'secondaryButtons', 'tradeDialogConfirm', 'tradeDialogReset', 'confirmationModel',
'quantHotKey', 'tradeMap', 'tradeOptions', 'onHotKey', 'onTradingAction', 'symbolItems', 'getSymbolData',
'getSelectedBlotter', 'launchDeskBlotter', 'tradeSubmissionData', 'deskBlotterClosed', 'onDeskBlotterGrid', 'onSelectBlotterApp',
'detailGroupSelect', 'launchPMBlotter', 'launchBlotter'],
  components: {
    'User-Settings-Dialog': UserSettingsDialog,
    'Details-Form-Fields': DetailsFormFields,
    'Details-Position': DetailsPosition,
    'Details-Groups': DetailsGroups,
    'desk-blotter': DeskBlotter,
    'pm-blotter': PMBlotter
  },
  data () {
    return {
      dialog2: false,
      dialog3: false,
      text:'left',
      showTradeExecuted:false,
      tradeConfirmDialog: false,
      tradeActions:{
         send:'Send <F9>',
         clear:'Clear <Esc>'
      }
    }
  },
  methods: {
    // testBlotter(evt){
    //   this.selectedBlotter = evt.target.innerText;
    //   if(this.selectedBlotter === 'PM Blotter'){
    //     // this.dialog2 = true;
    //     // this.launchChildApp()
    //   }else if(this.selectedBlotter === 'Desk Blotter'){
    //     this.launchDesk()
    //   }
    //   console.log("Select Blotter", evt, this.selectedBlotter);
    // },
    // onDeskBlotterGrid(params){
    //   this.gridApi = params.api;
    //   console.log("Desk Params___________", params, this.gridApi)
    // },
    // addTradeData(newTrade){
    //   this.gridApi.updateRowData({ add: [newTrade]})
    // },
    launchDesk(){
      //TODO refactor to one open fin func
      this.initNewFinApp("deskblotter", "Desk Blotter").then(function(res){
        console.log("child res")
      })
    },
    launchChildApp(){
      //TODO refactor to one open fin func
      this.initNewFinApp("pmblotter", "PM Blotter").then(function(res){
        console.log("child res")
      })
    },
    tradeConfirmation(){
      this.tradeConfirmDialog = false;
      this.showTradeExecuted = true;
      this.resetTradeTicket()
      this.showTradeExecuted = false;
    },
    // onHotKey(evt){
    //   this.quantHotKey = evt.target.innerText;
    // },
    // onTradingAction(evt){
    //   this.tradeOptions['tradeType'] = evt.target.innerText;
    // },
    // onSymbolKey(evt){
    //   let symbol = evt.target.innerText.toUpperCase();
    //   let symbolObj = _.find(this.symbolButtons, (obj) => obj.symbol === symbol);
    //   this.tradeMap = Object.assign(symbolObj);
    // },
    // resetTradeTicket(){
    //   this.quantHotKey = '';
    //   this.tradeMap = Object.assign({});
    //   this.tradeOptions = { tradeType:null };
    // },
    initNewFinApp(path, name){
      this.selectLoading = true;
      return new Promise((resolve, reject) =>{
         setTimeout(() => {
           fin.desktop.main(function(){
             new fin.desktop.Window({
                 backgroundColor:"#fff",
                 alwaysOnTop: true,
                 autoShow: true,
                 defaultCentered: false,
                 defaultWidth: 1130,
                 defaultHeight: 300,
                 maxWidth:1130,
                 maxHeight:300,
                 url: window.location.origin + '/' + path,
                 name:name
               })

             })
               resolve()
         }, 500)
      })

    },
    launchAllocationRatio(){
      //TODO refactor to one open fin func
      console.log("Launch Ratio")
      this.initNewFinApp("allocationratio", "Allocation based on Ratio").then(function(res){
        console.log("child res", res)
      })
    }
  },
  created(){
    // fin.desktop.InterApplicationBus.subscribe("main-dash", "trade ticket row", (message, uuid, name) =>{
    //   console.log("Trade Loaded", message, uuid, name)
    // })
    // console.log("Fin", fin.desktop)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .trade-ticket-container{
    padding:0px;
  }
  #trade-ticket-actions{
    margin-right:-7px;
    min-width:40px;
    max-width:40px;
    font-size:10px;
    color: black;
    border:1px solid #ccc !important;
    height:25px;
  }
  .trade-ticket-quantity-btn{
    margin-right:-7px;
    min-width:40px;
    max-width:40px;
    margin-top:-3px;
    font-size:12px;
  }
  .trade-confirmations{
    min-width:80px;
    max-width:80px;
    margin-right:-8px;
    width:30%;
    font-size:12px;
    color:black !important;
    border:1px solid #ccc !important;
    margin-top:-3px;
    height:25px;
  }
</style>
