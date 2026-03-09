<template>
  <div class="markdown-body" v-html="rendered"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

const rendered = computed(() => {
  return marked(props.content || '')
})
</script>

<style>
.markdown-body h1 { font-size: 1.75rem; font-weight: 700; margin: 1.5rem 0 0.75rem; }
.markdown-body h2 { font-size: 1.4rem; font-weight: 600; margin: 1.25rem 0 0.625rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.375rem; }
.markdown-body h3 { font-size: 1.15rem; font-weight: 600; margin: 1rem 0 0.5rem; }
.markdown-body p { margin-bottom: 0.75rem; }
.markdown-body ul, .markdown-body ol { margin: 0.5rem 0 0.75rem 1.5rem; }
.markdown-body li { margin-bottom: 0.25rem; }
.markdown-body code {
  background: var(--color-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.85em;
}
.markdown-body pre {
  background: var(--color-bg);
  border-radius: var(--radius-sm);
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1rem;
  position: relative;
  border: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
}
.markdown-body pre::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
}
.markdown-body pre code {
  background: none;
  padding: 0;
}
.markdown-body blockquote {
  border-left: 3px solid transparent;
  border-image: var(--gradient-primary) 1;
  padding-left: 1rem;
  color: var(--color-text-muted);
  margin: 0.75rem 0;
}
.markdown-body img {
  max-width: 100%;
  border-radius: var(--radius-sm);
  margin: 0.75rem 0;
}
.markdown-body a {
  color: var(--color-secondary);
  text-decoration: none;
  background-image: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  background-size: 0% 2px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size var(--transition);
}
.markdown-body a:hover {
  background-size: 100% 2px;
  text-decoration: none;
}
.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 0.75rem 0;
}
.markdown-body th, .markdown-body td {
  border: 1px solid var(--color-border);
  padding: 0.5rem 0.75rem;
  text-align: left;
}
.markdown-body th { background: var(--color-bg); font-weight: 600; }
</style>
