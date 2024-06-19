import { createFlow } from "@builderbot/bot";
import { welcomeFlow } from "./welcome.flow";
import { flowJustRead } from "./justRead.flow";


export default createFlow([welcomeFlow, flowJustRead])