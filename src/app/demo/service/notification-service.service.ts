import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";

declare var SockJS;
declare var Stomp;



@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
    private notificationCountSubject = new BehaviorSubject<number>(0);
    notificationCount$ = this.notificationCountSubject.asObservable();

    public stompClient;
    public msg = [];

  constructor() {
      this.initializeWebSocketConnection();
  }
    initializeWebSocketConnection() {
        const serverUrl = environment.app_url;
        console.log(serverUrl);
        const ws = new SockJS(serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        // tslint:disable-next-line:only-arrow-functions
        this.stompClient.connect({}, function(frame) {
            console.log(frame);
            that.stompClient.subscribe('/all/messages', (message) => {
                const body = JSON.parse(message.body);

                if (body && body.text) {
                    that.msg.push(body.text);
                    that.updateNotificationCount(that.msg.length);
                }

            });
        });
    }



   sendMessage(text: string) {
         this.stompClient.send("/app/application", {}, JSON.stringify({'text': text}));

         this.incrementNotificationCount()
    }

    sendPrivateMessage(text: string, to: string) {
        this.stompClient.send("/app/private", {}, JSON.stringify({'text': text, 'to': to}));
    }

    subscribeToAllMessages( message: any ) {


        this.stompClient.subscribe('/all/messages', (result) => {

            const message = JSON.parse(result.body);



        });
    }
    updateNotificationCount(count: number) {
        this.notificationCountSubject.next(count);
    }
    incrementNotificationCount() {
        this.notificationCountSubject.next(this.notificationCountSubject.value + 1);
    }





}
