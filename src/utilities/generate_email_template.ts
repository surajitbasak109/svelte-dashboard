// import { APP_NAME } from '$env/static/private';
import fs from 'fs';
import Handlebars from 'handlebars';
import { cwd } from 'process';


export default function generateEmailTemplate(template:string, data:unknown) {
    const root = cwd();
    const source = fs.readFileSync(`${root}/src/lib/mails/templates/${template}.hbs`, 'utf-8');
    const tmp = Handlebars.compile(source);
    return tmp(data);
}
