import React, { PureComponent } from 'react';
import { Select, Button, Icon } from 'antd';
import style from './index.less';

const { Option } = Select;

class SimilarTable extends PureComponent {
  render() {
    const tableHeadList = [1, 2, 3, 4, 5, 6, 7];
    const tableBodyList = [];
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
          <Button>
            <Icon type="left" />
          </Button>
          <time>2019-07-06</time>
          <Button>
            <Icon type="right" />
          </Button>
          <Button>Today</Button>
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
          <div className={style.bottom}>bottom</div>
        </div>
        <div className={style.right}>
          <div className={style.top}>top</div>
          <div className={style.bottom}>bottom</div>
        </div>
      </div>
    );
  }
}

export default SimilarTable;
