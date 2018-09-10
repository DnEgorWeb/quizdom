import React from 'react'
import e from '../../../../../../langs'
import {
    FeedbackWrapper,
    FeedbackTitle,
    FeedbackCheckboxList,
    ComplexityBlock,
    ComplexityBlockTitle,
    ComplexityBlockForm,
    ComplexityCheckbox,
    FormLabelsBlock,
    Label,
    FormCheckboxesBlock,
    CheckboxBlock,
    SendButton,
    CongratulationLabel,
} from './styledComponents'
import FeedbackCheckboxItem from './feedbackCheckboxItem'

class Feedback extends React.Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }
    state = {

        isSent: false,

        checkboxesError: [
            {
                prop: 'wrongAnswer',
                title: 'Falsche Antwort',
                checked: false
            },

            {
                prop: 'spellingError',
                title: 'Rechtschreibfehler',
                checked: false
            },

            {
                prop: 'grammar',
                title: 'Grammatikfehler',
                checked: false
            },
        ],

        checkboxesLike: [
            {
                prop: 'like',
                title: 'Frage gefällt mir',
                checked: false
            },

            {
                prop: 'dislike',
                title: 'Frage gefällt mir nicht',
                checked: false
            },
        ],

        checkboxesComplexity: [
            {
                prop: 'easy',
                title: 'leicht',
                checked: false
            },

            {
                prop: 'medium',
                title: 'mittel',
                checked: false
            },

            {
                prop: 'hard',
                title: 'schwer',
                checked: false
            },

            {
                prop: 'veryHard',
                title: 'sehr schwer',
                checked: false
            },
        ]
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }
    
    onChangeHandler = (groupProp, prop) => {
        const group = [...this.state[groupProp]];
        if (groupProp === 'checkboxesComplexity') {
            group.forEach(item => {
                if (item.prop === prop && !item.checked) {
                    item.checked = true
                } else {
                    item.checked = false;
                }
            })
        }else if(groupProp === 'checkboxesLike'){
            group.forEach(item => {
                if (item.prop === prop && !item.checked) {
                    item.checked = true
                } else {
                    item.checked = false;
                }
            })
        } else {
            const changingCheckbox = group.find((item) => item.prop === prop);
            changingCheckbox.checked = !changingCheckbox.checked;
        }
        this.setState({[groupProp]: group})
    }

    reportIssue = (data) => {
        let form_data = new FormData();
        for (let key in data){
            form_data.append(key, data[key]);
        }
        const key = window.btoa(window.config.keys.ISSUES_KEY);
        const initData = {
            method: 'POST',
            body: form_data,
            headers: {
                Accept: 'application/json, text/plain, */*',
                Authorization: 'Basic ' + key,
            }
        }
        const request = new Request(window.config.urls.ISSUES_LINK, initData);
        fetch(request).then(response => {
            return response.json();
        }).then(() => {
            window.notification.alert(e.game_Attention, e.game_informationFromTheFeedbackIsSendToTheSystem, 'Ok', () => {})
        })
    }

    getAppDetails = () => {
        this.setState({isSent: true});
        const key = window.btoa(window.config.keys.APP_DETAILS_KEY);
        const headers = new Headers({'Authorization': 'Basic ' + key});
        const initData = {
            method: 'GET',
            headers
        };
        const request = new Request(window.config.urls.APP_DETAILS_LINK, initData);
        fetch(request).then((response) => {
            return response.json();
        }).then((data) => {
            const {checkboxesError, checkboxesLike, checkboxesComplexity} = this.state;
            let message = '';
            checkboxesError.forEach(({checked, title}) => checked && (message += title + '; '))
            checkboxesLike.forEach(({checked, title}) => checked && (message += title + '; '))
            checkboxesComplexity.forEach(({checked, title}) => checked && (message += title + '; '))
            let reportToSend = {
                'email': this.props.email,
                'title': 'Issue',
                'message-body': "Blob keyForTypeList is: " + this.props.currentBlobKey + " with issue: " + message,
                'platform-type': 'web',
                'app-id': data.apps[0].id
            };

            setTimeout(() => {
                this.reportIssue(reportToSend)
            },3000);
        });
    }

    render() {
        const {checkboxesError, checkboxesLike, checkboxesComplexity} = this.state;
        const showSendButton = checkboxesError.some(({checked}) => checked) ||
            checkboxesLike.some(({checked}) => checked) ||
            checkboxesComplexity.some(({checked}) => checked)
        return (
            <FeedbackWrapper>
                <FeedbackTitle>{e.game_weLookForwardToYourFeedbackOnThisQuestion}</FeedbackTitle>
                <FeedbackCheckboxList>
                    {
                        checkboxesError.map(({checked, title, prop}) =>
                            <FeedbackCheckboxItem key={title+prop} checked={checked} caption={title}
                                                  onChange={this.onChangeHandler.bind(this, 'checkboxesError', prop)} />)
                    }
                </FeedbackCheckboxList>
                <FeedbackCheckboxList>
                    {
                        checkboxesLike.map(({checked, title, prop}) =>
                            <FeedbackCheckboxItem key={title+prop} checked={checked} caption={title}
                                                  onChange={this.onChangeHandler.bind(this, 'checkboxesLike', prop)} />)
                    }
                </FeedbackCheckboxList>
                <ComplexityBlock>
                    <ComplexityBlockTitle>{e.game_difficultyOfTheQuestion}</ComplexityBlockTitle>
                    <ComplexityBlockForm>
                        <FormLabelsBlock>
                            {
                                checkboxesComplexity.map(({title, prop, checked}) =>
                                    <Label checked={checked} key={title+prop}>{title}</Label>)
                            }
                        </FormLabelsBlock>
                        <FormCheckboxesBlock>
                            {
                                checkboxesComplexity.map(({checked, prop, title}) => (

                                        <CheckboxBlock key={title+prop}>
                                            <ComplexityCheckbox
                                                checked={checked}
                                                onChange={this.onChangeHandler.bind(this, 'checkboxesComplexity', prop)} />
                                        </CheckboxBlock>

                                    )
                                )
                            }
                        </FormCheckboxesBlock>
                        {
                            this.state.isSent ?
                                <CongratulationLabel>{e.game_thankYouVeryMuch}</CongratulationLabel>
                                :
                                <SendButton onClick={this.getAppDetails} enabled={showSendButton}>{e.game_send}</SendButton>
                        }
                    </ComplexityBlockForm>
                </ComplexityBlock>
            </FeedbackWrapper>
        )
    }
}

export default Feedback;
