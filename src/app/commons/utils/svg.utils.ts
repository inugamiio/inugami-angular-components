import { SvgOptionalOption } from "../models/svg-options.model";
import { Size, Vector } from "../models/svg.models";

const isNull = (value:any):boolean => {
    return value == undefined || value == null;
}

const isNotNull = (value:any):boolean => {
    return value != undefined && value != null;
}

const convertToNumber = (value:any):number|null => {
    return value == undefined || value == null ? null : Number(value);
}

//#############################################################################
// SVG_CONST
//#############################################################################
export const SVG_CONST: any = {
    DATETIME_YEAR : 60000* 1440 * 365,
    MINUTE : 60000,
    NB_MINUTES_PER_DAY: 1440 
};


//#############################################################################
// SVG_MATH
//#############################################################################
export const SVG_MATH: any = {
    size : (node: SVGElement| HTMLElement): Size => {
        const info = node.getBoundingClientRect();
        return {
            bottom:info.bottom,
            width:info.width,
            height:info.height,
            left:info.left,
            right:info.right,
            top:info.top,
            x:info.x,
            y:info.y,
            fontratio: isNotNull(node.getAttribute('fontratio'))?1: convertToNumber(node.getAttribute('fontratio'))
        };
    }
}


//#############################################################################
// SVG_BUILDER
//#############################################################################
export const SVG_BUILDER: any = {
    // ========================================================================
    // createGroup
    // ========================================================================
    createGroup : (parent: HTMLElement, option?: SvgOptionalOption): SVGElement|null => {
        return SVG_BUILDER.createNode('g',parent,option);
    },


    // ========================================================================
    // createText
    // ========================================================================
    createText : (label:string, parent: SVGElement, option?: SvgOptionalOption): SVGElement|null => {
        const result = SVG_BUILDER.createNode('text',parent,option);

        if(result){
            result.innerHTML = label;
            return result;
        }else{
            return null;
        }
    },


    // ========================================================================
    // createLine
    // ========================================================================
    createLine : (vector:Vector, parent: SVGElement, option?: SvgOptionalOption): SVGElement|null => {
        const result = SVG_BUILDER.createNode('path',parent,option);

        if(result){
            result.setAttribute('d',`M ${vector.start.x},${vector.start.y} ${vector.end.x},${vector.end.y}`);
            return result;
        }else{
            return null;
        }
    },


    // ========================================================================
    // createGroup
    // ========================================================================
    createNode : (nodeType:string,parent: HTMLElement, option?: SvgOptionalOption): SVGElement|null => {
       const currentOption = option == undefined || option==null? {}: option;
       const result = document.createElementNS("http://www.w3.org/2000/svg", nodeType);
       if(currentOption.styleClass){
            result.setAttribute("class", currentOption.styleClass);
       }
       parent.appendChild(result);
       return result;
    }
}