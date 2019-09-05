import React, { useState } from 'react';
import { Select } from 'antd';

import style from './index.less';

const { Option } = Select;

export interface Item {
  value: string;
  text: string;
}

export interface CustomizeSelectProps {
  style?: object;
  value: string | undefined;
  option: Item[];
  onCustomSelect?: (value: Item) => void;
  getPopupContainer?: (value: HTMLElement) => HTMLElement;
  dropdownMatchSelectWidth?: boolean;
  openTrigger?: 'default' | 'mouse'; // 打开下拉的方式；'mouse'：鼠标移入打开，鼠标离开关闭
}

const CustomizeSelect: React.SFC<CustomizeSelectProps> = ({
  openTrigger = 'default',
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const children = props.option.map(item => (
    <Option key={item.value} value={item.value}>
      {item.text}
    </Option>
  ));
  const dropdownDom = props.option.map(item => (
    <div
      className={props.value === item.value ? style.active : ''}
      onMouseDown={e => {
        e.preventDefault();
        if (props.onCustomSelect) {
          props.onCustomSelect(item);
        }
      }}
      key={item.value}
    >
      {item.text}
    </div>
  ));
  return (
    <div
      className={style['customize-select']}
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      {openTrigger === 'default' ? (
        <Select
          style={props.style}
          value={props.value}
          placeholder="Please Select"
          dropdownClassName={style['customize-dropdown-class']}
          getPopupContainer={props.getPopupContainer}
          dropdownMatchSelectWidth={props.dropdownMatchSelectWidth}
          dropdownRender={() => <div className={style.dropdown}>{dropdownDom}</div>}
        >
          {children}
        </Select>
      ) : (
        <Select
          style={props.style}
          value={props.value}
          open={open}
          placeholder="Please Select"
          dropdownClassName={style['customize-dropdown-class']}
          getPopupContainer={props.getPopupContainer}
          dropdownMatchSelectWidth={props.dropdownMatchSelectWidth}
          dropdownRender={() => <div className={style.dropdown}>{dropdownDom}</div>}
        >
          {children}
        </Select>
      )}
    </div>
  );
};

export default CustomizeSelect;
