import { writeFileSync } from "fs";

export async function upload_file(file: File, file_name: string|null = null, dir: string | null = 'public') {
    const ts = new Date().getTime();
    const parts = file.name.split('.');
    const ext = parts.pop();
    const fileNameWithoutExt = parts.join('-');
    let filePath;
    
    if (file_name) {
        filePath = `static/${dir}/${filePath}.${ext}`;
    } else {
        filePath = `static/${dir}/${fileNameWithoutExt}-${ts}.${ext}`;
    }

    writeFileSync(`${filePath}`, Buffer.from(await file.arrayBuffer()));

    return filePath;
}
