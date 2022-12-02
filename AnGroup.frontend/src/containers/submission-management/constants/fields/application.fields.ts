import { IDataFields } from '../../index.types'

export const ApplicationLoanPage1Fields: IDataFields[] = [
  {
    label: 'Application Date',
    name: 'afApplicationDate',
    type: 'date',
  },
  {
    label: 'Contract No',
    name: 'afContractNo',
  },
  {
    label: 'Loan Amount',
    name: 'afLoanAmount',
  },
  {
    label: 'Loan Amount Other',
    name: 'cfLoanAmountOther',
  },
  {
    label: 'Loan Tenor',
    name: 'afLoanTenor',
    type: 'selectbox',
  },
  {
    label: 'Loan Tenor Other',
    name: 'cfLoanTenorOther',
  },
  {
    label: 'Interest',
    name: 'afInterest',
  },
  {
    label: 'Interest Other',
    name: 'cfInterestOther',
  },
  {
    label: 'Loan Purpose',
    name: 'afLoanPurpose',
    type: 'selectbox',
  },
  {
    label: 'Full Name',
    name: 'fullName',
    require: true,
  },
  {
    label: 'Full Name VN',
    name: 'cfFullNameCustVn',
    require: true,
  },
  {
    label: 'Sex',
    name: 'gender',
    require: true,
    type: 'selectbox',
  },
  {
    label: 'D.O.B',
    name: 'dateOfBirth',
    require: true,
    type: 'date',
  },
  {
    label: 'Place Of Birth',
    name: 'AfPlaceOfBirth',
  },
  {
    label: 'ID Card Number',
    name: 'idNumber',
    require: true,
  },
  {
    label: 'ID Exprity Date',
    name: 'idExpiryDate',
    type: 'date',
  },
  {
    label: 'Passport Number',
    name: 'passportNumber1',
  },
  {
    label: 'Passport Expired Date',
    name: 'cfPassportExpiredDate',
    type: 'date',
  },
  {
    label: 'Old ID Card Number',
    name: 'oldIdPpNo',
  },
  {
    label: 'Nationality',
    name: 'nationality1',
  },
  {
    label: 'Pricard Us Residence',
    name: 'afPricardUsResident',
    type: 'selectbox',
  },
  {
    label: 'Perm Residence Address Number',
    name: 'permResidAddr1',
  },
  {
    label: 'Prem Residence Address Province',
    name: 'permResidAddr5',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Perm Residence Address District',
    name: 'permResidAddr4',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'permResidAddr5',
    },
  },
  {
    label: 'Perm Residence Address Ward',
    name: 'permResidAddr3',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'permResidAddr4',
    },
  },
  {
    label: 'Perm Residence Address Street',
    name: 'permResidAddr2',
    addressOptionConfig: {
      level: 5,
      dependOnFieldName: 'permResidAddr3',
    },
  },
  {
    label: 'Temp Address Number',
    name: 'tempAddressLine1',
  },
  {
    label: 'Temp Address Province',
    name: 'tempAddressLine5',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Temp Address District',
    name: 'tempAddressLine4',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'tempAddressLine5',
    },
  },
  {
    label: 'Temp Address Ward',
    name: 'tempAddressLine3',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'tempAddressLine4',
    },
  },
  {
    label: 'Temp Address Street',
    name: 'tempAddressLine2',
  },
  {
    label: 'Years At Home Address',
    name: 'yrsAtHomeAddress',
  },
  {
    label: 'Months At Home Address',
    name: 'mtsAtHomeAddress',
  },
  {
    label: 'Mean Of Transport',
    name: 'meanOfTransport',
    type: 'selectbox',
  },
  {
    label: 'Residence Type',
    name: 'residenceType',
    type: 'selectbox',
  },
  {
    label: 'Home Ownership',
    name: 'homeOwnership',
    type: 'selectbox',
  },
]

