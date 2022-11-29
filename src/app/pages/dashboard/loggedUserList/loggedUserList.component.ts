import {Component} from '@angular/core';

import {LoggedUserListService} from './loggedUserList.service';

@Component({
  selector: 'logged-user-list',
  templateUrl: './loggedUserList.html',
  styleUrls: ['./loggedUserList.scss']
})
export class LoggedUserList {

  public feed:Array<Object>;
  mainData: Array<Object>;
  changed:boolean;

  constructor(private _loggedUserListService:LoggedUserListService) {
    this.changed = false;
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this._loggedUserListService.getData()
    .subscribe(
      data => {
        this.mainData = data;
        // console.log("userlistData:", this.mainData);
        this.feed = this.makeChartValue();
        this.changed = true;
      },
      error => console.log(error)
    );
  }

  makeChartValue() {
    let finalData = [];
    this.mainData.forEach(user => {
      let user_item = {
        type: 'text-message',
        author: user['UserName'],
        header: 'Posted new message',
        text: 'Guys, check this out: \nA police officer found a perfect hiding place for watching for speeding motorists. One day, the officer was amazed when everyone was under the speed limit, so he investigated and found the problem. A 10 years old boy was standing on the side of the road with a huge hand painted sign which said "Radar Trap Ahead." A little more investigative work led the officer to the boy\'s accomplice: another boy about 100 yards beyond the radar trap with a sign reading "TIPS" and a bucket at his feet full of change.',
        expanded: false
      }
      finalData.push(user_item);
    });
    return finalData;
  }
}
