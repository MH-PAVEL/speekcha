import React, { PureComponent } from 'react';
import { Layout, Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import ScrollBar from '../base/scroll-bar';
import SiderMenu from './menu';
import './sider.less';

import { withTranslation } from '../../../../i18n';

interface ISiderProps {
  collapsed?: boolean;
  theme?: string;
  isMobile?: boolean;
  logo?: string;
  siteName?: string;
  onThemeChange?: Function;
  menus?: any;
  t: any;
}

class Sider extends PureComponent<ISiderProps> {
  render() {
    const {
      collapsed,
      theme,
      isMobile,
      logo,
      siteName,
      onThemeChange,
      menus,
      t
    } = this.props;
    return (
      <Layout.Sider
        width={256}
        // theme={theme}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        // onBreakpoint={!isMobile && onCollapseChange}
        className="slider"
      >
        <div className="brand">
          <div className="logo">
            <img alt="logo" src={logo} />
            {!collapsed && <h1>{t(siteName)}</h1>}
          </div>
        </div>

        <div className="menuContainer">
          <ScrollBar
            options={{
              // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
              suppressScrollX: true
            }}
          >
            <SiderMenu
              menus={menus}
              theme={theme}
              isMobile={isMobile}
              // onCollapseChange={onCollapseChange}
            />
          </ScrollBar>
        </div>
        {!collapsed && (
          <div className="switchTheme">
            <span>
              <BulbOutlined />
              <span>{t('Switch Theme')}</span>
            </span>
            <Switch
              onChange={
                onThemeChange &&
                onThemeChange.bind(this, theme === 'dark' ? 'light' : 'dark')
              }
              defaultChecked={theme === 'dark'}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </div>
        )}
      </Layout.Sider>
    );
  }
}

export default withTranslation('components')(Sider);