export const ApplicationLoanPage2Fields: IDataFields[] = [
  {
    label: 'Home Phone',
    name: 'homePhoneNbr',
  },
  {
    label: 'Mobile Phone',
    name: 'mobilePhoneNbr',
    require: true,
  },
  {
    label: 'Email Address',
    name: 'emailAddress',
    require: true,
  },
  {
    label: 'Email Address Work',
    name: 'cfEmailAddressWork',
  },
  {
    label: 'Marital Status',
    name: 'maritalStatus',
    type: 'selectbox',
    require: true,
  },
  {
    label: 'Number Of Dependents',
    name: 'numberOfDependents',
  },
  {
    label: 'Education Level',
    name: 'educationLevel',
    type: 'selectbox',
  },
  {
    label: 'Occupation Type',
    name: 'occupationType',
    type: 'selectbox',
  },
  {
    label: 'Name Of Firm Employer',
    name: 'nameOfFirmEmplyr',
  },
  {
    label: 'Company Tax Code',
    name: 'companyTaxCode',
  },
  {
    label: 'Office Phone Number',
    name: 'officePhoneNumber',
  },
  {
    label: 'Office Address Number',
    name: 'officeAddressLine1',
  },
  {
    label: 'Office Address Province',
    name: 'officeAddressLine5',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Office Address District',
    name: 'officeAddressLine4',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'officeAddressLine5',
    },
  },
  {
    label: 'Office Address Ward',
    name: 'officeAddressLine3',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'officeAddressLine4',
    },
  },
  {
    label: 'Office Address Street',
    name: 'officeAddressLine2',
  },
  {
    label: 'Business Type',
    name: 'businessType',
    type: 'selectbox',
  },
  {
    label: 'Current Position',
    name: 'currentPosition',
    type: 'selectbox',
  },
  {
    label: 'Joining time',
    name: 'joiningTime',
    type: 'datejoining'
  },
  {
    label: 'Gross Monthly Income',
    name: 'grossMthlyIncome',
  },
  {
    label: 'Previous Company Name',
    name: 'previousCompanyName',
  },
  {
    label: 'Years At Previous Employer',
    name: 'yrsAtPrevEmploy',
  },
  {
    label: 'Months At Previous Employer',
    name: 'mthsAtPrevEmploy',
  },
  {
    label: 'Total Number Years Working',
    name: 'totNbrYrsWorking',
  },
  {
    label: 'Total Number Months Working',
    name: 'totNbrMthsWorking',
  },
  {
    label: 'Name Of Spouse',
    name: 'nameOfSpouse',
  },
  {
    label: 'Gender Of Family People',
    name: 'l2Gender',
    type: 'selectbox',
  },
  {
    label: 'Spouse Relationship',
    name: 'afSpouseRelationship',
  },
  {
    label: 'Spouse ID Number',
    name: 'spouseIdNumber',
  },
]

export const ApplicationLoanPage3Fields: IDataFields[] = [
  {
    label: 'Spouse Phone Number',
    name: 'spousePhoneNumber',
  },
  {
    label: 'Spouse Mobile',
    name: 'spouseMobile',
  },
  {
    label: 'Reference Name',
    name: 'referenceName',
  },
  {
    label: 'Ref Relationship With Borrower',
    name: 'afReferenceRelationBorrower',
  },
  {
    label: 'Ref ID Card Number',
    name: 'cfRefIdCardNo',
  },
  {
    label: 'Ref Home Phone',
    name: 'refHomePh',
  },
  {
    label: 'Ref Mobile',
    name: 'refMobile',
  },
  {
    label: 'Capital Total',
    name: 'cfCapitalTotal',
  },
  {
    label: 'Capital Owner',
    name: 'cfCapitalOwner',
  },
  {
    label: 'Capital Borrow',
    name: 'cfCapitalBorrow',
  },
  {
    label: 'Capital Other',
    name: 'cfCapitalOther',
  },
  {
    label: 'Tranfer Data',
    name: 'cfTranferData',
    type: 'selectbox',
  },
  {
    label: 'Customer Signature',
    name: 'afCustomerSignature',
  },
  {
    label: 'L3 Name',
    name: 'l3Name',
  },
]

