import { FC, useState, useEffect } from 'react';
import { ItemData } from '../../components/ItemCard/helper';
import ItemCard from '../../components/ItemCard/ItemCard';
import { SVGset } from '../../assets/SVGset';
import { Modal, Cart } from '../../components';
import { axiosResponse } from '../../API';
import classes from './Catalog.module.scss';

const Catalog: FC = () => {
  const [data, setData] = useState<ItemData[]>([]);
  const [modalData, setModalData] = useState<{
    modalVisible: boolean;
    itemToRender: ItemData | null;
  }>({
    modalVisible: false,
    itemToRender: null,
  });

  const [modalCartState, setModalCart] = useState<{
    modalCartVisible: boolean;
    itemToRender: FC | null;
  }>({
    modalCartVisible: false,
    itemToRender: null,
  });

  useEffect(() => {
    axiosResponse('../../../public/dataJSON/solarPanel.json').then((data) =>
      setData(data)
    );
  }, []);
  return (
    <>
      <div className={classes.catalog}>
        <div
          onClick={() => {
            setModalCart({ modalCartVisible: true, itemToRender: Cart });
          }}>
          {SVGset.cartIcon}
        </div>
        {data.map((item) => (
          <ItemCard
            key={item.id}
            {...item}
            type="catalog"
            onClick={() => {
              setModalData({ modalVisible: true, itemToRender: item });
            }}
          />
        ))}
      </div>
      <Modal
        visible={modalData.modalVisible}
        content={
          modalData.itemToRender ? (
            <ItemCard {...modalData.itemToRender} type="item" />
          ) : null
        }
        title="Item Info"
        setVisible={setModalData}
      />
      <Modal
        visible={modalCartState.modalCartVisible}
        content={modalCartState.itemToRender ? <Cart /> : null}
        title="Items in cart"
        setVisible={setModalCart}
      />
    </>
  );
};

export default Catalog;
