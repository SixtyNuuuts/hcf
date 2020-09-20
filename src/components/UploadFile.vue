<template>
  <div>
      <input type="file" @change="onUpload"><progress id="progress" :value="uploadValue" max="100" ></progress>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
  name: 'Upload',
  data(){
	return{
      imageData: null,
      picture: null,
      uploadValue: 0
	}
  },
  methods:{
    onUpload(){
        this.uploadValue = 0;  
        this.picture = null;
        this.imageData = event.target.files[0];
        const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{ this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture = url;
            this.$emit('uploadFilePath', this.picture)
            });
        }
        );
    }
  }
}
</script>

<style scoped lang="scss">

  div {

    margin: 1em 0 !important;

    input {
        width: 100%;
    }

    progress {
        height: 12px;
        width: 100%;
        margin-top: -0.2em;
    }

  }

</style>
