import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEvent, IEventPublisher, IMessageSource } from '@nestjs/cqrs';
import { Subject } from 'rxjs';
import * as xml2js from 'xml2js';
import * as http from 'http';

const config = new ConfigService();
const eventStoreHostUrl = `${config.get('EVENT_STORE_PROTOCOL')}://${config.get(
  'EVENT_STORE_PROTOCOL',
)}:${config.get('EVENT_STORE_HTTP_PORT')}/streams/`;

/**
 * @class EventStore
 * @description The EventStore.org bridge. By design, the domain category
 * (i.e. user) events are being subscribed to. Upon events being received,
 * internal event handlers are responsible for the handling of events.
 */
@Injectable()
export class EventStore implements IEventPublisher, IMessageSource {
  private eventStore: any;
  private eventHandlers: object;
  private service: string;
  private category: string;

  constructor(@Inject('EVENT_STORE_PROVIDER') eventStore: any) {
    this.service = 'user-service';
    this.category = 'user';
    this.eventStore = eventStore;
    this.eventStore.connect({
      hostname: config.get('EVENT_STORE_HOST'),
      port: config.get<number>('EVENT_STORE_TCP_PORT'),
      credentials: {
        username: config.get<number>('EVENT_STORE_USERNAME'),
        password: config.get<number>('EVENT_STORE_PASSWORD'),
      },
      // poolOptions: {
      //   min: config.get<number>('EVENT_STORE_POOL_MIN') || 1,
      //   max: config.get<number>('EVENT_STORE_POOL_MAX') || 10,
      // },
    });
  }

  async publish<T extends IEvent>(event: T) {
    const message = JSON.parse(JSON.stringify(event));
    const email = message.email || message.userDto.email;
    const streamName = `[${email}][${this.service}][${this.category}]`;
    const type = event.constructor.name;
    try {
      await this.eventStore.client.writeEvent(streamName, type, event);
    } catch (err) {
      console.trace(err);
    }
  }

  /**
   * @description Event Store bridge subscribes to domain category stream
   * @param subject
   */
  async bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    const streamName = `$ce-${this.category}`;

    const onEvent = async (event) => {
      const eventUrl =
        eventStoreHostUrl + `${event.metadata.$o}/${event.data.split('@')[0]}`;
      http.get(eventUrl, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          xml2js.parseString(rawData, (err, result) => {
            if (err) {
              console.trace(err);
              return;
            }
            const content = result['atom:entry']['atom:content'][0];
            const eventType = content.eventType[0];
            const data = content.data[0];
            event = this.eventHandlers[eventType](...Object.values(data));
            subject.next(event);
          });
        });
      });
    };

    const onDropped = (subscription, reason, error) => {
      console.trace(subscription, reason, error);
    };

    try {
      await this.eventStore.client.subscribeToStream(
        streamName,
        onEvent,
        onDropped,
        false,
      );
    } catch (err) {
      console.trace(err);
    }
  }

  setEventHandlers(eventHandlers) {
    this.eventHandlers = eventHandlers;
  }
}
