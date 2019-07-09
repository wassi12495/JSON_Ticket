<template>
  <div class="container">
    <form action @submit="handleSubmit($event)">
      <div class="row">
        <div class="form-group col">
          <label for="first">Symbol: </label>   
          <input type="text" class="form-control" id="symbol" placeholder="Symbol" v-model="symbol" required>
        </div>
        <div class="form-group col">
          <label for="last">bps: </label>
          <input type="text" class="form-control" id="bps" placeholder="bps" v-model="bps" required>
        </div>
        <div class="form-group col">
          <label for="tgtBps">tgtBps: </label>   
          <input type="text" class="form-control" placeholder="tgtBps" v-model="targetBps"/>

        </div>
        <div class="form-group col">
          <label for="quantity">quantity: </label>  
          <input type="text" v-model="quantity"/>

        </div>
        <div class="form-group col">
          <label for="notional">notional: </label>
          <input type="text" v-model="notional"/>

        </div>
        <div class="form-group col">

          <label for="orderType">orderType</label>
          <input type="text" v-model="orderType"/>
        </div>
        <div class="form-group col">
          <label for="price">price</label>
          <input type="text" v-model="price">

        </div>
        <div class="form-group col">
          <label for="strat1">strat1</label>
          <input type="text" v-model="strat1">

        </div>
        <div class="form-group col">
          <label for="strat2">strat2</label>
          <input type="text" v-model="strat2">

        </div>
        <div class="form-group col">

          <label for="type">type</label>
          <input type="text" v-model="type">
        </div>
        <div class="form-control col">
          <label for="portfolio">portfolio</label>
          <input type="text" v-model="portfolio">
        </div>          
        <div class="form-control col">
          <label for="isSwap">isSwap</label>
          <input type="text" v-model="isSwap">
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

  created() {
    this.schema = this.formSchema.properties;
    console.log("created ticket form", this.schema);
    // let properties = Object.entries(this.schema);
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
