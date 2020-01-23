import React, {useEffect, useState, useContext} from 'react';
import {InputContext} from "../context/InputContext";

export default function Account() {
  const {state} = useContext(InputContext);
  const [faves, setFaves] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [faveIds, setFaveIds] = useState([]);
  let faveUrls = [];

  useEffect(() => {
    console.log('STATE FROM ACC: ' + JSON.stringify(state));
    if (state.user) {
      fetchFaveIds();
      // setFavImages();
    }
  }, []);

  const fetchFaveIds = () => {
    setLoading(true);
    fetch('http://localhost:5000/user-like?userId=' + state.user.id)
      .then(res => res.json())
      .then(giphyArray => {
        giphyArray.forEach(gif => {
          fetch('http://api.giphy.com/v1/gifs/' + gif.gifId + '?api_key=BazmPWlcSFXdpZTGesTTPNsjlt1MuhBH&q=')
            .then(res => res.json())
            .then(res => {
              faveUrls.push(res.data.images.downsized.url)
            });
        })
      });
    setLoading(false);
  };

  const setFavImages = () => {
    faveIds.forEach(id => {
      fetch('http://api.giphy.com/v1/gifs/' + id + '?api_key=BazmPWlcSFXdpZTGesTTPNsjlt1MuhBH&q=')
        .then(res => res.json())
        .then(res => {
          faves.push(res);
        })
    });
  };

  const showFaves = () => !isLoading
    && faveUrls.length >= 1
    && (faveUrls.map((faveUrl) => {
      return (
        <div>
          <img alt="img" src={faveUrl}/>
        </div>
      );
    })
  );

  return (
    <div>
      {!isLoading && <div>loading <b>your</b> gifs</div>}
      {showFaves()}
    </div>
  );
}