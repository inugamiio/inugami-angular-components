export class ComponentUtils {

    public static generateStyleclass(mainStyle:string, extraStyle: string|undefined):string{
        const result : string[] = [mainStyle];

        if(extraStyle){
            result.push(extraStyle);
        }

        return result.join(' ');
    }

}