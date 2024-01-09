import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import {SWIGGY_API_URL} from "../utils/constants";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants,setFilteredRestaurants] = useState([]); // [
  const [searchtext, setSearchtext] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // setTimeout(() => {
      //   setListOfRestaurants(restaurantsArray);
      // }, 1000);
      
      const data = await fetch(SWIGGY_API_URL);
      const dataJson = await data.json();
      //console.log(dataJson?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      console.log(dataJson);
      const allRestaurants = dataJson?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      console.log(allRestaurants);
      setListOfRestaurants(allRestaurants);
      setFilteredRestaurants(allRestaurants);
    } catch (err) {
      console.log(err);
    }
  };
  const onButtonClick = () => {
    setFilteredRestaurants(
      listOfRestaurants.filter((rest) => rest.info.avgRating >= 4.5)
    );
  };
  const onGetAll = () => {
    setFilteredRestaurants(listOfRestaurants);
  };

  const searchBtnClick = () => {
    const searchedRest = listOfRestaurants.filter((rest) =>
      rest.info.name.toLowerCase().includes(searchtext)
    );
    setSearchtext("");
    setFilteredRestaurants(
      searchedRest
    );
  }

  if (!filteredRestaurants || filteredRestaurants.length === 0) {
    return <Shimmer />;
  }
  return (
    <>
      <div className="body">
        <div className="flex justify-center">
          <div className="search">
            <input
              id="search-input"
              type="text"
              placeholder="Search for restaurants"
              className="search-input"
              value={searchtext}
              onChange={(e) => setSearchtext(e.target.value)}
            />
            <button className=" bg-green-100 p-2 m-4" onClick={searchBtnClick}>Search</button>
          </div>
          <button className="btn bg-green-300 m-4" onClick={onButtonClick}>
            Top Rated Restaurants
          </button>
          <button className="m-4 bg-green-500 " onClick={onGetAll}>
            GetAll Restaurants
          </button>
        </div>
        <div className="flex flex-wrap justify-center m-4">
          {filteredRestaurants?.map((restData) => (
             <Link to={`restaurant/${restData?.info?.id}`} key={restData?.info?.id}><RestaurantCard restData={restData} /></Link>
             ))}
        </div>
      </div>
    </>
  );
};

export default Body;
