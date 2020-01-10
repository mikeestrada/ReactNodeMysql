import React, {useEffect, useState} from 'react';

export default function App() {
  const [images, updateImages] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => console.log(response.json()))
  });

  useEffect((gifs) => {
    updateImages({
      list: gifs
    });
  }, [images]);

  const search = (event) => {
    if (event.key === 'Enter') {
      fetch('http://api.giphy.com/v1/gifs/search?api_key=BazmPWlcSFXdpZTGesTTPNsjlt1MuhBH&q=' + event.target.value)
        .then(response => response.json())
        .then(response => {
          updateImages({
            list: response.data
          });
        })
        .catch(err => console.log(err));
      console.log(images.list);
    }
  };

  return (
    <div>
      <h3>Search Giphy:</h3>
      <input
        onKeyDown={(e) => {search(e)}}
      />
      <ul>
        {images.list.map((image) => {
          <img src={image.src} />
        })}
      </ul>
    </div>
  )

}