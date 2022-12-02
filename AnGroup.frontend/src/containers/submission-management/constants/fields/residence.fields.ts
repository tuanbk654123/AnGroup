import { IDataFields } from '../../index.types'

export const ResidenceCoverFields: IDataFields[] = [
  {
    label: 'Residence No',
    name: 'rdPermBookNo',
  },
  {
    label: 'Residence Owner Name',
    name: 'rdPermOwnerName',
  },
  {
    label: 'Perm Address No',
    name: 'permAddressNo',
  },
  {
    label: 'Perm Address City',
    name: 'permAddressCity',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Perm Address District',
    name: 'permAddressDistrict',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'permAddressCity',
    },
  },
  {
    label: 'Perm Address Ward',
    name: 'permAddressWard',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'permAddressDistrict',
    },
  },
  {
    label: 'Perm Address Street',
    name: 'permAddressStreet',
  },
  {
    label: 'Perm Issuer',
    name: 'permIssuer',
  },
]

export const ResidenceCustomerField: IDataFields[] = [
  {
    label: 'Perm Name',
    name: 'permName',
  },
  {
    label: 'Perm ID Card Number',
    name: 'permIdPpNo',
  },
  {
    label: 'Perm D.O.B',
    name: 'permDob',
    type: 'date',
  },
  {
    label: 'Perm Birthplace',
    name: 'permBirthplace',
  },
  {
    label: 'Perm Date Resigtered',
    name: 'permDateRegistered',
    type: 'date',
  },
  {
    label: 'Perm Move In Date',
    name: 'rdPermMoveInDate',
    type: 'date',
  },
  {
    label: 'Perm Move Out Date',
    name: 'rdPermMoveOutDate',
    type: 'date',
  },
]

export const ResidenceHostField: IDataFields[] = [
  {
    label: 'Residence No',
    name: 'rdPermBookNo',
  },
  {
    label: 'Residence Owner Name',
    name: 'rdPermOwnerName',
  },
  {
    label: 'Perm Address No',
    name: 'permAddressNo',
  },
  {
    label: 'Perm Address City',
    name: 'permAddressCity',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Perm Address District',
    name: 'permAddressDistrict',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'permAddressCity',
    },
  },
  {
    label: 'Perm Address Ward',
    name: 'permAddressWard',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'permAddressDistrict',
    },
  },
  {
    label: 'Perm Address Street',
    name: 'permAddressStreet',
  },
  {
    label: 'Perm Issuer',
    name: 'permIssuer',
  },
  {
    label: 'Perm Name',
    name: 'permName',
  },
  {
    label: 'Perm ID Card Number',
    name: 'permIdPpNo',
  },
  {
    label: 'Perm D.O.B',
    name: 'permDob',
    type: 'date',
  },
  {
    label: 'Perm Birthplace',
    name: 'permBirthplace',
  },
  {
    label: 'Issuance Date',
    name: 'permDateRegistered',
    type: 'date',
  },
  {
    label: 'Perm Move In Date',
    name: 'rdPermMoveInDate',
    type: 'date',
  },
  {
    label: 'Perm Move Out Date',
    name: 'rdPermMoveOutDate',
    type: 'date',
  },
]

export const ResidenceFields = [...ResidenceCoverFields, ...ResidenceCustomerField, ...ResidenceHostField]
