export interface CookieContainer {
  cookies: {
    remove: ({ name: string }) => void;
  }
}

export interface ApiResponse<TData = any, TMeta = any> {
  data?: TData | null;
  meta?: TMeta | null;
  error?: string | null;
}

export interface OptionListItem {
  label: string;
  id: string | number;
}

export type OptionList = OptionListItem[];

export type OptionListCurrency = Array<OptionListItem & { symbol: string }>;

export interface ApiClientOptions {
  host?: string;
  baseUrl?: string;
  browser?: CookieContainer | null;
}

export interface AuditCreated {
  created_at: string;
  created_by: string;
}

export interface AuditUpdated {
  updated_at: string;
  updated_by: string;
}

export type WithAuditCreated<T> = T & AuditCreated;
export type WithAuditUpdated<T> = T & AuditUpdated;
export type WithAuditFull<T> = T & AuditCreated & AuditUpdated;

export interface GeoLocation {
  lat: number | null;
  lon: number | null;
  geo_accuracy: number | null;
  geo_updated_at: string | null;
}
export type WithGeoLocation<T> = T & GeoLocation;

export interface MetaBase {
  row_count: number;
}

export enum EntityKindEnum {
  POSTS = 'posts',
  ARTICLES = 'articles',
  USERS = 'users',
}

export enum AssetPurposeEnum {
  POST_IMAGE = 'post-image',
}

export enum AssetTypeEnum {
  IMAGE = 'image',
}

export enum AssetMediaTypeEnum {
  IMAGE_JPEG = 'image/jpeg',
}

export interface AssetMetaModel {
  Key: string; // uploads/images/large/030e8ef3-17a2-4dbf-a8ae-41872f04fa35.jpg
  key: string; // uploads/images/large/030e8ef3-17a2-4dbf-a8ae-41872f04fa35.jpg
  ETag: string; // ec6f93cbfc059c411be1a73e17df583f
  Bucket: string; // frenchbench
  Location: string; // https://frenchbench.s3.eu-west-2.amazonaws.com/uploads/images/large/030e8ef3-17a2-4dbf-a8ae-41872f04fa35.jpg
  file_size: number; // 336007
}

export type AssetModel = WithAuditFull<{
  id: string;
  asset_type: AssetTypeEnum;
  media_type: string; // image/jpeg
  label: string; // image uploaded 2021-02-07T20:39:09.437Z
  url: string; // 030e8ef3-17a2-4dbf-a8ae-41872f04fa35.jpg
  meta: AssetMetaModel;
}>;

export type AssetRelation = WithAuditFull<{
  id: string;
  parent_entity_kind: EntityKindEnum;
  parent_entity_id: string;
  purpose: AssetPurposeEnum;
  asset_id: string;
  meta: any;
  asset: AssetModel;
}>;

export interface SignOutData {
  token: string;
}

export interface SignInInput {
  username: string;
  password: string;
}

export interface SignInData {
  id: string;
  username: string;
  token: string;
  token_type: string; // e.g. 'Bearer'
}

export interface SignUpInput extends SignInInput {
  password_confirm: string;
}
export type SignUpData = SignInData; // same

// without 'password_hash'
export interface UserSummaryModel {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email_verified: number;
  phone_mobile_verified: number;
}
export interface UserLinks {
  link_website: string | null;
  link_facebook: string | null;
  link_instagram: string | null;
  link_twitter: string | null;
  link_linkedin: string | null;
  link_youtube: string | null;
}
export type UserModel = WithGeoLocation<WithAuditFull<UserSummaryModel & {
  email: string | null;
  phone_mobile: string | null;
  headline: string | null;
  neighbourhood: string | null;
  is_volunteer: number;
} & UserLinks>>;

export type UserRetrieveData = UserModel;

export type UserContactDetails = Pick<UserModel, 'first_name' | 'last_name' | 'email' | 'phone_mobile' | 'headline' | 'neighbourhood' | 'is_volunteer'>;
export type UserContactUpdateInput = Partial<UserContactDetails>;
export type UserContactUpdateData = boolean;

