import { IMG_URL } from '../utils/constants';
const RestaurantMenuItem = (props) => {
    console.log(props); 
    const {name,price,defaultPrice,imageId} = props.info;
    return (
        <div className="flex justify-center">
            <div className="flex m-5">
                <h3>{name} - Rs {price/100 || defaultPrice / 100}</h3>
                <img className="w-24 h-16 ml-16" src={IMG_URL+imageId} alt={name} />
            </div>
        </div>
    );
};

export default RestaurantMenuItem;
