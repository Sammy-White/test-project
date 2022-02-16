import { useEffect, useState } from "react";
import moment from "moment";
import Paginate from "./paginate";

function Content() {
  const [state, setState] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [searchText, setSearchText] = useState("");
  const [orderText, setOrderTest] = useState("");

  const orderArr = ["release date", "rating"];

  //fetch data from api
  const url =
    "https://adaorachi.github.io/esetech-assessment-api/game-data.json";

  useEffect(() => {
    const fetcData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setState(data);
      setAllVideos(data);
    };

    fetcData();
  }, []);

  //pagination logic
  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = state.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // search by filter
  const onKeyUp = (e) => {
    const getSearch = allVideos.filter((data) =>
      data.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setState(getSearch);
    setSearchText(e.target.value);
  };

  //Sort videos
  const handleShowDate = (e) => {
    if (e.target.value === "release date") {
      const release_date = state
        .slice()
        .sort((a, b) => a.first_release_date - b.first_release_date);
      setState(release_date);
    }

    if (e.target.value === "rating") {
      const ratings = state.slice().sort((a, b) => a.rating - b.rating);
      setState(ratings);
    }
    setOrderTest(e.target.value);
  };

  //Clear all
  const clearAll = () => {
    setSearchText("");
    setOrderTest("");

    setState(allVideos);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="sidebar">
          <h3>Filter Result</h3>
          <form className="search_input">
            <label htmlFor="email">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Text string"
              value={searchText}
              onChange={(e) => onKeyUp(e)}
            />
          </form>
          <form className="search_select">
            <label>Order By</label>
            <div className="select">
              <select
                name="slct"
                id="slct"
                className="selected"
                onChange={(e) => handleShowDate(e)}
              >
                <option value={orderText}>-----</option>
                {orderArr.map((order, index) => (
                  <option value={order} key={index}>
                    {order}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <button onClick={clearAll}>Clear</button>
        </div>
        <div className="rightbar">
          {state.length ? (
            <div>
              {currentPosts.map((data) => (
                <div className="video_contents" key={data.id}>
                  <div className="video_card">
                    <div className="video_img"></div>
                    <div className="video_details">
                      <div>
                        <h3>{data.name}</h3>
                        <small>
                          Release Date:{" "}
                          <span>
                            {moment(data.first_release_date).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                        </small>
                      </div>
                      <p>
                        <small>{data.summary}</small>
                      </p>
                    </div>
                    <div className="rating">{data.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="loading">Loading....</p>
          )}
          <Paginate
            totalPosts={state.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}
export default Content;
