import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnChanges {

  @Input("duration") duration: number;
  @Output("onTick") onTickEvent = new EventEmitter<any>();

  public timeLeft: number = 0;
  private countdownInterval: any;
  private countdownTimeout: any;

  text: string = "00:00:00";

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.formatText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.duration && !changes.duration.firstChange) {
      this.timeLeft = 0;
      this.formatText();
    }
  }

  reload() {
    this.formatText();
  }

  start(fromBegin: boolean, duration?: number) {
    if (fromBegin) {
      this.timeLeft = this.duration;
    }
    if (duration) {
      this.timeLeft = this.duration - duration;
    }
    this.onTickEvent.emit({ action: 'start' });
    clearInterval(this.countdownInterval);
    clearTimeout(this.countdownTimeout);
    this.countdownInterval = setInterval(() => {
      this.timeLeft = this.timeLeft - 100;
      this.formatText();
      this.changeDetectorRef.detectChanges();
      this.onTickEvent.emit({ action: 'notify', left: this.timeLeft });
    }, 100);
    this.countdownTimeout = setTimeout(() => {
      clearInterval(this.countdownInterval);
      this.onTickEvent.emit({ action: 'stop' });
      this.onTickEvent.emit({ action: 'end' });
      this.timeLeft = 0;
      this.formatText();
    }, this.timeLeft);

  }

  pause() {
    clearInterval(this.countdownInterval);
    clearTimeout(this.countdownTimeout);
    this.onTickEvent.emit({ action: 'pause', left: this.timeLeft });
  }

  stop() {
    this.timeLeft = 0;
    this.formatText();
    clearInterval(this.countdownInterval);
    clearTimeout(this.countdownTimeout);
    this.onTickEvent.emit({ action: 'stop' });
  }

  private formatText() {
    if (this.timeLeft > 0) {
      this.formatDuration(this.timeLeft);
    } else {
      this.formatDuration(this.duration);
    }
  }

  private formatDuration(duration: number) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.ceil(Math.floor((duration / 1000) % 60)),
      minutes = Math.ceil(Math.floor((duration / (1000 * 60)) % 60)),
      hours = Math.ceil(Math.floor((duration / (1000 * 60 * 60)) % 24));

    var hoursString = (hours < 10) ? "0" + hours : hours + "";
    var minutesString = (minutes < 10) ? "0" + minutes : minutes + "";
    var secondsString = (seconds < 10) ? "0" + seconds : seconds + "";

    this.text = hoursString + ":" + minutesString + ":" + secondsString;
  }

}
