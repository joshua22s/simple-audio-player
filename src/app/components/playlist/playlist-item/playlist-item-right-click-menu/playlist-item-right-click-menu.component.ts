import { Component, OnInit } from '@angular/core';
import { ContextMenuService, MenuComponent, MenuPackage } from '@ctrl/ngx-rightclick';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-playlist-item-right-click-menu',
  templateUrl: './playlist-item-right-click-menu.component.html',
  styleUrls: ['./playlist-item-right-click-menu.component.scss'],
  animations: [
    trigger('menu', [
      state('enter', style({ opacity: 1 })),
      state('exit, void', style({ opacity: 0 })),
      transition('* => *', animate(0)),
    ]),
  ],
})
export class PlaylistItemRightClickMenuComponent extends MenuComponent implements OnInit {

  constructor(public menuPackage: MenuPackage, public contextMenuService: ContextMenuService) {
    super(menuPackage, contextMenuService);
  }

  ngOnInit(): void {
  }

  handleClick() {
    this.contextMenuService.closeAll();
  }

}
