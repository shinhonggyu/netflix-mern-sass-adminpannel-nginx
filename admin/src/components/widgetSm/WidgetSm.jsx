import { Visibility } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './widgetSm.css';

const WidgetSm = () => {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get('/users?new=true', {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzZjYTMwZDk3OWM4NmFmNTE4NTc3OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTAyNzU2NSwiZXhwIjoxNjMxNDU5NTY1fQ.Sf8ZfstDK8mucVP0z4j91bDozxsPLGCBc8ef1ucpFl0',
          },
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.profilePic ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIe9w8zmm308KseEz26E688MSEs0TF7rhWQ&usqp=CAU'
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
