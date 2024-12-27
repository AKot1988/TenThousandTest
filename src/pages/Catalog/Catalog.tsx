import { FC, useState, useEffect, useMemo, ReactNode } from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';
import { SVGset } from '../../assets/SVGset';
import { Modal, Cart } from '../../components';
import { RootState } from '../../storage/index';
import { fetchItemsData } from '../../storage/itemSlice';
import { useAppDispatch, useAppSelector } from '../../storage/hooks.ts';
import classes from './Catalog.module.scss';

const Catalog: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.items.data);
  console.log(data);

  // const [data, setData] = useState<ItemData[]>([]);
  const [modalData, setModalData] = useState<ReactNode | null>(null);
  const [modalPanel, setModalPanel] = useState(false);
  const [modalCartState, setModalCart] = useState(false);

  useEffect(() => {
    dispatch(fetchItemsData('/dataJSON/solarPanel.json'));
  }, [dispatch]);

  const renderedCards = useMemo(
    () =>
      data.map((item) => (
        <ItemCard
          key={item.id}
          {...item}
          type="catalog"
          onClick={() => {
            setModalPanel(!modalPanel);
            setModalData(<ItemCard {...item} type="item" />);
          }}
        />
      )),
    [data]
  );

  return (
    <>
      <div className={classes.catalog}>
        <div
          className={classes.catalogCartSVGContainer}
          onClick={() => {
            setModalCart(!modalCartState);
          }}>
          {SVGset.cartIcon}
        </div>
        {renderedCards}
      </div>
      <Modal
        visible={modalPanel}
        content={modalData}
        title="Item Info"
        setVisible={setModalPanel}
      />
      <Modal
        visible={modalCartState}
        content={<Cart />}
        title="Items in cart"
        setVisible={setModalCart}
      />
    </>
  );
};

export default Catalog;
