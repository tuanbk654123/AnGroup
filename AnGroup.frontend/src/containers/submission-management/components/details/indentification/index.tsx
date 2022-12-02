import { IdCardFields } from '~/containers/submission-management/constants/fields'
import DetailsForm from '../../details/form'

export default function IndentificationEditForm() {
  return <DetailsForm dataKey="idDoc" dataFields={IdCardFields} />
}
