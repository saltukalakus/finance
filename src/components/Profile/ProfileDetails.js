import React, { PropTypes as T } from 'react'
import {Row, Col, Image} from 'react-bootstrap'

export class ProfileDetails extends React.Component {
  static propTypes = {
    profile: T.object
  }

  render(){
    const { profile } = this.props
    const { address } = profile.user_metadata || {}
    return (
      <Row>
        <Col md={12}>
          <div id="profile-div">
          <h3>Profile Details</h3>
          <Image src={profile.picture} circle className="profile-pic"/>
          <p><strong>Name: </strong> {profile.name}</p>
          <p><strong>Email: </strong> {profile.email}</p>
          <p><strong>Nickname: </strong> {profile.nickname}</p>
          <p><strong>Address: </strong> {address}</p>
          <p><strong>Created At: </strong> {profile.created_at}</p>
          <p><strong>Updated At: </strong> {profile.updated_at}</p>
          </div>
        </Col>
      </Row>
    )
  }
}

export default ProfileDetails;
