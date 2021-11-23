export interface UserDTO {
  id: number;
  full_name: string;
  date_of_birth: string;
  series_passport: string | null;
  date_of_issue_of_passport: string;
  id_authority_that_issued_the_passport: number;
  ITN: string;
  email: string;
  id_role: number;
  id_organizations: number;
  id_adress: number;
  id_position: number;
  passport_number: string;
}