export const ApplicationLoanPage4Fields: IDataFields[] = [
  {
    label: 'Source Code',
    name: 'sourceCode',
  },
  {
    label: 'Sale Agent Signature 1',
    name: 'saleAgentSignature1',
  },
  {
    label: 'Sale Agent Signature 2',
    name: 'saleAgentSignature2',
  },
  {
    label: 'Sale Agent Name 1',
    name: 'saleAgentName1',
  },
  {
    label: 'Sale Agent Name 2',
    name: 'saleAgentName2',
  },
  {
    label: 'Sale Agent Number 1',
    name: 'saleAgentNumber1',
  },
  {
    label: 'Sale Agent Number 2',
    name: 'saleAgentNumber2',
  },
]

export const ApplicationLoanPage11Fields: IDataFields[] = [
  {
    label: 'Account Opening Signature',
    name: 'afAccountOpeningSignature',
  },
  {
    label: 'Account Opening Customer Name',
    name: 'afAccountOpeningCustomer',
  },
  {
    label: 'Date Of Account Opening Request',
    name: 'afDateOfAccountOpening',
    type: 'date',
  },
  {
    label: 'Account Opening',
    name: 'cfAccountOpening',
    type: 'selectbox',
  },
  {
    label: 'Account Curency',
    name: 'cfAccountCurrency',
    type: 'selectbox',
  },
  {
    label: 'Account Password',
    name: 'cfAccountPassword',
    type: 'selectbox',
  },
  {
    label: 'Account Language',
    name: 'cfAccountLanguage',
    type: 'selectbox',
  },
  {
    label: 'Recieve SMS',
    name: 'cfRecieveSms',
    type: 'selectbox',
  },
  {
    label: 'Refuse SMS From',
    name: 'cfRefuseSmsFrom',
  },
  {
    label: 'Refuse SMS To',
    name: 'cfRefuseSmsTo',
  },
]

export const ApplicationCreditPage1Fields: IDataFields[] = [
  {
    label: 'Card Form',
    name: 'cardForm',
    type: 'selectbox',
  },
  {
    label: 'Card Type Or Customer Category',
    name: 'afCardTypeOrCatergoryPl',
    type: 'selectbox',
  },
  {
    label: 'Membership ID 1',
    name: 'cfMembershipId',
  },
  {
    label: 'Membership ID 2',
    name: 'cfMembershipId2',
  },
  {
    label: 'Membership Name',
    name: 'cfMembershipName',
  },
  {
    label: 'Membership First',
    name: 'cfMembershipFirst',
  },
  {
    label: 'Accepted Another Card',
    name: 'afAcceptCardOtherPl',
    type: 'selectbox',
  },
  {
    label: 'Full Name',
    name: 'fullName',
  },
  {
    label: 'Full Name VN',
    name: 'cfFullNameCustVn',
  },
  {
    label: 'Embossing Name',
    name: 'embossingName',
  },
  {
    label: 'Sex',
    name: 'gender',
    type: 'selectbox',
  },
  {
    label: 'D.O.B',
    name: 'dateOfBirth',
    type: 'date',
  },
  {
    label: 'ID Card Number',
    name: 'idNumber',
  },
  {
    label: 'ID Card Issued Date',
    name: 'cfIdIssuedDate',
    type: 'date',
  },
  {
    label: 'ID Card Issued Place',
    name: 'idCardIssuedPlace',
  },
  {
    label: 'Old ID Card Number',
    name: 'oldIdPpNo',
  },
  {
    label: 'Tax Code',
    name: 'cc1TaxCode',
  },
  {
    label: 'Nationality',
    name: 'nationality',
  },
  {
    label: 'Nationality 1',
    name: 'nationality1',
  },
  {
    label: 'Visa Number',
    name: 'afVisaNumber',
  },
  {
    label: 'Visa Expiration Date',
    name: 'aVisaExpirationDate',
    type: 'date',
  },
  {
    label: 'Marital Status',
    name: 'maritalStatus',
    type: 'selectbox',
  },

  {
    label: 'Perm Residence Address Province',
    name: 'permResidAddr5',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Perm Residence Address District',
    name: 'permResidAddr4',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'permResidAddr5',
    },
  },
  {
    label: 'Perm Residence Address Ward',
    name: 'permResidAddr3',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'permResidAddr4',
    },
  },
  {
    label: 'Perm Residence Address Street',
    name: 'permResidAddr1',
  },
  {
    label: 'Temp Address Province',
    name: 'tempAddressLine5',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Temp Address District',
    name: 'tempAddressLine4',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'tempAddressLine5',
    },
  },
  {
    label: 'Temp Address Ward',
    name: 'tempAddressLine3',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'tempAddressLine4',
    },
  },
  {
    label: 'Temp Address Street',
    name: 'tempAddressLine1',
  },
  {
    label: 'Years At Home Address',
    name: 'yrsAtHomeAddress',
  },
  {
    label: 'Months At Home Address',
    name: 'mtsAtHomeAddress',
  },
  {
    label: 'Home Ownership',
    name: 'homeOwnership',
    type: 'selectbox',
  },
  {
    label: 'Home Phone ',
    name: 'homePhoneNbr',
  },
  {
    label: 'Mobile Phone',
    name: 'mobilePhoneNbr',
  },
  {
    label: 'Email Address',
    name: 'emailAddress',
  },
  {
    label: 'Occupation Type',
    name: 'occupationType',
    type: 'selectbox',
  },
  {
    label: 'Business Type',
    name: 'businessType',
    type: 'selectbox',
  },
  {
    label: 'Industry',
    name: 'industry',
    type: 'selectbox',
  },
  {
    label: 'Current Position',
    name: 'currentPosition',
    type: 'selectbox',
  },
]

