<script lang="ts">
import { from } from "fromfrom";
import { loadTileState, storeTileState as persistTileState } from "../../lib/localStorage";
import { StocksByTicker, StockTickerData } from "./StockQuotesTile.types";
import ModalDialog from "../ModalDialog/ModalDialog.vue";
import { fetchTickerData } from "./StockQuoteApi";
import IconRefresh from "~icons/mdi/refresh";
import IconAdd from "~icons/mdi/plus-thick";
import IconButton from "../IconButton/IconButton.vue";
import { defineComponent } from "vue";

const TILE_ID = "STOCK_QUOTE";

export default defineComponent({
  components: {
    ModalDialog,
    IconRefresh,
    IconAdd,
    IconButton,
  },

  data() {
    return {
      stocksByTicker: {} as StocksByTicker,
      showModal: false,
      stockTickerToAdd: "",
    };
  },

  computed: {
    stocks(): {
      ticker: string;
      data: StockTickerData | undefined;
    }[] {
      return from(this.stocksByTicker)
        .map(([ticker, stockData]) => {
          return {
            ticker,
            data: stockData,
          };
        })
        .toArray();
    },
  },

  methods: {
    promptNewTicker() {
      this.showModal = true;
      this.stockTickerToAdd = "";
    },

    async addStockTicker() {
      const tickerToAdd = this.stockTickerToAdd;
      if (this.stocksByTicker[tickerToAdd]) {
        this.showModal = false;
        return;
      }

      const [err, ticker] = await fetchTickerData([tickerToAdd]);
      if (err) throw err;
      if (ticker) {
        this.stocksByTicker[tickerToAdd] = ticker[0];
        persistTileState(TILE_ID, this.stocksByTicker);
        this.showModal = false;
      }
    },

    async refreshAll() {
      const tickersToRefresh = Object.keys(this.stocksByTicker);
      const [err, tickers] = await fetchTickerData(tickersToRefresh);
      if (err) throw err;
      if (tickers) {
        this.stocksByTicker = from(tickers).toObject((x) => x.ticker);
        persistTileState(TILE_ID, this.stocksByTicker);
        this.showModal = false;
      }
    },
  },

  mounted() {
    const loadedState = loadTileState<StocksByTicker>(TILE_ID);
    if (loadedState) this.stocksByTicker = loadedState;
  },
});
</script>

<template>
  <div class="rounded-md bg-gray-900 p-4">
    <div class="flex justify-end mb-2 text-gray-300 space-x-2">
      <IconButton label="Add" v-on:click="promptNewTicker">
        <IconAdd />
      </IconButton>

      <IconButton label="Refresh" v-on:click="refreshAll"><IconRefresh /></IconButton>
    </div>

    <div class="grid grid-cols-4 gap-x-2 justify-items-end">
      <!-- Headers -->
      <div class="text-xs text-gray-300 place-self-start">Stock</div>
      <div class="text-xs text-gray-300">Latest</div>
      <div class="text-xs text-gray-300">Today %</div>
      <div class="text-xs text-gray-300">Today +/-</div>

      <div class="col-span-4 border-t border-t-gray-700 w-full my-1" />

      <p class="col-span-4 place-self-start" v-if="stocks.length === 0">Add some stock from +</p>
      <template v-else v-bind:key="item.ticker" v-for="item in stocks" :item="item">
        <div class="text-sm text-white font-semibold place-self-start">{{ item.ticker }}</div>
        <div class="text-sm text-white font-semibold">{{ item.data?.currentPrice }}</div>
        <div
          class="text-sm"
          :class="item.data && item.data.percentChange < 0 ? 'text-red-400' : 'text-green-400'"
        >
          {{ item.data ? Math.round(item.data.percentChange * 100) / 100 : "" }}%
        </div>
        <div
          class="text-sm"
          :class="item.data && item.data.change < 0 ? 'text-red-400' : 'text-green-400'"
        >
          {{ item.data?.change }}
        </div>
      </template>
    </div>

    <ModalDialog :show="showModal" @close="showModal = false">
      <div class="flex flex-col text-black space-y-4">
        <p class="">Add stock symbol:</p>
        <label for="">
          Ticker:
          <input type="text" class="bg-white border border-gray-400" v-model="stockTickerToAdd" />
        </label>
        <button type="button" class="rounded-lg bg-blue-500 p-4" @click="addStockTicker">
          Add
        </button>
      </div>
    </ModalDialog>
  </div>
</template>

<style scoped></style>
