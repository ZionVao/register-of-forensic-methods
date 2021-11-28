export interface IUserCreate {
  full_name: string;
  date_of_birth: Date | null;
  series_passport: string;
  date_of_issue_of_passport: Date | null;
  id_authority_that_issued_the_passport: number | null;
  ITN: string;
  email: string;
  id_role: number | null;
  id_organizations: number | null;
  passport_number: string;
  id_position: number | null;
  region: string;
  city: string;
  street: string;
  house_number: number | null;
  flat_number: number | null;
}

export const initialStateUserData: IUserCreate = {
  full_name: '',
  date_of_birth: null,
  series_passport: '',
  date_of_issue_of_passport: null,
  id_authority_that_issued_the_passport: null,
  ITN: '',
  email: '',
  id_role: null,
  id_organizations: null,
  passport_number: '',
  id_position: null,
  region: '',
  city: '',
  street: '',
  house_number: null,
  flat_number: null,
};

export interface IUserCheck {
  full_name: boolean;
  series_passport: boolean;
  id_authority_that_issued_the_passport: boolean;
  ITN: boolean;
  email: boolean;
  id_role: boolean;
  id_organizations: boolean;
  passport_number: boolean;
  id_position: boolean;
  region: boolean;
  city: boolean;
  street: boolean;
  house_number: boolean;
}

export const initialCheckState: IUserCheck = {
  full_name: true,
  series_passport: true,
  id_authority_that_issued_the_passport: true,
  ITN: true,
  email: true,
  id_role: true,
  id_organizations: true,
  passport_number: true,
  id_position: true,
  region: true,
  city: true,
  street: true,
  house_number: true,
};
