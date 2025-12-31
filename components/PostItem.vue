<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'
const { showErrorModal } = useHelpers()
const props=defineProps({
  post: {
    type: Object,
    required: true
  }
})

const favoriteStore = useFavorite()
const saving = ref(false)
const user = useUser()
const followUser = async (userId,action) => {
  if(user.isGuest) {
    showErrorModal(new Error('You must be logged in to follow users'))
    return
  }
  saving.value = true
  try {
    if (action==='follow'){
      await  favoriteStore.favoriteUser(userId)
    }else {
      await  favoriteStore.unFavoriteUser(userId)
    }
  }catch (e) {
    showErrorModal(e)
  }
  saving.value = false
}


const hasFavorited = computed(() => {
  return (favoriteStore.favorites?.users || []).some(user => user.id === props.post.user.id)
})
</script>

<template>
  <div class="grid gap-3">
    <h4 class="font-bold text-lg">
      {{ post.title }}
    </h4>
    <div class="flex justify-between bg-gray-100 p-4 rounded-lg">
      <div>
        by <strong>{{ post.user.name }}</strong>
      </div>
      <button class="font-medium bg-blue-200 text-sm px-2 rounded-full"
              @click="followUser(post.user.id, hasFavorited ? 'unfollow' : 'follow')"
              :disabled="saving"
      >
        {{hasFavorited?'Unfollow':'Follow' }}
      </button>

    </div>
    <p>
      {{ post.body }}
    </p>
    <button class="bg-red-200 text-red-500 flex items-center justify-center gap-2 p-4 rounded-lg">
      <HeartIcon
        class="h-6 stroke-current" />
      <span class="font-bold">
        Add to my favorites
      </span>
    </button>
  </div>
</template>