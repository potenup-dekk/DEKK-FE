export type PostStep = 0 | 1 | 2;

export interface SecondaryCategoryGroup {
  id: string;
  label: string;
  secondaryOptions: string[];
}

export interface TagValidationResult {
  isValid: boolean;
  errorMessage: string | null;
  normalizedTag: string;
}
