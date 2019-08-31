import component from './en-GB/component';
import globalHeader from './en-GB/globalHeader';
import menu from './en-GB/menu';
import pwa from './en-GB/pwa';
import settingDrawer from './en-GB/settingDrawer';
import settings from './en-GB/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
