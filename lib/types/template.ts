import { Control, UseFormRegister, UseFormWatch } from 'react-hook-form';

export interface CreateTemplateProps {
    tempName: string;
    itemList: ItemList[];
}

export type ItemList = {
    check: boolean;
    hidden: boolean;
    itemName: string;
    itemsubList: ItemSubList[];
}

export interface SubtitleProps {
    nestIndex: number;
    control: Control<any>;
    register: UseFormRegister<CreateTemplateProps>;
    watch: UseFormWatch<CreateTemplateProps>;
}

export type ItemSubList = {
  subName: string;
  questList: QuestList[];
}

export type QuestList = {
  questType: string;
  questName: string;
  optionList: string[];
}