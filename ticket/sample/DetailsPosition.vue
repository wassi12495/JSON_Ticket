<template>
  <v-layout row wrap style="margin-top:-20px;">
    <ul>
      <li v-for="detail in details" :key="detail.id" style="display:inline-block; margin-top:10px; margin-right:10px; padding-top:5px; font-size:12px; ">
        <div><span style="color:white;">{{ detail.name }}</span><br/>
          <span style="color:#1976D2;">{{ detail.value }}</span></div>
      </li>
    </ul>
    <span @click="launchAllocation" style="margin-top:20px; "><v-icon large>add_box</v-icon></span>
  </v-layout>
</template>

<script>

export default {
  props:['launchAllocation'],
  data () {
    return {
      details: [
        { name: 'Last', value: '10.60' },
        { name: 'Change', value: '-0.06' },
        { name: '% Chg', value: '-0.56' },
        { name: 'Volume', value: '25,036,440' },
        { name: 'ADV 200', value: '50,252,740' },
        { name: 'High', value: '10.80' },
        { name: 'Low', value: '20.42' },
        { name: 'VWAP', value: '0' },
        { name: 'Curr Bps', value: '84' },
        { name: 'Curr Pos', value: '500,000' },
        { name: 'Curr Exp', value: '$675,167' },
        { name: 'Cost Bas', value: '0.00' },
        { name: 'Borrow', value: '0' }
      ]
    }
  },
  method:{

  }
}
</script>

<style>
</style>
