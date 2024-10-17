import { Component, Input } from '@angular/core';

@Component({
  selector: 'bot-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() show: boolean = false;
  @Input() message: string = '';
}
