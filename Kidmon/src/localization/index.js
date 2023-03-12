import { en } from "./en"
import { he } from "./he"
import * as Localization from 'expo-localization';



const getString = new I18n({
    en: en,
    he: he
})


getString.locale = Localization.locale;

getString.enableFallback = true;
export default getString