export type ItemData = {
  name: string;
  mountType: string;
  manufacturer: string;
  price: number;
  id: string;
};

export interface ItemCardProps extends ItemData {
  type: 'catalog' | 'item' | 'itemCart';
  onClick?: () => void;
}
