export type SignupRequestInput = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export class SignupRequestInputDto {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;

  constructor(info: SignupRequestInput) {
    this.first_name = info.first_name;
    this.second_name = info.second_name;
    this.login = info.login;
    this.email = info.email;
    this.password = info.password;
    this.phone = info.phone;
  }
}

export type LoginRequestInput = {
  login: string;
  password: string;
};

export class LoginRequestInputDto {
  login: string;
  password: string;

  constructor(info: LoginRequestInput) {
    this.login = info.login;
    this.password = info.password;
  }
}
