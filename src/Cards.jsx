import { useState,useEffect } from "react"

function randomizeArray(list){
    return list.sort(()=>Math.random()-0.5)
}

function Cards(){
    const [cardList,setCardList]= useState([1,2,3,4,5,6,7,8,9,10,11,12]);
    const [clickedCards,setClickedCards]=useState([])
    const [score,setScore]=useState(0)
    const [bestScore,setBestScore]=useState(0)
    async function fetchData(){
        const response = await fetch("https://api.thecatapi.com/v1/images/search?breed_ids=mcoo&limit=12&api_key=live_cO4dBGi9j4LszgTVXd0axFpWBysAibXZxVyPjaJzezOxJTAjh5vrB3XOS4ajM67Z");
        const data = await response.json();
        data.forEach((e,i) => {
            e.index=i;
        });
        setCardList(data)
    }
    function handleClick(card){
        const id=card.target.id
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
        console.log(clickedCards)
        let copiedBestScore=bestScore
        if(score>=bestScore){
            copiedBestScore=score
        }
        setBestScore(copiedBestScore)
        setCardList(randomizeArray(cardList))
    },[score])
    return (
    <>
    <div id="cards">
        {
        cardList.map(card=>{
            return (<button className="card" key={card.id} id={card.index} onClick={(e)=>{handleClick(e)}}><img className="card" src={card.url}></img> </button>)
        })
        }
    </div>
    <h1>Score: {score}</h1>
    <h1>Best score: {bestScore}</h1>
    </>
    )
}
export default Cards