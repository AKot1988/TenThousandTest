export type ItemData = {
  name: string;
  mountType: string;
  manufacturer: string;
  price: number;
  id: string;
};

export interface MapedItemData extends ItemData {
  quantity: number;
}
export interface ItemCardProps extends ItemData {
  type: 'catalog' | 'item' | 'itemCart';
  onClick?: () => void;
}
