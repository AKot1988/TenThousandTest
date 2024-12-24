import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../storage/itemSlice.jsx';
import { ItemCardProps } from './helper';
import classes from './ItemCard.module.scss';

const ItemCard: FC<ItemCardProps> = ({ type, onClick, ...itemData }) => {
  const dispatch = useDispatch();

  const itemInCart = useSelector((state: any) =>
    state.items.find((item: any) => item.id === itemData.id)
  );
  const itemQuantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddAction = () => {
    dispatch(addItem(itemData));
  };

  const handleRemoveAction = () => {
    dispatch(removeItem(itemData));
  };

  switch (type) {
    case 'catalog':
      return (
        <div className={classes.itemCard} onClick={onClick}>
          <h2>{itemData.name}</h2>
          <p>{itemData.mountType}</p>
          <p>{itemData.manufacturer}</p>
          <p>{`price ${itemData.price} $`}</p>
        </div>
      );
    case 'item':
      return (
        <div className={classes.itemCard}>
          <h2>{itemData.name}</h2>
          <p>{itemData.mountType}</p>
          <p>{itemData.manufacturer}</p>
          <p>{`price ${itemData.price} $`}</p>
          <p>{`in cart: ${itemQuantity}`}</p>
          <button onClick={handleAddAction}>Add to Cart</button>
          <button disabled={itemQuantity === 0} onClick={handleRemoveAction}>
            Remove from Cart
          </button>
        </div>
      );
    case 'itemCart':
      return (
        <div className={classes.itemCardCart}>
          <h2>{itemData.name}</h2>
          <p>{itemData.mountType}</p>
          <p>{itemData.manufacturer}</p>
          <p>{`price ${itemData.price} $`}</p>
          <p>{`in cart: ${itemQuantity}`}</p>
          <button onClick={handleAddAction}>+</button>
          <button disabled={itemQuantity === 0} onClick={handleRemoveAction}>
            -
          </button>
        </div>
      );
  }
};

export default ItemCard;
