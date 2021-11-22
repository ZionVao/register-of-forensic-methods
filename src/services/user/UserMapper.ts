import { UserDTO } from '../../common/dtos/user/UserDTO';

export class UserMapper {
  public static toDTO(value: { [x: string | number]: any }): UserDTO {
    return {
      id: value.id,
      full_name: value.full_name,
      date_of_birth: new Date(value.date_of_birth).toDateString(),
      series_passport: value.series_passport || null,
      date_of_issue_of_passport: new Date(
        value.date_of_issue_of_passport,
      ).toDateString(),
      id_authority_that_issued_the_passport:
        value.id_authority_that_issued_the_passport,
      ITN: value.ITN,
      email: value.email,
      id_role: value.id_role,
      id_organizations: value.id_organizations,
      id_adress: value.id_adress,
      id_position: value.id_position,
      passport_number: value.passport_number,
    };
  }
}
