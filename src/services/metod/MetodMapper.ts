import { MetodDTO } from '../../common/dtos/metod/MetodDTO';

export class MetodMapper {
  public static toDTO(value: { [x: string | number]: any }): MetodDTO {
    return {
      id: value.id,
      registration_code: value.registration_code,
      id_domaims: value.id_domaims,
      name: value.name,
      year_creation: new Date(value.year_creation),
      year_making_change: value.year_making_change
        ? new Date(value.year_making_change)
        : null,
      year_termination_application: value.year_termination_application
        ? new Date(value.year_termination_application)
        : null,
      date_of_decision_on_state_registration: new Date(
        value.date_of_decision_on_state_registration,
      ),
      date_of_decision_on_state_registration_of_changes:
        value.date_of_decision_on_state_registration_of_changes
          ? new Date(value.date_of_decision_on_state_registration_of_changes)
          : null,
      date_of_decision_to_terminate_the_application:
        value.date_of_decision_to_terminate_the_application
          ? new Date(value.date_of_decision_to_terminate_the_application)
          : null,
      doc_copy_of_method: value.doc_copy_of_method,
      doc_report_review: value.doc_report_review,
      doc_certificate_of_approbation: value.doc_certificate_of_approbation,
      doc_copy_of_implementation: value.doc_copy_of_implementation,
      doc_discount_card: value.doc_discount_card,
    };
  }
}
