import React, { Component } from "react";
import { Tab } from 'semantic-ui-react'
import QuestionCard from './QuestionCard'



class QuestionContainer extends Component {

    render() {
        const { questionData } = this.props


        return  <Tab panes={panes({ questionData })} className="tab" />

    }
}

const panes = data => {
    const { questionData } = data;
    return [
        {
            menuItem: 'Unanswered',
            render: () => (
                <Tab.Pane>
                    {questionData.answered.map(question => (
                        <QuestionCard
                            key={question.id}
                            id={question.id}
                            unanswered={true}
                        />
                    ))}
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Answered',
            render: () => (
                <Tab.Pane>
                    {questionData.unanswered.map(question => (
                        <QuestionCard
                            key={question.id}
                            id={question.id}
                            unanswered={false}
                        />
                    ))}
                </Tab.Pane>
            )
        }
    ];
};

export default QuestionContainer
