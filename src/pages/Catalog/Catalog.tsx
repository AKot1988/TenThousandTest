import { FC, useState, useEffect, useMemo, ReactNode } from 'react';
import { ItemData } from '../../components/ItemCard/helper';
import ItemCard from '../../components/ItemCard/ItemCard';
import { SVGset } from '../../assets/SVGset';
import { Modal, Cart } from '../../components';
import { axiosResponse } from '../../API';
import classes from './Catalog.module.scss';

const Catalog: FC = () => {
  const [data, setData] = useState<ItemData[]>([]);
  const [modalData, setModalData] = useState<ReactNode | null>(null);
  const [modalPanel, setModalPanel] = useState(false);
  const [modalCartState, setModalCart] = useState(false);

  useEffect(() => {
    axiosResponse('../../../public/dataJSON/solarPanel.json').then((data) =>
      setData(data)
    );
  }, []);

  const renderedCards = useMemo(
    () =>
      data.map((item) => (
        <ItemCard
          key={item.id}
          {...item}
          type="catalog"
          onClick={() => {
            setModalPanel(!modalPanel);
            setModalData((<ItemCard {...item} type="item"/>));
          }}
        />
      )),
    [data]
  );

  return (
    <>
      <div className={classes.catalog}>
        <div
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
