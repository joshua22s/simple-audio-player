import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input("text") text: string;
  @Input("disabled") disabled: boolean = false;

  @Output("onclick") onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClick() {
    if (this.disabled) {
      return;
    }
    this.onClick.emit("");
  }

}
