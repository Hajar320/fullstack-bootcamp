import { readFileSync } from 'fs';

export default function readTextFile(filename) {
    try {
        const content = readFileSync(filename, 'utf8');
        console.log('File content:');
        console.log(content);
        return content;
    } catch (error) {
        console.log(`Error reading ${filename}:`, error.message);
        return null;
    }
}
