<template>
  <div class="appearance">
    <h2>Appearance</h2>
    <p class="text-muted mb-3">Choose a color scheme for your website.</p>

    <div class="schemes-grid">
      <div
        v-for="scheme in presets"
        :key="scheme.id"
        class="scheme-card"
        :class="{ active: selectedPreset === scheme.id }"
        @click="selectPreset(scheme)"
      >
        <div class="scheme-swatches">
          <div class="swatch" :style="{ background: scheme.primary }"></div>
          <div class="swatch" :style="{ background: scheme.secondary }"></div>
        </div>
        <div
          class="scheme-gradient"
          :style="{ background: `linear-gradient(135deg, ${scheme.primary}, ${scheme.secondary})` }"
        ></div>
        <div class="scheme-name">{{ scheme.name }}</div>
      </div>

      <div
        class="scheme-card"
        :class="{ active: selectedPreset === 'custom' }"
        @click="selectedPreset = 'custom'"
      >
        <div class="scheme-swatches">
          <label class="color-picker-wrapper">
            <input type="color" v-model="customPrimary" @input="onCustomChange" />
            <div class="swatch" :style="{ background: customPrimary }"></div>
          </label>
          <label class="color-picker-wrapper">
            <input type="color" v-model="customSecondary" @input="onCustomChange" />
            <div class="swatch" :style="{ background: customSecondary }"></div>
          </label>
        </div>
        <div
          class="scheme-gradient"
          :style="{ background: `linear-gradient(135deg, ${customPrimary}, ${customSecondary})` }"
        ></div>
        <div class="scheme-name">Custom</div>
      </div>
    </div>

    <div class="preview-section mt-3">
      <label class="mb-1" style="font-weight: 500">Live Preview</label>
      <div
        class="preview-bar"
        :style="{ background: `linear-gradient(135deg, ${activePrimary}, ${activeSecondary})` }"
      ></div>
    </div>

    <div class="mt-3">
      <button class="btn btn-gradient" :disabled="saving" @click="save">
        {{ saving ? 'Saving...' : 'Save' }}
      </button>
    </div>

    <div v-if="message" class="mt-2 alert" :class="success ? 'alert-success' : 'alert-error'">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { presets, applyColorScheme } from '@/config/colorSchemes'
import { adminApi, publicApi } from '@/api/client'

const selectedPreset = ref('emerald-blue')
const customPrimary = ref('#2e7d32')
const customSecondary = ref('#1565c0')
const saving = ref(false)
const message = ref('')
const success = ref(false)

const activePrimary = computed(() => {
  if (selectedPreset.value === 'custom') return customPrimary.value
  const p = presets.find((s) => s.id === selectedPreset.value)
  return p ? p.primary : customPrimary.value
})

const activeSecondary = computed(() => {
  if (selectedPreset.value === 'custom') return customSecondary.value
  const p = presets.find((s) => s.id === selectedPreset.value)
  return p ? p.secondary : customSecondary.value
})

function selectPreset(scheme: (typeof presets)[0]) {
  selectedPreset.value = scheme.id
  applyColorScheme(scheme.primary, scheme.secondary)
}

function onCustomChange() {
  selectedPreset.value = 'custom'
  applyColorScheme(customPrimary.value, customSecondary.value)
}

async function save() {
  saving.value = true
  message.value = ''
  try {
    await adminApi.updateColorScheme({
      preset: selectedPreset.value,
      primary: activePrimary.value,
      secondary: activeSecondary.value,
    })
    success.value = true
    message.value = 'Color scheme saved successfully.'
  } catch {
    success.value = false
    message.value = 'Failed to save color scheme.'
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  try {
    const res = await publicApi.getColorScheme()
    const data = res.data
    if (data && data.primary && data.secondary) {
      if (data.preset && data.preset !== 'custom' && presets.find((p) => p.id === data.preset)) {
        selectedPreset.value = data.preset
      } else {
        selectedPreset.value = 'custom'
        customPrimary.value = data.primary
        customSecondary.value = data.secondary
      }
    }
  } catch {
    // use defaults
  }
})
</script>

<style scoped>
.schemes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

.scheme-card {
  background: var(--color-bg-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1rem;
  cursor: pointer;
  transition: all var(--transition);
  text-align: center;
}

.scheme-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.scheme-card.active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-hover);
}

.scheme-swatches {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.swatch {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
}

.scheme-gradient {
  height: 6px;
  border-radius: 3px;
  margin-bottom: 0.75rem;
}

.scheme-name {
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--color-text);
}

.color-picker-wrapper {
  position: relative;
  cursor: pointer;
}

.color-picker-wrapper input[type='color'] {
  position: absolute;
  inset: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.preview-bar {
  height: 12px;
  border-radius: 6px;
  width: 100%;
}
</style>
