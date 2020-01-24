import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Menu, Button, Dropdown } from 'semantic-ui-react'


// import local
import './pratique.scss'

class Pratique extends React.Component {

  render() {

    return(
      <Container text>
        <Header as='h2'>L'ostéopathier</Header>
         <Menu>
            <Dropdown item text='Pour qui?'>
              <Dropdown.Menu>
                <Dropdown.Item>Adulte</Dropdown.Item>
                <Dropdown.Item>Enfant</Dropdown.Item>
                <Dropdown.Item>Femme enceinte</Dropdown.Item>
                <Dropdown.Item>Nourisson</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button primary><Link to={'/praticiens'}>Praticiens</Link></Button>
          </Menu>
          <p>
          L’ostéopathie est une thérapie manuelle reconnue en France qui vise à maintenir et
          restituer un bon état de santé à votre corps. Elle ne substitue pas à la médecine
          traditionnelle. Néanmoins, c’est une médecine complémentaire qui entretient,
          et soulage de manière naturelle. Ses fondements sont l’anatomie, la
          biomécanique et la physiologie.
          Elle restitue la meilleure mobilité et intégrité aux différentes parties de votre corps
          afin que chacune d’elle puisse exercer au mieux sa fonction en harmonie (marche, mouvements,
          digestion, respiration..)
          Cette médecine ne cherche pas à soigner les symptômes mais la cause du
          déséquilibre durablement. Pour cela, le patient est considéré dans sa globalité (son corps, son
          psychisme, son environnement, ses habitudes et son hygiène de vie). 
          
          L’ostéopathie est une science, un art et une philosophie – Andrew Taylor Still
          </p>
        <Link to="/pratiques/reservation" className="btn-appointment">Rendez vous</Link>
    </Container>
    )
  }
}

export default Pratique;

