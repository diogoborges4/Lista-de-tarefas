const API_KEY = 'd8e76042188276afbadb58fb6dd081f1'
const API_BASE = 'https://api.themoviedb.org/3'

const basicFetch = async (endpoint) =>{
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()
    return json
}

export default {
    getHomeList: async () =>{
        return[

            {
                slug: 'trending',
                title: 'recomendados para voce',
                items: await basicFetch(`/trending/tv/week?language= pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'top rated',
                title: 'series em alta',
                items: await basicFetch(`/tv/top_rated?language= pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language= pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language= pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language= pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language= pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Documentary',
                title: 'Documentarios',
                items: await basicFetch(`/discover/movie?with_genres=99&language= pt-BR&api_key=${API_KEY}`)
            },
        ]
    },
    getMoiveInfo: async (movieId, type) =>{
        let info ={}

        if(movieId){
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR &api_key=${API_KEY}`)
                    break;

                case 'tv':                  
                     info = await basicFetch(`/tv/${movieId}?language=pt-BR &api_key=${API_KEY}`)
                    break;
            }
        }
        return info
    }
}