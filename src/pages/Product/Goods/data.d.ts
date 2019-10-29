export interface TableListItem {
  id?: string;
  brandId?: string;
  goodsName?: string;
  categoryId?: string;
  categoryName?: string;
  description?: string;
  brandName?: string;
  optionNames?: string;
  optionContents?: string;
  // [x: string]?: string;
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
