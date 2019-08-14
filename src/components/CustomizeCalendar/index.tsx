import { Calendar, Icon, Col, Row } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import style from './index.less';

moment.locale();

export interface CustomizeCalendarProps {
  time: number;
  mode?: 'month' | 'year' | undefined;
  // onNextDay?: (value: any) => void;
}

// const CustomizeCalendar: React.SFC<CustomizeCalendarProps> = (props) => {
export default class HeaderSearch extends Component<CustomizeCalendarProps> {
  constructor(props: CustomizeCalendarProps) {
    super(props);
    this.state = {};
  }

  // conNextDay = (value: any) => {
  //   const { onNextDay } = this.props;
  //   // props.value += 60*60*24*1000;
  //   if (onNextDay) {
  //     onNextDay(value);
  //   }
  // }

  // componentWillReceiveProps(nextProps: any): void {}

  render() {
    const { time, mode } = this.props;
    return (
      <div style={{ width: 280 }}>
        <Calendar
          fullscreen={false}
          headerRender={() => (
            <div style={{ padding: 10 }}>
              <Row type="flex" justify="space-between">
                <Col style={{ paddingRight: '6px', paddingLeft: '6px', cursor: 'pointer' }}>
                  <Icon type="double-left" />
                </Col>
                <Col>
                  <span>{moment(time).format('MMMM YYYY')}</span>
                </Col>
                <Col
                  style={{ paddingRight: '6px', paddingLeft: '6px', cursor: 'pointer' }}
                  // onClick={(time) => {
                  //   if(onChange) {
                  //     onChange(value.clone().year(2020));
                  //   }
                  // }}
                >
                  <Icon type="double-right" />
                </Col>
              </Row>
            </div>
          )}
          value={moment(time)}
          mode={mode}
          className={style['customize-calendar']}
        />
      </div>
    );
  }
}
