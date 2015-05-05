import {Component, View, Attribute, NgElement, onDestory} from 'angular2/angular2';
import {VmTurnZone} from 'angular2/src/core/zone/vm_turn_zone';
import {If, For} from 'angular2/directives';

import {Scrollable, Scroller} from 'app/services/scrollable';

import {Movie} from 'app/components/movie';

@Component({
  selector: 'genre-list',
  properties: { model: 'model' }
})
@View({
  template: `
  <h2 class="genre-name">
    {{ model.getValue('name') | async }}
  </h2>
  <!--
  -->
  <div class="scroll-row" *if="state.movieList.length" page-size="12" scroll="x" [scroller]="state">
    <movie *for="var movie of state.movieList" [model]="movie | async"></movie>
  <div>
  <!--
  -->
  `,
  directives: [ Movie , Scroller, For, If ]
})
export class GenreList {
  constructor(
    @Attribute('scroll') scrollType,
    @Attribute('page-size') pageSize,
    zone: VmTurnZone, el: NgElement) {

    this._model = null;
    this.initModel = null;
    this.pageSize = pageSize;
    var self = this;

    var movie = {
      movieList: [
      ],
      lastItem: 0,
      addMore: function(pageSize) {
        var len = movie.movieList.length;
        var index = movie.lastItem;
        if (movie.lastItem === (pageSize || self.pageSize)-1) {
          movie.lastItem = 0;
        } else {
          movie.lastItem++;
        }

        if (self.model) {
          movie.movieList.push(
            self.model.bind(['titles', index], 'name')
          );
        }
      }
    };

    this.state = movie;
  }
  set model(val) {
    if (!this._model && val) {
      this._model = val;
      this.init(this._model);
    }
    return this._model;
  }
  get model() {
    return this._model;
  }
  init(val) {
    if (this.initModel && this.model) return;
    this.initModel = true;
    this.state.defaultTitles = [];
    for (var i = 0; i < this.pageSize; i++) {
      this.state.defaultTitles.push(
        this.model.bind(['titles', i], 'name')
      );
    }
    this.state.movieList = [].concat(this.state.movieList, this.state.defaultTitles);
    // for (var i = 0; i < 8; i++) {
    //   this.state.addMore(8)
    // };
  }
}