export type UserLinksDetails = Pick<UserModel, 'link_website' | 'link_facebook' | 'link_instagram' | 'link_twitter' | 'link_linkedin' | 'link_youtube'>;
export type UserLinksUpdateInput = Partial<UserLinksDetails>;
export type UserLinksUpdateData = boolean;

export type TFieldUpdateInput<T> = { field: keyof T; value: string; };

export type UserFieldUpdateInput = TFieldUpdateInput<UserContactDetails & UserLinksDetails>;
export type UserFieldUpdateData = boolean;

//export type TFieldInput<T> = { field: keyof T; };
//export type UserFieldInput = TFieldInput<UserContactDetails & UserLinksDetails>;

export interface UserSearchInput {
  lat1?: number;
  lon1?: number;
  lat2?: number;
  lon2?: number;
  with_assets?: boolean;
}
export type UserSearchData = UserModel[];
export type UserSearchMeta = MetaBase;

export type PostSummaryModel = WithAuditCreated<{
  id: string;
  slug: string;
  title: string;
  tags: string;
  user_id: string;
  username: string;
  assets?: AssetRelation[];
  lat?: number | null;
  lon?: number | null;
  geo_accuracy?: number;
}>;
export type PostDetailsModel = WithAuditUpdated<WithGeoLocation<PostSummaryModel>> & {
  content: string;
}

export interface PostCreateInput {
  slug?: string;
  title: string;
  content: string;
  tags: string;
  asset_id?: string;
}
export type PostCreateData = string; // id of new post created

export type PostUpdateInput = Partial<PostCreateInput>;
export type PostUpdateData = number; // e.g. '1' number of updated records

export type PostDeleteData = boolean; // e.g. true if deleted

export type PostRetrieveData = PostDetailsModel;

export interface PostSearchInput {
  user_id?: string | null;
  username?: string | null;
  q?: string;
  tag?: string;
  offset?: number;
  limit?: number;
  with_assets?: boolean;
}
export type PostSearchData = PostSummaryModel[];
export type PostSearchMeta = MetaBase;

export interface ArticleSummaryModel {
  id: string;
  slug: string;
  title: string;
  keywords: string;
  created_at: string;
  updated_at: string;
  assets?: AssetRelation[];
}
export interface ArticleDetailsModel extends ArticleSummaryModel {
  content: string;
  created_by: string;
  updated_by: string;
  assets?: AssetRelation[];
}

export interface ArticleCreateInput {
  slug: string;
  title: string;
  content: string;
  tags: string;
}
export type ArticleCreateData = string; // id of new article created

export type ArticleRetrieveData = ArticleDetailsModel;

export type ArticleSearchData = ArticleSummaryModel[];
export type ArticleSearchMeta = MetaBase;

export interface AdvertSummaryModel {
  id: string;
  slug: string;
  title: string;
  tags: string;
  is_buying: number;
  is_service: number;
  price: number;
  currency: string; // GBP
  created_at: string;
  user_id: string;
  username: string;
  assets?: AssetRelation[];
  lat?: number | null;
  lon?: number | null;
  geo_accuracy?: number;
}
export interface AdvertDetailsModel extends AdvertSummaryModel {
  content: string;
  created_by: string;
  updated_by: string;
  assets?: AssetRelation[];
}

export interface AdvertCreateInput {
  slug?: string;
  title: string;
  content: string;
  tags?: string;
  asset_id?: string;
  is_buying?: number;
  is_service?: number;
  price: number;
  currency?: string;
  lat?: number;
  lon?: number;
  geo_accuracy?: number;
}
export type AdvertCreateData = string; // id of new article created

export type AdvertUpdateInput = Partial<AdvertCreateInput>;

export type AdvertRetrieveData = AdvertDetailsModel;

export type AdvertUpdateData = number; // e.g. '1' number of updated records

export type AdvertDeleteData = boolean; // e.g. true if deleted

export interface AdvertSearchInput {
  user_id?: string | null;
  username?: string | null;
  q?: string;
  tag?: string;
  offset?: number;
  limit?: number;
  with_assets?: boolean;
  min_price?: number;
  max_price?: number;
}
export type AdvertSearchData = AdvertSummaryModel[];
export type AdvertSearchMeta = MetaBase;
