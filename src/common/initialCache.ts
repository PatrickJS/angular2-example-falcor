import * as falcor from 'falcor';
var Model = falcor.Model;
var $ref = Model.ref;

export var initialCache = {
  genres: [
    {
      titles: [
        $ref('titlesById[99]'),
        $ref('titlesById[80]'),
        $ref('titlesById[77]'),
        $ref('titlesById[9]'),
        $ref('titlesById[99]'),
        $ref('titlesById[80]'),
        $ref('titlesById[77]'),
        $ref('titlesById[9]'),
        $ref('titlesById[99]'),
        $ref('titlesById[80]'),
        $ref('titlesById[77]'),
        $ref('titlesById[9]'),
      ],
      name: 'Thrillers'
    },
    {
      titles: [
        $ref('titlesById[60]'),
        $ref('titlesById[51]'),
        $ref('titlesById[62]'),
        $ref('titlesById[65]'),
        $ref('titlesById[60]'),
        $ref('titlesById[51]'),
        $ref('titlesById[62]'),
        $ref('titlesById[65]'),
        $ref('titlesById[60]'),
        $ref('titlesById[51]'),
        $ref('titlesById[62]'),
        $ref('titlesById[65]'),
      ],
      name: 'Horror Movies'
    },
    {
      titles: [
        $ref('titlesById[7]'),
        $ref('titlesById[33]'),
        $ref('titlesById[89]'),
        $ref('titlesById[99]'),
        $ref('titlesById[7]'),
        $ref('titlesById[33]'),
        $ref('titlesById[89]'),
        $ref('titlesById[99]'),
        $ref('titlesById[7]'),
        $ref('titlesById[33]'),
        $ref('titlesById[89]'),
        $ref('titlesById[99]'),
      ],
      name: 'Netflix Originals'
    },
    {
      titles: [
        $ref('titlesById[12]'),
        $ref('titlesById[42]'),
        $ref('titlesById[9]'),
        $ref('titlesById[7]'),
        $ref('titlesById[99]'),
        $ref('titlesById[42]'),
        $ref('titlesById[9]'),
        $ref('titlesById[7]'),
        $ref('titlesById[99]'),
        $ref('titlesById[42]'),
        $ref('titlesById[9]'),
        $ref('titlesById[7]'),

      ],
      name: 'Dramas'
    },
  ],
  titlesById: {
    '99': {
      id: '99',
      name: 'House of Cards',
      img: 'http://cdn5.nflximg.net/webp/8265/13038265.webp',
      year: '2013-2015',
      seasons: 3,
      showIs: 'Witty, Cerebral, Dark'
    },
    '12': {
      id: '12',
      name: 'The Wolf of Wall Street',
      img: 'http://cdn2.nflximg.net/webp/8752/11138752.webp'
    },
    '33': {
      id: '33',
      name: 'Marco Polo',
      img: 'http://cdn0.nflximg.net/webp/9400/11749400.webp'
    },
    '89': {
      id: '89',
      name: 'Arrested Development',
      seasons: 4,
      img: 'http://cdn8.nflximg.net/webp/1088/11741088.webp'
    },
    '60': {
      id: '60',
      name: 'Bates Motel',
      seasons: 2,
      img: 'http://cdn0.nflximg.net/webp/8540/12128540.webp'
    },
    '7': {
      id: '7',
      name: 'Orange Is the new Black',
      seasons: 3,
      img: 'http://cdn3.nflximg.net/webp/8153/11798153.webp'
    },
    '9': {
      id: '9',
      name: 'Breaking Bad',
      seasons: 5,
      img: 'http://cdn0.nflximg.net/webp/7300/4177300.webp'
    },
    '42': {
      id: '42',
      name: 'Cosmos',
      seasons: 5,
      img: 'http://cdn2.nflximg.net/webp/2642/9972642.webp'
    },
    '65': {
      id: '65',
      name: 'Leprechaun',
      img: 'http://cdn9.nflximg.net/webp/3769/4123769.webp'
    },
    '80': {
      id: '80',
      name: 'Halt and Catch Fire',
      seasons: 1,
      img: 'http://cdn4.nflximg.net/webp/8454/12968454.webp'
    },
    '51': {
      id: '51',
      name: 'Event Horizon',
      img: 'http://cdn1.nflximg.net/images/6797/8256797.jpg'
    },
    '62': {
      id: '62',
      name: 'Sharknado',
      img: 'http://cdn1.nflximg.net/images/2415/3932415.jpg'
    },
    '77': {
      id: '77',
      name: 'Daredevil',
      img: 'http://cdn6.nflximg.net/webp/5516/20935516.webp'
    }
  }
};


