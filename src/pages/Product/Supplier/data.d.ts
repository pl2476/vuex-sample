export interface TableListItem {
  id?: string;
  supplierName?: string;
  contactName?: string;
  contactEmail?: string;
  contactTel?: string;
  status?: string;
  name?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
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
