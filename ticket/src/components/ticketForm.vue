<template>
  <div>
    <form action @submit="handleSubmit($event)">
      <div class="row">
        <div class="form-group col">
          <label for="Symbol">Symbol</label>
          <v-text-field type="text" v-model="symbol"/>
          <label for="BPS">BPS</label>
          <v-text-field type="text" v-model="bps"/>
          <label for="tgtBps">tgtBps</label>
          <v-text-field type="text" v-model="tgtBps"/>
          <label for="quantity">quantity</label>
          <v-text-field type="text" v-model="quantity"/>
          <label for="notional">notional</label>
          <v-text-field type="text" v-model="notional"/>
          <label for="orderType">orderType</label>
          <v-text-field type="text" v-model="orderType"/>
        </div>
        <div class="row">
          <label for="price">price</label>
          <input type="text" v-model="price">
          <label for="strat1">strat1</label>
          <input type="text" v-model="strat1">
          <label for="strat2">strat2</label>
          <input type="text" v-model="strat2">
          <label for="type">type</label>
          <input type="text" v-model="type">
          <label for="portfolio">portfolio</label>
          <input type="text" v-model="portfolio">
          <label for="isSwap">isSwap</label>
          <input type="text" v-model="isSwap">
          
        </div>
       <input class="btn btn-primary" type="submit">

      </div>
    </form>
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";

@Component({})
export default class TicketForm extends Vue {
  @State("formSchema") formSchema: any;

  private symbol: any = null;
  private bps: any = null;
  private tgtBps: any = null;
  private quantity: any = null;
  private notional: any = null;
  private orderType: any = null;
  private price: any = null;
  private strat1: any = null;
  private strat2: any = null;
  private type: any = null;
  private portfolio: any = null;
  private isSwap: any = null;

  handleSubmit = (e: any) => {
    console.log(e);
  };
  @Watch("symbol")
  onSymbolChange() {
    console.log(this.symbol);
  }
}
</script>

<style>
</style>
