<template>
  <div class="container">
    <form action @submit="handleSubmit($event)">
      <div class="row">
        <div class="form-group col">
          <label for="first">Symbol: </label>   
          <input type="text" class="form-control" placeholder="Symbol" v-model="symbol" required>
        </div>
        <div class="form-group col">
          <label for="last">bps: </label>
          <input type="text" class="form-control" placeholder="bps" v-model="bps" required>
        </div>
        <div class="form-group col">
          <label for="tgtBps">tgtBps: </label>   
          <input type="text" v-model="tgtBps"/>

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

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";

export default {
  // @State("formSchema") formSchema: any;
  name: "ticketForm",
  data() {
    return {
      symbol: null,
      bps: null,
      tgtBps: null,
      quantity: null,
      notional: null,
      orderType: null,
      price: null,
      strat1: null,
      strat2: null,
      type: null,
      portfolio: null,
      isSwap: null
    };
  },
  computed: {
    ...mapState(["formSchema"])
  },
  methods: {
    ...mapActions(["submitForm"]),
    handleSubmit(e) {
      e.preventDefault();
      console.log(e);
      console.log("Symbol", this.symbol);
      console.log("bps", this.bps);
      const ticketData = {
        symbol: this.symbol,
        bps: this.bps,
        tgtBps: this.tgtBps,
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

  // @Watch("symbol")
  // onSymbolChange() {
  //   console.log(this.symbol);
  // }
};
</script>

<style>
</style>
