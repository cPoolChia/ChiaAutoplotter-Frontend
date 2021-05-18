export type GetJwtTokenType = {
  access_token: string;
  token_type: string;
};

export type UserDataType = {
  id: number;
  email: string;
  nickname: string;
  working_company_id: number;
};

export type RegisterUserType = {
  user_data: {
    email: string;
    nickname: string;
    password: string;
  };
  company_data: {
    company_name: string;
    company_number: number;
    vat_number: number;
    contact_person: string;
    contact_phone_number: string;
    address: string;
    zip_code: string;
    town: string;
  };
};

export type PasswordRecoveryType = {};

export type UserUniqueDataType = {
  login?: string;
  password?: string;
  id?: string;
};
