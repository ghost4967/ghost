import { User } from "./../../models/user";

export class RoleValidator {
  isSuperAdmin(user: User): boolean {
    return user.role === "SUPERADMIN";
  }

  isAdmin(user: User): boolean {
    return user.role === "ADMIN";
  }

  isUser(user: User): boolean {
    return user.role === "USER";
  }
}
