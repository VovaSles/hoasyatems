import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Chart } from "react-google-charts";

function VotingCard(props) {
    const { user, voting } = props;
    return (
        <div>
            <Card>
                <Card.Header>
                    {voting.title}
                </Card.Header>
                <Card.Body>
                   
                            {voting.details}
                        
                        <Chart
  width={'300px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['In Fovor',voting.votes.filter(vote => vote.vote === "in fovor").length],
    ['Against',voting.votes.filter(vote => vote.vote === "against").length],
   
  ]}
  options={{
    title: voting.title,
  }}
  rootProps={{ 'data-testid': '1' }}
/>
                    
                </Card.Body>
            </Card>
        </div>
    )
}

export default VotingCard
