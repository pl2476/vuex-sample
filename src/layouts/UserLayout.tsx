import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

// import SelectLang from '@/components/SelectLang';
import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './UserLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);

  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        {/* <div className={styles.lang}>
          <SelectLang />
        </div> */}
        <div className={styles['container-header']} />
        <div className={styles.content}>{children}</div>
        <div className={styles['container-footer']}>
          <div className={styles.link}>
            <span>Help</span>
            <span>Privacy</span>
            <span>Clause</span>
          </div>
          <div>Copyright &copy; 2019 imanagesystems.com</div>
        </div>
        {/* <DefaultFooter links={
          [{ title: 'Help', href: '/' },
          { title: 'Privacy', href: '/' },
          { title: 'Clause', href: '/' }]
        }
          copyright="2019 imanagesystems.com" /> */}
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
