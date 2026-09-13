export interface Scheme {
  id: string
  ministry: string
  name: string
  purpose: string
  maxLoan: string
  interest: string
  subsidy: string
  eligible: string[]
  maxIncome: string
  description: string
  documents: string[]
  features: string[]
}

export const SCHEMES: Scheme[] = [
  {
    id: 'nsfdc-term-loan',
    ministry: 'NSFDC',
    name: 'Term Loan Scheme',
    purpose: 'Self-Employment / Income Generation',
    maxLoan: '₹15,00,000',
    interest: '6% p.a.',
    subsidy: 'Interest subsidy for SC/ST women',
    eligible: ['SC', 'ST'],
    maxIncome: '₹3,00,000 per annum',
    description:
      'NSFDC Term Loan supports SC/ST beneficiaries in establishing income-generating activities including small businesses, trade, transport, and service enterprises.',
    documents: [
      'Caste Certificate (SC/ST)',
      'Income Certificate from competent authority',
      'Proof of Identity (Aadhaar / Voter ID)',
      'Proof of Residence',
      'Business Plan / Project Report',
      'Bank Account Statement (6 months)',
      'Photographs (passport size)',
    ],
    features: [
      'Loan up to ₹15 lakh for income-generating activities',
      'Concessional interest rate of 6% p.a.',
      'Additional interest concession for SC/ST women beneficiaries',
      'Repayment period up to 10 years',
      'Channelled through State Channelising Agencies (SCAs)',
    ],
  },
  {
    id: 'nbcfdc-education-loan',
    ministry: 'NBCFDC',
    name: 'Educational Loan Scheme',
    purpose: 'Higher Education (Technical / Professional)',
    maxLoan: '₹10,00,000',
    interest: '4% p.a. (Female), 6% p.a. (Male)',
    subsidy: 'Reduced rate for female applicants',
    eligible: ['OBC', 'EWS'],
    maxIncome: '₹3,00,000 per annum (OBC), ₹2,50,000 per annum (EWS)',
    description:
      'NBCFDC Educational Loan enables OBC and EWS students to pursue technical and professional higher education at concessional interest rates.',
    documents: [
      'OBC / EWS Certificate from competent authority',
      'Income Certificate',
      'Admission Letter from recognised institution',
      'Fee structure / prospectus',
      'Proof of Identity and Residence',
      'Academic marksheets (last qualifying exam)',
      'Bank Account details',
    ],
    features: [
      'Loan up to ₹10 lakh for professional / technical courses',
      'Interest at 4% for female students, 6% for male students',
      'Repayment begins 12 months after course completion',
      'No collateral required up to ₹4 lakh',
      'Channelled through State OBC Finance Corporations',
    ],
  },
  {
    id: 'nskfdc-micro-credit',
    ministry: 'NSKFDC',
    name: 'Micro Credit Finance Scheme',
    purpose: 'Small Business & Sanitation Workers',
    maxLoan: '₹5,00,000',
    interest: '5% p.a.',
    subsidy: 'Capital subsidy under SRMS',
    eligible: ['SC', 'EWS'],
    maxIncome: '₹2,00,000 per annum',
    description:
      'NSKFDC Micro Credit Finance provides financial assistance to safai karamcharis and their dependants to take up alternative occupations and self-employment.',
    documents: [
      'Proof of occupation as safai karamchari / proof of dependancy',
      'Income Certificate',
      'Caste Certificate (if applicable)',
      'Proof of Identity and Residence',
      'Project / Business proposal',
      'Bank Account details',
    ],
    features: [
      'Loan up to ₹5 lakh for small business and self-employment',
      'Concessional interest at 5% p.a.',
      'Capital subsidy available under SRMS scheme',
      'Designed for safai karamcharis and their dependants',
      'Channelled through State NSKFDC offices',
    ],
  },
  {
    id: 'nmdfc-mahila-samridhi',
    ministry: 'NMDFC',
    name: 'Mahila Samridhi Yojana',
    purpose: 'Women Micro-Enterprise',
    maxLoan: '₹1,40,000',
    interest: '4% p.a.',
    subsidy: 'Savings incentive scheme',
    eligible: ['OBC', 'EWS'],
    maxIncome: '₹3,00,000 per annum',
    description:
      'Mahila Samridhi Yojana provides micro-credit to minority women for income-generating activities and encourages savings habits through a structured incentive.',
    documents: [
      'Minority community certificate',
      'Income Certificate',
      'Proof of Identity and Residence',
      'Self-Help Group (SHG) membership proof (if applicable)',
      'Bank passbook',
    ],
    features: [
      'Micro-credit up to ₹1.40 lakh',
      'Interest at 4% p.a. — among the lowest in the sector',
      'Repayment period 3 years',
      'Savings incentive linked to regular repayment',
      'Targeted at women from minority and backward communities',
    ],
  },
]
