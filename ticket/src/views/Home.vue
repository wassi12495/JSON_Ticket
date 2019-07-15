<template>
  <div>
    <h1>Home Page</h1>
    <div v-if="this.tickets">
      {{this.tickets}}
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

@Component
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
}
</script>

<style>
</style>
