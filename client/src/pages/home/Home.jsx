import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/lists${type ? '?type=' + type : ''}${
            genre ? '&genre=' + genre : ''
          }`,
          {
            headers: {
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzZjYTMwZDk3OWM4NmFmNTE4NTc3OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTAyNzU2NSwiZXhwIjoxNjMxNDU5NTY1fQ.Sf8ZfstDK8mucVP0z4j91bDozxsPLGCBc8ef1ucpFl0',
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRandomLists();
  }, [type]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} key={list._id} />
      ))}
    </div>
  );
};

export default Home;
