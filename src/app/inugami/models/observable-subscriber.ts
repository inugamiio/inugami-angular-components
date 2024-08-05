import { Observable, Subscriber } from "rxjs";

export class ObservableSubscriber<T> {
    private handler: Subscriber<T> | undefined = undefined;
    private observable$: Observable<T>;

    constructor() {
        this.observable$ = new Observable<T>((event: Subscriber<T>) => {
            this.handler = event;
        });
    }


    get observable(): Observable<T> {
        return this.observable$;
    }
    
    get subscriber(): Subscriber<T> | undefined {
        return this.handler;
    }
}

