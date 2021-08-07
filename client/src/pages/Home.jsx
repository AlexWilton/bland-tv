import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Card, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap"
import ReactHtmlParser from 'react-html-parser'
import StarRatings from 'react-star-ratings'

import useBlandData from "../hooks/useBlandData"


const Home = () => {
  const { getSchedule } = useBlandData()
  const [schedule, setSchedule] = useState(null)

  useEffect(() => {
    const getData = async () => {
      setSchedule(await getSchedule())
    }
    getData()
  }, [getSchedule])

  const ShowCardsGrid = () => {
    const cards = schedule && schedule.map(scheduleItem => {
      const extraName = scheduleItem && scheduleItem.name
      const show = scheduleItem.show && scheduleItem.show
      const showId = show && show.id
      let img = (show && show.image && show.image.medium && show.image.medium)
      if (!img) img = "/img/tv2.png"
      const renderTooltip = (props) => (
        <Tooltip {...props}>
          <strong>Summary:</strong>
          {ReactHtmlParser(show.summary)}
        </Tooltip>
      )

      // rating data arriving null from api... this is a placeholder until geniune rating data can be found:
      const rating = show.name ? (show.name.charCodeAt(0) > 77 ? 4 : 5) : 4 

      return (<Col style={{ paddingRight: "0px" }}>

        <Link to={`/show/${showId}`}>
          <Card className="showcaseCard">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Card.Img className="showcaseImg" variant="top" src={img} />
            </OverlayTrigger>
            <Card.Body>
              <StarRatings
                rating={rating}
                starRatedColor="#3EB3E3"
                numberOfStars={5}
                starDimension="10px"
                name='rating'
              />
              <Card.Title>{show.name}</Card.Title>
              <footer>
                {extraName}
              </footer>
            </Card.Body>
          </Card>
        </Link>

      </Col>
      )
    })

    return (<div className="showcase">
      <Container fluid="sm">
        <Row>
          {cards}
        </Row>
      </Container>
    </div>)
  }

  return (
    <div>
      <div className="topHeaderDesc">
        <p>
          TV Show and web series database.<br />
          Create personalised schedules. Episode guide, cast, crew
          and character information
        </p>
        <br />
        <br />
        <h5><strong>Last Added Shows</strong></h5>
      </div>
      <main>
        <ShowCardsGrid/>
      </main>
    </div>)
}

export default Home