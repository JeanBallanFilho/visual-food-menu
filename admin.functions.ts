type ServerFnArg<T> = { data: T };

type Action =
  | 'adminCheck'
  | 'adminLogin'
  | 'adminLogout'
  | 'me'
  | 'listCompaniesAdmin'
  | 'upsertCompany'
  | 'deleteCompany'
  | 'listUsersAdmin'
  | 'createUser'
  | 'updateUser'
  | 'resetUserPassword'
  | 'deleteUser'
  | 'upsertProduct'
  | 'deleteProduct'
  | 'upsertCategory'
  | 'deleteCategory'
  | 'upsertMarker'
  | 'deleteMarker'
  | 'updateTheme'
  | 'uploadProductImage';

async function callAdmin<T = any>(action: Action, data?: any): Promise<T> {
  const res = await fetch(`/api/admin?action=${action}`, {
    method: data === undefined ? 'GET' : 'POST',
    headers: data === undefined ? undefined : { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: data === undefined ? undefined : JSON.stringify(data),
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload?.error || `Erro na ação ${action}`);
  return payload as T;
}

const unwrap = <T>(arg: ServerFnArg<T> | T): T =>
  arg && typeof arg === 'object' && 'data' in (arg as any)
    ? (arg as ServerFnArg<T>).data
    : (arg as T);

export const adminCheck = () => callAdmin<{ authed: boolean; user?: any }>('adminCheck');
export const adminLogin = (arg: ServerFnArg<{ email: string; password: string }>) =>
  callAdmin<{ ok: boolean; user?: any; error?: string }>('adminLogin', unwrap(arg));
export const adminLogout = () => callAdmin<{ ok: boolean }>('adminLogout', {});
export const me = () => callAdmin<{ user: any }>('me');

export const listCompaniesAdmin = () => callAdmin<any[]>('listCompaniesAdmin');
export const upsertCompany = (arg: ServerFnArg<any>) => callAdmin('upsertCompany', unwrap(arg));
export const deleteCompany = (arg: ServerFnArg<{ id: string }>) => callAdmin('deleteCompany', unwrap(arg));

export const listUsersAdmin = () => callAdmin<any[]>('listUsersAdmin');
export const createUser = (arg: ServerFnArg<any>) => callAdmin('createUser', unwrap(arg));
export const updateUser = (arg: ServerFnArg<any>) => callAdmin('updateUser', unwrap(arg));
export const resetUserPassword = (arg: ServerFnArg<{ id: string; password: string }>) =>
  callAdmin('resetUserPassword', unwrap(arg));
export const deleteUser = (arg: ServerFnArg<{ id: string }>) => callAdmin('deleteUser', unwrap(arg));

export const upsertProduct = (arg: ServerFnArg<any>) => callAdmin('upsertProduct', unwrap(arg));
export const deleteProduct = (arg: ServerFnArg<{ id: string }>) => callAdmin('deleteProduct', unwrap(arg));
export const upsertCategory = (arg: ServerFnArg<any>) => callAdmin('upsertCategory', unwrap(arg));
export const deleteCategory = (arg: ServerFnArg<{ id: string }>) => callAdmin('deleteCategory', unwrap(arg));
export const upsertMarker = (arg: ServerFnArg<any>) => callAdmin('upsertMarker', unwrap(arg));
export const deleteMarker = (arg: ServerFnArg<{ id: string }>) => callAdmin('deleteMarker', unwrap(arg));
export const updateTheme = (arg: ServerFnArg<any>) => callAdmin('updateTheme', unwrap(arg));
export const uploadProductImage = (arg: ServerFnArg<{ fileName: string; contentType: string; base64: string; folder?: string }>) =>
  callAdmin<{ url: string }>('uploadProductImage', unwrap(arg));
