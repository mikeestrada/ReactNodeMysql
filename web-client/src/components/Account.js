import React, {useEffect, useState, useContext} from 'react';
import {InputContext} from "../context/InputContext";

export default function Account() {
  const [faves, setFaves] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {state} = useContext(InputContext);

  const getFavGifs = async () => {
    setLoading(true);

    await fetch('http://localhost:5000/user-like?userId=' + state.user.id)
      .then(res => res.json())
      .then(giphyArray => {

        console.log('USER FAVE IDS: ', giphyArray);

        giphyArray.forEach(faveId => {
            fetch('http://api.giphy.com/v1/gifs/' + faveId.gifId + '?api_key=BazmPWlcSFXdpZTGesTTPNsjlt1MuhBH&q=')
              .then(res => res.json())
              .then(res => {
                console.log('USER FAVES: ', res.data);
                setFaves({
                  list: res.data
                });
              })
              .catch(err => console.log('ERROR: ', err));
          });
      })
      .catch(err => console.log('getFavGifsERR: ', err));
    setLoading(false);
  };

  return (
    <div>
      <button onClick={() => getFavGifs()}>Load your gifs</button>

      {/*{!isLoading &&*/}
      {/*<ul>*/}
        {/*{*/}
          {/*faves.list.map((fav) => {*/}
            {/*return <li key={fav.id}>*/}
              {/*<img alt="img" src={fav.images.downsized.url}/>*/}
              {/*<br/>*/}
            {/*</li>*/}
          {/*})*/}
        {/*}*/}
      {/*</ul>*/}
      {/*}*/}
    </div>
  );
}