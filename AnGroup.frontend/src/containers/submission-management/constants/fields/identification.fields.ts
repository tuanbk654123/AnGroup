import { IDataFields } from '../../index.types'

export const IdCardFields: IDataFields[] = [
  {
    label: 'ID Card Type',
    name: 'idcardType',
    type: 'selectbox',
  },
  {
    label: 'Id No',
    name: 'idPpNumber',
    require: true,
  },
  {
    label: 'Full Name',
    name: 'fullname',
    require: true,
  },
  {
    label: 'B.O.D',
    name: 'dob',
    require: true,
  },
  {
    label: 'Sex',
    name: 'gender',
    type: 'selectbox',
  },
  {
    label: 'Birth Place',
    name: 'birthPlace',
  },
  {
    label: 'Address No',
    name: 'permAddressNo',
  },
  {
    label: 'Address City',
    name: 'permAddressCity',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Address District',
    name: 'permAddressDistrict',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'permAddressCity',
    },
  },
  {
    label: 'Address Ward',
    name: 'permAddressWard',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'permAddressDistrict',
    },
  },
  {
    label: 'Address Street',
    name: 'permAddressStreet',
  },
  {
    label: 'Issuance Date',
    name: 'issuanceDate',
    require: true,
    type: 'date',
  },
  {
    label: 'Place Of Issue',
    name: 'placeOfIssue',
    require: true,
  },
  {
    label: 'Nationality',
    name: 'nationality',
    require: true,
  },
  {
    label: 'ID Expiry Date',
    name: 'idSecondExpiredDate',
    require: true,
    type: 'date',
  },
]
