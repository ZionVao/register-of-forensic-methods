import { TypeDTO } from '../../common/dtos/type/TypeDTO';

export class TypeMapper {
  public static toDTO(value: { [x: string | number]: any }): TypeDTO {
    return {
      id: value.id,
      name: value.name,
      domains: value.domains.map((e: { [x: string]: string | number }) => ({
        id: e.id,
        name: e.name,
        id_types: e.id_types,
      })),
    };
  }
}
