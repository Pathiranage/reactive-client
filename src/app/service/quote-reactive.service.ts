import {Injectable} from '@angular/core';
import {Quote} from '../model/quote';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteReactiveService {

  quotes: Quote[] = [];
  url = 'http://localhost:8081/quotes-reactive';
  urlPaged = 'http://localhost:8081/quotes-reactive-paged';

  getQuoteStream(page?: number, size?: number): Observable<Array<Quote>> {
    this.quotes = [];
    return new Observable((observer) => {
      let url = this.url;
      if (page != null) {
        url = this.urlPaged + '?page=' + page + '&size=' + size;
      }
      const eventSource = new EventSource(url);
      eventSource.onmessage = (event) => {
        console.log('Received event: ', event);
        const json = JSON.parse(event.data);
        this.quotes.push(new Quote(json.id, json.book, json.content));
        observer.next(this.quotes);
      };
      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way of detecting the end of the stream
        // is to insert a special element in the stream of events, which the client can identify as the last one.
        if (eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      };
    });
  }
}
