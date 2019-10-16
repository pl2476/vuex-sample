import React, { PureComponent } from 'react';
import { Button, Icon, Dropdown, Menu, Popover, Calendar } from 'antd';
import moment, { Moment } from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CustomizeCalendar from '@/components/CustomizeCalendar';
import CustomizeSelect, { Item as SelectItem } from '@/components/CustomizeSelect';
import style from './index.less';
import DndBox from '@/components/DndBox';
import DndItem, { Item as DndItemData, DndItemProps } from '@/components/DndItem';
import SearchSelect from '@/components/SearchSelect';

// interface Item {
//   id: number;
//   desc: string;
//   x: number;
//   y: number;
//   h: number;
// }

interface MyState {
  time: number;
  items: DndItemData[];
  isExpand: boolean;
  timePopVisible: boolean;
  selectValue: string | undefined;
  itemHeight: number;
  itemWidth: number;
}

class SimilarTable extends PureComponent<{}, MyState> {
  constructor(props: object) {
    super(props);
    this.state = {
      time: new Date().getTime(),
      items: [
        {
          id: 1,
          desc: 'a',
          x: 1,
          y: 2,
          h: 2,
        },
        {
          id: 2,
          desc: 'b',
          x: 3,
          y: 6,
          h: 3,
        },
      ],
      isExpand: false,
      timePopVisible: false,
      selectValue: undefined,
      itemHeight: 30,
      itemWidth: 150,
    };
  }

