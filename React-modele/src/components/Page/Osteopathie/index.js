import React from 'react';
import {Switch, NavLink, Route} from 'react-router-dom';


import Praticiens from 'src/components/Praticiens';


import './osteopathie.scss'

const Osteopathie = () => {
  return (
  <div className="osteo">
      <div className="osteo-block">
        <h1 className="title">Ostéopathie</h1>
          <ul>
            <li>Adulte</li>
            <li>Femme enceinte</li>
            <li>Nourisson</li>
            <li>Sportif</li>
            <li>Sénior</li>
          </ul>
          <div className="btn-praticiens">
            <NavLink to={'/osteopathie/praticiens'}>Praticiens</NavLink>
            <Switch>
              <Route path='/osteopathie/praticiens' component={Praticiens} />
          </Switch>
              
           
            
          </div>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet augue lectus. Donec elit erat, fermentum et 
        convallis sed, fermentum dictum justo. Etiam dapibus erat nec leo ultrices, sed bibendum ante malesuada. Praesent aliquam 
        mattis dapibus. Nunc id sem turpis. Suspendisse imperdiet tristique ante nec porttitor. Integer volutpat pellentesque bibendum. 
        Curabitur at sapien quis urna facilisis elementum. Nullam vulputate volutpat dui a placerat. Duis ac orci facilisis, scelerisque 
        sapien ut, fringilla mi. Suspendisse ac pharetra libero. Sed commodo efficitur felis, in dapibus felis gravida eu. Suspendisse ornare
        ultricies neque et finibus. Quisque gravida libero quis erat blandit tincidunt. Ut eget elit et lorem dignissim convallis a id sem.

        Ut sit amet tellus in eros imperdiet ullamcorper. Aenean in sapien vel erat maximus lacinia vitae nec nisl. Morbi dictum est felis, sit amet
        dictum nibh dignissim ac. Phasellus justo felis, iaculis eu mauris at, venenatis efficitur augue. Phasellus interdum, dui et lacinia blandit,
        orci sem dictum velit, in laoreet lectus est non odio. Sed non viverra orci. Aenean tempus, orci nec egestas iaculis, lectus ex efficitur odio
        , egestas efficitur mauris massa in elit. Maecenas maximus est vel lacinia sollicitudin. Nulla volutpat sem vitae ligula interdum sollicitudin
        Donec mollis porta placerat. In facilisis laoreet orci, et auctor sapien gravida ac.
        </p>
        <button className="btn-appointment">Rendez vous</button>
      </div>
  </div>
  )
}

export default Osteopathie;
