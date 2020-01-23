import React, {useState, useContext} from 'react';
import {InputContext} from "../context/InputContext";
import {post} from "../service/api";

export default function SearchGif() {
  const [images, updateImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {state} = useContext(InputContext);

  const search = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      console.log(state.user);
      await fetch('http://api.giphy.com/v1/gifs/search?api_key=BazmPWlcSFXdpZTGesTTPNsjlt1MuhBH&q=' + event.target.value)
        .then(response => response.json())
        .then(response => {
          updateImages({
            list: response.data
          });
        })
        .catch(err => console.log(err));
      setLoading(false);
    }
  };

  function likeThis(imageId) {
    console.log('image id: ' + imageId);
    console.log('user id: ' + state.user.id);
    post('http://localhost:5000/user-like/add', JSON.stringify({
      userId: state.user.id,
      gifId: imageId
    }))
      .then(response => console.log('LIKED:' + JSON.stringify(response)));
  }

  return (
    <div>
      <h3>Search Giphy:</h3>
      <input
        onKeyDown={(e) => {
          search(e)
        }}
      />
      {isLoading && <div>loading gifs</div>}

      {!isLoading &&
      <ul>
        {
          images.list.map((image) => {
            return <li key={image.id}>
              <img alt="img" src={image.images.downsized.url}/>
              <br/>
              <button onClick={() => {
                likeThis(image.id)
              }}>
                Like
              </button>
            </li>
          })
        }
      </ul>
      }
    </div>
  )
}