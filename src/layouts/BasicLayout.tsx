/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import React, { useEffect, useState, SetStateAction } from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import styles from './BasicLayout.less';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

// Conversion router to menu.
const formatter = (
  data: MenuDataItem[],
  parentAuthority?: MenuDataItem['authority'],
  parentName?: MenuDataItem['name'],
) =>
  data.map(item => {
    if (!item.name || !item.path) {
      return null;
    }

    let locale = 'menu';
    if (parentName) {
      locale = `${parentName}.${item.name}`;
    } else {
      locale = `menu.${item.name}`;
    }

    const result = {
      ...item,
      name: formatMessage({ id: locale, defaultMessage: item.name }),
      locale,
      authority: item.authority || parentAuthority,
    };
    if (item.children && item.children.length > 0) {
      result.children = formatter(item.children, item.authority, locale) as MenuDataItem[];
    }
    return result;
  });

const defaultFooterDom = <DefaultFooter />;

const footerRender: BasicLayoutProps['footerRender'] = () => <>{defaultFooterDom}</>;

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings } = props;
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
      dispatch({
        type: 'menu/fetch',
        callback: (data: MenuDataItem[]) => {
          setMenuData(formatter(data) as SetStateAction<never[]>);
        },
      });
      // .then((data: MenuDataItem[]) => {
      //   setMenuData(formatter(data) as SetStateAction<never[]>);
      // });
    }
  }, []);

  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  return (
    <div className={styles.prolayout}>
      <ProLayout
        logo="http://52.193.131.42:8885/group1/M00/00/00/rB8WI12jPIWAFLQaAAA1IQPnxCc484.png"
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={() => menuData}
        formatMessage={formatMessage}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        {children}
      </ProLayout>
    </div>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
