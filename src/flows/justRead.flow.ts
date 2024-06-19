import { addKeyword, EVENTS } from "@builderbot/bot";
import { saveOrderToSheet } from "src/utils/saveOrder";

const flowJustRead = addKeyword(EVENTS.ACTION).addAction(async () => {
        //no escribimos nada, pasamos defrente a leer el mensaje en el Action
}).addAction({ capture: true }, async (ctx, { endFlow, fallBack}) => {
    
    //si escribimos insertar o encender activamos el chatbot redirigiendo al flujo principal
    if (ctx.body.toLocaleLowerCase().includes('-') ) {
        await saveOrderToSheet(ctx.body);
    }

    else {
        console.log("formato invalido:" + ctx.body)
    }

    //si no escribes insertar o encender nos mantenemos en el flujo
    return fallBack()
})


export { flowJustRead }