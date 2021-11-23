export interface UserCreateDTO {
  full_name: string;
  date_of_birth: Date;
  series_passport: string | null;
  date_of_issue_of_passport: Date;
  id_authority_that_issued_the_passport: number;
  ITN: string;
  email: string;
  id_role: number;
  id_organizations: number;
  passport_number: string;
  id_position: string;
  region: string;
  city: string;
  street: string;
  house_number: number;
  flat_number: number | null;
}
