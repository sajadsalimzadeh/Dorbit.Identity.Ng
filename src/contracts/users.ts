export interface UserDto {

  id: string;
  name: string;
  email: string;
  cellphone: string;
  username: string;
  isTwoFactorAuthenticationEnable: boolean;
  needResetPassword: boolean;
  isActive: boolean;
  accesses: string[];
}
