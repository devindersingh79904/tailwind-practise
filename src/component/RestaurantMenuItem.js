import { IMG_URL } from '../utils/constants';
const RestaurantMenuItem = (props) => {
    const {title,items,showItems,setShowIndex} = props;
    console.log(showItems);
    console.log(items);
    return (
        <div className="mx-auto grid-cols-9 bg-cyan-100 mt-2">
            <span onClick={()=>{setShowIndex()}}>{title}</span>
            {showItems && items && items.map(({card : {info}}) => (
                <div className='flex justify-center' key={info.id}>
                    <h1>{info.name}</h1>
                </div>
            ))
            }
        </div>
    );
};

export default RestaurantMenuItem;
