import React from "react";

const styleCard = {
    backgroundColor: '#f0f0f0',
}

const RestaurantCard = (props)=>{
    const {restData} = props;
    console.log(restData);
    const IMG_URL="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
    const { name, cloudinaryImageId ,cuisines ,costForTwo ,avgRating , sla:{slaTime}} = restData?.info;
    return (
    <div className="flex flex-col justify-center w-80 p-5 m-5 text-wrap " style={styleCard}>
        <img className="w-56 h-40 m-2" alt="rest-img" src={`${IMG_URL}${cloudinaryImageId}`} />
        <h3>{name}</h3>
        <h4 className="text-wrap ">{cuisines.join(", ")}</h4>
        <h4>{avgRating} Stars</h4>
        <h4>{costForTwo}</h4>
        <h4>{slaTime} minutes</h4>
    </div>
    )
}


export default RestaurantCard;