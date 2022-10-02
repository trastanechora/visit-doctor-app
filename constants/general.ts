export interface LocaleDateOption {
  weekday?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "long" | "short" | "narrow" | "numeric" | "2-digit";
  day?: "numeric" | "2-digit";
}

export const localeDateOption: LocaleDateOption = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
