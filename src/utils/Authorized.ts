import RenderAuthorize from '@/components/Authorized';
import { getAuth } from './authority';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(getAuth());

// Reload the rights component
const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getAuth());
};

export { reloadAuthorized };
export default Authorized;
