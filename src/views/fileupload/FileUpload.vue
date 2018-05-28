<template>
  <div class="upload">
    <button>上传</button>
    <input type="file" multiple>
    upload
    <media></media>
  </div>
</template>
<script>
import media from "../../components/audio.vue"
export default {
  data() {
    return {
      
    }
  },
  components: {
    media
  }
}
</script>

