// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    user?: string;
    id?: number;
    email?: string;
    is_admin?: boolean;
  };

  type LoginResult = {
    status?: string;
    // type?: string;
    // currentAuthority?: string;
    data: any;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type ConfigAgreementItem = {
    id: number;
    display_id: string;
    agreement_type: string;
    agreement_subtype: string;
    created_by: string;
    creation_datetime: string;
    last_edited_date: string;
    last_edited_by: string;
    status: string;
  };
  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
