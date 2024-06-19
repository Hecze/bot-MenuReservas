import { google } from 'googleapis';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();
const SPREADSHEET_ID = process.env.SPREADSHEET_ID!;

export async function saveOrderToSheet(order: string) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Crear instancia del cliente para autenticación
  const client = await auth.getClient();

  // Instancia de la API de Google Sheets
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = SPREADSHEET_ID;

  const [puerta, nombre, plato, horaRecojo] = order.split(' - ');

  if (!puerta || !nombre || !plato || !horaRecojo) {
    console.error('Formato de pedido incorrecto.');
    return;
  }

  const newOrder = [puerta, nombre, plato, horaRecojo];

  try {
    // Leer los datos existentes de la hoja de cálculo
    const existingData = await googleSheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Hoja 1!A:D', // Asegúrate de que el rango incluya la columna D
    });

    const rows = existingData.data.values || [];

    // Verificar si el pedido ya existe
    const orderExists = rows.some(row => 
      row[0] === newOrder[0] && 
      row[1] === newOrder[1] && 
      row[2] === newOrder[2] && 
      row[3] === newOrder[3]
    );

    if (orderExists) {
      console.log('El pedido ya existe. No se agregará.');
      return;
    }

    // Agregar el nuevo pedido si no existe
    const result = await googleSheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Hoja 1!A:D', // Asegúrate de que el rango incluya la columna D
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newOrder],
      },
    });

    if (result.status === 200) {
      console.log('Pedido guardado exitosamente.');
    } else {
      console.error('Error al guardar el pedido:', result.statusText);
    }
  } catch (err) {
    console.error('Error al guardar el pedido en Google Sheets:', err);
  }
}
