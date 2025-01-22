<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import data, { calculatorTypes, type CalculatorType } from '@/vesmos/data.ts'

import { loadScript } from 'vue-plugin-load-script'
import type {
  Calculator,
  Constructor,
  DesmosAPI,
  GraphingCalculator,
} from '@/vesmos/desmos/desmos.d'

declare let Desmos: undefined | DesmosAPI

const desmosConstructorOptions = {
  expressions: false,
  pasteGraphLink: true,
  invertedColors: true,
  settingsMenu: false,
  zoomButtons: false,
}

const selectedGraph = ref(data[0])
const exportURL = ref('')
const desmosIsLoaded = ref(false)
const domRef = useTemplateRef<HTMLDivElement>('graphRef')

const calculator = computed<Calculator | GraphingCalculator | undefined>((prevValue) => {
  if (desmosIsLoaded.value && domRef.value && Desmos) {
    if (prevValue) prevValue.destroy()

    const constructorMap: Record<CalculatorType, Constructor<Calculator | GraphingCalculator>> = {
      [calculatorTypes.graph2d]: Desmos.Calculator,
      [calculatorTypes.graph3d]: Desmos.Calculator3D,
      [calculatorTypes.geometryGraph]: Desmos.Geometry,
      [calculatorTypes.fourFunction]: Desmos.FourFunctionCalculator,
      [calculatorTypes.scientific]: Desmos.ScientificCalculator,
    }
    const temp = constructorMap[selectedGraph.value.type](domRef.value, desmosConstructorOptions)
    temp.setState(selectedGraph.value.state)
    return temp
  }
  return undefined
})
watch(calculator, () => {}) // Needs to exist for vue to realize the DOM mutation from Desmos constructor


onMounted(() =>
  loadScript(
    'https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6',
  ).then(() => {
    desmosIsLoaded.value = true
    Desmos = Desmos as DesmosAPI
  }),
)


function saveGraph() {
  if (calculator.value) {
    const calculatorState = calculator.value.getState()
    const blob = new Blob([JSON.stringify(calculatorState)], {
      type: 'application/json',
    })

    console.log(selectedGraph.value)
    URL.revokeObjectURL(exportURL.value)
    exportURL.value = URL.createObjectURL(blob)
  }
}
</script>

<template>
  <select v-model="selectedGraph">
    <option v-for="(datum, index) in data" :value="datum" :key="index">{{ datum.name }}</option>
  </select>
  <a v-if="exportURL.length != 0" download type="application/json" :href="exportURL" target="_blank"
    >Download</a
  >
  <button @click="saveGraph">Save graph</button>
  <div ref="graphRef" class="calculator"></div>
</template>

<style scoped>
.calculator {
  max-height: 500px;
  height: 500px;
}
</style>
