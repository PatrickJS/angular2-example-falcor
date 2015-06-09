import {Model} from 'falcor';
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
      rating: 5,
      img: 'http://cdn5.nflximg.net/webp/8265/13038265.webp',
      starring: 'Kevin Spacey, Robin Wright, Kate Mara',
      // genres: [
      //   $ref(['genres', 3, 'name'])
      // ],
      genres: 'TV Shows, TV Dramas',
      year: '2013-2015',
      tvRating: 'TV-MA',
      seasons: 3,
      showIs: 'Witty, Cerebral, Dark',
      averageRating: 4.5,
      numberOfRating: 6029997,
      copy: 'This Emmy-winning original thriller series stars Golden Globe winner Kevin Spacey as ruthless, cunning Congressman Francis Underwood, who will stop at nothing to conquer the halls of power in Washington D.C. His secret weapon: his gorgeous, ambitious, and equally conniving wife Claire (Golden Globe winner Robin Wright).'
    },
    '12': {
      id: '12',
      name: 'The Wolf of Wall Street',
      rating: 5,
      img: 'http://cdn2.nflximg.net/webp/8752/11138752.webp',
      copy: 'Martin Scorcese\'s high-rolling Wall Street drama is based on the memoirs of stockbroker Jordan Belfort, whose giddy career ended in federal prison.',
      starring: 'Leonardo DiCaprio, Jonah Hill, Margot Robbie, Matthew McConaughey, Kyle Chandler, Jon Bernthal',
      genres: 'Dramas based on Books, Crime Dramas, Biographical Dramas, Dramas, Dramas based on real life'
    },
    '33': {
      id: '33',
      name: 'Marco Polo',
      rating: 5,
      img: 'http://cdn0.nflximg.net/webp/9400/11749400.webp',
      starring: 'Lorenzo Richelmy, Benedict Wong, Chin Han',
      genres: 'TV Shows, TV Dramas, TV Action & Adventure',
      copy: 'Worlds will collide "Marco Polo" is an epic adventure that follows the early years of the famous explorer as he travels the exotic Silk Road to the great Kublai Khan’s court. But Marco soon finds that navigating the Khan’s world of greed, betrayal, sexual intrigue and rivalry will be his greatest challenge yet, even as he becomes a trusted companion to the Khan in his violent quest to become the Emperor of the World.'
    },
    '89': {
      id: '89',
      name: 'Arrested Development',
      seasons: 4,
      img: 'http://cdn8.nflximg.net/webp/1088/11741088.webp',
      starring: 'Jason Bateman, Portia de Rossi, Will Arnett',
      genres: 'Sitcoms, TV Shows, TV Comedies',
      copy: 'It\'s the story of a wealthy family that lost everything, and the one son who had no choice but to keep them all together. It\'s the return of the award-winning “Arrested Development,” starring Emmy nominee Jason Bateman and one of the funniest ensembles in TV comedy, who taught viewers the meaning of “never nude,” spread a dangerous amount of misinformation about maritime law, and reminded everyone “that\'s why you always leave a note.”'
    },

    '60': {
      id: '60',
      name: 'Bates Motel',
      rating: 5,
      seasons: 2,
      img: 'http://cdn0.nflximg.net/webp/8540/12128540.webp',
      copy: 'Everyone knows what happened in "Psycho," but this chilling series takes viewers inside Norman Bates\' world before Marion Crane checked in.',
      starring: 'Vera Farmiga, Freddie Highmore, Max Thieriot, Olivia Cooke, Nicola Peltz, Nestor Carbonell',
      genres: 'TV Shows, TV Dramas, TV Horror, TV Mysteries'
    },
    '7': {
      id: '7',
      name: 'Orange Is the new Black',
      rating: 4,
      seasons: 3,
      img: 'http://cdn3.nflximg.net/webp/8153/11798153.webp',
      copy: 'A dozen Emmy Award nominations went to this acclaimed comedy drama series including Outstanding Comedy Series, Outstanding Writing and Outstanding Lead Actress for star Taylor Schilling. A crime she committed in her youthful past sends Piper Chapman (Schilling) to a women\'s prison, where she trades her comfortable New York life for one of unexpected camaraderie and conflict in an eccentric group of fellow inmates.',
      genres: 'TV Shows, TV Dramas, TV Comedies',
      starring: 'Taylor Schilling, Jason Biggs, Kate Mulgrew'
    },
    '9': {
      id: '9',
      name: 'Breaking Bad',
      rating: 5,
      seasons: 5,
      img: 'http://cdn0.nflximg.net/webp/7300/4177300.webp',
      copy: 'A high school chemistry teacher dying of cancer teams with a former student to secure his family\'s future by manufacturing and selling crystal meth.',
      starring: 'Bryan Cranston, Aaron Paul, Anna Gunn, Dean Norris, Betsy Brandt, R.J. Mitte',
      genres: 'TV Shows, TV Dramas, Crime TV Shows, Crime TV Dramas'
    },
    '42': {
      id: '42',
      name: 'Cosmos',
      rating: 5,
      seasons: 5,
      img: 'http://cdn2.nflximg.net/webp/2642/9972642.webp',
      copy: 'A high school chemistry teacher dying of cancer teams with a former student to secure his family\'s future by manufacturing and selling crystal meth.',
      starring: 'Bryan Cranston, Aaron Paul, Anna Gunn, Dean Norris, Betsy Brandt, R.J. Mitte',
      genres: 'TV Shows, TV Dramas, Crime TV Shows, Crime TV Dramas'
    },
    '65': {
      id: '65',
      name: 'Leprechaun',
      rating: 3,
      img: 'http://cdn9.nflximg.net/webp/3769/4123769.webp',
      copy: 'A father and daughter\'s move to a new home is anything but lucky when they find that a murderous 600-year-old leprechaun is living in their basement.',
      starring: 'Warwick Davis, Jennifer Aniston, Ken Olandt, Mark Holton, Robert Hy Gorman',
      genres: 'Horror Movies, Creature Features, Supernatural Horror Movies, Cult Horror Movies, Cult Movies, Monster Movies'
    },
    '80': {
      id: '80',
      name: 'Halt and Catch Fire',
      rating: 5,
      seasons: 1,
      img: 'http://cdn4.nflximg.net/webp/8454/12968454.webp',
      starring: 'Lee Pace, Scoot McNairy, Mackenzie Davis, Kerry Bishé, Toby Huss, David Wilson Barnes',
      genres: 'TV Shows, TV Dramas',
      copy: 'Re-creating the dawn of the personal computer era, this digital drama tracks the fates of an industry visionary and his brilliant colleagues.'
    },
    '51': {
      id: '51',
      name: 'Event Horizon',
      rating: 5,
      copy: 'After a signal is received from a long-missing spaceship, a rescue ship investigates, but the crew soon realizes something unimaginable has happened.',
      img: 'http://cdn1.nflximg.net/images/6797/8256797.jpg',
      starring: 'Laurence Fishburne, Sam Neill, Kathleen Quinlan, Joely Richardson, Richard T. Jones, Jack Noseworthy',
      genres: 'Horror Movies, Sci-Fi & Fantasy, Supernatural Horror Movies, Sci-Fi Horror Movies'
    },
    '62': {
      id: '62',
      name: 'Sharknado',
      rating: 2,
      copy: 'When a hurricane swamps Los Angeles, thousands of sharks are swept up in tornadoes and deposited all over the city, where they terrorize residents.',
      starring: 'Ian Ziering, Tara Reid, John Heard, Cassandra Scerbo, Jaason Simmons, Alex Arleo',
      genres: 'B-Horror Movies, Horror Movies, Sci-Fi & Fantasy, Sci-Fi Thrillers, Sci-Fi Horror Movies, Cult Horror Movies, Cult Sci-Fi & Fantasy, Thrillers, Cult Movies, Deep Sea Horror Movies',
      img: 'http://cdn1.nflximg.net/images/2415/3932415.jpg'
    },
    '77': {
      id: '77',
      name: 'Daredevil',
      rating: 5,
      img: 'http://cdn6.nflximg.net/webp/5516/20935516.webp',
      copy: '"Marvel\'s Daredevil" is a live action series that follows the journey of attorney Matt Murdock, who in a tragic accident was blinded as a boy but imbued with extraordinary senses. Murdock sets up practice in his old neighborhood of Hell\'s Kitchen, New York where he now fights against injustice as a respected lawyer by day and masked vigilante at night.',
      starring: 'Charlie Cox, Deborah Ann Woll, Vincent D\'Onofrio',
      genres: 'Comic Book and Superhero Movies, TV Shows, Crime TV Shows'
    }
  }
};