export const ApplicationCreditPage2Fields: IDataFields[] = [
  {
    label: 'Name Of Firm Employer',
    name: 'nameOfFirmEmplyr',
  },
  {
    label: 'Department',
    name: 'department',
  },
  {
    label: 'Company Tax Code',
    name: 'companyTaxCode',
  },
  {
    label: 'Office Phone Number',
    name: 'officePhoneNumber',
  },
  {
    label: 'Office Address Province',
    name: 'officeAddressLine5',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Office Address District',
    name: 'officeAddressLine4',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'officeAddressLine5',
    },
  },
  {
    label: 'Office Address Ward',
    name: 'officeAddressLine3',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'officeAddressLine4',
    },
  },
  {
    label: 'Office Address Street',
    name: 'officeAddressLine1',
  },
  {
    label: 'Previous Company Name',
    name: 'previousCompanyName',
  },
  {
    label: 'Years At Previous Employer',
    name: 'yrsAtPrevEmploy',
  },
  {
    label: 'Months At Previous Employer',
    name: 'mthsAtPrevEmploy',
  },
  {
    label: 'Gross Monthly Income',
    name: 'grossMthlyIncome',
  },
  {
    label: 'Years At Current Employer',
    name: 'yrsAtCurrentEmply',
  },
  {
    label: 'Months At Current Employer',
    name: 'mthsAtCurrentEmpl',
  },
  {
    label: 'Spouse Nationality',
    name: 'afSpouseNationality',
  },
  {
    label: 'Spouse Phone Number',
    name: 'spousePhoneNumber',
  },
  {
    label: 'Spouse Firm Employer',
    name: 'spouseFirmEmployer',
  },
  {
    label: 'Spouse Mobile',
    name: 'spouseMobile',
  },
  {
    label: 'Spouse Id Number',
    name: 'spouseIdNumber',
  },
  {
    label: 'Name Of Spouse',
    name: 'nameOfSpouse',
  },
  {
    label: 'Office Address Province Spouse',
    name: 'spouseOffAddress5',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Office Address District Spouse',
    name: 'spouseOffAddress4',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'spouseOffAddress5',
    },
  },
  {
    label: 'Office Address Ward Spouse',
    name: 'spouseOffAddress3',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'spouseOffAddress4',
    },
  },
  {
    label: 'Office Address Street Spouse',
    name: 'spouseOffAddress1',
  },
  {
    label: 'Estatement Register',
    name: 'afEstatementRegister',
    type: 'selectbox',
  },
  {
    label: 'Payment Date',
    name: 'paymentDate',
    type: 'selectbox',
  },
  {
    label: 'CC2 Job Type',
    name: 'cc2JobType',
    type: 'selectbox',
  },
  {
    label: 'Sign For Auto Indic',
    name: 'signForAutoIndic',
    type: 'selectbox',
  },
  {
    label: 'Auto Dr Shinhan Act Number',
    name: 'autoDrShinhanActNbr',
  },
  {
    label: 'Auto Reppayment',
    name: 'autoRepaymentAmt',
    type: 'selectbox',
  },
  {
    label: 'Account Currency',
    name: 'cfAccountCurrency',
    type: 'selectbox',
  },
  {
    label: 'Account Password',
    name: 'cfAccountPassword',
    type: 'selectbox',
  },
]

