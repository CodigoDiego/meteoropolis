import React from "react";
import "../stylesheets/Articles.css";

function Articles(props){

    const openInNewTab = () => {
        window.open(props.url, "_blank", "noreferrer");
      };

    const splitWords = (str) => {
        try {
            const oraciones = str.split(',');
    
            if (oraciones.length > 2) {
              const textoCortado = oraciones.slice(0, 2).join(',') + '...';
              return textoCortado;
            }
            return str;
            }
        catch (error) {
            // console.log(error);
        }
    }

    return(
    <div className="card" onClick={() => openInNewTab(props.url)}>
        <div className="img-container">
            <img src={(props.image)} className="art-image"/>
        </div>
        <div className="text-container">
            <div>
                <h5>{splitWords(props.author)}</h5>
                <h3>{props.title}</h3>
            </div>
        </div>
    </div>
    );
}
export default Articles;