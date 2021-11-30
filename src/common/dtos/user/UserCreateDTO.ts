export interface UserCreateDTO {
  full_name: string;
  date_of_birth: string;
  series_passport: string | null;
  date_of_issue_of_passport: string;
  id_authority_that_issued_the_passport: number;
  ITN: string;
  email: string;
  id_organizations: number;
  passport_number: string;
  id_position: number;
  region: string;
  city: string;
  street: string;
  house_number: string;
  flat_number: number | null;
}
