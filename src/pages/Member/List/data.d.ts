export interface TableListItem {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: number;
  homeShop: string;
  memberCode: string;
  gender?: string;
  dateOfBirth?: string;
  marketingGroup?: string;
  discountGroup?: string;
  country?: string;
  city?: string;
  district?: string;
  address?: string;
  homePhone?: number;
  businessPhone?: number;
  preferredContact?: string;
  preferredShop?: string;
  preferredTherapist?: string;
  preferredRoom?: string;
  dislikeRoom?: string;
  remarks?: string;
  notification?: string;
  enabled?: string;
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
