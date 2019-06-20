<template>
  <div>
    <form action @submit="handleSubmit($event)">
      <div class="row">
        <div class="form-group col">
          <label for="Symbol">Symbol</label>
          <input type="text">
        </div>
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
}
</script>

<style>
</style>
