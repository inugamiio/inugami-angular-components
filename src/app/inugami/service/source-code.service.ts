import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ObservableSubscriber } from "inugami-components/models";
import { Observable, Subscriber } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SourceCodeService {
    //==================================================================================================================
    // INIT
    //==================================================================================================================
    constructor(private  http: HttpClient) { }



    //==================================================================================================================
    // API
    //==================================================================================================================
    public loadSourceCodeFromXML(url:string) : Observable<any>{
        const result:ObservableSubscriber<any> = new ObservableSubscriber<any> ();

        this.http.get(url, { responseType: 'text' }).subscribe(
            {
                next : res=> this.parseSourceCodeXML(res,result.subscriber),
                error : (err:any) =>{
                    result.subscriber?.error(err);
                    result.subscriber?.complete();
                } 
            }
        );

        return result.observable;
    }
    private parseSourceCodeXML(response:any, subscriber:Subscriber<any> | undefined){
        if(!response || !subscriber){
            return;
        }
        console.log('parseSourceCodeXML', response);

        const result : any = {} ;

        let parser = new DOMParser();
        let node = parser.parseFromString(response,"text/xml");
        let sources = node.getElementsByTagName("src");

        for(let i=0; i<sources.length; i++){
            let sourceNode    = sources[i];
            let sourceName    :string = sourceNode.getAttribute('name') ?? '';
            let sourceContent :string = this.cleanContent(sourceNode.textContent ?? '');
            result[sourceName] =sourceContent;
        }


        subscriber.next(result);
        subscriber.complete();
    }

    private cleanContent(value:string):string {
        let result : string[] =[];
        let buffer : string[] =[];
    
        let line = value.split("\n");
    
        let enableClean = false;
        for(let i=0; i<line.length; i++){
            if(enableClean || line[i].trim()!=''){
                buffer.push(line[i]);
                enableClean = true;
            }
        }
        enableClean = false;
        for(let i=buffer.length-1; i>=0; i--){
            if(enableClean || buffer[i].trim()!=''){
                result.push(buffer[i]);
                enableClean = true;
            }
        }
    
        result.reverse();
    
        return result.join('\n');
    }

}