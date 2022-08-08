export enum ValidationRule {
  login = 'login',
  password = 'password ',
  email = 'email',
  first_name = 'first_name',
  second_name = 'second_name',
  display_name = 'display_name',
  phone = 'phone',
  message = 'phone',
}

export function validateRule(rule: ValidationRule, value: string) {
  switch (rule) {
    case ValidationRule.login: {
      if (value.length < 3) {
        return 'Login must contain at least 3 chars';
      } else if (value.length > 20) {
        return 'Login must not contain more than 20 chars';
      } else if (!new RegExp(/[a-z]+[0-9\-\_]*$/gi).test(value)) {
        return 'Login can contain latin letters, digits (but not only), hyphen and underscore';
      }
      break;
    }
    case ValidationRule.email: {
      if (!new RegExp(/[a-z0-9\-_]+\@[a-z0-9\-_]+\.[a-z0-9]+/gi).test(value)) {
        return 'Email must be in latin and have the pattern: "email@example.com"';
      }
      break;
    }

    case ValidationRule.password: {
      if (value.length < 4) {
        return 'Password must contain at least 4 chars';
      } else if (value.length > 40) {
        return 'Password must not contain more than 20 chars';
      }
      break;
    }

    case ValidationRule.first_name:
    case ValidationRule.second_name:
    case ValidationRule.display_name: {
      if (!new RegExp(/^[A-ZА-ЯË][a-zа-яё]+$/g).test(value)) {
        return 'Must start with a capital letter, can contain only latin or cyrillic letters';
      }
      break;
    }

    case ValidationRule.phone: {
      if (!new RegExp(/^[+*\d]{10,15}$/).test(value)) {
        return 'Phone can only contain 10-15 digits, can start with +';
      }
      break;
    }

    case ValidationRule.message: {
      if (value.length === 0) {
        return 'Message cannot be empty';
      }
    }

    default:
      return '';
  }
}
