import { FC, useState, useEffect } from 'react';
import { RootState } from '../../storage/index';
import { useAppDispatch, useAppSelector } from '../../storage/hooks.ts'; 
import { addItem, removeItem } from '../../storage/itemSlice.ts';
import { ItemData } from '../../components/ItemCard/helper';
import { ItemCardProps } from './helper';
import classes from './ItemCard.module.scss';

const ItemCard: FC<ItemCardProps> = ({ type, onClick, ...itemData }) => {
  const dispatch = useAppDispatch();
  const itemInCart = useAppSelector((state: RootState) =>
    state.items.cartData.find((item: ItemData) => item.id === itemData.id)
  );
  const itemQuantity = itemInCart ? itemInCart.quantity : 0;

  const [inputQuantity, setInputQuantity] = useState(itemQuantity);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(event.target.value) || 0);
    setInputQuantity(value);
  };

  useEffect(() => {
    setInputQuantity(itemQuantity);
  }, [itemData.id, itemQuantity]);

  const handleUpdateQuantity = () => {
    const difference = inputQuantity - itemQuantity;

    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        dispatch(addItem(itemData));
      }
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        dispatch(removeItem(itemData));
      }
    }
  };

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
          <div className={classes.quantityControl}>
            <label htmlFor={`quantity-${itemData.id}`}>Кількість:</label>
            <input
              className={classes.quantityInput}
              id={`quantity-${itemData.id}`}
              type="number"
              value={inputQuantity}
              placeholder="Input panel quantity"
              min="0"
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleUpdateQuantity}>Add to Cart</button>
          <button disabled={itemQuantity === 0} onClick={handleRemoveAction}>
            -1 from Cart
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
