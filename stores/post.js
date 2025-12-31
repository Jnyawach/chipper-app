import { find, uniq, get } from 'lodash-es'


export const usePost = defineStore('post', () => {
    const { $api } = useNuxtApp()


    const started = ref(false)
    const posts=ref([])

    async function fetchPosts() {
        const payload = await $api.get('/posts')

        posts.value = payload.data

    }


    async function createPost(postData) {
        const payload = await $api.post('/posts', postData)
        await fetchPosts()

    }



    return {
       started,
         posts,
        createPost,
        fetchPosts
    }
})

