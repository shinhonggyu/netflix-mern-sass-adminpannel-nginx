import {
  Add,
  PlayArrow,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './listItem.scss';
import { Link } from 'react-router-dom';

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get('/movies/find/' + item, {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzZjYTMwZDk3OWM4NmFmNTE4NTc3OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTAyNzU2NSwiZXhwIjoxNjMxNDU5NTY1fQ.Sf8ZfstDK8mucVP0z4j91bDozxsPLGCBc8ef1ucpFl0',
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link
      to={{
        pathname: '/watch',
        movie: movie,
      }}
    >
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop muted />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="iteminfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
