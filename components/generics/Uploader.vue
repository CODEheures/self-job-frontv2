<template>
  <div v-if="!image">
    <p>{{ $t('create.form.addImage')}}</p>
    <v-input>
      <input type="file" @change="onFileChange">
    </v-input>
  </div>
  <div v-else>
    <v-card-media
      :src="image"
      height="200px"
      contain
    ></v-card-media>
    <button @click.stop.prevent="removeImage">{{ $t('create.form.removeImage')}}</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        image: ''
      }
    },
    methods: {
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.image = e.target.result
        }
        reader.readAsDataURL(file)
      },
      removeImage () {
        this.image = ''
      }
    }
  }
</script>
