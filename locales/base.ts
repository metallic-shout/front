type StringObj<T extends string> = { [Key in T]: string };

type LocaleCopy = StringObj<"button" | "ok" | "error">;

export interface Locale {
  copy: LocaleCopy;
}

export const makeLocale = <T extends Locale>(locale: T) => {
  return locale;
};
