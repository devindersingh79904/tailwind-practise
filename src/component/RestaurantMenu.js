import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { SWIGGY_API_RESTUARAURT_MENU } from "../utils/constants";
import Shimmer from './Shimmer';
import RestaurantMenuItem from './RestaurantMenuItem';
const ReastaurantMenu = () => {
    const [menuData, setMenuData] = useState(null);
    const [restaurantName, setRestaurantName] = useState('');
    const [showIndex, setShowIndex] = useState(0);
    const {id} = useParams();
    useEffect(() => {
        fetchMenuData();
    }, []);
    
    const createMenuDataFromItemCard = (itemCardArray) => {
        const MenuDataMap = [];
        itemCardArray.forEach(( item ) => {
            if( item?.card?.card["@type"].includes("ItemCategory"))
            {
                MenuDataMap.push({
                    "title" : item?.card?.card?.title,
                    "itemArray": item?.card?.card?.itemCards
                });
            }
        }
        );
        return MenuDataMap;
    }
    const fetchMenuData = async () => {
        try {
                const data = await fetch(SWIGGY_API_RESTUARAURT_MENU + id);
                const dataJson = await data.json();
                // console.log(dataJson?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);

                const itemCardArray = dataJson?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;      
                const MenuDataMap = createMenuDataFromItemCard(itemCardArray);
                console.log(MenuDataMap);
                setMenuData(MenuDataMap);
            } catch (err) {
            console.log(err);
        }
    }

    if(!menuData){
        return <Shimmer />
    }


    return (
        <div className="restaurant-menu-container mt-8">
            <h1>{restaurantName}</h1>
            <ul className="grid grid-cols-1 mx-auto ">
                {menuData.map(( {title, itemArray},index) => (
                    <li key={title} className='grid-rows-9'><RestaurantMenuItem title={title}  items={itemArray} showItems={showIndex === index} setShowIndex={()=>{setShowIndex(index)}}/></li>
                ))}
            </ul>
        </div>
    );
};

export default ReastaurantMenu;