export const ApplicationCreditPage3Fields: IDataFields[] = [
  {
    label: 'Address Foe Del Stmt',
    name: 'addressFoeDelStmt',
    type: 'selectbox',
  },
  {
    label: 'Card Delivery Method',
    name: 'cardDeliveryMethod',
    type: 'selectbox',
  },
  {
    label: 'Apply SMS',
    name: 'applysms',
    type: 'selectbox',
  },
  {
    label: 'SMS Language',
    name: 'smslanguage',
    type: 'selectbox',
  },
  {
    label: 'ATM Funtion',
    name: 'amtfunction',
    type: 'selectbox',
  },
  {
    label: 'MGM Referal',
    name: 'mgmReferal',
  },
  {
    label: 'Supp',
    name: 'supp1YN',
  },
  {
    label: 'Supp Full Name',
    name: 'suppFullName',
  },
  {
    label: 'Supp Emb Name 1',
    name: 'suppEmbNameLine1',
  },
  {
    label: 'Supp Gender',
    name: 'supp1Gender',
    type: 'selectbox',
  },
  {
    label: 'Supp D.O.B',
    name: 'supp1Dob',
  },
  {
    label: 'Supp ID Number',
    name: 'suppIdNumber',
  },
  {
    label: 'Supp Nationality',
    name: 'suppNationality',
  },
  {
    label: 'Supp Relationship',
    name: 'supp1Relationship',
    type: 'selectbox',
  },
  {
    label: 'Current Address',
    name: 'cc3CurrentAddressCardOwner',
  },
  {
    label: 'Sup Temp Province',
    name: 'afSupTempAdd5',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Sup Temp District',
    name: 'afSupTempAdd4',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'afSupTempAdd5',
    },
  },
  {
    label: 'Sup Temp Ward',
    name: 'afSupTempAdd3',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'afSupTempAdd4',
    },
  },
  {
    label: 'Sup Temp Street',
    name: 'afSupTempAdd1',
  },
  {
    label: 'Reference Name',
    name: 'referenceName',
  },
  {
    label: 'Ref Mobile',
    name: 'refMobile',
  },
  {
    label: 'Pricard Us Resident',
    name: 'afPricardUsResident',
    type: 'selectbox',
  },
]

export const ApplicationCreditPage4Fields: IDataFields[] = [
  {
    label: 'Sale Agent Number 1',
    name: 'saleAgentNumber1',
  },
  {
    label: 'Sale Agent Name 1',
    name: 'saleAgentName1',
  },
  {
    label: 'Sale Agent Signature 1',
    name: 'saleAgentSignature1',
  },
  {
    label: 'Sale Agent Number 2',
    name: 'saleAgentNumber2',
  },
  {
    label: 'Sale Agent Name 2',
    name: 'saleAgentName2',
  },
  {
    label: 'Sale Agent Signature 2',
    name: 'saleAgentSignature2',
  },
  {
    label: 'CC4 Note For Card Owner',
    name: 'cc4NoteForCardOwner',
  },
  {
    label: 'Date Applicant Signed',
    name: 'dateApplicantSigned',
    type: 'date',
  },
  {
    label: 'Supp Signed',
    name: 'suppSignedYN',
  },
  {
    label: 'CC4 Card Owner Sign Date',
    name: 'cc4CardOwnerSignDate',
    type: 'date',
  },
  {
    label: 'Secured Card Account',
    name: 'afSecuredCardAccount',
  },
  {
    label: 'Secured Card Deposit Balance',
    name: 'afSecuredDepositBalance',
  },
  {
    label: 'Referal Channel',
    name: 'referalChannel',
    type: 'selectbox',
  },
  {
    label: 'Promotion Code',
    name: 'promotionCode',
  },
  {
    label: 'Receiving Branch',
    name: 'receivingBranch',
  },
]

