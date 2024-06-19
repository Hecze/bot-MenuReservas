import { BotContext, BotMethods } from "@builderbot/bot/dist/types"
import { flowJustRead } from "src/flows/justRead.flow"


export default async(_: BotContext, { gotoFlow}: BotMethods) => {

    return gotoFlow(flowJustRead)

}