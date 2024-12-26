import { useSelector } from 'react-redux';
import { RootState } from '../../storage/index';
import { FC } from 'react';
import { ItemCard } from '../../components';
import { SVGset } from "../../assets/SVGset";
import { MapedItemData } from '../../components/ItemCard/helper';
import classes from './Cart.module.scss';

const Cart: FC = () => {
  const items = useSelector((state: RootState) => state.items as MapedItemData[]);
  return (
    <div className={classes.cart}>
      {SVGset.cartIcon}
      <ul className={classes.cartItemsContainer}>
        {items.map((item: MapedItemData) => (
          <li key={item.id} className={classes.cartItem}>
            <ItemCard {...item} type="itemCart" />
          </li>
        ))}
      </ul>
      <p>{`Total: ${items.reduce(
        (acc: number, item: MapedItemData) => acc + item.price * item.quantity,
        0
      )} $`}</p>
    </div>
  );
};

export default Cart;
