<template>
  <div>
    <p>Errors</p>
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";

@Component
export default class TicketErrors extends Vue {}
</script>

<style>
</style>
