export interface UserCreateDTO {
  full_name: string;
  date_of_birth: Date;
  series_passport: string;
  date_of_issue_of_passport: Date;
  id_authority_that_issued_the_passport: number;
  ITN: number;
  email: string;
  id_role: number;
  id_organizations: number;
}
