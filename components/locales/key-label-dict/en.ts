import { makeLocale } from "../base";

export default makeLocale({
  copy: {
    button: "Copy shout",
    error: "Failed to insert your clipboard.",
    ok: "Copy is success!",
  },
  about: {
    text1:
      "Feeling like you wanna scream your head off but stuck at work or studying?   Been there, done that! That's where Metallic Shout comes in, your ultimate stress-busting buddy.",
    text2:
      "Think of it as unleashing your inner rockstar, but on social media!  Share your frustrations, cheers, and everything in between with your SNS. They get it, because let's face it, everyone needs to let loose sometimes.",
    text3: `In Japanese, "kana-kirigoe" means a powerful scream. That's the spirit Metallic Shout captures! Forget holding back, shout your truth with uninhibited intensity.`,
    text4:
      "So ditch the pent-up energy and join the Metallic Shout crew! Let your (metallic) shout be heard! ",
  },
} as const);
