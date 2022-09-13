export type UserDto = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: Nullable<string>;
  login: string;
  avatar: Nullable<string>;
  email: string;
  phone: string;
  role?: string;
};

export class User {
  id: number;
  avatar: Nullable<string>;
  displayName: Nullable<string>;
  email: string;
  firstName: string;
  login: string;
  phone: string;
  secondName: string;
  role?: string;

  constructor(dto: UserDto) {
    this.id = dto.id;
    this.avatar = dto.avatar;
    this.displayName = dto.display_name;
    this.email = dto.email;
    this.firstName = dto.first_name;
    this.login = dto.login;
    this.phone = dto.phone;
    this.secondName = dto.second_name;
    this.role = dto.role;
  }
}

export type UpdateUserInput = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export class UpdateUserInputDto {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;

  constructor(info: UpdateUserInput) {
    this.first_name = info.first_name;
    this.second_name = info.second_name;
    this.display_name = info.display_name;
    this.login = info.login;
    this.email = info.email;
    this.phone = info.phone;
  }
}

export type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
};

export class ChangePasswordInputDto {
  oldPassword: string;
  newPassword: string;

  constructor(info: ChangePasswordInput) {
    this.oldPassword = info.oldPassword;
    this.newPassword = info.newPassword;
  }
}
