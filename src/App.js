import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import axios from "axios"

const LIMIT = 8;

function App() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [visible, setVisible] = useState(LIMIT);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const responseData = response?.data?.products;

        if (responseData) {
          setData(responseData.slice(0, LIMIT));
        }
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    const newLimit = visible + LIMIT;
    console.log(newLimit)
    if (data.length<30) {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const addTo = response.data.products.slice(visible, newLimit);
  
        setTimeout(() => {
          setData(prevData => [...prevData, ...addTo]);
        }, 2000);
  
        setVisible(newLimit);
      } catch (error) {
        console.error("Yeni veri alınırken hata oluştu:", error);
      }
    } else {
      setHasMore(false);
    }
  };

  console.log(data);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Alles </b>
        </p>
      }
    >
      {data.map((item, index) => (
        <div
          style={{
            height: 90,
            border: "2px solid black",
            marginBottom: "5px",
          }}
          key={index}
        >
          div {item.title} #{index}
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default App;
