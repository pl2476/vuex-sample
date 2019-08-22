import { Calendar, Icon, Col, Row } from 'antd';
import React from 'react';
import moment, { Moment } from 'moment';
import { formatDate } from 'umi-plugin-react/locale';
import style from './index.less';

export interface CustomizeCalendarProps {
  time: number;
  mode?: 'month' | 'year' | undefined;
  nextMonth?: () => void;
  lastMonth?: () => void;
  onSelect?: (value: Moment | undefined) => void;
}

// export default class HeaderSearch extends Component<CustomizeCalendarProps> {
const CustomizeCalendar: React.SFC<CustomizeCalendarProps> = props => (
  // constructor(props: CustomizeCalendarProps) {
  //   super(props);
  //   this.state = {};
  // }

  // const { time, mode, nextMonth, lastMonth, onSelect } = this.props;
  <div style={{ width: 280 }}>
    <Calendar
      fullscreen={false}
      headerRender={() => (
        <div style={{ padding: 10 }}>
          <Row type="flex" justify="space-between">
            <Col
              style={{ paddingRight: '6px', paddingLeft: '6px', cursor: 'pointer' }}
              onClick={props.lastMonth}
            >
              <Icon type="double-left" />
            </Col>
            <Col>
              {/* <span>{moment(props.time).format('MMMM YYYY')}</span> */}
              <span>
                {formatDate(props.time, {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </Col>
            <Col
              style={{ paddingRight: '6px', paddingLeft: '6px', cursor: 'pointer' }}
              onClick={props.nextMonth}
            >
              <Icon type="double-right" />
            </Col>
          </Row>
        </div>
      )}
      onSelect={props.onSelect}
      value={moment(props.time)}
      mode={props.mode}
      className={style['customize-calendar']}
    />
  </div>
);

export default CustomizeCalendar;
