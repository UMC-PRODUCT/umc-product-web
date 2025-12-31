export type TypoGroup =
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'B1'
  | 'B2'
  | 'B3'
  | 'B4'
  | 'C1'
  | 'C2'
  | 'C3'
  | 'Slogan'
export type TypoToken = `${TypoGroup}.${'Sb' | 'Md' | 'Rg'}`
