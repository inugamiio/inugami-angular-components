const FS = require('node:fs');
const JSDOM = require('jsdom');

const FILES = [
    {
        path: 'src/assets/inu-icons.svg',
        svgPrefix: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">',
        svgName: 'INU_ICON_SVG',
        enumName: 'INU_ICON_TYPE',
        iconSetName: 'INU_ICON',
        targetFolder: 'src/app/inugami/icon',
        targetFile: 'icons.ts',
    },
];

const INKSCAPE_ATTRIBUTES = [
    'id',
    'inkscape:groupmode',
    'inkscape:insensitive',
    'inkscape:label',
    'inkscape:nodetypes',
    'inkscape:connector-curvature',
    'style',
    'sodipodi:nodetypes'
];

// ============================================================================
// FUNCTIONS
// ============================================================================
function process(fileInfo) {
    FS.readFile(fileInfo.path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const icons = parseSvg(new JSDOM.JSDOM(data));

        if (icons) {
            const buffer = {};
            for(icon of icons){
                buffer[icon.idCamelCase]= icon;
            }
            
            let keys =  Object.keys(buffer);
            keys.sort();

            const iconData = {};
            for(let key of keys){
                iconData[key]= buffer[key];
            }

            const fileContent = writeIconSet(iconData, fileInfo);
            writeFile(fileContent, fileInfo);
        }
    });
}

function parseSvg(dom) {
    const result = [];
    const svgNode = dom.window.document.getElementsByTagName('svg')[0];

    for (child of svgNode.children) {
        const id = child.getAttribute('inkscape:label');
        const inkscapeId = child.getAttribute('id');
        const type = child.tagName;
        
        if (!id || id.startsWith('_') || !inkscapeId.startsWith('layer')) {
            continue;
        }
        
        suppressInkscapeAttributes(child);
        child.setAttribute('class', id);
        const svgContent = renderSvg(child);
        console.log(id);
        console.log(svgContent);
        console.log("\n\n\n");
        result.push({
            id: id,
            idCamelCase: convertToCamelCase(id),
            icon: svgContent,
        });
    }
    return result;
}

function suppressInkscapeAttributes(node) {
    if (node) {
        for (attr of INKSCAPE_ATTRIBUTES) {
            node.removeAttribute(attr);

            if (node.children) {
                for (childNode of node.children) {
                    suppressInkscapeAttributes(childNode);
                }
            }
        }
    }
}

function convertToCamelCase(id) {
    if (!id) {
        return '';
    }
    const result = [];
    const values = id.split('-');

    for (let i = 0; i < values.length; i++) {
        if (i == 0) {
            result.push(values[i].trim());
        } else {
            const data = values[i].trim();
            result.push(data.substring(0, 1).toUpperCase());
            result.push(data.substring(1));
        }
    }
    return result.join('');
}

function renderSvg(node) {
    const content = node ? node.outerHTML : null;
    if (!content) {
        return null;
    }

    const result = [];
    const lines = content.split('\n');

    for (line of lines) {
        result.push(line.trim());
    }

    return result.join('');
}

function writeIconSet(icons, fileInfo) {

    const result = [];
    result.push(writeSvgIcon(icons, fileInfo));
    result.push(writeIcon(icons, fileInfo));
    return result.join('\n\n');
}


function writeSvgIcon(icons, fileInfo) {
    const result = [];

    result.push(`export const ${fileInfo.svgName} = {`);
    
    const keys = Object.keys(icons);
    for(let i=0; i<keys.length; i++){
        const key = keys[i];
        const separator = i<keys.length-1 ? ',' : '';
        result.push(`\t${key} : \`${icons[key].icon}\` ${separator}`);
    }
    result.push('}')
    return result.join('\n');
}

function writeIcon(icons, fileInfo) {
    const result = [];

    result.push(`export const  ${fileInfo.iconSetName} = {`);

    const keys = Object.keys(icons);
    for(let i=0; i<keys.length; i++){
        const key = keys[i];
        const separator = i<keys.length-1 ? ',' : '';
        result.push(`\t${key} : \``+ fileInfo.svgPrefix + "${" +fileInfo.svgName+"."+key+"}</svg>`" + separator);
    }
    result.push('}')

    return result.join('\n');
}

function writeFile(fileContent, fileInfo){
    if (!FS.existsSync(fileInfo.targetFolder)){
        FS.mkdirSync(fileInfo.targetFolder);
    }
    const file = `${fileInfo.targetFolder}/${fileInfo.targetFile}`;
    console.log(`write file : ${file}`);
    FS.writeFile(file, fileContent, err => {
        if (err) {
          console.error(err);
        }
    });
}
// ============================================================================
// MAIN
// ============================================================================
for (file of FILES) {
    process(file);
}
