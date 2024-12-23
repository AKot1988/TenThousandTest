import { FC, useState, useEffect } from 'react';
import { ItemData } from './helper';
import classes from './ItemCard.module.scss';

const ItemCard: FC<ItemData> = (itemData: ItemData) => {
  const [itemQuantity, setItemQuantity] = useState(0);

  return (
    <div className={classes.itemCard}>
      <h2>{itemData.name}</h2>
      <p>{itemData.mountType}</p>
      <p>{itemData.manufacturer}</p>
      <p>{itemData.price}</p>
      <p>{`in cart ${itemQuantity}`}</p>
      <button onClick={() => setItemQuantity(itemQuantity + 1)}>
        Add to Cart
      </button>
      <button disabled={itemQuantity === 0} onClick={() => setItemQuantity(0)}>
        Remove from Cart
      </button>
    </div>
  );
};

export default ItemCard;
