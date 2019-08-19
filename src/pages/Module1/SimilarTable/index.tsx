import React, { PureComponent } from 'react';
import { Select, Button, Icon, Dropdown, Menu } from 'antd';
import moment, { Moment } from 'moment';
import style from './index.less';
import CustomizeCalendar from '@/components/CustomizeCalendar';

const { Option } = Select;

interface MyState {
  time: number;
  items: string[];
  isExpand: boolean;
}

class SimilarTable extends PureComponent<{}, MyState> {
  constructor(props: object) {
    super(props);
    this.state = {
      time: new Date().getTime(),
      items: ['a'],
      isExpand: false,
    };
  }

  afterwardDay = () => {
    let { time } = this.state;
    this.setState({
      time: time += 60 * 60 * 24 * 1000,
    });
  };

  forwardDay = () => {
    let { time } = this.state;
    this.setState({
      time: time -= 60 * 60 * 24 * 1000,
    });
  };

  today = () => {
    this.setState({
      time: new Date().getTime(),
    });
  };

  nextMonth = () => {
    let { time } = this.state;
    this.setState({
      time: time += 60 * 60 * 24 * 1000 * 30,
    });
  };

  lastMonth = () => {
    let { time } = this.state;
    this.setState({
      time: time -= 60 * 60 * 24 * 1000 * 30,
    });
  };

  onSelect = (value: Moment | undefined) => {
    this.setState({
      time: value ? value.valueOf() : new Date().getTime(),
    });
  };

  changeExpand = () => {
    const { isExpand } = this.state;
    this.setState({ isExpand: !isExpand });
  };

  render() {
    const tableHeadList = [1, 2, 3, 4, 5, 6];
    const tableBodyList = [];
    const { time, items, isExpand } = this.state;
    for (let i = 0; i < 30; i += 1) {
      tableBodyList.push(i);
    }
    const colTitle = ['', ...tableHeadList].map((item, index) => (
      <div key={item} className={style.cell}>
        {index > 0 ? item : ''}
      </div>
    ));
    const body = tableBodyList.map((rowItem, i) => (
      <div key={rowItem} className={style.row}>
        {['', ...tableHeadList].map((colItem, j) => (
          <div key={colItem} className={style.cell} draggable={j === 0}>
            {j === 0 ? i + 1 : ''}
          </div>
        ))}
      </div>
    ));
    const leftTop = (
      <div className={style.topHead}>
        <div>
          <Select defaultValue="default" style={{ width: 120 }}>
            <Option value="default">default</Option>
          </Select>
        </div>
        <div>
          <Button onClick={this.forwardDay}>
            <Icon type="left" />
          </Button>
          <time style={{ color: '#000', fontWeight: 400 }}>
            {moment(time).format('YYYY-MM-DD')}
          </time>
          <Button onClick={this.afterwardDay}>
            <Icon type="right" />
          </Button>
          <Button onClick={this.today}>Today</Button>
        </div>
        <div>
          <Button onClick={this.changeExpand}>
            {isExpand ? <Icon type="shrink" /> : <Icon type="arrows-alt" />}
          </Button>
        </div>
      </div>
    );
    const contentItems = items.map((item, index) => (
      <Dropdown
        key={item.toString()}
        overlay={
          <Menu>
            <Menu.Item key="1">Edit</Menu.Item>
            <Menu.Item key="2">Cancel</Menu.Item>
          </Menu>
        }
        getPopupContainer={trigger => trigger.parentNode as HTMLElement}
        trigger={['contextMenu', 'click']}
      >
        <div
          key={item}
          className={`${style.contentItem}  ${index === items.length - 1 ? style.last : ''}`}
          style={{
            // eslint-disable-next-line no-bitwise
            backgroundColor: '#FF9A74',
            opacity: 0.8,
            height: '30px',
            lineHeight: '30px',
            top: 60,
            left: 88,
          }}
          draggable
          // onDragStart={this.dragStart.bind(this, item)}
        >
          {item}
        </div>
      </Dropdown>
    ));
    return (
      <div className={style.grid}>
        <div className={style.left}>
          <div className={style.top}>{leftTop}</div>
          <div className={style.middle}>
            <div className={style.head}>
              <div className={style.row}>{colTitle}</div>
            </div>
            <div className={style.body}>{body}</div>
            {contentItems}
          </div>
          <div className={style.bottom}>
            <div>
              <span style={{ background: '#FF9A74' }}>Booked</span>
              <span style={{ background: '#A3A1CE' }}>Confirmed</span>
              <span style={{ background: '#FFC857' }}>Arrived</span>
              <span style={{ background: '#A679C7' }}>Completed</span>
              <span style={{ background: '#BFC0C0' }}>Blocked</span>
            </div>
          </div>
        </div>
        <div className={style.right} style={{ display: isExpand ? 'none' : '' }}>
          <div className={style.top}>
            <CustomizeCalendar
              time={time}
              mode="month"
              lastMonth={this.lastMonth}
              nextMonth={this.nextMonth}
              onSelect={this.onSelect}
            />
          </div>
          <div className={style.bottom}>
            <div className={style['bottom-title']}>WAITING BOOKINGS</div>
            <div className={style['bottom-content']} />
          </div>
        </div>
      </div>
    );
  }
}

export default SimilarTable;
