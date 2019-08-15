import React, { PureComponent } from 'react';
import { Select, Button, Icon } from 'antd';
import moment, { Moment } from 'moment';
import style from './index.less';
import CustomizeCalendar from '../../../components/CustomizeCalendar';

const { Option } = Select;

interface MyState {
  time: number;
}

class SimilarTable extends PureComponent<{}, MyState> {
  constructor(props: object) {
    super(props);
    this.state = {
      time: new Date().getTime(),
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

  render() {
    const tableHeadList = [1, 2, 3, 4, 5, 6];
    const tableBodyList = [];
    const { time } = this.state;
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
          <div key={colItem} className={style.cell}>
            {j === 0 ? i + 1 : ''}
          </div>
        ))}
      </div>
    ));
    const leftTop = (
      <div className={style.topHead}>
        <div>
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <div>
          <Button onClick={this.forwardDay}>
            <Icon type="left" />
          </Button>
          <time>{moment(time).format('YYYY-MM-DD')}</time>
          <Button onClick={this.afterwardDay}>
            <Icon type="right" />
          </Button>
          <Button onClick={this.today}>Today</Button>
        </div>
        <div>
          <Button>
            <Icon type="arrows-alt" />
          </Button>
        </div>
      </div>
    );
    return (
      <div className={style.grid}>
        <div className={style.left}>
          <div className={style.top}>{leftTop}</div>
          <div className={style.middle}>
            <div className={style.head}>
              <div className={style.row}>{colTitle}</div>
            </div>
            <div className={style.body}>{body}</div>
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
        <div className={style.right}>
          <div className={style.top}>
            <CustomizeCalendar
              time={time}
              mode="month"
              lastMonth={this.lastMonth}
              nextMonth={this.nextMonth}
              onSelect={this.onSelect}
            />
          </div>
          <div className={style.bottom}>bottom</div>
        </div>
      </div>
    );
  }
}

export default SimilarTable;
