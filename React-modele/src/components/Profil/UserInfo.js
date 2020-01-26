import React from 'react';

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <div className="fiche">
              <div className="fiche-info">Prenom: </div>
              <div className="fiche-info">Nom: </div>
              <div className="fiche-info">Telephone: </div>
              <div className="fiche-info">Mail: </div>
              <div className="fiche-info">Pseudo: </div>
            </div>
        );
    }
}
 
export default UserInfo;