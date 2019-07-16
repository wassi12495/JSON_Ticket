<template>
  <div>
    <p id="error1">
      {{this.errors}}
    </p>
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Watch, Prop } from "vue-property-decorator";

@Component({})
export default class TicketErrors extends Vue {
  @Prop() errors: string;
  created() {
    console.log("Errors message", this.errors);
  }
}
</script>

<style>
</style>
