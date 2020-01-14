import React, {useState, useEffect} from 'react';

export default function SearchGif() {
  const [images, updateImages] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('localhost:5000')
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
  }, []);

  const search = async(event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      await fetch('http://api.giphy.com/v1/gifs/search?api_key=BazmPWlcSFXdpZTGesTTPNsjlt1MuhBH&q=' + event.target.value)
        .then(response => response.json())
        .then(response => {
          updateImages({
            list: response.data
          });
        })
        .catch(err => console.log(err));
      setLoading(false);
      console.log(images.list);
    }
  };

  return (
    <div>
      <h5>Login</h5>
      <h3>Search Giphy:</h3>
      <input
        onKeyDown={(e) => {
          search(e)
        }}
      />
      { isLoading && <div>loading gifs</div> }
      { !isLoading &&
      <ul>
        {images.list.map((image) => {
          return <li key={image.id}><img alt="img" src={image.images.downsized.url}/></li>
        })}
      </ul>
      }
    </div>
  )
}