import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Song } from '../../../models/song';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input() song = new Song();

  @Output("onMenuClick") onMenuClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeMenu(action: string) {
    this.onMenuClickEvent.emit({ action: action, song: this.song });
  }

}
