import { SVG, SVG_BUILDER, SVG_TRANSFORM } from 'inugami-components/utils';
import { TimeBucket, TimelineData, TimeLineValueNodes } from 'inugami-components/models';


// ====================================================================================================================
// TIMELINE_GRAPH_RENDERING
// ====================================================================================================================
export const TIMELINE_GRAPH_RENDERING ={


    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // histogram
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    histogram : (data:TimelineData) :TimeLineValueNodes[] =>{
        const step = data.width/data.resolution;
        const nbItems = data.values.length;

        let  result :TimeLineValueNodes[]= data.graphNodes;
        if(data.timer){
            let first = true;

            SVG.ANIMATION.animate((time:number)=>{

                for(let i= 0; i< nbItems; i++){
                    const value = data.values[i];
                    const nodes = TIMELINE_GRAPH_RENDERING.__histogramRenderItem(value,i,step,i==0,i==nbItems-1, time,data,first);

                    if(first){
                        result.push(nodes);
                    }
                }
                first = false;
                data.graphNodes = result;
            },{timer:data.timer, delay:data.delay,duration:data.duration })
        }else{
            for(let i= 0; i< nbItems; i++){
                const value = data.values[i];
                const nodes = TIMELINE_GRAPH_RENDERING.__histogramRenderItem(value,i,step,i==0,i==nbItems-1, 1,data, true);
                result.push(nodes);
            }
        }
        return result;
    },

    __histogramRenderItem : (values:TimeBucket<number>,
                             index:number,
                             step:number,
                             first:boolean,
                             last:boolean,
                             time:number,
                             data:TimelineData,
                             firstCall:boolean) : TimeLineValueNodes=>{
        const nodes :Map<string, SVGElement> = new Map();
        const result: TimeLineValueNodes= {nodes:nodes};
        const firstStyle = first? 'first': '';
        const lastStyle = last? 'last': '';
        const datetime = values.time.toISOString();


        if(firstCall){
            const group = SVG.BUILDER.createGroup(data.graph, {styleClass:`value value-index-${index} ${firstStyle} ${lastStyle}`});
            if(group){
                let max = 0;
                if(values.items){
                    for(let i of values.items ){
                        max= max+(i.value?i.value:0 );
                    }
                }
    
                if(index>0){
                    SVG.TRANSFORM.translateX(group, index*step );
                }
                let yCursor = 0;
                for(let type of data.typesValues){
                    if(!values.items){
                        continue;
                    }
                    const refValues = data.types.filter(t=> type==t.first);
                    if(refValues.length== 0){
                        continue;
                    }
                    const refValue = refValues[0];
                    const currentValues = values.items.filter(v=> type==v.type);
                    const currentValue = currentValues.length>0? currentValues[0]:null;
        
                    if(currentValue && currentValue.value){
                        const height = data.height * ((currentValue.value*time)/ data.stepMaxValue);
                        const item = SVG.BUILDER.createRect(group, {width:step,height ,styleClass:`value-item ${type}`});

                        
                        if(item){
                            nodes.set(type,item);
                            const svgStyle= data.styleGenerator(currentValue.value,data.stepMaxValue, data.stepMinValue,type);
                            if(svgStyle.style){
                                item.setAttribute('style', svgStyle.style);    
                            }
                            if(svgStyle.styleclass){
                                SVG.TRANSFORM.addClass(item,svgStyle.styleclass );
                            }
                            item.setAttribute('data-type', type);
                            item.setAttribute('data-value', ''+currentValue.value);
                            item.setAttribute('data-datetime', datetime);
                            item.setAttribute('data-max', ''+max);
                            SVG.TRANSFORM.translateY(item,-(height+yCursor) );
                        }
                        
                        yCursor= yCursor+height;
                    }
                }
            }
        }
        else{
            const nodes = data.graphNodes[index];
            let yCursor = 0;
            for(let type of data.typesValues){
                const currentNode = nodes.nodes.get(type) ;
                if(!currentNode || !values.items){
                    continue;
                }
                const refValues = data.types.filter(t=> type==t.first);
                if(refValues.length== 0){
                    continue;
                }
                const refValue = refValues[0];
                const currentValues = values.items.filter(v=> type==v.type);
                const currentValue = currentValues.length>0? currentValues[0]:null;
                if(currentNode && currentValue && currentValue.value){
                    const node = (currentNode as SVGElement);
                    const height = data.height * ((currentValue.value*time)/ data.stepMaxValue);
                    node.setAttribute("height", ''+height);
                    SVG.TRANSFORM.translateY(node,-(height+yCursor) );
                    yCursor= yCursor+height;
                }
                
            }
        }
        
        return result;
    }
}