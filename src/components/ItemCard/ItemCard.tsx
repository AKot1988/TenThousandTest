import { FC, useState, useEffect } from 'react';
import { ItemData } from './helper';

const ItemCard: FC<ItemData> = (itemData: ItemData) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [disabledDelButton, setDisabledDelButton] = useState(true);

  useEffect(() => {
    setDisabledDelButton(!disabledDelButton);
  }, [itemQuantity]);

  return (
    <div>
      <h2>{itemData.name}</h2>
      <p>{itemData.mountType}</p>
      <p>{itemData.manufacturer}</p>
      <p>{itemData.price}</p>
      <button onClick={() => setItemQuantity(itemQuantity + 1)}>
        Add to Cart
      </button>
      <button disabled={disabledDelButton} onClick={() => setItemQuantity(0)}>
        Remove from Cart
      </button>
    </div>
  );
};

export default ItemCard;
