export interface TableListItem {
  id?: string;
  memberCode: string;
  name: string;
  email: string;
  contactTel: number;
  familyMemberCode: string;
  isMember?: boolean;
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
