<template>
  <div>
    <v-btn outline small
      color="blue-grey lighten-5"
      class="detail-group-items"
      v-for="button in buttonConfig"
      key="button.id"
      @click.stop.prevent="onSymbolUpdate">{{ button.symbol }}</v-btn>

    <span style="margin-left:15px;">
      <v-menu bottom offset-y>
        <v-icon slot="activator" dark color="grey darken-2">create</v-icon>
        <v-list>
          <v-list-tile v-for="(item, i) in blotters" @click.stop.prevent="selectBlotter($event)":key="i">
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn small icon dark @click.stop.prevent="closeTradeTicket">
        <v-icon>close</v-icon>
      </v-btn>
    </span>

  </div>
</template>

<script>
import UserSettingsDialog from '../UserSettings/UserSettingsDialog.vue';

export default {
  components: {
    'User-Settings-Dialog': UserSettingsDialog
  },
  props: ['buttonConfig', 'onSymbolUpdate', 'selectBlotter', 'tradeExecuted', 'closeTradeTicket', 'launchPM'],
  data () {
    return {
      blotters: [
        {
          name: 'PM Blotter'
        },
        {
          name: 'Desk Blotter'
        }
      ],
      selectedBlotter:''
    }
  }
}
</script>

<style>
  .detail-group-items{
    margin-right:-6px;
    font-size:11px;
  }
</style>
