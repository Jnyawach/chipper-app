import { find, uniq, get } from 'lodash-es'


export const useFavorite = defineStore('favorite', () => {
    const { $api } = useNuxtApp()
    const favorites=ref([])


    async function fetchFavorites() {
        const payload = await $api.get('/favorites')
        favorites.value = payload.data

    }


    async function favoriteUser(userId) {
        const payload = await $api.post(`users/${userId}/favorite`)
        await fetchFavorites()

    }

    async function unFavoriteUser(userId) {
        const payload = await $api.delete(`users/${userId}/favorite`)
        await fetchFavorites()

    }



    return {
        favorites,
        favoriteUser,
        unFavoriteUser,
        fetchFavorites
    }
})

