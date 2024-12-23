import { FC, useState, useEffect } from 'react';
import { ItemData } from '../../components/ItemCard/helper';
import  ItemCard  from '../../components/ItemCard/ItemCard';
import { fetchItems } from '../../API';
import classes from './Catalog.module.scss';


const Catalog: FC = () => {
  const [data, setData] = useState<ItemData[]>([]);
  useEffect(() => {
    fetchItems('../../../public/dataJSON/solarPanel.json').then((data) => setData(data));
  }, []);
  return (
    <div className={classes.catalog}>
      {data.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </div>
  );
}

export default Catalog;