<template>
  <div>

    <h1>Ticket</h1>
    <TicketErrors v-if="this.ticketErrors !== null" v-bind:errors="this.ticketErrors"/>
    <button @click="onClick">click this</button>
    <TicketForm v-if="this.formSchema"/>


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";

import TicketErrors from "../components/ticketErrors.vue";
import TicketForm from "../components/ticketForm.vue";

@Component({
  components: {
    TicketForm,
    TicketErrors
  }
})
export default class Ticket extends Vue {
  @Action("getSchema") getSchema: any;
  @Action("testSchema") testSchema: any;
  @State("formSchema") formSchema: any;
  @State("miscAsync") miscAsync: any;
  @State("ticketValid") ticketValid: any;
  @State("ticketErrors") ticketErrors: any;

  created() {
    this.getSchema();
  }
  onClick(e: any) {
    this.testSchema();
  }
  @Watch("miscAsync")
  onFormSchemaChange() {
    if (this.miscAsync === false) {
      console.log(this.formSchema);
    }
  }
  @Watch("ticketValid")
  handleTicketValidity() {
    console.log("Ticket Valid - ", this.ticketValid);
    console.log("Ticket Errors - ", this.ticketErrors);
    // debugger;
    if (this.ticketValid) {
      console.log("Ticket is valid, pushing to `/`.");
      this.$router.push("/");
    } else {
      console.log("The ticket was not valid", this.ticketErrors);
    }
  }
  @Watch("ticketErrors")
  handleTicketErrors() {
    if (this.ticketErrors !== null) {
      console.log("Handle Ticet Errors watcher", this.ticketErrors);
    }
  }
}
</script>

<style>
</style>
