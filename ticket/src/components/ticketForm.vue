<template>
  <div class="container">
    <form action @submit="handleSubmit($event)">
      <div class="form-group row">
        <div class="">
          <label class="col-sm-2 col-form-label" for="first">Symbol: </label>   
          <input type="text" class="form-control-plaintext col-sm-10" id="symbol" placeholder="Symbol" v-model="symbol" required>
        </div>
      </div>
      <div class="row">
        <div class="form-group col">
          <label for="last">bps: </label>
          <input type="number" class="form-control" id="bps" placeholder="bps" v-model.number="bps" required>
        </div>
        <div class="form-group col">
          <label for="tgtBps">tgtBps: </label>   
          <input type="number" class="form-control" id="tgtBps" placeholder="tgtBps" v-model.number="targetBps"/>

        </div>
        <div class="form-group col">
          <label for="quantity">quantity: </label>  
          <input type="number" class="form-control" id="quantity" placeholder="0" v-model.number="quantity"/>

        </div>
        <div class="form-group col">
          <label for="notional">notional: </label>
          <input type="number" class="form-control" id="notional" placeholder="notional" v-model.number="notional"/>

        </div>
        <div class="form-group col">
          <label for="price">Price: </label>
          <input type="number" class="form-control" placeholder="$" v-model.number="price">

        </div>
      </div>
      <div class="row">
        <div class="form-group col">
          <label for="orderType">Order Type</label>
          <select  class="form-control" v-model="orderType" required>
            <option selected disabled value="" >Please select one</option>
            <option v-for="option in orderTypeOptions" v-bind:value="option" v-bind:key="option.index">{{option}}</option>
          </select>
        </div>
               
        <div class="form-group col">
          <label for="strat1">Strategy 1</label>
          <select class="form-control" v-model="strat1" >
            <option selected disabled value="">Please select one</option>
            <option v-for="option in strategy_1_Options" v-bind:value="option" v-bind:key="option.index">{{option}}</option>
          </select>

        </div>
        <div class="form-group col">
          <label for="strat2">Strategy 2</label>
          <select class="form-control" v-model="strat2" >
            <option selected disabled value="">Please select one</option>
            <option v-for="option in strategy_2_Options" v-bind:value="option" v-bind:key="option.index">{{option}}</option>
          </select>
        </div>
        <div class="form-group col">
          <label for="tradeType">Trade Type</label>
          <select required class="form-control" v-model="tradeType" >
            <option selected disabled value="">Please select one</option>
            <option v-for="option in tradeTypeOptions" v-bind:value="option" v-bind:key="option.index">{{option}}</option>
          </select>
        </div>
      </div> 
      <div class="row">         
        <div class="form-group col-sm-4">
          <label for="portfolio"> Portfolio </label>
          <input class="form-control" type="text" v-model="portfolio">
        </div>
        <div class="form-group col-sm-4">
          <label for="isSwap"> Is this trade a Swap?:  </label>
          <br>
          <div class="form-check">
           <input class="form-check-input" type="radio" id="isSwap-true" v-model="isSwap" value="true">
           <label for="isSwap-true">Yes</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="isSwap-false" v-model="isSwap" value="false">
            <label for="isSwap-false">No</label>
          </div>
        </div> 
                 
      </div>
        <div>

       <input class="btn btn-primary" type="submit">
        </div>

    </form>
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";

@Component({})
export default class ticketForm extends Vue {
  @State("formSchema") formSchema: any;
  @Action("getSchema") getSchema: any;
  @Action("submitForm") submitForm: any;

  schema: any;
  orderTypeOptions: any = [];
  strategy_1_Options: any = [];
  strategy_2_Options: any = [];
  tradeTypeOptions: any = [];
  ticketData: any = {};

  symbol: string = null;
  bps: number = null;
  targetBps: number = null;
  quantity: number = null;
  notional: number = null;
  orderType: string = "";
  price: number = null;
  strat1: string = "";
  strat2: string = "";
  tradeType: string = "";
  portfolio: string = null;
  isSwap: boolean = false;

  created() {
    this.schema = this.formSchema.properties;
    console.log("created ticket form", this.schema);
    let properties = Object.entries(this.schema);
    console.log(this.schema.orderType.enum);
    this.orderTypeOptions = this.schema.orderType.enum;
    this.strategy_1_Options = this.schema.strategy1.enum;
    this.strategy_2_Options = this.schema.strategy2.enum;
    this.tradeTypeOptions = this.schema.tradeType.enum;
  }

  validateInitVariableType(expectation: any, reality: any) {
    console.log("Expectation", expectation);
    console.log("Reality", reality);
  }

  validateBeforeSubmit() {
    let properties = Object.entries(this.schema);
    for (const [key, value] of properties) {
      console.log(key);
      debugger;
      // console.log(this.$data.);
    }
  }
  @Watch("formSchema")
  onFormSchema() {
    console.log("Form Schema recieved", this.formSchema);
  }
  @Watch("symbol")
  handleSymbolChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["symbol"] = e;
  }
  @Watch("bps")
  handleBpsChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["bps"] = e;
  }
  @Watch("targetBps")
  handleTgtBpsChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["targetBps"] = e;
  }
  @Watch("quantity")
  handleQuantityChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["quantity"] = e;
  }
  @Watch("notional")
  handleNotionalChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["notional"] = e;
  }
  @Watch("price")
  handlePriceChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["price"] = e;
  }
  @Watch("orderType")
  handleOrderTypeChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["orderType"] = e;
  }
  @Watch("strat1")
  handleStrategy1Change(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["strategy1"] = e;
  }
  @Watch("strat2")
  handleStrategy2Change(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["strategy2"] = e;
  }
  @Watch("tradeType")
  handleTradeTypeChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["tradeType"] = e;
  }
  @Watch("portfolio")
  handlePortfolioChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["portfolio"] = e;
  }
  @Watch("isSwap")
  handleIsSwapChange(e: any) {
    console.log("Handle change", typeof e);
    this.ticketData["isSwap"] = e;
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log(e);
    console.log("Symbol", this.symbol);
    console.log("bps", this.bps);
    this.ticketData["isSwap"] = this.isSwap;
    // const ticketData = {
    //   symbol: this.symbol,
    //   bps: this.bps,
    //   targetBps: this.targetBps,
    //   quantity: this.quantity,
    //   notional: this.notional,
    //   orderType: this.orderType,
    //   price: this.price,
    //   strat1: this.strat1,
    //   strat2: this.strat2,
    //   type: this.type,
    //   portfolio: this.portfolio,
    //   isSwap: this.isSwap
    // };
    console.log("ticket data", this.ticketData);
    debugger;
    this.submitForm(this.ticketData);
  }
}
</script>

<style>
</style>
