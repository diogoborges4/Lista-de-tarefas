import React, {useEffect, useState} from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import App from "./App.css"
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";


export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{
  const loadAll = async() =>{
    let list = await Tmdb.getHomeList()
    setMovieList(list)

    let originals = list.filter(i=>i.slug === 'trending')
    let ramdom = Math.floor(Math.random() * (originals[0].items.results.length -1))
    let chosen = originals[0].items.results[ramdom]
    let chosenInfo = await Tmdb.getMoiveInfo(chosen.id, 'tv')

    setFeaturedData(chosenInfo)
  }

  loadAll()
}, [])

useEffect(() =>{
  const scrollListener = () => {
   if(window.scrollY > 10) {
     setBlackHeader(true)
   } else{
     setBlackHeader(false)
   }
   
  }
  window.addEventListener('scroll', scrollListener)
  return () =>{
   window.removeEventListener('scroll', scrollListener)
  }
 
 }, [])

  return (
    <div className="page">

      <Header black={blackHeader}/>

    {featuredData &&
    <FeatureMovie item= {featuredData}/>

    }

      <section className="lists">
        {movieList.map((item, key) =>(
            <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      {movieList.length <= 0 &&

      <div className="loading">
<img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif'></img>
</div>
}



    </div>
  )
}



