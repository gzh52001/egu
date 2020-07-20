import require from '@/utils/require'

function getGuessYouLike(id) {
    let url = `http://api.egu365.com/goods/list?sorts=hits+asc&pageNo=${id}`
    return require.get(url)
}

export default {
    getGuessYouLike
}