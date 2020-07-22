import require from '@/utils/require'

function getcartlist(userid) {
    let url = `/cart//search/${userid}`
    return require.get(url)
}

export default {
    getcartlist
}