type StringObj<T extends string> = { [Key in T]: string };

type LocaleCopy = StringObj<"button" | "ok" | "error">;
type LocaleAbout = StringObj<"text1" | "text2" | "text3" | "text4">;
type LocaleShout = StringObj<"error">;

export interface Locale {
  copy: LocaleCopy;
  about: LocaleAbout;
  shout: LocaleShout;
}
