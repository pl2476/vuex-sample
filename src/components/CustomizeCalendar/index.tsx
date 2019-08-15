import { Calendar, Icon, Col, Row } from 'antd';
import React, { Component } from 'react';
import moment, { Moment } from 'moment';
import style from './index.less';

export interface CustomizeCalendarProps {
  time: number;
  mode?: 'month' | 'year' | undefined;
  nextMonth?: () => void;
  lastMonth?: () => void;
  onSelect?: (value: Moment | undefined) => void;
}

// const CustomizeCalendar: React.SFC<CustomizeCalendarProps> = (props) => {
export default class HeaderSearch extends Component<CustomizeCalendarProps> {
  constructor(props: CustomizeCalendarProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { time, mode, nextMonth, lastMonth, onSelect } = this.props;
    return (
      <div style={{ width: 280 }}>
        <Calendar
          fullscreen={false}
          headerRender={() => (
            <div style={{ padding: 10 }}>
              <Row type="flex" justify="space-between">
                <Col
                  style={{ paddingRight: '6px', paddingLeft: '6px', cursor: 'pointer' }}
                  onClick={lastMonth}
                >
                  <Icon type="double-left" />
                </Col>
                <Col>
                  <span>{moment(time).format('MMMM YYYY')}</span>
                </Col>
                <Col
                  style={{ paddingRight: '6px', paddingLeft: '6px', cursor: 'pointer' }}
                  onClick={nextMonth}
                >
                  <Icon type="double-right" />
                </Col>
              </Row>
            </div>
          )}
          onSelect={onSelect}
          value={moment(time)}
          mode={mode}
          className={style['customize-calendar']}
        />
      </div>
    );
  }
}