export const ApplicationEformLoanPage1Fields: IDataFields[] = [
  {
    label: 'Info Cust Fax Number',
    name: 'infoCustFaxNumber',
  },
  {
    label: 'Info Cust Temporary Month',
    name: 'infoCustTemporaryMonth',
  },
  {
    label: 'Info Cust Temporary Year',
    name: 'infoCustTemporaryYear',
  },
  {
    label: 'Info Cust Temporary Resident',
    name: 'infoCustTemporaryResident',
  },
  {
    label: 'Info Cust Mailing No',
    name: 'infoCustMailingNo',
  },
  {
    label: 'Info Cust Mailing Ward',
    name: 'infoCustMailingWard',
  },
  {
    label: 'Info Cust Mailing District',
    name: 'infoCustMailingDistrict',
  },
  {
    label: 'Info Cust Mailing City',
    name: 'infoCustMailingCity',
  },
  {
    label: 'Info Cust Mailing Mat Resident',
    name: 'infoCustMailingMatResident',
  },
  {
    label: 'Info Cust Is Person Us',
    name: 'infoCustIsPersonUs',
  },
  {
    label: 'Info Cust Nationlity 2 Address',
    name: 'infoCustNationlity2Address',
  },
  {
    label: 'Info Cust Nationlity 2',
    name: 'infoCustNationality2',
  },
  {
    label: 'Info Cust Passport Expired',
    name: 'infoCustPassportExpried',
  },
  {
    label: 'Info Cust Passport Before',
    name: 'infoCustPassportBefore',
  },
  {
    label: 'Info Cust Id Card Expired',
    name: 'infoCustIdcardExpired',
  },
]

export const ApplicationEformLoanPage2Fields: IDataFields[] = [
  {
    label: 'Info Credit',
    name: 'infoCredit',
  },
  {
    label: 'Info Loan Amount',
    name: 'infoLoanAmount',
  },
]

export const ApplicationEformLoanPage3Fields: IDataFields[] = [
  {
    label: 'Use Contact Nationality',
    name: 'useContactNationality',
  },
  {
    label: 'Use Contact Gender',
    name: 'useContactGender',
  },
  {
    label: 'Use Contact Phone',
    name: 'useContactPhone',
  },
  {
    label: 'Use Contact Home Phone',
    name: 'useContactHomePhone',
  },
  {
    label: 'Use Contact Home Number',
    name: 'useContactHomeNumber',
  },
  {
    label: 'Use Contact Street',
    name: 'useContactStreet',
  },
  {
    label: 'Use Contact Wards',
    name: 'useContactWards',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'useContactDistrict',
    },
  },
  {
    label: 'Use Contact District',
    name: 'useContactDistrict',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'useContactCity',
    },
  },
  {
    label: 'Use Contact City',
    name: 'useContactCity',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Use Ref Phone',
    name: 'useRefPhone',
  },
  {
    label: 'Use Ref Phone Number',
    name: 'useRefPhoneNumber',
  },
  {
    label: 'Use Ref Nationlity',
    name: 'useRefNationality',
  },
  {
    label: 'Use Ref Company Phone',
    name: 'useRefCompanyPhone',
  },
  {
    label: 'Use Ref Company',
    name: 'useRefCompany',
  },
  {
    label: 'Use Ref Home Number',
    name: 'useRefHomeNumber',
  },
  {
    label: 'Use Ref Street',
    name: 'useRefStreet',
  },
  {
    label: 'Use Ref Wards',
    name: 'useRefWards',
    type: 'address',
    addressOptionConfig: {
      level: 4,
      dependOnFieldName: 'useRefDistrict',
    },
  },
  {
    label: 'Use Ref District',
    name: 'useRefDistrict',
    type: 'address',
    addressOptionConfig: {
      level: 3,
      dependOnFieldName: 'useRefCity',
    },
  },
  {
    label: 'Use Ref City',
    name: 'useRefCity',
    type: 'address',
    addressOptionConfig: {
      level: 3,
    },
  },
  {
    label: 'Use Ref Gender',
    name: 'useRefGender',
    type: 'selectbox'
  },
]

