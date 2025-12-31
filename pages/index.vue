<script setup>
definePageMeta({
  middleware: ['validate-session']
})

const { $api } = useNuxtApp()
const user = useUser()
const postStore=usePost()

postStore.fetchPosts()
const favoriteStore = useFavorite()
if(!user.isGuest) favoriteStore.fetchFavorites()

</script>

<template>
  <PostForm
    v-if="!user.isGuest" />
  <div class="grid gap-16">
    <PostItem
      v-for="post in postStore.posts"
      :key="post.id"
      v-bind="{ post }" />
  </div>
</template>
