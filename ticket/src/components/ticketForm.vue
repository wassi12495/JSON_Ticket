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
          <input type="number" class="form-control" id="bps" placeholder="bps" v-model="bps" required>
        </div>
        <div class="form-group col">
          <label for="tgtBps">tgtBps: </label>   
          <input type="number" class="form-control" id="tgtBps" placeholder="tgtBps" v-model="targetBps"/>

        </div>
        <div class="form-group col">
          <label for="quantity">quantity: </label>  
          <input type="number" class="form-control" id="quantity" placeholder="0" v-model="quantity"/>

        </div>
        <div class="form-group col">
          <label for="notional">notional: </label>
          <input type="number" class="form-control" id="notional" placeholder="notional" v-model="notional"/>

        </div>
        <div class="form-group col">
          <label for="price">Price: </label>
          <input type="number" class="form-control" placeholder="$" v-model="price">

        </div>
      </div>
      <div class="row">
        <div class="form-group">
          <label for="orderType">orderType</label>
          <select class="form-control" v-model="orderType" required>
            <option disabled value="null">Please select one</option>
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
          <label for="type">Trade Type</label>
          <select class="form-control" v-model="type" >
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
          <label for="isSwap"> isSwap </label>
          <input class="form-control" type="text" v-model="isSwap">
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
  private schema: any;
  private orderTypeOptions: any = [];
  private strategy_1_Options: any = [];
  private strategy_2_Options: any = [];
  private tradeTypeOptions: any = [];

  created() {
    this.schema = this.formSchema.properties;
    console.log("created ticket form", this.schema);
    let properties = Object.entries(this.schema);
    console.log(this.schema.orderType.enum);
    this.orderTypeOptions = this.schema.orderType.enum;
    this.strategy_1_Options = this.schema.strategy1.enum;
    this.strategy_2_Options = this.schema.strategy2.enum;
    this.tradeTypeOptions = this.schema.tradeType.enum;

    // for (const [key, value] of properties) {
    //   console.log(key);
    //   debugger;
    //   // console.log(this.$data.);

    //   this.validateInitVariableType(value.type);
    //   debugger;
    // }

    // debugger;
  }
  // mounted(){
  //   let properties = Object.entries(this.schema);
  //   for (const [key, value] of properties) {
  //     console.log(key);
  //     let formInputForKey = document.getElementById(`${key}`)
  //     debugger;
  //     // console.log(this.$data.);

  //     this.validateInitVariableType(value.type, formInputForKey.);
  //     debugger;
  //   }

  //   debugger;
  // }

  private symbol: any = null;
  private bps: any = null;
  private targetBps: any = null;
  private quantity: any = null;
  private notional: any = null;
  private orderType: any = null;
  private price: any = null;
  private strat1: any = null;
  private strat2: any = null;
  private type: any = null;
  private portfolio: any = null;
  private isSwap: any = null;

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

  handleSubmit(e: any) {
    e.preventDefault();
    console.log(e);
    console.log("Symbol", this.symbol);
    console.log("bps", this.bps);

    debugger;
    const ticketData = {
      symbol: this.symbol,
      bps: this.bps,
      targetBps: this.targetBps,
      quantity: this.quantity,
      notional: this.notional,
      orderType: this.orderType,
      price: this.price,
      strat1: this.strat1,
      strat2: this.strat2,
      type: this.type,
      portfolio: this.portfolio,
      isSwap: this.isSwap
    };
    console.log("ticket data", ticketData);
    this.submitForm(ticketData);
  }
}
</script>

<style>
</style>
