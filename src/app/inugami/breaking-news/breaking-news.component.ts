import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { INU_ICON } from 'inugami-components/icon';
import { Observable, Subscription } from 'rxjs';
import { BreakingNews, BreakingNewsLevel, SvgAnimationDone } from 'inugami-components/models';
import { Formatter, ComponentUtils } from 'inugami-components/utils';
import { SVG, SVG_ANIMATION, SVG_TRANSFORM, BUILD_UUID } from 'inugami-components/utils';

export interface _BreakingNews {
    uid: string,
    date: string,
    title: string,
    message: string,
    duration: number,
    type: string,
    level: BreakingNewsLevel,
    icon: string,
    close: boolean,
    newAdded: boolean,
    displayDate?: Date,
    data?: any


}

const ANIMATING = 'animating';

@Component({
    selector: 'inu-breaking-news',
    styleUrls: ['./breaking-news.component.scss'],
    templateUrl: './breaking-news.component.html'
})
export class InuCodeComponent implements OnInit, AfterViewInit, OnDestroy {
    //==================================================================================================================
    // ATTRIBUTES
    //==================================================================================================================
    @Input() styleClass: string | undefined = undefined;
    @Input() events$: Observable<BreakingNews[]> | undefined = undefined;
    @Input() openDuration: number = 1000;
    @Input() showNewsDuration: number = 500;
    @Input() displayDuration: number = 10000;
    @Input() defaultNewsDuration: number = 30000;
    @ViewChild('mainComponent') mainComponent: ElementRef | undefined | null = null;
    @ViewChildren('news') children!: QueryList<ElementRef>;


    observable: Subscription | undefined = undefined;
    data: _BreakingNews[] = [];
    collapsed: boolean = true;
    container: HTMLElement | undefined = undefined;
    currentNewsUid: string | undefined = undefined;
    currentNewsNode: HTMLElement | undefined = undefined;
    currentNews: _BreakingNews | undefined = undefined;
    onDataReceived: boolean = false;
    newsAnimatationInProgress: boolean = false;
    nbNews: number = 0;
    spacer: HTMLElement | undefined = undefined;
    //==================================================================================================================
    // INIT
    //==================================================================================================================
    constructor(private sanitizer: DomSanitizer,
        private changeDetectorRef: ChangeDetectorRef,
        private ngZone: NgZone) { }


    ngOnInit() {
        if (this.events$) {
            this.observable = this.events$.subscribe({
                next: data => this.onData(data)
            });
        }
        setInterval(() => {
            this.checkNewsTTL();
        }, 1000);
    }

    ngAfterViewInit(): void {
        if (this.mainComponent) {
            this.container = this.mainComponent.nativeElement;
        }
        if (this.container) {
            this.container.setAttribute('style', 'bottom:-120px; display:none');
        }
    }



    ngOnDestroy(): void {

    }


