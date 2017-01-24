import React, { PropTypes} from 'react'
import {Row, Col, Image} from 'react-bootstrap'

export class ProfileDetails extends React.Component {
  /*static propTypes = {
    profile: T.object
  }*/

  render(){
    const { profile } = this.props
    const { address } = profile.user_metadata || {}
    return (
      <Row>  
          <div id="profile-div">
            <h4>Welcome back</h4>
            <p>{profile.name}</p>
          </div>
      </Row>
    )
  }
}


ProfileDetails.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileDetails

//<img className="z-depth-1" src={profile.picture} alt="" />
