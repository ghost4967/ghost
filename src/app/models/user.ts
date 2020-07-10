export type Roles = 'SUPERADMIN' | 'ADMIN' | 'USER';

export interface User {
  uid?: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  password?: string;
  role?: Roles;
}
