import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { SWIGGY_API_RESTUARAURT_MENU } from "../utils/constants";
import Shimmer from './Shimmer';
import RestaurantMenuItem from './RestaurantMenuItem';
const ReastaurantMenu = () => {
    const [menuData, setMenuData] = useState(null);
    const [restaurantName, setRestaurantName] = useState('');

    const {id} = useParams();
    useEffect(() => {
        fetchMenuData();
    }, []);
    
    const fetchMenuData = async () => {
        try {
            const data = await fetch(SWIGGY_API_RESTUARAURT_MENU + id);
            const dataJson = await data.json();
            console.log(dataJson?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
            
            const itemCardArray = dataJson?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards;            
            const name = dataJson?.data?.cards[0]?.card?.card?.info?.name;
            setMenuData(itemCardArray);
            setRestaurantName(name);
        } catch (err) {
            console.log(err);
        }
    }

    if(!menuData){
        return <Shimmer />
    }


    return (
        <div className="restaurant-menu-container">
            <h1>{restaurantName}</h1>
            <ul className="flex flex-col">
                {menuData.map(({card:{info}}) => (
                    <li key={info.id}><RestaurantMenuItem  info={info}/></li>
                ))}
            </ul>
        </div>
    );
};

export default ReastaurantMenu;
