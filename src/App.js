import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    fetchAnotherUser();
  }, [pageNum]);

  const api = `https://api.randomuser.me/?page=${pageNum}`;

  const paginate = () => {
    setPageNum(pageNum + 1);
  };

  const fetchAnotherUser = () => {
    fetchData().then((data) => {
      const infos = [...userInfo, ...data.results];
      setUserInfo(infos);
    });
  };

  const fetchData = () => {
    return axios
      .get(api)
      .then(({ data }) => data)
      .catch((err) => {
        console.error(err);
      });
  };

  const formatUserInfo = (user) => {
    return `${user.name.first} ${user.name.last} ${user.email}`;
  };

  return (
    <div className="App">
      <button onClick={paginate}>Get Another User</button>
      {userInfo.map((user) => (
        <>
          <div>{formatUserInfo(user)}</div>
          <img src={user.picture.large} alt="person" />
        </>
      ))}
    </div>
  );
}

export default App;
