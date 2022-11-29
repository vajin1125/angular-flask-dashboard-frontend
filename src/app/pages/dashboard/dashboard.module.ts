import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { LineChartService } from './lineChart/lineChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMapService } from './usersMap/usersMap.service';

import { NewPieChart } from './newPieChart';
import { NewLineChart } from './newLineChart';
import { LastActive } from './lastActive';
import { BandWidth } from './bandWidth';
import { PcInfo } from './pcInfo';
import { HdUsage } from './hdUsage';
import { LoggedUserList } from './loggedUserList';
import { CmUsageChart } from './cmUsageChart';
import { BubbleLoggedMaps } from './bubbleLoggedMaps';

import { NewPieChartService } from './newPieChart/newPieChart.service';
import { NewLineChartService } from './newLineChart/newLineChart.service';
import { LastActiveService } from './lastActive/lastActive.service';
import { BandWidthService } from './bandWidth/bandWidth.service';
import { PcInfoService } from './pcInfo/pcInfo.service';
import { HdUsageService } from './hdUsage/hdUsage.service';
import { LoggedUserListService } from './loggedUserList/loggedUserList.service';
import { CmUsageChartService } from './cmUsageChart/cmUsageChart.service';
import { BubbleLoggedMapsService } from './bubbleLoggedMaps/bubbleLoggedMaps.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    PopularApp,
    PieChart,
    TrafficChart,
    UsersMap,
    LineChart,
    Feed,
    Todo,
    Calendar,
    Dashboard,
    NewPieChart,
    NewLineChart,
    LastActive,
    BandWidth,
    PcInfo,
    HdUsage,
    LoggedUserList,
    CmUsageChart,
    BubbleLoggedMaps
  ],
  providers: [
    CalendarService,
    FeedService,
    LineChartService,
    PieChartService,
    TodoService,
    TrafficChartService,
    UsersMapService,
    NewPieChartService,
    NewLineChartService,
    LastActiveService,
    BandWidthService,
    PcInfoService,
    HdUsageService,
    LoggedUserListService,
    CmUsageChartService,
    BubbleLoggedMapsService
  ]
})
export class DashboardModule {}