  componentDidMount() {
    this.setState({
      selectValue: '1',
    });
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

  dragStart = (item: object, event: React.DragEvent): void => {
    if (event && event.dataTransfer) {
      const { dataTransfer } = event;
      dataTransfer.setData(
        'text/plain',
        JSON.stringify({
          item,
        }),
      );
      dataTransfer.dropEffect = 'move';
      // dataTransfer.effectAllowed = 'linkMove';
    }
  };

  onDrop = (row: number, col: number, e?: React.DragEvent): void => {
    const { items } = this.state;
    if (e && e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
      if (typeof row !== 'number' || col < 1) {
        e.dataTransfer.dropEffect = 'none';
        return;
      }
      const data = JSON.parse(e.dataTransfer.getData('text/plain')).item;
      const targetItems = items.map(item => {
        let target = item;
        if (item.id === data.id) {
          target = {
            id: data.id,
            desc: data.desc,
            x: col,
            y: row,
            h: data.h,
          };
        }
        return target;
      });
      this.setState({
        items: targetItems,
      });
    }
  };

  itemDrop = (row: number, col: number, data: DndItemData) => {
    const { items } = this.state;
    if (typeof row !== 'number' || col < 1) {
      return;
    }
    const targetItems = items.map(item => {
      let target = item;
      if (item.id === data.id) {
        target = {
          id: data.id,
          desc: data.desc,
          x: col,
          y: row,
          h: data.h,
        };
      }
      return target;
    });
    this.setState({
      items: targetItems,
    });
  };

  dragEnter = (item: number, e: React.DragEvent): void => {
    e.preventDefault();
  };

  dragOver = (item: number, e: React.DragEvent): void => {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  };

  onCustomSelect = (item: SelectItem): void => {
    this.setState({
      selectValue: item.value,
    });
  };

  render() {
    const tableHeadList = [1, 2, 3, 4, 5, 6];
    const tableBodyList = [];
    const {
      time,
      items,
      isExpand,
      timePopVisible,
      selectValue,
      itemHeight,
      itemWidth,
    } = this.state;
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
        {[-1, ...tableHeadList].map((colItem, j) => {
          if (j === 0) {
            return (
              <div key={colItem} className={style.cell}>
                {i + 1}
              </div>
            );
          }
          return (
            <DndBox
              key={colItem}
              content=""
              style={{
                height: itemHeight,
                width: itemWidth,
                borderRight: '1px solid #e8e8e8',
                borderBottom: '1px dotted #e8e8e8',
              }}
              drop={(data: DndItemProps) => this.itemDrop(rowItem, colItem, data.data)}
            />
          );
        })}
      </div>
    ));
    const dateCell = <div></div>;
    const timeHoverContent = (
      <div style={{ width: 460, height: 390 }} className={style['time-hover-content']}>
        <Calendar
          style={{ borderTop: 0 }}
          headerRender={() => <></>}
          dateCellRender={() => dateCell}
          value={moment(time)}
          onSelect={date => {
            this.setState({
              time: date ? date.valueOf() : new Date().getTime(),
              timePopVisible: false,
            });
          }}
          validRange={[moment(time).set('date', 1), moment(time).endOf('month')]}
        />
      </div>
    );
    const leftTop = (
      <div className={style.topHead} style={{ position: 'relative' }}>
        <div style={{ display: 'inline-block' }}>
          <CustomizeSelect
            value={selectValue}
            style={{ minWidth: 120 }}
            option={[
              { value: 'default', text: 'default' },
              { value: '1', text: 'first' },
              { value: '2', text: 'second' },
              { value: '3', text: 'third' },
              { value: '4', text: 'fourth' },
            ]}
            openTrigger="mouse"
            getPopupContainer={node => node.parentElement as HTMLElement}
            dropdownMatchSelectWidth={false}
            onCustomSelect={this.onCustomSelect}
          />
        </div>
        <div>
          <Button onClick={this.forwardDay}>
            <Icon type="left" />
          </Button>
          <Popover
            content={timeHoverContent}
            placement="bottom"
            trigger="click"
            visible={timePopVisible}
            // getPopupContainer={(node) => node}}
            title={false}
          >
            <time
              style={{ color: '#000', fontWeight: 400 }}
              onClick={() => {
                this.setState({
                  timePopVisible: true,
                });
              }}
            >
              {moment(time).format('YYYY-MM-DD')}
            </time>
          </Popover>
          <Button onClick={this.afterwardDay}>
            <Icon type="right" />
          </Button>
          <Button onClick={this.today}>Today</Button>
        </div>
        <div>
          <Button onClick={this.changeExpand}>
            {isExpand ? (
              <Icon style={{ transform: 'rotate(45deg)' }} type="shrink" />
            ) : (
              <Icon style={{ transform: 'rotate(45deg)' }} type="arrows-alt" />
            )}
          </Button>
        </div>
      </div>
    );
    const contentItems = items.map(item => (
      <Dropdown
        key={item.id}
        overlay={
          <Menu>
            <Menu.Item key="1">Edit</Menu.Item>
            <Menu.Item key="2">Cancel</Menu.Item>
          </Menu>
        }
        getPopupContainer={trigger => trigger.parentNode as HTMLElement}
        trigger={['contextMenu', 'click']}
      >
        {/* <div
          key={item.id}
          className={`${style.contentItem}  ${index === items.length - 1 ? style.last : ''}`}
          style={{
            backgroundColor: '#FF9A74',
            opacity: 0.8,
            height: `${item.h * 30}px`,
            lineHeight: `${item.h * 30}px`,
            top: (item.y + 1) * 30,
            left: (item.x - 1) * 150 + 88,
          }}
          draggable
          onDragStart={this.dragStart.bind(this, item)}
        >
          {`${item.id}(${item.x}, ${item.y})`}
        </div> */}
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <DndItem
            key={item.id}
            style={{
              position: 'absolute',
              width: 150,
              height: `${item.h * 30}px`,
              lineHeight: `${item.h * 30}px`,
              top: (item.y + 1) * 30,
              left: (item.x - 1) * 150 + 88,
              backgroundColor: '#FF9A74',
              cursor: 'move',
              textAlign: 'center',
            }}
            hideSourceOnDrag
            data={item}
          />
        </div>
      </Dropdown>
    ));
    return (
      <PageHeaderWrapper title={false}>
        <div className={style.grid}>
          <div className={style.left}>
            <div className={style.top}>{leftTop}</div>
            <div className={style.middle}>
              <div className={style.head}>
                <div className={style.row}>{colTitle}</div>
              </div>
              <DndProvider backend={HTML5Backend}>
                <div className={style.body}>{body}</div>
                {contentItems}
              </DndProvider>
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
              <div className={style['bottom-content']}>
                <DndProvider backend={HTML5Backend}>
                  <div style={{ overflow: 'hidden', clear: 'both' }}>
                    <DndItem
                      style={{
                        height: 30,
                        width: 150,
                        border: '1px dashed gray',
                        backgroundColor: 'white',
                        marginRight: '1.5rem',
                        marginBottom: '1.5rem',
                        cursor: 'move',
                        textAlign: 'center',
                      }}
                      data={items[0]}
                    />
                  </div>
                </DndProvider>
                <div>
                  <SearchSelect
                    value={selectValue}
                    style={{ minWidth: 120 }}
                    option={[{ value: 'default', text: 'default' }, { value: '1', text: 'first' }]}
                    // openTrigger="default"
                    getPopupContainer={node => node.parentElement as HTMLElement}
                    dropdownMatchSelectWidth={false}
                    onCustomSelect={this.onCustomSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default SimilarTable;
