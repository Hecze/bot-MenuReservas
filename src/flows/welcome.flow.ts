import { EVENTS, addKeyword } from "@builderbot/bot";
import mainLayer from "src/layers/main.layer";


export const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAction(mainLayer)