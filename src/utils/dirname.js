import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); //Me lleva hasta donde estoy parado, incluyendo el archivo
const __dirname = dirname(__filename); // Me lleva hasta la carpeta donde estoy parado, sin el archivo

export default __dirname;