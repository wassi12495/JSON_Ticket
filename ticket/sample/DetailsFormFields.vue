<template>
  <v-card-text class="trade-ticket-form">
    <v-form ref="tradeData">
      <v-text-field
        label="Symbol"
        class="ticket-form-fields test-style"
        v-model="tradeData['symbol']"
        content-class="smaller-textarea"
        style="width:12%;"
      ></v-text-field>
      <v-text-field
        label="Bps"
        class="ticket-form-fields"
        v-model="tradeData['bps']"
        style="width:5%"
      ></v-text-field>
      <v-text-field
        label="TGT Bps"
        class="ticket-form-fields"
        v-model="tradeOpts['targetBps']"
        style="width:8%"
      ></v-text-field>
      <v-text-field
        label="Quantity"
        class="ticket-form-fields"
        v-model="quantityData"
        style="width:9%"
      ></v-text-field>
      <v-text-field
        label="Notional"
        class="ticket-form-fields"
        v-model="tradeData['notional']"
        style="width:10%"
      ></v-text-field>
      <v-select
        :items="orderTypeItems"
        v-model="tradeData['orderType']"
        item-value="text"
        label="Order Type"
        class="ticket-form-fields"
        style="width:13%"
        outline
      ></v-select>
      <v-text-field
        v-model="tradeData['price']"
        label="Price"
        class="ticket-form-fields"
        style="width:6%"
      ></v-text-field>
      <v-select
        :items="subStrategy1Items"
        v-model="tradeOpts['strategy1']"
        label="Strategy 1"
        item-value="text"
        class="ticket-form-fields"
        style="width:12%"
      ></v-select>
      <v-select
        :items="subStrategy2Items"
        v-model="tradeOpts['strategy2']"
        item-value="text"
        label="Strategy 2"
        class="ticket-form-fields"
        style="width:12%"
      ></v-select>
      <v-text-field
        label="Instructions"
        class="ticket-form-fields"
        v-model="tradeOpts['instructions']"
        style="width:12%"
      ></v-text-field>
      <v-select
        :items="gtcItems"
        v-model="tradeData['gtc']"
        item-value="text"
        label="GTC"
        class="ticket-form-fields"
        style="width:10%;"
      ></v-select>
      <v-select
        :items="isSwapItems"
        v-model="tradeData['isSwap']"
        item-value="text"
        label="Is Swap"
        class="ticket-form-fields"
        style="width: 10%; display: inline-block; margin-right: 20px;"
      ></v-select>
      <v-select
        :items="tradeTypeItems"
        v-model="tradeOpts['type']"
        item-value="text"
        label="Trade Type"
        class="ticket-form-fields"
        style="width: 15%; display: inline-block; margin-right: 20px;"
      ></v-select>
      <v-select
        :items="mgmtCompanyItems"
        v-model="tradeOpts['portfolio']"
        item-value="text"
        label="Portfolio"
        class="ticket-form-fields"
        style="width: 15%; display: inline-block; margin-right: 20px;"
      ></v-select>
      <v-select
        :items="uniqueStrategyItems"
        v-model="tradeOpts['uniqueStrategy']"
        item-value="text"
        label=""
        class="ticket-form-fields"
        style="width: 15%; display: inline-block; margin-right: 20px;"
      ></v-select>
    </v-form>
  </v-card-text>
</template>

<script>

export default {
  props:['quantityData', 'tradeData', 'tradeOpts'],
  data () {
    return {
      orderTypeItems: [
        { text: 'LMT' },
        { text: 'MKT' }
      ],
      subStrategy1Items: [
        { text: 'sub A' },
        { text: 'sub B' }
      ],
      subStrategy2Items: [
        { text: 'sub C' },
        { text: 'sub D' }
      ],
      gtcItems: [
        { text: 'no' },
        { text: 'yes' }
      ],
      isSwapItems: [
        { text: 'no' },
        { text: 'yes' }
      ],
      tradeTypeItems: [
        { text: 'BUY' },
        { text: 'COVER' },
        { text: 'SELL' },
        { text: 'SHORT' },
      ],
      mgmtCompanyItems: [
        { text: 'ASIA_FOCUS' }
      ],
      uniqueStrategyItems: [
        { text: 'LP Fund' },
        { text: 'LP Fixed' }
      ]
    }
  }
}
</script>

<style >
  .trade-ticket-form{
    padding:0;
  }
  .ticket-form-fields{
    width:20%;
    display:inline-block;
    margin-right:5px;
  }

</style>
