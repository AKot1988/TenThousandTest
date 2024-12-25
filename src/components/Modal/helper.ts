import { ReactNode, SetStateAction, Dispatch } from 'react';

export type ModalProps = {
  content: ReactNode | null;
  title: string;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};
