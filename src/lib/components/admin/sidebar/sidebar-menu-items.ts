// @ts-expect-error no types
import MaterialSymbolsAccountBalance from '~icons/material-symbols/account-balance?raw&width=24&height=24&class=icon';
// @ts-expect-error no types
import RawMaterialSymbolsDashboard from '~icons/material-symbols/dashboard?raw&width=24&height=24&class=icon';
// @ts-expect-error no types
import RawMaterialSymbolsSettings from '~icons/material-symbols/settings?raw&width=24&height=24&class=icon';
// @ts-expect-error no types
import RawMdiAccountGroup from '~icons/mdi/account-group?raw&width=24px&height=24px&class=icon';
// @ts-expect-error no types
import RawMdiSitemapOutline from '~icons/mdi/sitemap-outline?raw&width=24px&height=24px&class=icon';
// @ts-expect-error no types
import RawMaterialSymbolsPerson from '~icons/material-symbols/person?raw&width=24&height=24&class=icon';

const sidebarMenuItems = [
  { icon: RawMaterialSymbolsDashboard, title: 'Dashboard', path: '/admin', children: [] },
  {
    icon: RawMaterialSymbolsPerson,
    title: 'People',
    path: 'admin/people',
    children: [
      { icon: RawMdiAccountGroup, title: 'Summary', path: '/admin/people/summary' },
      { icon: RawMdiSitemapOutline, title: 'Org Chart', path: '/admin/people/org' }
    ]
  },
  { icon: RawMaterialSymbolsSettings, title: 'Settings', path: '/admin/settings', children: [] },
  {
    icon: MaterialSymbolsAccountBalance,
    title: 'Accounting',
    path: '/admin/accounting',
    children: []
  }
];

export default sidebarMenuItems;
