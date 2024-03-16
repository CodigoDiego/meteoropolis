import React, {useState, useEffect} from "react";
import Articles from './Articles';
import '../stylesheets/News.css'

function News(){
    
    const [country, setCountry] = useState("us");
    const [category, setCategory] = useState("general");
    const [articlesApi, setArticles] = useState([{}]);
    const [isActive, setButtonState] =useState(null);
    
    // const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${REACT_APP_NEWS_KEY}`;
    // const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=6716720117bb4de3a037d316985ee7c3`;
    const apiUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${process.env.REACT_APP_NEWS_KEY}`;
    
    useEffect(() => {
      Fetch();
      setArticles(articlesApi.filter(article => article.image !== null));
    }, [category]);

  const Fetch = async () =>{
    try {
      await fetch(apiUrl).then((res)=>{
        return res.json();
      }).then((data) =>
        setArticles(data.articles.filter(article => article.image !== null)));
        console.log(articlesApi);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCategory = (cat,button) =>{
    setCategory(cat);
    setButtonState(button === isActive ? null: button);
  }

    return(
        <div className="card-container-news">
            <div className="categories">
                <button className={isActive===1?"cat-selector active":"cat-selector"} onClick={() => handleCategory("general", 1)}>General</button>
                <button className={isActive===2?"cat-selector active":"cat-selector"} onClick={() => handleCategory("business", 2)}>Business</button>
                <button className={isActive===3?"cat-selector active":"cat-selector"} onClick={() => handleCategory("entertainment", 3)}>Entertainment</button>
                <button className={isActive===4?"cat-selector active":"cat-selector"} onClick={() => handleCategory("health", 4)}>Health</button>
                <button className={isActive===5?"cat-selector active":"cat-selector"} onClick={() => handleCategory("sports", 5)}>Sports</button>
                <button className={isActive===6?"cat-selector active":"cat-selector"} onClick={() => handleCategory("technology", 6)}>Tech</button>
                <button className={isActive===7?"cat-selector active":"cat-selector"} onClick={() => handleCategory("science", 7)}>Science</button>
            </div>
            <div className="news-container">
                {articlesApi.map((article)=> 
                    <Articles image={article.image} author={article.author} title={article.title} url={article.url}/>
                )};
            </div>

        </div>
    );
}
export default News;