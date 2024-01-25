<script>
import { ref, onMounted, onUpdated } from 'vue';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import TurndownService from 'turndown';
import TheWelcome from './components/TheWelcome.vue';
const transformer = new Transformer();

export default {
  name: 'App',
  setup() {
    const svgRef = ref();
    const value = ref('');
    const curURl = ref('')
    let mm;

    const getCurrentUrl = () => {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        curURl.value = url
      });
    }

    const getStorageKey = () => {
      const domain = curURl.value.match(/https:\/\/github\.com(\/.*)?/);
      if (domain && domain.length > 1) {
        const pathAfterDomain = domain[1];
        console.log(pathAfterDomain);
        return `article-${pathAfterDomain || ''}`
      } else {
        console.log("无法提取路径。111111");
        return ''
      }
    }

    const getStorageData = async () => {
      const artielEl = document.getElementsByTagName('article')?.[0];
      if (!!artielEl) {
        return artielEl;
      }

      const isPlugin = chrome?.storage?.local
      const k = getStorageKey()
      const cachedData = !isPlugin ? window.localStorage.getItem(k) : (await chrome.storage.local.get(k))?.[k];
      if (!!cachedData) return cachedData

      return '<div>no markdown found</div>';

    }
    const getMarkdown = async () => {
      const initValue = await getStorageData();
      var turndownService = new TurndownService();
      var markdown = turndownService.turndown(initValue);
      return markdown;
    };
    const update = async () => {
      const markdown = await getMarkdown();
      const { root } = transformer.transform(markdown);
      mm.setData(root);
      mm.fit();
    };
    onMounted(() => {
      mm = Markmap.create(svgRef.value);
      setTimeout(() => {
        update();
      }, 200)
    });
    onUpdated(update);
    getCurrentUrl()
    return {
      svgRef,
      value,
    };
  },
  components: { TheWelcome }
};
</script>

<template>
  <svg class="flex-1" ref="svgRef" style="width: 800px;height: 800px;" />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
