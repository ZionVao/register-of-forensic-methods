import { UserDTO } from '../../common/dtos/user/UserDTO';

export class UserMapper {
  public static toDTO(value: { [x: string | number]: any }): UserDTO {
    return {
      id: value.id,
      full_name: value.full_name,
      date_of_birth: new Date(value.date_of_birth),
      series_passport: value.series_passport,
      date_of_issue_of_passport: new Date(value.date_of_issue_of_passport),
      id_authority_that_issued_the_passport:
        value.id_authority_that_issued_the_passport,
      ITN: value.ITN,
      email: value.email,
      id_role: value.id_role,
      id_organizations: value.id_organizations,
    };
  }
}
