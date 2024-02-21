import { useState,useEffect } from "react"

function randomizeArray(list){
    return list.sort(()=>Math.random()-0.5)
}

function Cards(){
    const [cardList,setCardList]= useState([]);
    const [clickedCards,setClickedCards]=useState([])
    const [score,setScore]=useState(0)
    const [bestScore,setBestScore]=useState(0)
    const [loading,setLoading]=useState(true)
    async function fetchData(){
        const response = await fetch("https://api.thecatapi.com/v1/images/search?breed_ids=mcoo&limit=12&api_key=live_cO4dBGi9j4LszgTVXd0axFpWBysAibXZxVyPjaJzezOxJTAjh5vrB3XOS4ajM67Z");
        //const response = await fetch("https://api.capy.lol/v1/capybaras?take=12");
        const data = await response.json();
        data.forEach((e,i) => {
            e.index=i;
        });
        setCardList(data)
        setLoading(false)
    }
    function handleClick(e){
        const id=e.target
        let clickedCardsArray=[...clickedCards]
        let copiedScore=score
        if(!clickedCardsArray.includes(id)){
            clickedCardsArray=[...clickedCardsArray,id]
            copiedScore++
        }else{
            clickedCardsArray=[]
            copiedScore=0;
        }
        setClickedCards(clickedCardsArray)
        setScore(copiedScore)
        
    }
    useEffect(()=>{
        fetchData()
    },[])
    useEffect(()=>{
        let copiedBestScore=bestScore
        if(score>=bestScore){
            copiedBestScore=score
        }
        setBestScore(copiedBestScore)
        setCardList(randomizeArray(cardList))
    },[score])
    return (
    <>
    {loading && <div id="loading"><div id="loadingicon"></div></div>}
    <div id="cards">
        {
        cardList.map(card=>{
            return (<button className="cardbutton" key={card.index} onClick={(e)=>{handleClick(e)}}><img className="card" id={card.index} src={card.url}></img></button>)
        })
        }
    </div>
    <h2>Score: {score}</h2>
    <h2>Best score: {bestScore}</h2>
    </>
    )
}
export default Cards