export interface TableListItem {
  id?: string;
  brandName: string;
  reference: string;
  status: string;
  forCashPackage: boolean;
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
  status: string;
  name: string;
  pageSize: number;
  pageIndex: number;
}
