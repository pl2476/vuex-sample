export interface TableListItem {
  id?: string;
  categoryName: string;
  categoryId: string;
  parentCategoryId: string;
  displayOrder: string;
  remarks: string;
  status: boolean;
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
