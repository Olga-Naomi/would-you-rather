import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';


export class Overview extends Component {

    state = {
        viewPoll: false
    };
    handleClick = e => {
        this.setState(prevState => ({
            viewPoll: !prevState.viewPoll
        }));
    };
    render() {

        const colors = {
            green: {
                name: 'green',
                hex: '#38AC30'
            },
            blue: {
                name: 'blue',
                hex: '#2185d0'
            },
            grey: {
                name: null,
                hex: '#d4d4d5'
            }
        };
        const { question, unanswered } = this.props;
        const buttonColor = unanswered === true ? colors.green : colors.blue;
        const buttonContent = unanswered === true ? 'Answer Poll' : 'Results';

        if (this.state.viewPoll === true) {
            return <Redirect push to={`/questions/${question.id}`} />;
        }
        return (
            <Fragment>
                <Header as="h5" textAlign="left">
                    Would you rather
                </Header>
                <p style={{ textAlign: 'center' }}>
                    {question.optionOne.text}
                    <br />
                    or
                    <br />
                    {question.optionTwo.text}
                </p>
                <Button
                    color={buttonColor.name}
                    size="tiny"
                    fluid
                    onClick={this.handleClick}
                    content={buttonContent}
                />
            </Fragment>
        );
    }
}

export default Overview;