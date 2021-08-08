import React, { useState, useEffect } from "react"
import { Container, Table, Row, Col } from "react-bootstrap"
import ReactHtmlParser from 'react-html-parser'
import StarRatings from 'react-star-ratings'

import useBlandData from "../hooks/useBlandData"


const Show = (props) => {
  const showId = props.match.params.showId
  const { getShow } = useBlandData()
  const [show, setShow] = useState(null)

  useEffect(() => {
    const getData = async () => {
      setShow(await getShow(showId))
    }
    getData()
  }, [getShow, showId])

  const showName = show && show.name

  // rating data arriving null from api... this is a placeholder until geniune rating data can be found:
  const rating = showName ? (showName.charCodeAt(0) > 77 ? 4 : 5) : 4

  const ShowInfoTable = () => {
    const streamedOn = show && show.network && show.network.name
    const schedule = show && show.schedule && show.schedule.days.join(", ")
    const status = show && show.status
    const genres = show && show.genres && show.genres.join(", ")

    return (<Table hover borderless size={"sm"}>
      <tbody>
        <tr key="1">
          <td style={{ whiteSpace: "nowrap" }}>
            <strong>Streamed on</strong>
          </td>
          <td>
            {streamedOn}
          </td>
        </tr >
        <tr key="2">
          <td>
            <strong>Schedule</strong>
          </td>
          <td>
            {schedule}
          </td>
        </tr >
        <tr key="3">
          <td>
            <strong>Status</strong>
          </td>
          <td>
            {status}
          </td>
        </tr >
        <tr key="4">
          <td>
            <strong>Genres</strong>
          </td>
          <td>
            {genres || "[No Genres listed]"}
          </td>
        </tr >
      </tbody>
    </Table>)
  }

  const StaringTable = () => {
    const cast = (show && show.cast) || []

    return (<Table hover borderless size={"sm"}>
      <tbody>
        {cast.map(castMember => {
          return (<tr key={castMember.person.id}>
            <td style={{ whiteSpace: "nowrap" }}>
              <strong>{castMember.person.name}</strong>
            </td>
            <td style={{ whiteSpace: "nowrap" }}>
              {castMember.character.name}
            </td>
          </tr >)
        })}
      </tbody>
    </Table>)
  }

  return (
    (<div>
      <div className="topHeaderDesc">
        <Container>
          <Row>
            <Col xs={12} lg={3}>
              <img className="showImage" src={show && show.image && show.image.medium} alt={showName} />
            </Col>

            <Col>
              <p>
                <StarRatings
                  rating={rating}
                  starRatedColor="#ffffff"
                  numberOfStars={5}
                  starDimension="10px"
                  name='rating'
                /> <small style={{ position: "relative", top: "2px", right: "-10px" }}>{rating} / 5</small>
                <br /><br />
                <h3>{showName}</h3><br />
                {ReactHtmlParser(show && show.summary)}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <main>
        <Container>
          <br />
          <Row>
            <Col xs="12" md="6">
              <h3>Show Info</h3>
              <br />
              <ShowInfoTable />
              <br /><br />
            </Col>
            <Col>
              <h3>Staring</h3>
              <br />
              <StaringTable />
              <br /><br />
            </Col>

          </Row>
        </Container>
      </main>
    </div >))
}

export default Show