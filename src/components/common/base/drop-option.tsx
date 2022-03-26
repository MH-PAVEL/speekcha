import React, { PureComponent } from 'react';
import { BarsOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Button, Menu } from 'antd';
import { withTranslation } from '../../../../i18n';

interface IProps {
  onMenuClick: any;
  menuOptions?: any[];
  buttonStyle?: any;
  dropdownProps?: any;
  t: any;
}

export class DropOption extends PureComponent<IProps> {
  render() {
    const {
      onMenuClick,
      menuOptions = [],
      buttonStyle,
      dropdownProps,
      t
    } = this.props;
    const menu = menuOptions.map((item) => (
      <Menu.Item key={item.key}>{t(item.name)}</Menu.Item>
    ));
    return (
      <Dropdown
        overlay={<Menu onSelect={onMenuClick}>{t(menu)}</Menu>}
        {...dropdownProps}
      >
        <Button style={{ border: 'none', ...buttonStyle }}>
          <BarsOutlined style={{ marginRight: 2 }} />
          <DownOutlined />
        </Button>
      </Dropdown>
    );
  }
}
