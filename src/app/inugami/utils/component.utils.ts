export class ComponentUtils {

    public static generateStyleclass(mainStyle:string, extraStyle: string|undefined){
        const result : string[] = [mainStyle];

        if(extraStyle){
            result.push(extraStyle);
        }

        return result.join(' ');
    }

}