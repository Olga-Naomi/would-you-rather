import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Segment,
    Grid,
    Header,
    Image,
    Label,
    Divider,
    Container
} from 'semantic-ui-react';

const badge = ['yellow', 'grey', 'orange'];

export class Leaderboard extends Component {

    render() {
        const { leaderboard } = this.props

        return (
            <Container>
                <Segment>
                <h3 style={{ textAlign: 'center' }}>Leaderboard</h3>
                {leaderboard.map((user, index) => (
                    <Segment.Group key={user.id}>
                        {index <= 2 && <Label corner="right" icon="star" color={badge[index]} />}
                        <Grid divided padded>
                            <Grid.Row>
                                <Grid.Column width={4} verticalAlign="middle">
                                    <Image src={user.avatarURL} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header as="h3" textAlign="left">
                                        {user.name}
                                    </Header>
                                    <Grid>
                                        <Grid.Column width={12}>Answered questions</Grid.Column>
                                        <Grid.Column width={4}>{user.answerCount}</Grid.Column>
                                    </Grid>
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={12}>Created questions</Grid.Column>
                                        <Grid.Column width={4}>{user.questionCount}</Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={4} textAlign="center">
                                    <Segment.Group>
                                        <Header as="h5" block attached="top" content="Score" />
                                        <Segment>
                                            <Label circular color="green" size="big">
                                                {user.questionCount + user.answerCount}
                                            </Label>
                                        </Segment>
                                    </Segment.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>
                ))}
                </Segment>
            </Container>
        );
    }
}

const mapStateToProps = ({ users }) => {

    const leaderboard = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answerCount: Object.values(user.answers).length,
            questionCount: user.questions.length,
            total: Object.values(user.answers).length + user.questions.length
        }))
        .sort((a, b) => a.total - b.total)
        .reverse()
    return {
        leaderboard
    }
}

export default connect(mapStateToProps)(Leaderboard);