export const ApplicationEformLoanPage4Fields: IDataFields[] = [
  {
    label: 'Sub Info Income',
    name: 'subInfoIncome',
    // type: 'formlist'
  },
  {
    label: 'Sub Attach Indentify Doc',
    name: 'subAttachIdentityDoc',
  },
  {
    label: 'Use Bank Date Two',
    name: 'useBankDateTwo',
  },
  {
    label: 'Use Bank Date One',
    name: 'useBankDateOne',
  },
  {
    label: 'Use Bank Cust Type',
    name: 'useBankCustType',
  },
  {
    label: 'Use Loan Used',
    name: 'useLoanUsed',
  },
  {
    label: 'Use Loan Is Compensation',
    name: 'useLoanIsCompensation',
  },
  {
    label: 'Use Loan Is Pay Beneficiary',
    name: 'useLoanIsPayBeneficiary',
  },
  {
    label: 'Use Loan Is Pay Acc Self',
    name: 'useLoanIsPayAccSelf',
  },
]

export const ApplicationEformLoanPage11Fields: IDataFields[] = [
  {
    label: 'Sms Is Pay Taxes Us',
    name: 'smsIsPayTaxesUs',
  },
]

export const ApplicationEformCreditPage2Fields: IDataFields[] = [
  {
    label: 'Info Finance Ref Phone',
    name: 'infoFinanceRefPhone',
  },
  {
    label: 'Info Finance Ref Company',
    name: 'infoFinanceRefCompany',
  },
  {
    label: 'Info Finance Ref Fullname',
    name: 'infoFinanceRefFullname',
  },
  {
    label: 'Info Finance Loan Amount',
    name: 'infoFinanceLoanAmount',
  },
  {
    label: 'Info Finance Card Other',
    name: 'infoFinanceCardOther',
  },
  {
    label: 'Info Credit',
    name: 'infoCredit',
  },
]

export const ApplicationEformCreditPage3Fields: IDataFields[] = [
  {
    label: 'Info Card Extra Place Issue',
    name: 'infoCardExtraPlaceIssue',
  },
  {
    label: 'Info Card Extra Date Issue',
    name: 'infoCardExtraDateIssue',
    type: 'date',
  },
  {
    label: 'Origin Asset Income',
    name: 'originAssetIncome',
  },
]

export const ApplicationLoanFields: IDataFields[] = [
  ...ApplicationLoanPage1Fields,
  ...ApplicationLoanPage2Fields,
  ...ApplicationLoanPage3Fields,
  ...ApplicationLoanPage4Fields,
  ...ApplicationLoanPage11Fields,
]

export const ApplicationCreditFields: IDataFields[] = [
  ...ApplicationCreditPage1Fields,
  ...ApplicationCreditPage2Fields,
  ...ApplicationCreditPage3Fields,
  ...ApplicationCreditPage4Fields,
]

export const ApplicationEformLoanFields: IDataFields[] = [
  ...ApplicationEformLoanPage1Fields,
  ...ApplicationEformLoanPage2Fields,
  ...ApplicationEformLoanPage3Fields,
  ...ApplicationEformLoanPage4Fields,
  ...ApplicationEformLoanPage11Fields,
]

export const ApplicationEformCreditFields: IDataFields[] = [
  ...ApplicationEformCreditPage2Fields,
  ...ApplicationEformCreditPage3Fields,
]

export const ApplicationAllFields = [
  ...ApplicationLoanFields,
  ...ApplicationCreditFields,
  ...ApplicationEformLoanFields,
  ...ApplicationEformCreditFields,
]
