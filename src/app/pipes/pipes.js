
import {defaultPipes} from 'angular2/change_detection';

import {NullPipeFactory} from 'app/pipes/nullpipe';
import {AsyncPipeFactory} from 'app/pipes/async';
import {JSONPipeFactory} from 'app/pipes/json';

export var pipes = Object.assign({}, defaultPipes, {
  'json': [
    new JSONPipeFactory(),
    new NullPipeFactory()
  ],
  'async': [
    new AsyncPipeFactory(),
    new NullPipeFactory()
  ]
});
