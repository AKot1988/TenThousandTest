import { useSelector } from 'react-redux';
import { FC } from 'react';
import { ItemCard } from '../../components';
import { SVGset } from "../../assets/SVGset";
import classes from './Cart.module.scss';

const Cart: FC = () => {
  const items = useSelector((state: any) => state.items);
  return (
    <div className={classes.cart}>
      {SVGset.cartIcon}
      <ul className={classes.cartItemsContainer}>
        {items.map((item: any) => (
          <li key={item.id} className={classes.cartItem}>
            <ItemCard {...item} type="itemCart" />
          </li>
        ))}
      </ul>
      <p>{`Total: ${items.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      )} $`}</p>
    </div>
  );
};

export default Cart;
