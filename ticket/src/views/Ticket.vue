<template>
  <div>

    <h1>Ticket</h1>
    <button @click="onClick">click this</button>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";

import TicketForm from "../components/ticketForm.vue";
@Component({})
export default class Ticket extends Vue {
  @Action("getSchema") getSchema: any;
  @State("formSchema") formSchema: any;
  @State("miscAsync") miscAsync: any;

  onClick(e: any) {
    this.getSchema();
  }
  @Watch("miscAsync")
  onFormSchemaChange() {
    console.log(this.formSchema);
  }
}
</script>

<style>
</style>
