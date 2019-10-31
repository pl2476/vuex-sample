export interface TableListItem {
  id?: string;
  disabled?: boolean;
  bundleCode?: string;
  bundleName?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  groupNames?: string;
  shop?: string;
  totalBundlePrice?: string;
  productOptionGroup?: object;
  bundleGroup?: object;
}

export interface OptionFields {
  key: string;
  label: string;
  unit?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  optionFields: OptionFields[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  pageSize: number;
  pageIndex: number;
}

export interface ProductList {
  products: {
    id: string;
    name: string;
  }[];
}
