<script setup>
const { showErrorModal } = useHelpers()

const postStore=usePost()
const saving=ref()
const form=reactive({
  title:'',
  body:'',
  image:null
})
const submit= async ()=> {
  saving.value=true
 try {
   if (!form.title || !form.body) {
     showErrorModal(new Error('Title and body are required'))
     return
   }
   const formData=new FormData()
    formData.append('title',form.title)
    formData.append('body',form.body)
    if (form.image){
      formData.append('image',form.image)
    }
   await postStore.createPost(formData)
   resetForm()
 }catch (e){
   showErrorModal(e)

 }
  saving.value=false
}

const resetForm=()=>{
  form.title=''
  form.body=''
  form.imag=null
}
</script>

<template>
  <form
    class="grid gap-4 mb-16"
    @submit.prevent="submit">
    <input
      placeholder="Post title"
      v-model="form.title"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base">
    <textarea
        v-model="form.body"
      placeholder="What is happening?!"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"></textarea>
    <input type="file" accept="image/*" @change="e => form.image = e.target.files[0]">
    <button class="bg-blue-600 text-white px-8 py-4 rounded-lg" :disabled="saving">
      <span>{{saving?'Saving..':'Post'}}</span>
    </button>
  </form>
</template>