    //==================================================================================================================
    // ACTIONS
    //==================================================================================================================
    checkNewsTTL() {
        if (this.data.length == 0) {
            return;
        }
        if (this.newsAnimatationInProgress) {
            return;
        }

        for (let news of this.data) {
            if (news.newAdded) {
                news.newAdded = false;
            } else if (this.currentNewsUid == news.uid) {
                news.duration = news.duration - 1000;
            }

        }
        this.nbNews = 0;
        let counter = 0;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].duration <= 0) {
                this.data[i].close = true;
                counter++;
            } else {
                this.nbNews++;
            }
        }

        this.removeExpiredNews();

        if (this.currentNews) {
            this.newsAnimatationInProgress = false;
            if (this.currentNews.duration <= 0) {
                const previousNews = this.currentNews;
                if (this.currentNewsNode) {
                    if (this.data.length > 1) {
                        this.showNextNews(() => {
                            this.removeNews(previousNews);
                        });
                    } else {
                        this.hideNews(this.currentNewsNode, () => {
                            this.removeNews(previousNews);
                        });
                    }
                }
            } else if (this.data.length > 1) {
                const diff = new Date().getTime() - (this.currentNews.displayDate ? this.currentNews.displayDate?.getTime() : 0);
                if (diff > this.displayDuration) {
                    this.showNextNews();
                }
            }

        }


        if (this.newsAnimatationInProgress) {
            return;
        }
        if (this.data.length == counter) {
            setTimeout(() => {
                if (this.currentNewsNode) {
                    this.hideNews(this.currentNewsNode, () => {
                        this.currentNewsNode = undefined;
                        this.data = [];
                        this.closeIfRequired();
                    });
                } else {
                    this.currentNewsNode = undefined;
                    this.data = [];
                    this.closeIfRequired();
                }
            });
        }

    }

    openIfRequired(onDone?: SvgAnimationDone) {
        if (this.collapsed && this.data.length > 0) {
            this.collapsed = false;
            
            if(!this.spacer){
                const body: HTMLElement = document.getElementsByTagName('body')[0];
                this.spacer = document.createElementNS("http://www.w3.org/1999/xhtml", 'div');
                this.spacer.setAttribute('style','height: 120px');
                this.spacer.innerHTML =' ';
                body.appendChild(this.spacer);
            }
            

            this.ngZone.runOutsideAngular(() => {
                SVG_ANIMATION.animate((t) => this.processOpen(t),
                    {
                        duration: this.openDuration,
                        timer: SVG_ANIMATION.TYPES.easeOutQuad,
                        onDone: onDone
                    });
            });
        }
    }

    processOpen(time: number) {
        this.ngZone.runOutsideAngular(() => {
            if (this.container) {
                if (time == 1) {
                    SVG_TRANSFORM.removeClass(this.container, ANIMATING);
                    this.container.setAttribute('style', 'bottom:0px; display:block');
                   

                } else {

                    if (!SVG_TRANSFORM.hasClass(this.container, ANIMATING)) {
                        SVG_TRANSFORM.addClass(this.container, ANIMATING);
                    }
                    const position = 120 - (120 * time);
                    this.container.setAttribute('style', `bottom:-${position}px; display:block`);
                    if (time >= 0.3) {
                        this.showNextNews();
                    }
                }
            }
        });
    }

    showNextNews(onDone?: SvgAnimationDone) {
        if (this.data.length > 0) {
            if (this.currentNewsUid == undefined) {
                this.showNews(this.data[0], onDone);
            }
            else if (!this.newsAnimatationInProgress && this.currentNews) {
                const nextNews = this.resolveNextNews(this.currentNews);
                if (nextNews) {
                    this.showNews(nextNews, onDone);
                } else {
                    this.currentNews = undefined;
                    this.currentNewsNode = undefined;
                    this.currentNewsUid = undefined;
                }
            }
        }
    }

    showNews(news: _BreakingNews, onDone?: SvgAnimationDone) {
        const htmlElement = this.resolveNewsElement(news);
        if (htmlElement) {
            this.newsAnimatationInProgress = true;
            if (this.currentNewsNode) {
                this.hideNews(this.currentNewsNode, () => {
                    this.currentNewsNode = undefined;
                    this.currentNewsUid = undefined;
                    this.showNewsNode(htmlElement, news, onDone);
                });
            } else {
                this.showNewsNode(htmlElement, news, onDone);
            }
        }
    }

    showNewsNode(node: HTMLElement, news: _BreakingNews, onDone?: SvgAnimationDone) {
        SVG_ANIMATION.animate((t) => this.processShowNews(t, node),
            {
                duration: this.showNewsDuration,
                timer: SVG_ANIMATION.TYPES.easeOutQuad,
                onDone: () => {
                    this.currentNewsNode = node;
                    this.currentNewsUid = news.uid;
                    this.currentNews = news;
                    news.displayDate = new Date();
                    if (onDone) {
                        onDone();
                    }

                    setTimeout(() => this.newsAnimatationInProgress = false, 500);

                }
            });
    }

    processShowNews(time: number, node: HTMLElement) {
        if (time == 1) {
            node.setAttribute('style', 'bottom:-15px');
        } else {
            const position = 135 - (120 * time);
            node.setAttribute('style', `bottom:-${position}px; display:block`);
        }
    }

    hideNews(news: HTMLElement, onDone?: SvgAnimationDone) {
        this.ngZone.runOutsideAngular(() => {
            SVG_ANIMATION.animate((t) => this.processHideNews(t, news),
                {
                    duration: this.showNewsDuration,
                    timer: SVG_ANIMATION.TYPES.easeOutQuad,
                    onDone: onDone
                });
        });
    }
    processHideNews(time: number, node: HTMLElement | undefined) {
        if (!node) {
            return;
        }
        if (time == 1) {
            SVG_TRANSFORM.removeClass(node, ANIMATING);
            node.setAttribute('style', 'bottom:-135px');

        } else {
            const position = -15 - (120 * time);
            node.setAttribute('style', `bottom:${position}px; display:block`);
        }
    }

    closeIfRequired() {
        if (this.data.length == 0) {


            if(this.spacer){
                const body: HTMLElement = document.getElementsByTagName('body')[0];
                body.removeChild(this.spacer);
                this.spacer=undefined;
            }


            this.ngZone.runOutsideAngular(() => {
                SVG_ANIMATION.animate((t) => this.processClose(t), {
                    duration: this.openDuration,
                    timer: SVG_ANIMATION.TYPES.easeOutQuad,
                    onDone: () => {
                        this.finishClose();
                    }
                });
            });
        }
    }

    processClose(time: number) {
        this.ngZone.runOutsideAngular(() => {
            if (this.container) {
                if (time == 1) {
                    SVG_TRANSFORM.removeClass(this.container, ANIMATING);
                    this.container.setAttribute('style', 'bottom:-120px; display:none');

                } else {

                    if (!SVG_TRANSFORM.hasClass(this.container, ANIMATING)) {
                        SVG_TRANSFORM.addClass(this.container, ANIMATING);
                    }
                    const position = -(120 * time);
                    this.container.setAttribute('style', `bottom:${position}px; display:block`);
                }
            }
        });
    }

    finishClose() {
        this.collapsed = true;
        this.currentNewsUid = undefined;
        this.currentNewsNode = undefined;
        this.currentNews = undefined;
        this.data = [];
        this.changeDetectorRef.detectChanges();
    }

    removeNews(news: _BreakingNews) {
        if (this.data) {
            let index = -1;
            for (let i = 0; i > this.data.length; i++) {
                if (this.data[i].uid == news.uid) {
                    index = i;
                    break;
                }
            }

            if (index >= 0) {
                this.data.splice(index, 1);
            }
        }
    }

    removeExpiredNews() {
        if (this.data) {
            for (let item of this.data) {
                if (this.currentNewsUid == item.uid) {
                    continue;
                }
                if (item.duration <= 0) {
                    const index = this.getNewsIndex(item);
                    if (index != -1) {
                        this.data.splice(index, 1);
                    }

                }
            }
        }
    }
    //==================================================================================================================
    // RESOLVERS
    //==================================================================================================================
    resolveNewsElement(news: _BreakingNews): HTMLElement | undefined {
        if (!this.children) {
            return undefined;
        }

        for (let child of this.children) {
            const childUid = child.nativeElement?.getAttribute('id');
            if (childUid == news.uid) {
                return child.nativeElement;
            }
        }
        return undefined;
    }

    resolveNextNews(currentNews: _BreakingNews): _BreakingNews | undefined {
        if (!this.data || this.data.length == 0) {
            return undefined;
        }

        if (this.data.length == 1) {
            return this.data[0];
        }

        let found = false;
        for (let news of this.data) {
            if (found) {
                return news;
            }
            found = news.uid == currentNews.uid;
        }
        return this.data[0];
    }

    resolveNews(uid: string): _BreakingNews | undefined {
        if (this.data) {
            for (let item of this.data) {
                if (item.uid == uid) {
                    return item;
                }
            }
        }
        return undefined;
    }
    //==================================================================================================================
    // EVENTS
    //==================================================================================================================
    onData(data: BreakingNews[]): void {
        this.onDataReceived = true;
        for (let item of data) {

            if (item.uid) {
                const news = this.resolveNews(item.uid);
                if (news) {
                    news.duration = news.duration + (item.duration ? item.duration : this.defaultNewsDuration);
                } else {
                    this.data.push(this.buildNewNews(item));
                }
            } else {
                this.data.push(this.buildNewNews(item));
            }
        }

        this.openIfRequired(() => this.onDataReceived = false);
    }

    buildNewNews(item: BreakingNews): _BreakingNews {
        return {
            uid: item.uid ? item.uid : BUILD_UUID(),
            newAdded: true,
            date: Formatter.dateToString(item.date ? item.date : new Date()),
            duration: item.duration ? item.duration : this.defaultNewsDuration,
            level: item.level ? item.level : BreakingNewsLevel.INFO,
            message: item.message,
            title: item.title,
            type: item.type ? item.type : 'news',
            data: item.data,
            icon: item.icon ? item.icon : INU_ICON.info,
            close: false
        };
    }
    //==================================================================================================================
    // GETTERS
    //==================================================================================================================
    get _styleClass(): string {
        const result: string[] = [ComponentUtils.generateStyleclass(`inu-breaking-news ${this.collapsed ? 'collapsed' : ''}`, this.styleClass)];

        if (this.currentNews) {
            result.push(this.getNewsLevel(this.currentNews));
        }

        return result.join(' ');
    }


    getNewsClass(news: _BreakingNews): string {
        const result = ['inu-breaking-news-article'];

        result.push(this.getNewsLevel(news));

        return result.join(' ');
    }

    getNewsLevel(news: _BreakingNews): string {
        switch (news.level) {
            case BreakingNewsLevel.INFO:
                return 'info';
            case BreakingNewsLevel.WARN:
                return 'warn';
            case BreakingNewsLevel.ERROR:
                return 'error';
            case BreakingNewsLevel.FATAL:
                return 'fatal';
            default:
                return 'debug';
        }
    }

    getNewsIndex(news: _BreakingNews): number {
        if (!this.data) {
            return 0;
        }

        let cursor = 0;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].duration >= 0) {
                cursor++;
            }
            if (this.data[i].uid == news.uid) {
                return cursor;
            }
        }
        return 0;
    }
}