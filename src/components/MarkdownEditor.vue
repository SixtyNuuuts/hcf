<template>
    <div class="container">
        <markdown-editor v-model="value"></markdown-editor>
        <button @click="send">VALIDER</button>
        <div v-html="values[0].message"></div>
    </div>
</template>


<script>
    export default {
        created() {
            this.fetchValues();
        },
        data() {
            return {
                value: 'Hello world!',
                values: []
            }

        },
        methods:{
            send() {
                this.$db.collection('chat').add({
                    message:this.value
                })
            },
            fetchValues() {
                this.$db.collection('chat').get().then((qs) => {
                    let AllValues = []
                    qs.forEach(doc => {
                        AllValues.push(doc.data())
                    })

                    this.values = AllValues;
                })
            }
        }
    }
</script>
