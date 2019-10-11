export interface TableListItem {
  // key: number;
  // disabled?: boolean;
  // href: string;
  // avatar: string;
  // name: string;
  // title: string;
  // owner: string;
  // desc: string;
  // callNo: number;
  // status: number;
  // updatedAt: Date;
  // createdAt: Date;
  // progress: number;
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
}

export interface TableListPagination {
  totalRecord: number;
  pageSize: number;
  pageIndex: number;
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
  currentPage: number;
}
